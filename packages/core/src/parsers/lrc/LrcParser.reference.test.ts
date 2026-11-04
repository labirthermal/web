import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, test } from "vitest";
import { ThermalManager } from "../../hierarchy/ThermalManager";
import { ThermalFileReader } from "../../loading/workers/ThermalFileReader";
import { LrcParser } from "./LrcParser";

/**
 * Reference-test strategy:
 * - Load each LRC fixture as a user upload through ThermalManager.service.
 * - Assert that the core selects the LRC parser, then test through its reader.
 * - Compare reader results with the corresponding LabIR CSV rows by frame time.
 * - Allow only the precision lost when LabIR rounds exported values.
 *
 * The half-pixel ellipse adjustment is empirical: it matches the supplied
 * exports, but does not claim to describe LabIR's internal pixel convention.
 */

const REFERENCE_FILES = [
    "sequence_float32_small_short",
    "sequence_uint16_small_short",
    "sequence_float32_large_20frames",
    "sequence_uint16_large_20frames"
];

// CSV statistics are exported to three decimal places.
const REFERENCE_TOLERANCE = 0.001;
const here = dirname( fileURLToPath( import.meta.url ) );
const manager = new ThermalManager();

/**
 * Reads a fixture relative to the repository's public/lrc directory.
 * Copy the Node Buffer into an ArrayBuffer so it can also be passed to File.
 */
const readFile = (fileName: string): ArrayBuffer => {
    const file = readFileSync( join( here, "../../../../../public/lrc", fileName ) );
    const buffer = new ArrayBuffer( file.byteLength );
    new Uint8Array( buffer ).set( file );
    return buffer;
};

/**
 * Parses the LabIR CSV layout used by these fixtures:
 * three metadata/header lines, a statistics header, then one row per frame.
 * The exported CSV uses Windows-1250, semicolons and decimal commas.
 */
const readReferenceTable = (fileName: string) => {
    const file = readFile( `${fileName}.csv` );
    const lines = new TextDecoder( "windows-1250" ).decode( file ).trim().split( /\r?\n/ );
    const analysisHeader = lines[ 2 ];
    const statisticHeaders = lines[ 3 ].split( ";" );
    const rows = lines.slice( 4 )
        .map( line => line.split( ";" ) )
        .filter( row => row[ 1 ] !== undefined && row[ 1 ] !== "" );

    const rectangle = /Obdélník \d+ \[(\d+); (\d+)\], \[(\d+); (\d+)\]/.exec( analysisHeader );
    const ellipse = /Elipsa \d+ \[(\d+); (\d+)\], (\d+); (\d+)/.exec( analysisHeader );
    const points = [ ...analysisHeader.matchAll( /Bod \d+ \[(\d+); (\d+)\]/g ) ];

    if ( !rectangle || !ellipse || points.length !== 2 ) {
        throw new Error( `Could not read analysis coordinates from ${fileName}.csv` );
    }

    // Find a statistic's column only inside the columns belonging to its analysis.
    const columnFor = ( statistic: string, first: number, last: number ): number => {
        const index = statisticHeaders.slice( first, last + 1 ).indexOf( statistic );
        if ( index === -1 ) {
            throw new Error( `Could not find "${statistic}" in ${fileName}.csv` );
        }
        return first + index;
    };

    // The CSV identifies ellipses by center and size; the parser takes a bounding box.
    const readCoordinate = (value: string): number => Number( value );
    const pointCoordinates = points.map( point => [
        readCoordinate( point[ 1 ] ),
        readCoordinate( point[ 2 ] )
    ] as const );

    return {
        rows,
        rectangle: {
            left: readCoordinate( rectangle[ 1 ] ),
            top: readCoordinate( rectangle[ 2 ] ),
            width: readCoordinate( rectangle[ 3 ] ) - readCoordinate( rectangle[ 1 ] ),
            height: readCoordinate( rectangle[ 4 ] ) - readCoordinate( rectangle[ 2 ] )
        },
        ellipse: {
            left: readCoordinate( ellipse[ 1 ] ) - readCoordinate( ellipse[ 3 ] ) / 2,
            top: readCoordinate( ellipse[ 2 ] ) - readCoordinate( ellipse[ 4 ] ) / 2,
            width: readCoordinate( ellipse[ 3 ] ),
            height: readCoordinate( ellipse[ 4 ] )
        },
        pointCoordinates,
        rectangleColumns: {
            min: columnFor( "Minimum", 2, 4 ),
            max: columnFor( "Maximum", 2, 4 ),
            avg: columnFor( "Průměr", 2, 4 )
        },
        ellipseColumns: {
            min: columnFor( "Minimum", 5, 7 ),
            max: columnFor( "Maximum", 5, 7 ),
            avg: columnFor( "Průměr", 5, 7 )
        }
    };
};

/** Converts a CSV decimal using a comma into a JavaScript number. */
const readNumber = (value: string): number => Number( value.replace( ",", "." ) );

/** Compares one parser result with its CSV cell, allowing for export rounding. */
const expectReferenceValue = (actual: number, row: string[], column: number, analysis: string) => {
    expect( Math.abs( actual - readNumber( row[ column ] ) ), `${analysis} at ${row[ 1 ]} s` )
        .toBeLessThanOrEqual( REFERENCE_TOLERANCE );
};

describe.each( REFERENCE_FILES )( "LRC LabIR reference: %s", fileName => {
    let reader: ThermalFileReader;
    let reference: ReturnType<typeof readReferenceTable>;

    // Go through the same file-upload path used by the core for user-provided files.
    beforeAll( async () => {
        reference = readReferenceTable( fileName );
        const uploadedFile = new File( [ readFile( `${fileName}.lrc` ) ], `${fileName}.lrc` );
        const result = await manager.service.loadUploadedFile( uploadedFile );

        if ( !( result instanceof ThermalFileReader ) ) {
            throw new Error( `Could not load ${fileName}.lrc as a thermal file` );
        }

        expect( result.parser ).toBe( LrcParser );
        reader = result;
    } );

    // Area analysis returns a result per frame, keyed by elapsed milliseconds.
    test( "rectangle analyses match the exported values", async () => {
        const { left, top, width, height } = reference.rectangle;
        const actual = await reader.rectAnalysisData( left, top, width, height );

        for ( const row of reference.rows ) {
            // CSV time is in seconds; round to match the parser's millisecond key.
            const time = Math.round( readNumber( row[ 1 ] ) * 1000 );
            const result = actual[ time ];
            expect( result, `No rectangle result at ${time} ms` ).toBeDefined();
            if ( !result ) {
                throw new Error( `No rectangle result at ${time} ms` );
            }

            expectReferenceValue( result.min, row, reference.rectangleColumns.min, "Rectangle minimum" );
            expectReferenceValue( result.max, row, reference.rectangleColumns.max, "Rectangle maximum" );
            expectReferenceValue( result.avg, row, reference.rectangleColumns.avg, "Rectangle average" );
        }
    } );

    // A half-pixel-adjusted box matches the LabIR exports for all current fixtures.
    // This is an empirical reference convention, not a claim about LabIR internals.
    test( "ellipse analyses match the exported values", async () => {
        const { left, top, width, height } = reference.ellipse;
        const actual = await reader.ellipsisAnalysisData( left - 0.5, top - 0.5, width, height );

        for ( const row of reference.rows ) {
            // Keep frame lookup identical to the rectangle comparison above.
            const time = Math.round( readNumber( row[ 1 ] ) * 1000 );
            const result = actual[ time ];
            expect( result, `No ellipse result at ${time} ms` ).toBeDefined();
            if ( !result ) {
                throw new Error( `No ellipse result at ${time} ms` );
            }

            expectReferenceValue( result.min, row, reference.ellipseColumns.min, "Ellipse minimum" );
            expectReferenceValue( result.max, row, reference.ellipseColumns.max, "Ellipse maximum" );
            expectReferenceValue( result.avg, row, reference.ellipseColumns.avg, "Ellipse average" );
        }
    } );

    // Point columns follow the two point coordinates in the CSV's analysis header.
    test( "point analyses match the exported values", async () => {
        for ( const [ pointIndex, [ x, y ] ] of reference.pointCoordinates.entries() ) {
            const actual = await reader.pointAnalysisData( x, y );
            const valueColumn = 8 + pointIndex;

            for ( const row of reference.rows ) {
                // Point results use the same elapsed-millisecond key as area results.
                const time = Math.round( readNumber( row[ 1 ] ) * 1000 );
                expectReferenceValue( actual[ time ], row, valueColumn, `Point ${pointIndex + 1}` );
            }
        }
    } );
} );
