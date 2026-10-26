import { deflateSync } from "node:zlib";

/**
 * Builders of synthetic FLIR structures for decoder unit tests (Node only).
 */

export type SyntheticRecord = {
    type: number,
    subtype?: number,
    data: Uint8Array
};

export const concat = ( parts: Uint8Array[] ): Uint8Array => {
    const result = new Uint8Array( parts.reduce( ( sum, part ) => sum + part.length, 0 ) );
    let offset = 0;
    for ( const part of parts ) {
        result.set( part, offset );
        offset += part.length;
    }
    return result;
};

export const toArrayBuffer = ( bytes: Uint8Array ): ArrayBuffer => {
    const copy = new ArrayBuffer( bytes.byteLength );
    new Uint8Array( copy ).set( bytes );
    return copy;
};

/** FFF container with a directory in the given byte order */
export const buildFff = ( records: SyntheticRecord[], littleEndian = false, signature = "FFF\0" ): Uint8Array => {

    const headerSize = 0x40;
    const dataStart = headerSize + records.length * 0x20;
    const total = dataStart + records.reduce( ( sum, record ) => sum + record.data.length, 0 );

    const bytes = new Uint8Array( total );
    const view = new DataView( bytes.buffer );

    for ( let index = 0; index < 4; index++ ) {
        bytes[ index ] = signature.charCodeAt( index );
    }

    view.setUint32( 0x18, headerSize, littleEndian );
    view.setUint32( 0x1C, records.length, littleEndian );

    let offset = dataStart;

    records.forEach( ( record, index ) => {
        const entry = headerSize + index * 0x20;
        view.setUint16( entry, record.type, littleEndian );
        view.setUint16( entry + 2, record.subtype ?? 0, littleEndian );
        view.setUint32( entry + 12, offset, littleEndian );
        view.setUint32( entry + 16, record.data.length, littleEndian );
        bytes.set( record.data, offset );
        offset += record.data.length;
    } );

    return bytes;

};

/** One APP1 segment carrying a FLIR chunk */
export const flirApp1 = ( payload: Uint8Array, index: number, last: number ): Uint8Array => {
    const header = new Uint8Array( [ 0x46, 0x4C, 0x49, 0x52, 0x00, 0x01, index, last ] );
    const size = 2 + header.length + payload.length;
    return concat( [
        new Uint8Array( [ 0xFF, 0xE1, size >> 8, size & 0xFF ] ),
        header,
        payload
    ] );
};

/** Any other APP segment, e.g. EXIF */
export const appSegment = ( marker: number, payload: Uint8Array ): Uint8Array => {
    const size = 2 + payload.length;
    return concat( [ new Uint8Array( [ 0xFF, marker, size >> 8, size & 0xFF ] ), payload ] );
};

/** JPEG skeleton: SOI, given segments, SOS, a few entropy bytes, EOI */
export const buildJpeg = ( segments: Uint8Array[] ): ArrayBuffer => toArrayBuffer( concat( [
    new Uint8Array( [ 0xFF, 0xD8 ] ),
    ...segments,
    new Uint8Array( [ 0xFF, 0xDA, 0x00, 0x02, 0x12, 0x34, 0xFF, 0xD9 ] )
] ) );

/** Split a container into FLIR APP1 chunks of the given size */
export const flirSegments = ( container: Uint8Array, chunkSize = 1000 ): Uint8Array[] => {
    const count = Math.max( 1, Math.ceil( container.length / chunkSize ) );
    return Array.from( { length: count }, ( _, index ) => flirApp1(
        container.subarray( index * chunkSize, ( index + 1 ) * chunkSize ),
        index,
        count - 1
    ) );
};

/** RawData record header (32 B) in the given byte order */
const rawHeader = ( width: number, height: number, littleEndian: boolean ): Uint8Array => {
    const header = new Uint8Array( 32 );
    const view = new DataView( header.buffer );
    view.setUint16( 0, 2, littleEndian );
    view.setUint16( 2, width, littleEndian );
    view.setUint16( 4, height, littleEndian );
    return header;
};

export const buildRaw16Record = ( width: number, height: number, counts: number[], littleEndian = true ): Uint8Array => {
    const payload = new Uint8Array( counts.length * 2 );
    const view = new DataView( payload.buffer );
    counts.forEach( ( count, index ) => view.setUint16( index * 2, count, littleEndian ) );
    return concat( [ rawHeader( width, height, littleEndian ), payload ] );
};

const crcTable = Array.from( { length: 256 }, ( _, n ) => {
    let c = n;
    for ( let k = 0; k < 8; k++ ) {
        c = c & 1 ? 0xEDB88320 ^ ( c >>> 1 ) : c >>> 1;
    }
    return c >>> 0;
} );

const crc32 = ( bytes: Uint8Array ) => {
    let crc = 0xFFFFFFFF;
    for ( const byte of bytes ) {
        crc = crcTable[ ( crc ^ byte ) & 0xFF ] ^ ( crc >>> 8 );
    }
    return ( crc ^ 0xFFFFFFFF ) >>> 0;
};

const pngChunk = ( type: string, body: Uint8Array ): Uint8Array => {
    const chunk = new Uint8Array( 12 + body.length );
    const view = new DataView( chunk.buffer );
    view.setUint32( 0, body.length );
    for ( let index = 0; index < 4; index++ ) {
        chunk[ 4 + index ] = type.charCodeAt( index );
    }
    chunk.set( body, 8 );
    view.setUint32( 8 + body.length, crc32( chunk.subarray( 4, 8 + body.length ) ) );
    return chunk;
};

const paeth = ( left: number, up: number, diagonal: number ) => {
    const estimate = left + up - diagonal;
    const toLeft = Math.abs( estimate - left );
    const toUp = Math.abs( estimate - up );
    const toDiagonal = Math.abs( estimate - diagonal );
    return toLeft <= toUp && toLeft <= toDiagonal ? left : toUp <= toDiagonal ? up : diagonal;
};

export type PngOptions = {
    /** Filter type of each row; cycles when shorter than the height */
    filters?: number[],
    idatCount?: number,
    bitDepth?: number,
    colorType?: number,
    headerWidth?: number,
    headerHeight?: number,
    /** Replace the compressed stream */
    compressed?: Uint8Array
};

/** 16-bit grayscale PNG with samples stored little-endian, the way FLIR does */
export const buildFlirPng = ( width: number, height: number, counts: number[], options: PngOptions = {} ): Uint8Array => {

    const filters = options.filters ?? [ 0 ];
    const stride = width * 2;
    const raw = new Uint8Array( ( stride + 1 ) * height );
    let previous = new Uint8Array( stride );

    for ( let y = 0; y < height; y++ ) {

        const row = new Uint8Array( stride );
        for ( let x = 0; x < width; x++ ) {
            const count = counts[ y * width + x ];
            row[ 2 * x ] = count & 0xFF;
            row[ 2 * x + 1 ] = count >> 8;
        }

        const filter = filters[ y % filters.length ];
        const start = y * ( stride + 1 );
        raw[ start ] = filter;

        for ( let x = 0; x < stride; x++ ) {
            const left = x >= 2 ? row[ x - 2 ] : 0;
            const up = previous[ x ];
            const diagonal = x >= 2 ? previous[ x - 2 ] : 0;
            const predictor = [ 0, left, up, ( left + up ) >> 1, paeth( left, up, diagonal ) ][ filter ] ?? 0;
            raw[ start + 1 + x ] = ( row[ x ] - predictor ) & 0xFF;
        }

        previous = row;

    }

    const header = new Uint8Array( 13 );
    const headerView = new DataView( header.buffer );
    headerView.setUint32( 0, options.headerWidth ?? width );
    headerView.setUint32( 4, options.headerHeight ?? height );
    header[ 8 ] = options.bitDepth ?? 16;
    header[ 9 ] = options.colorType ?? 0;

    const compressed = options.compressed ?? new Uint8Array( deflateSync( raw ) );
    const idatCount = options.idatCount ?? 1;
    const partSize = Math.ceil( compressed.length / idatCount );
    const idats = Array.from( { length: idatCount }, ( _, index ) => pngChunk(
        "IDAT",
        compressed.subarray( index * partSize, ( index + 1 ) * partSize )
    ) );

    return concat( [
        new Uint8Array( [ 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A ] ),
        pngChunk( "IHDR", header ),
        ...idats,
        pngChunk( "IEND", new Uint8Array( 0 ) )
    ] );

};

export const buildPng16Record = ( width: number, height: number, png: Uint8Array, littleEndian = true ): Uint8Array =>
    concat( [ rawHeader( width, height, littleEndian ), png ] );

export type SyntheticCamera = {
    emissivity?: number,
    reflectedKelvins?: number,
    timestampSeconds?: number,
    milliseconds?: number,
    timezoneOffset?: number,
    relativeHumidity?: number
};

/** Little-endian CameraInfo record with realistic calibration constants */
export const buildCameraInfoRecord = ( camera: SyntheticCamera = {} ): Uint8Array => {

    const data = new Uint8Array( 0x390 );
    const view = new DataView( data.buffer );
    const f32 = ( offset: number, value: number ) => view.setFloat32( offset, value, true );

    view.setUint16( 0, 2, true );
    f32( 0x20, camera.emissivity ?? 0.95 );
    f32( 0x24, 1 );
    f32( 0x28, camera.reflectedKelvins ?? 293.15 );
    f32( 0x2C, 293.15 );
    f32( 0x30, 293.15 );
    f32( 0x34, 1 );
    f32( 0x3C, camera.relativeHumidity ?? 0.5 );
    f32( 0x58, 13799.104 );
    f32( 0x5C, 1396.5 );
    f32( 0x60, 1 );
    f32( 0x70, 0.006569 );
    f32( 0x74, 0.01262 );
    f32( 0x78, -0.002276 );
    f32( 0x7C, -0.00667 );
    f32( 0x80, 1.9 );
    view.setInt32( 0x308, -2919, true );
    f32( 0x30C, 0.012894021 );
    view.setUint32( 0x384, camera.timestampSeconds ?? 1_600_000_000, true );
    view.setUint32( 0x388, camera.milliseconds ?? 250, true );
    view.setInt16( 0x38C, camera.timezoneOffset ?? -120, true );

    return data;

};

/** Complete synthetic radiometric JPEG */
export const buildSyntheticFlirJpeg = (
    width: number,
    height: number,
    counts: number[],
    options: {
        littleEndianDirectory?: boolean,
        chunkSize?: number,
        camera?: SyntheticCamera,
        extraSegments?: Uint8Array[],
        png?: boolean
    } = {}
): ArrayBuffer => {
    const raw = options.png
        ? buildPng16Record( width, height, buildFlirPng( width, height, counts, { filters: [ 0, 1, 2, 3, 4 ] } ) )
        : buildRaw16Record( width, height, counts );
    const container = buildFff( [
        { type: 0x01, data: raw },
        { type: 0x20, data: buildCameraInfoRecord( options.camera ) }
    ], options.littleEndianDirectory );
    return buildJpeg( [
        ...( options.extraSegments ?? [] ),
        ...flirSegments( container, options.chunkSize )
    ] );
};
