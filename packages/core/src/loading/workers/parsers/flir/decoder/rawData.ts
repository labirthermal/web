import { FffRecord } from "./fff";
import { detectRecordByteOrder } from "./fff";
import { FlirDecodingError, requireFlir } from "./FlirDecodingError";

export type FlirRawEncoding = "RAW16" | "PNG16";

export type FlirRawImage = {
    width: number,
    height: number,
    encoding: FlirRawEncoding,
    /** Detector counts, row-major */
    counts: Uint16Array
};

const RAW_HEADER_SIZE = 32;
const MAX_DIMENSION = 8192;
const PNG_SIGNATURE = [ 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A ];

const isPng = ( data: Uint8Array ) => data.length > PNG_SIGNATURE.length
    && PNG_SIGNATURE.every( ( value, index ) => data[ index ] === value );

/**
 * Inflate zlib data using the native streaming API (browsers, workers, Node 18+).
 * @throws FlirDecodingError
 */
const inflate = async ( data: Uint8Array ): Promise<Uint8Array> => {

    requireFlir( typeof DecompressionStream !== "undefined", "This environment cannot decompress FLIR PNG data." );

    try {

        const reader = new ReadableStream<Uint8Array>( {
            start( controller ) {
                controller.enqueue( data );
                controller.close();
            }
        } )
            .pipeThrough( new DecompressionStream( "deflate" ) as unknown as ReadableWritablePair<Uint8Array, Uint8Array> )
            .getReader();

        const parts: Uint8Array[] = [];
        let length = 0;

        for ( let chunk = await reader.read(); ! chunk.done; chunk = await reader.read() ) {
            parts.push( chunk.value );
            length += chunk.value.length;
        }

        const result = new Uint8Array( length );
        let offset = 0;
        for ( const part of parts ) {
            result.set( part, offset );
            offset += part.length;
        }

        return result;

    } catch ( error ) {
        throw new FlirDecodingError( `Invalid compressed FLIR PNG data: ${( error as Error ).message}` );
    }

};

/**
 * Decode the 16-bit grayscale PNG embedded by newer FLIR cameras.
 *
 * FLIR writes the detector counts little-endian although PNG specifies
 * big-endian samples, so each sample is byte-swapped while unfiltering.
 *
 * @throws FlirDecodingError
 */
export const decodeFlirPng = async ( data: Uint8Array, expectedWidth: number, expectedHeight: number ): Promise<Uint16Array> => {

    const view = new DataView( data.buffer, data.byteOffset, data.byteLength );

    const compressedParts: Uint8Array[] = [];
    let compressedLength = 0;
    let width = 0;
    let height = 0;
    let hasHeader = false;
    let position = PNG_SIGNATURE.length;

    while ( position + 8 <= data.length ) {

        const length = view.getUint32( position );
        const type = String.fromCharCode( ...data.subarray( position + 4, position + 8 ) );
        const bodyStart = position + 8;
        const bodyEnd = bodyStart + length;

        requireFlir( bodyEnd + 4 <= data.length, `Truncated PNG chunk ${type}.` );

        if ( type === "IHDR" ) {
            requireFlir( length === 13, "Invalid PNG header." );
            width = view.getUint32( bodyStart );
            height = view.getUint32( bodyStart + 4 );
            const bitDepth = data[ bodyStart + 8 ];
            const colorType = data[ bodyStart + 9 ];
            const interlace = data[ bodyStart + 12 ];
            requireFlir( bitDepth === 16 && colorType === 0 && interlace === 0, "Unsupported FLIR PNG format (expected 16-bit grayscale)." );
            hasHeader = true;
        } else if ( type === "IDAT" ) {
            compressedParts.push( data.subarray( bodyStart, bodyEnd ) );
            compressedLength += length;
        } else if ( type === "IEND" ) {
            break;
        }

        position = bodyEnd + 4;

    }

    requireFlir( hasHeader, "Missing PNG header." );
    requireFlir( width === expectedWidth && height === expectedHeight, "PNG dimensions do not match the FLIR raw data header." );
    requireFlir( compressedLength > 0, "Missing PNG image data." );

    const compressed = new Uint8Array( compressedLength );
    let offset = 0;
    for ( const part of compressedParts ) {
        compressed.set( part, offset );
        offset += part.length;
    }

    const inflated = await inflate( compressed );

    const bytesPerPixel = 2;
    const stride = width * bytesPerPixel;

    requireFlir( inflated.length === ( stride + 1 ) * height, "Unexpected size of the decompressed PNG data." );

    const counts = new Uint16Array( width * height );
    let previous = new Uint8Array( stride );
    let current = new Uint8Array( stride );

    for ( let y = 0; y < height; y++ ) {

        const rowStart = y * ( stride + 1 );
        const filter = inflated[ rowStart ];

        requireFlir( filter <= 4, `Invalid PNG filter ${filter}.` );

        for ( let x = 0; x < stride; x++ ) {

            const left = x >= bytesPerPixel ? current[ x - bytesPerPixel ] : 0;
            const up = previous[ x ];
            const diagonal = x >= bytesPerPixel ? previous[ x - bytesPerPixel ] : 0;

            let predictor = 0;

            if ( filter === 1 ) {
                predictor = left;
            } else if ( filter === 2 ) {
                predictor = up;
            } else if ( filter === 3 ) {
                predictor = ( left + up ) >> 1;
            } else if ( filter === 4 ) {
                const estimate = left + up - diagonal;
                const toLeft = Math.abs( estimate - left );
                const toUp = Math.abs( estimate - up );
                const toDiagonal = Math.abs( estimate - diagonal );
                predictor = toLeft <= toUp && toLeft <= toDiagonal
                    ? left
                    : toUp <= toDiagonal ? up : diagonal;
            }

            current[ x ] = ( inflated[ rowStart + 1 + x ] + predictor ) & 0xFF;

        }

        const rowOffset = y * width;
        for ( let x = 0; x < width; x++ ) {
            counts[ rowOffset + x ] = current[ 2 * x ] | ( current[ 2 * x + 1 ] << 8 );
        }

        const swap = previous;
        previous = current;
        current = swap;

    }

    return counts;

};

/**
 * Decode the FLIR RawData record into detector counts.
 * @throws FlirDecodingError
 */
export const decodeRawData = async ( record: FffRecord ): Promise<FlirRawImage> => {

    const data = record.data;

    requireFlir( data.length > RAW_HEADER_SIZE, "The FLIR raw data record is truncated." );

    const littleEndian = detectRecordByteOrder( data, "raw data" );
    const view = new DataView( data.buffer, data.byteOffset, data.byteLength );

    const width = view.getUint16( 2, littleEndian );
    const height = view.getUint16( 4, littleEndian );

    requireFlir(
        width > 0 && height > 0 && width <= MAX_DIMENSION && height <= MAX_DIMENSION,
        `Invalid FLIR raw image dimensions ${width}x${height}.`
    );

    const payload = data.subarray( RAW_HEADER_SIZE );

    if ( isPng( payload ) ) {
        return {
            width,
            height,
            encoding: "PNG16",
            counts: await decodeFlirPng( payload, width, height )
        };
    }

    const pixelCount = width * height;

    requireFlir( payload.length >= pixelCount * 2, "The FLIR raw image is truncated." );

    const counts = new Uint16Array( pixelCount );
    const payloadView = new DataView( payload.buffer, payload.byteOffset, pixelCount * 2 );

    for ( let index = 0; index < pixelCount; index++ ) {
        counts[ index ] = payloadView.getUint16( index * 2, littleEndian );
    }

    return {
        width,
        height,
        encoding: "RAW16",
        counts
    };

};
