import { describe, expect, test } from "vitest";
import {
    appSegment,
    buildCameraInfoRecord,
    buildFff,
    buildFlirPng,
    buildJpeg,
    buildPng16Record,
    buildRaw16Record,
    buildSyntheticFlirJpeg,
    flirApp1,
    flirSegments,
    toArrayBuffer
} from "../../../../devserver/node/syntheticFlir";
import { readCameraInfo } from "./cameraInfo";
import { decodeFlirJpeg, prepareFlirWorkingBuffer } from "./decodeFlirJpeg";
import { FffRecordType, readFffRecords } from "./fff";
import { FlirDecodingError } from "./FlirDecodingError";
import { extractFlirContainer, hasFlirSegment } from "./jpeg";
import { computeTemperatures } from "./radiometry";
import { decodeFlirPng, decodeRawData } from "./rawData";
import { FLIR_WORKING_BUFFER } from "./workingBuffer";

const WIDTH = 7;
const HEIGHT = 5;

/** Counts covering both bytes and every PNG predictor path */
const COUNTS = Array.from( { length: WIDTH * HEIGHT }, ( _, index ) => ( 13000 + index * 977 + ( index % 3 ) * 255 ) & 0xFFFF );

const bytes = ( ...values: number[] ) => new Uint8Array( values );

describe( "FLIR JPEG segments", () => {

    test( "detects FLIR APP1 segments by content only", () => {
        const container = buildFff( [] );
        expect( hasFlirSegment( buildJpeg( flirSegments( container ) ) ) ).toBe( true );
        expect( hasFlirSegment( buildJpeg( [ appSegment( 0xE1, bytes( 0x45, 0x78, 0x69, 0x66, 0, 0 ) ) ] ) ) ).toBe( false );
        expect( hasFlirSegment( toArrayBuffer( bytes( 0x89, 0x50, 0x4E, 0x47 ) ) ) ).toBe( false );
        expect( hasFlirSegment( new ArrayBuffer( 0 ) ) ).toBe( false );
    } );

    test( "ignores FLIR signatures after the start of scan", () => {
        const jpeg = new Uint8Array( buildJpeg( [] ) );
        const withTrailingSignature = new Uint8Array( [ ...jpeg, ...flirApp1( bytes( 1, 2, 3 ), 0, 0 ) ] );
        expect( hasFlirSegment( toArrayBuffer( withTrailingSignature ) ) ).toBe( false );
    } );

    test( "joins chunks in index order regardless of their order in the file", () => {
        const container = Uint8Array.from( { length: 2500 }, ( _, index ) => index & 0xFF );
        const segments = flirSegments( container, 1000 );
        const reordered = buildJpeg( [ segments[ 2 ], appSegment( 0xE0, bytes( 1, 2 ) ), segments[ 0 ], segments[ 1 ] ] );
        expect( extractFlirContainer( reordered ) ).toEqual( container );
    } );

    test( "rejects missing, duplicate and inconsistent chunks", () => {
        const container = new Uint8Array( 2500 );
        const segments = flirSegments( container, 1000 );

        expect( () => extractFlirContainer( buildJpeg( [ segments[ 0 ], segments[ 2 ] ] ) ) ).toThrow( /Missing FLIR APP1 chunk 1/ );
        expect( () => extractFlirContainer( buildJpeg( [ segments[ 0 ], segments[ 0 ], segments[ 1 ], segments[ 2 ] ] ) ) ).toThrow( /Duplicate/ );
        expect( () => extractFlirContainer( buildJpeg( [ flirApp1( bytes( 1 ), 0, 1 ), flirApp1( bytes( 2 ), 1, 2 ) ] ) ) ).toThrow( /Inconsistent/ );
    } );

    test( "rejects non-JPEG, broken markers and JPEGs without FLIR data", () => {
        expect( () => extractFlirContainer( toArrayBuffer( bytes( 1, 2, 3, 4 ) ) ) ).toThrow( FlirDecodingError );
        expect( () => extractFlirContainer( buildJpeg( [] ) ) ).toThrow( /does not contain FLIR/ );
        expect( () => extractFlirContainer( toArrayBuffer( bytes( 0xFF, 0xD8, 0xFF, 0xE1, 0xFF, 0xFF ) ) ) ).toThrow( /Broken JPEG/ );
        expect( () => extractFlirContainer( toArrayBuffer( bytes( 0xFF, 0xD8, 0x00, 0x00 ) ) ) ).toThrow( /Broken JPEG/ );
    } );

} );

describe( "FFF container", () => {

    const records = [
        { type: FffRecordType.RAW_DATA, subtype: 3, data: bytes( 1, 2, 3 ) },
        { type: 0, data: new Uint8Array( 0 ) },
        { type: FffRecordType.CAMERA_INFO, data: bytes( 4, 5 ) }
    ];

    test.each( [ [ "big-endian", false ], [ "little-endian", true ] ] )( "reads a %s directory", ( _, littleEndian ) => {
        const result = readFffRecords( buildFff( records, littleEndian ) );
        expect( [ ...result.keys() ] ).toEqual( [ FffRecordType.RAW_DATA, FffRecordType.CAMERA_INFO ] );
        expect( result.get( FffRecordType.RAW_DATA )?.subtype ).toBe( 3 );
        expect( result.get( FffRecordType.RAW_DATA )?.data ).toEqual( bytes( 1, 2, 3 ) );
        expect( result.get( FffRecordType.CAMERA_INFO )?.data ).toEqual( bytes( 4, 5 ) );
    } );

    test( "accepts the AFF signature", () => {
        expect( readFffRecords( buildFff( records, false, "AFF\0" ) ).size ).toBe( 2 );
    } );

    test( "rejects invalid containers", () => {
        expect( () => readFffRecords( new Uint8Array( 10 ) ) ).toThrow( /truncated/ );
        expect( () => readFffRecords( buildFff( records, false, "XYZ\0" ) ) ).toThrow( /signature/ );

        const outside = buildFff( records );
        new DataView( outside.buffer ).setUint32( 0x40 + 16, 1_000_000 );
        expect( () => readFffRecords( outside ) ).toThrow( /outside/ );

        const noDirectory = buildFff( records );
        new DataView( noDirectory.buffer ).setUint32( 0x1C, 0 );
        expect( () => readFffRecords( noDirectory ) ).toThrow( /directory/ );

        const duplicate = buildFff( [ records[ 0 ], records[ 0 ] ] );
        expect( () => readFffRecords( duplicate ) ).toThrow( /Duplicate/ );
    } );

} );

describe( "FLIR raw data", () => {

    test.each( [ [ "little-endian", true ], [ "big-endian", false ] ] )( "decodes %s RAW16", async ( _, littleEndian ) => {
        const image = await decodeRawData( { type: 1, subtype: 0, data: buildRaw16Record( WIDTH, HEIGHT, COUNTS, littleEndian ) } );
        expect( image.encoding ).toBe( "RAW16" );
        expect( [ image.width, image.height ] ).toEqual( [ WIDTH, HEIGHT ] );
        expect( Array.from( image.counts ) ).toEqual( COUNTS );
    } );

    test.each( [ 0, 1, 2, 3, 4 ] )( "decodes PNG16 rows with filter %i", async filter => {
        const png = buildFlirPng( WIDTH, HEIGHT, COUNTS, { filters: [ filter ] } );
        expect( Array.from( await decodeFlirPng( png, WIDTH, HEIGHT ) ) ).toEqual( COUNTS );
    } );

    test( "decodes PNG16 with mixed filters, split IDAT chunks and byte-swapped samples", async () => {
        const png = buildFlirPng( WIDTH, HEIGHT, COUNTS, { filters: [ 4, 3, 2, 1, 0 ], idatCount: 3 } );
        const image = await decodeRawData( { type: 1, subtype: 0, data: buildPng16Record( WIDTH, HEIGHT, png ) } );
        expect( image.encoding ).toBe( "PNG16" );
        expect( Array.from( image.counts ) ).toEqual( COUNTS );
    } );

    test( "rejects unsupported or corrupted PNG data", async () => {
        const decode = ( png: Uint8Array ) => decodeFlirPng( png, WIDTH, HEIGHT );

        await expect( decode( buildFlirPng( WIDTH, HEIGHT, COUNTS, { bitDepth: 8 } ) ) ).rejects.toThrow( /16-bit grayscale/ );
        await expect( decode( buildFlirPng( WIDTH, HEIGHT, COUNTS, { colorType: 2 } ) ) ).rejects.toThrow( /16-bit grayscale/ );
        await expect( decode( buildFlirPng( WIDTH, HEIGHT, COUNTS, { headerWidth: WIDTH + 1 } ) ) ).rejects.toThrow( /dimensions/ );
        await expect( decode( buildFlirPng( WIDTH, HEIGHT, COUNTS, { compressed: bytes( 1, 2, 3, 4, 5 ) } ) ) ).rejects.toThrow( FlirDecodingError );
        await expect( decode( buildFlirPng( WIDTH, HEIGHT, COUNTS, { filters: [ 5 ] } ) ) ).rejects.toThrow( /filter/ );

        const truncated = buildFlirPng( WIDTH, HEIGHT, COUNTS );
        await expect( decode( truncated.subarray( 0, truncated.length - 20 ) ) ).rejects.toThrow( FlirDecodingError );
    } );

    test( "rejects truncated RAW16, invalid dimensions and unknown byte order", async () => {
        const record = buildRaw16Record( WIDTH, HEIGHT, COUNTS );
        await expect( decodeRawData( { type: 1, subtype: 0, data: record.subarray( 0, record.length - 2 ) } ) ).rejects.toThrow( /truncated/ );
        await expect( decodeRawData( { type: 1, subtype: 0, data: buildRaw16Record( 0, HEIGHT, [ 1 ] ) } ) ).rejects.toThrow( /dimensions/ );

        const unknownOrder = record.slice();
        unknownOrder[ 0 ] = 7;
        await expect( decodeRawData( { type: 1, subtype: 0, data: unknownOrder } ) ).rejects.toThrow( /byte order/ );
    } );

} );

describe( "FLIR camera info and radiometry", () => {

    test( "reads calibration, time and normalises humidity in percents", () => {
        const camera = readCameraInfo( { type: 0x20, subtype: 0, data: buildCameraInfoRecord( {
            emissivity: 0.9,
            relativeHumidity: 45,
            timestampSeconds: 1_700_000_000,
            milliseconds: 123,
            timezoneOffset: -60
        } ) } );

        expect( camera.emissivity ).toBeCloseTo( 0.9, 6 );
        expect( camera.relativeHumidity ).toBeCloseTo( 0.45, 6 );
        expect( camera.planckO ).toBe( -2919 );
        expect( camera.timestamp ).toBe( 1_700_000_000_123 );
        expect( camera.timezoneOffset ).toBe( -60 );
    } );

    test( "rejects truncated camera info", () => {
        expect( () => readCameraInfo( { type: 0x20, subtype: 0, data: buildCameraInfoRecord().subarray( 0, 0x100 ) } ) ).toThrow( /truncated/ );
    } );

    test( "matches the closed-form Planck inversion without attenuation", () => {
        const camera = {
            ...readCameraInfo( { type: 0x20, subtype: 0, data: buildCameraInfoRecord( { emissivity: 1 } ) } ),
            objectDistance: 0,
            irWindowTransmission: 1
        };
        const counts = Uint16Array.from( [ 12000, 15000, 18000, 25000 ] );
        const result = computeTemperatures( counts, camera );

        const expected = Array.from( counts ).map( count => camera.planckB
            / Math.log( camera.planckR1 / ( camera.planckR2 * ( count + camera.planckO ) ) + camera.planckF )
            - 273.15 );

        Array.from( result.celsius ).forEach( ( value, index ) => expect( value ).toBeCloseTo( expected[ index ], 3 ) );
        expect( result.min ).toBe( result.celsius[ 0 ] );
        expect( result.max ).toBe( result.celsius[ 3 ] );
    } );

    test( "temperature grows with counts and falls with emissivity", () => {
        const base = readCameraInfo( { type: 0x20, subtype: 0, data: buildCameraInfoRecord() } );
        const counts = Uint16Array.from( [ 14000, 16000, 20000 ] );
        const high = computeTemperatures( counts, { ...base, emissivity: 0.95 } ).celsius;
        const low = computeTemperatures( counts, { ...base, emissivity: 0.5 } ).celsius;

        expect( high[ 0 ] ).toBeLessThan( high[ 1 ] );
        expect( high[ 1 ] ).toBeLessThan( high[ 2 ] );
        expect( low[ 2 ] ).toBeGreaterThan( high[ 2 ] );
    } );

    test( "rejects physically invalid parameters and results", () => {
        const base = readCameraInfo( { type: 0x20, subtype: 0, data: buildCameraInfoRecord() } );
        const counts = Uint16Array.from( [ 15000 ] );

        expect( () => computeTemperatures( counts, { ...base, emissivity: 0 } ) ).toThrow( FlirDecodingError );
        expect( () => computeTemperatures( counts, { ...base, planckB: NaN } ) ).toThrow( FlirDecodingError );
        expect( () => computeTemperatures( counts, { ...base, irWindowTransmission: 2 } ) ).toThrow( FlirDecodingError );
        // Counts below the offset have no physical temperature
        expect( () => computeTemperatures( Uint16Array.from( [ 0 ] ), base ) ).toThrow( FlirDecodingError );
    } );

} );

describe( "FLIR JPEG decoding", () => {

    test.each( [
        [ "RAW16, big-endian directory", { } ],
        [ "RAW16, little-endian directory", { littleEndianDirectory: true } ],
        [ "PNG16, many small chunks", { png: true, chunkSize: 64 } ]
    ] )( "decodes %s", async ( _, options ) => {
        const decoded = await decodeFlirJpeg( buildSyntheticFlirJpeg( WIDTH, HEIGHT, COUNTS, options ) );
        expect( [ decoded.width, decoded.height ] ).toEqual( [ WIDTH, HEIGHT ] );
        expect( decoded.encoding ).toBe( "png" in options ? "PNG16" : "RAW16" );
        expect( decoded.temperatures.celsius ).toHaveLength( WIDTH * HEIGHT );
    } );

    test( "PNG16 and RAW16 encodings of the same counts give identical temperatures", async () => {
        const raw = await decodeFlirJpeg( buildSyntheticFlirJpeg( WIDTH, HEIGHT, COUNTS ) );
        const png = await decodeFlirJpeg( buildSyntheticFlirJpeg( WIDTH, HEIGHT, COUNTS, { png: true } ) );
        expect( png.temperatures.celsius ).toEqual( raw.temperatures.celsius );
    } );

    test( "requires both raw data and camera info records", async () => {
        const onlyCamera = buildJpeg( flirSegments( buildFff( [ { type: 0x20, data: buildCameraInfoRecord() } ] ) ) );
        const onlyRaw = buildJpeg( flirSegments( buildFff( [ { type: 0x01, data: buildRaw16Record( WIDTH, HEIGHT, COUNTS ) } ] ) ) );
        await expect( decodeFlirJpeg( onlyCamera ) ).rejects.toThrow( /raw thermal image/ );
        await expect( decodeFlirJpeg( onlyRaw ) ).rejects.toThrow( /calibration/ );
    } );

    test( "writes the working buffer header and temperatures", async () => {
        const source = buildSyntheticFlirJpeg( WIDTH, HEIGHT, COUNTS, {
            camera: { emissivity: 0.9, reflectedKelvins: 300, timestampSeconds: 1_650_000_000, milliseconds: 5, timezoneOffset: 60 },
            png: true
        } );
        const decoded = await decodeFlirJpeg( source );
        const working = await prepareFlirWorkingBuffer( source );
        const view = new DataView( working );

        expect( new TextDecoder().decode( new Uint8Array( working, 0, 8 ) ) ).toBe( "FLIRTEMP" );
        expect( view.getUint16( 10, true ) ).toBe( WIDTH );
        expect( view.getUint16( 12, true ) ).toBe( HEIGHT );
        expect( view.getInt16( 14, true ) ).toBe( 60 );
        expect( view.getFloat64( 16, true ) ).toBe( 1_650_000_000_005 );
        expect( view.getFloat64( 24, true ) ).toBe( source.byteLength );
        expect( view.getFloat32( 40, true ) ).toBeCloseTo( 0.9, 6 );
        expect( view.getFloat32( 44, true ) ).toBeCloseTo( 300, 4 );
        expect( view.getUint8( 48 ) ).toBe( 1 );
        expect( working.byteLength ).toBe( FLIR_WORKING_BUFFER.HEADER_SIZE + WIDTH * HEIGHT * 4 );
        expect( new Float32Array( working, FLIR_WORKING_BUFFER.HEADER_SIZE ) ).toEqual( decoded.temperatures.celsius );
    } );

} );
