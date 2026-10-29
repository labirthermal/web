// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import { FLIR_REFERENCE, readFlirFixture } from "../../../devserver/node/flirFixtures";
import { buildJpeg } from "../../../devserver/node/syntheticFlir";
import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { getPool } from "../../utils/pool";
import { FileErrors } from "../../loading/workers/errors";
import { FilesService } from "../../loading/workers/FilesService";
import { ThermalFileFailure } from "../../loading/workers/ThermalFileFailure";
import { ThermalFileReader } from "../../loading/workers/ThermalFileReader";
import * as decoder from "./decoder/decodeFlirJpeg";
import { FlirParser } from "./FlirParser";

const upload = ( name: string, buffer = readFlirFixture( name ) ) => new File( [ buffer ], name, { type: "image/jpeg" } );

describe( "Loading FLIR JPEGs", async () => {

    const pool = await getPool();

    test.each( [ "flir_e60_4.jpg", "flir_t630sc_4_plantcv.jpg" ] )( "uploaded %s becomes a thermal file instance", async name => {
        const reference = FLIR_REFERENCE[ name ];
        const original = readFlirFixture( name );
        const { service, registry } = FilesService.isolatedInstance( pool, `flir-upload-${name}` );
        const group = registry.groups.addOrGetGroup( "flir" );

        const reader = await service.loadUploadedFile( upload( name, original ) ) as ThermalFileReader;

        expect( reader ).toBeInstanceOf( ThermalFileReader );
        expect( reader.parser ).toBe( FlirParser );
        // Jobs read the decoded temperatures, downloads use the untouched file
        expect( reader.buffer ).not.toBe( reader.fileBuffer );
        expect( new Uint8Array( reader.fileBuffer ) ).toEqual( new Uint8Array( original ) );
        expect( reader.fileMimeType ).toBe( "image/jpeg" );

        const instance = await reader.createInstance( group );

        expect( instance ).toBeInstanceOf( ThermalFileInstance );
        expect( instance.width ).toBe( reference.width );
        expect( instance.height ).toBe( reference.height );
        expect( instance.timestamp ).toBe( reference.timestamp );
        expect( instance.min ).toBeCloseTo( reference.min, 2 );
        expect( instance.max ).toBeCloseTo( reference.max, 2 );

        const [ x, y, celsius ] = reference.samples[ 20 ];
        expect( instance.getTemperatureAtPoint( x, y ) ).toBeCloseTo( celsius, 2 );
    } );

    test( "the instance reader keeps the original file for downloads", async () => {
        const name = "flir_c5_2.jpg";
        const original = readFlirFixture( name );
        const { service, registry } = FilesService.isolatedInstance( pool, "flir-instance-reader" );
        const reader = await service.loadUploadedFile( upload( name, original ) ) as ThermalFileReader;
        const instance = await reader.createInstance( registry.groups.addOrGetGroup( "instance-reader" ) );

        expect( instance.reader.parser ).toBe( FlirParser );
        expect( new Uint8Array( instance.reader.fileBuffer ) ).toEqual( new Uint8Array( original ) );
    } );

    test( "plain and damaged JPEGs end with a parsing failure", async () => {
        const { service } = FilesService.isolatedInstance( pool, "flir-failures" );

        const plain = await service.loadUploadedFile( new File( [ buildJpeg( [] ) ], "photo.jpg" ) );
        expect( plain ).toBeInstanceOf( ThermalFileFailure );
        expect( ( plain as ThermalFileFailure ).code ).toBe( FileErrors.PARSING_ERROR );

        const damaged = readFlirFixture( "flir_e60_4.jpg" ).slice( 0, 30000 );
        const failure = await service.loadUploadedFile( upload( "damaged.jpg", damaged ) );
        expect( failure ).toBeInstanceOf( ThermalFileFailure );
        expect( ( failure as ThermalFileFailure ).code ).toBe( FileErrors.PARSING_ERROR );
    } );

} );

describe( "FLIR performance", () => {

    /** Generous limit for slow CI machines; typical decoding takes 2-10 ms */
    const LIMIT_MS = 50;

    const measure = async ( name: string ) => {
        const buffer = readFlirFixture( name );
        // Warm up the JIT
        await FlirParser.prepare!( buffer, name );
        const times: number[] = [];
        for ( let run = 0; run < 5; run++ ) {
            const start = performance.now();
            await FlirParser.prepare!( buffer, name );
            times.push( performance.now() - start );
        }
        return times.sort( ( a, b ) => a - b )[ 2 ];
    };

    test.each( [
        [ "the largest RAW16 image", "flir_vue_pro_640_1.jpg" ],
        [ "the largest PNG16 image", "flir_t630sc_4_plantcv.jpg" ]
    ] )( "decodes %s within the limit", async ( _, name ) => {
        expect( await measure( name ) ).toBeLessThan( LIMIT_MS );
    } );

    test( "analyses do not decode the JPEG again", async () => {
        const pool = await getPool();
        const { service, registry } = FilesService.isolatedInstance( pool, "flir-performance" );
        const spy = vi.spyOn( decoder, "decodeFlirJpeg" );

        const reader = await service.loadUploadedFile( upload( "dji_xt2_1.jpg" ) ) as ThermalFileReader;
        const instance = await reader.createInstance( registry.groups.addOrGetGroup( "performance" ) );
        const decodedOnLoad = spy.mock.calls.length;

        await reader.pointAnalysisData( 10, 10 );
        await reader.rectAnalysisData( 0, 0, 100, 100 );
        await reader.ellipsisAnalysisData( 0, 0, 100, 100 );
        await reader.frameData( 0 );
        instance.getTemperatureAtPoint( 5, 5 );

        expect( decodedOnLoad ).toBeLessThanOrEqual( 1 );
        expect( spy.mock.calls.length ).toBe( decodedOnLoad );

        spy.mockRestore();
    } );

    test( "the working buffer is released together with the reader", async () => {
        const name = "dji_xt2_1.jpg";
        const working = await FlirParser.prepare!( readFlirFixture( name ), name );
        // Header + Float32 pixels, no copy of the JPEG is kept in the working buffer
        expect( working.byteLength ).toBe( 64 + FLIR_REFERENCE[ name ].width * FLIR_REFERENCE[ name ].height * 4 );
    } );

} );
