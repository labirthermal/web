import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, test } from "vitest";
import { ThermalManager } from "../../hierarchy/ThermalManager";
import { ThermalFileReader } from "../../loading/workers/ThermalFileReader";
import { FlirParser } from "./FlirParser";

/**
 * Reference-test strategy:
 * - Load the FLIR JPEG as a user upload through ThermalManager.service.
 * - Assert that the core selects the FLIR parser, then test through its reader.
 * - Compare rectangle, ellipse and point analyses with the LabIR 1.6.2 values.
 * - Allow the half-step expected when reference values are rounded to 0.1 °C.
 */

const REFERENCE_FILE = "flir_02.jpg";
const REFERENCE_TOLERANCE = 0.05;
const here = dirname( fileURLToPath( import.meta.url ) );
const manager = new ThermalManager();

/** Reads the JPEG fixture and returns a standalone buffer suitable for File. */
const readFixture = (): ArrayBuffer => {
    const file = readFileSync( join( here, "../../../../../public/flir", REFERENCE_FILE ) );
    const buffer = new ArrayBuffer( file.byteLength );
    new Uint8Array( buffer ).set( file );
    return buffer;
};

/** Compares a reader value with the one-decimal LabIR export. */
const expectReferenceValue = (actual: number, expected: number, description: string) => {
    expect( Math.abs( actual - expected ), description ).toBeLessThanOrEqual( REFERENCE_TOLERANCE );
};

describe( "FLIR LabIR reference: flir_02.jpg", () => {
    let reader: ThermalFileReader;

    // Use the real upload flow so parser detection, FLIR preparation and reader jobs run.
    beforeAll( async () => {
        const uploadedFile = new File( [ readFixture() ], REFERENCE_FILE );
        const result = await manager.service.loadUploadedFile( uploadedFile );

        if ( !( result instanceof ThermalFileReader ) ) {
            throw new Error( `Could not load ${REFERENCE_FILE} as a thermal file` );
        }

        expect( result.parser ).toBe( FlirParser );
        reader = result;
    } );

    test( "rectangle analysis matches the LabIR values", async () => {
        const result = ( await reader.rectAnalysisData( 433, 289, 307, 234 ) )[ 0 ];

        expectReferenceValue( result.min, 23.8, "Rectangle minimum" );
        expectReferenceValue( result.max, 32.6, "Rectangle maximum" );
        expectReferenceValue( result.avg, 24.9, "Rectangle average" );
    } );

    test( "ellipse analysis matches the LabIR values", async () => {
        const result = ( await reader.ellipsisAnalysisData( 443, 48, 337, 155 ) )[ 0 ];

        expectReferenceValue( result.min, 24.1, "Ellipse minimum" );
        expectReferenceValue( result.max, 28.3, "Ellipse maximum" );
        expectReferenceValue( result.avg, 24.5, "Ellipse average" );
    } );

    test( "point analyses match the LabIR values", async () => {
        const point1 = ( await reader.pointAnalysisData( 180, 262 ) )[ 0 ];
        const point2 = ( await reader.pointAnalysisData( 769, 495 ) )[ 0 ];

        expectReferenceValue( point1, 24.8, "Point 1" );
        expectReferenceValue( point2, 29.7, "Point 2" );
    } );
} );
