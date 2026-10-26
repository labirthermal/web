import { afterAll, describe, expect, test } from "vitest";
import * as workerpool from "workerpool";
import { FLIR_FIXTURE_NAMES, FLIR_REFERENCE, readFlirFixture } from "../../../../../devserver/node/flirFixtures";
import { buildJpeg } from "../../../../../devserver/node/syntheticFlir";
import { histogramFromPixels } from "../histogramFromPixels";
import { determineAndPrepare, determineParser } from "../index";
import { LrcParser } from "../lrc/LrcParser";
import { FileLoadingError } from "../../errors";
import { FlirParser } from "./FlirParser";

/** Reference values are computed in double precision, the parser stores Float32 */
const TOLERANCE = 0.01;
const DIGITS = 2;

const prepared = new Map<string, ArrayBuffer>();

const getWorkingBuffer = async ( name: string ) => {
    if ( ! prepared.has( name ) ) {
        prepared.set( name, await FlirParser.prepare!( readFlirFixture( name ), name ) );
    }
    return prepared.get( name )!;
};

const expectClose = ( actual: number, expected: number ) => {
    expect( Math.abs( actual - expected ) ).toBeLessThanOrEqual( TOLERANCE );
};

describe( "FlirParser", () => {

    test.each( FLIR_FIXTURE_NAMES )( "%s is detected by content and wins over LRC", name => {
        const buffer = readFlirFixture( name );
        expect( FlirParser.is( buffer, name ) ).toBe( true );
        expect( LrcParser.is( buffer, name ) ).toBe( false );
        expect( determineParser( buffer, "renamed-without-extension" ) ).toBe( FlirParser );
    } );

    test( "rejects plain JPEGs and other files", async () => {
        const plainJpeg = buildJpeg( [] );
        expect( FlirParser.is( plainJpeg, "photo.jpg" ) ).toBe( false );
        expect( () => determineParser( plainJpeg, "photo.jpg" ) ).toThrow();
        await expect( determineAndPrepare( plainJpeg, "photo.jpg" ) ).rejects.toBeInstanceOf( FileLoadingError );
    } );

    test( "wraps decoding errors of a damaged FLIR JPEG into FileLoadingError", async () => {
        const source = new Uint8Array( readFlirFixture( "flir_e60_4.jpg" ) );
        // Cut the file in the middle of the FLIR segments
        const damaged = source.slice( 0, 30000 ).buffer;
        await expect( FlirParser.prepare!( damaged, "damaged.jpg" ) ).rejects.toBeInstanceOf( FileLoadingError );
    } );

    describe.each( FLIR_FIXTURE_NAMES )( "%s", name => {

        const reference = FLIR_REFERENCE[ name ];

        test( "base info matches the reference", async () => {
            const info = await FlirParser.baseInfo( await getWorkingBuffer( name ) );

            expect( info.width ).toBe( reference.width );
            expect( info.height ).toBe( reference.height );
            expect( info.timestamp ).toBe( reference.timestamp );
            expect( info.bytesize ).toBe( reference.bytesize );
            expect( info.frameCount ).toBe( 1 );
            expect( info.duration ).toBe( 0 );
            expect( info.timeline ).toEqual( [ { index: 0, absolute: reference.timestamp, relative: 0, offset: 0 } ] );
            expectClose( info.min, reference.min );
            expectClose( info.max, reference.max );
            expect( info.averageEmissivity ).toBeCloseTo( reference.emissivity, 5 );
            expect( info.averageReflectedKelvins ).toBeCloseTo( reference.reflectedKelvins, 3 );
        } );

        test( "frame data and point analysis match reference pixels", async () => {
            const working = await getWorkingBuffer( name );
            const subset = FlirParser.getFrameSubset( working, 0 );
            const frame = await FlirParser.frameData( subset.array, subset.dataType );

            expect( frame.pixels ).toHaveLength( reference.width * reference.height );
            expect( frame.timestamp ).toBe( reference.timestamp );
            expectClose( frame.min, reference.min );
            expectClose( frame.max, reference.max );

            for ( const [ x, y, celsius ] of reference.samples ) {
                expectClose( frame.pixels[ y * reference.width + x ], celsius );
                expectClose( ( await FlirParser.pointAnalysisData( working, x, y ) )[ 0 ], celsius );
            }
        } );

        test( "area analyses cover the raster correctly", async () => {
            const working = await getWorkingBuffer( name );
            const { width, height } = reference;

            const whole = ( await FlirParser.rectAnalysisData( working, 0, 0, width - 1, height - 1 ) )[ 0 ];
            expectClose( whole.min, reference.min );
            expectClose( whole.max, reference.max );
            expectClose( whole.avg, reference.mean );

            // Areas exceeding the raster are clamped
            const overflowing = ( await FlirParser.rectAnalysisData( working, -50, -50, width + 100, height + 100 ) )[ 0 ];
            expect( overflowing ).toEqual( whole );

            // Inclusive bounds as in LRC: a zero-sized rectangle is one pixel
            const [ x, y, celsius ] = reference.samples[ 9 ];
            const single = ( await FlirParser.rectAnalysisData( working, x, y, 0, 0 ) )[ 0 ];
            expectClose( single.avg, celsius );
            expect( single.min ).toBe( single.max );

            const ellipse = ( await FlirParser.ellipsisAnalysisData( working, 0, 0, width - 1, height - 1 ) )[ 0 ];
            expect( ellipse.min ).toBeGreaterThanOrEqual( whole.min );
            expect( ellipse.max ).toBeLessThanOrEqual( whole.max );
            expect( Number.isFinite( ellipse.avg ) ).toBe( true );
        } );

        test( "points outside of the raster yield NaN", async () => {
            const working = await getWorkingBuffer( name );
            for ( const [ x, y ] of [ [ -1, 0 ], [ 0, -1 ], [ reference.width, 0 ], [ 0, reference.height ], [ 1.5, 1 ] ] ) {
                expect( ( await FlirParser.pointAnalysisData( working, x, y ) )[ 0 ] ).toBeNaN();
            }
        } );

        test( "histogram pixels are a copy of the temperatures", async () => {
            const working = await getWorkingBuffer( name );
            const pixels = await FlirParser.histogramPixels( working );
            expect( pixels ).toHaveLength( reference.width * reference.height );
            pixels[ 0 ] = 9999;
            expect( ( await FlirParser.pointAnalysisData( working, 0, 0 ) )[ 0 ] ).not.toBe( 9999 );
        } );

    } );

    test( "matches flyr wherever flyr can read the file", () => {
        const compared = FLIR_FIXTURE_NAMES.filter( name => FLIR_REFERENCE[ name ].flyrMaxAbsDiff !== null );
        expect( compared.length ).toBeGreaterThanOrEqual( 14 );
        for ( const name of compared ) {
            expect( FLIR_REFERENCE[ name ].flyrMaxAbsDiff ).toBeLessThan( 0.001 );
        }
    } );

} );

describe( "FlirParser jobs in workers", async () => {

    // Jobs are serialised into workers, so they must not reference any imports
    const pool = workerpool.pool( { maxWorkers: 2 } );

    afterAll( async () => {
        await pool.terminate();
    } );

    test( "worker jobs return the same results as on the main thread", async () => {
        const working = await getWorkingBuffer( "flir_e8xt_wifi_1.jpg" );

        expect( await pool.exec( FlirParser.baseInfo, [ working ] ) ).toEqual( await FlirParser.baseInfo( working ) );
        expect( await pool.exec( FlirParser.pointAnalysisData, [ working, 10, 20 ] ) ).toEqual( await FlirParser.pointAnalysisData( working, 10, 20 ) );
        expect( await pool.exec( FlirParser.rectAnalysisData, [ working, 5, 5, 40, 30 ] ) ).toEqual( await FlirParser.rectAnalysisData( working, 5, 5, 40, 30 ) );
        expect( await pool.exec( FlirParser.ellipsisAnalysisData, [ working, 5, 5, 40, 30 ] ) ).toEqual( await FlirParser.ellipsisAnalysisData( working, 5, 5, 40, 30 ) );

        const pixels = await pool.exec( FlirParser.histogramPixels, [ working ] );
        expect( Array.from( pixels as Float32Array ) ).toEqual( Array.from( await FlirParser.histogramPixels( working ) ) );
    } );

    test( "histogram of several images uses one shared range", async () => {
        const names = [ "flir_c5_2.jpg", "flir_t630sc_4_plantcv.jpg" ];
        const sets = await Promise.all( names.map( async name => pool.exec( FlirParser.histogramPixels, [ await getWorkingBuffer( name ) ] ) ) );
        const histogram = await pool.exec( histogramFromPixels, [ sets ] );

        const min = Math.min( ...names.map( name => FLIR_REFERENCE[ name ].min ) );
        const max = Math.max( ...names.map( name => FLIR_REFERENCE[ name ].max ) );
        const pixelCount = names.reduce( ( sum, name ) => sum + FLIR_REFERENCE[ name ].width * FLIR_REFERENCE[ name ].height, 0 );

        expect( histogram[ 0 ].from ).toBeCloseTo( min, DIGITS );
        expect( histogram[ histogram.length - 1 ].to ).toBeCloseTo( max, DIGITS );
        expect( histogram.reduce( ( sum, bar ) => sum + bar.count, 0 ) ).toBe( pixelCount );
        expect( histogram.reduce( ( sum, bar ) => sum + bar.percentage, 0 ) ).toBeCloseTo( 100, 3 );
    } );

} );
