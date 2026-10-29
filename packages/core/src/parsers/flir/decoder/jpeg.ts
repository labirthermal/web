import { requireFlir } from "./FlirDecodingError";

const SOI = 0xD8;
const SOS = 0xDA;
const EOI = 0xD9;
const APP1 = 0xE1;

/** APP1 payload signature `FLIR\0` */
const FLIR_SIGNATURE = [ 0x46, 0x4C, 0x49, 0x52, 0x00 ];

/** Signature (5 B) + format byte + chunk index + last chunk index */
const FLIR_CHUNK_HEADER_SIZE = 8;

type JpegSegment = {
    marker: number,
    /** Offset of the segment payload (after the length field) */
    start: number,
    /** Byte length of the payload */
    length: number
};

const isJpeg = ( bytes: Uint8Array ) => bytes.length >= 4 && bytes[ 0 ] === 0xFF && bytes[ 1 ] === SOI;

const hasFlirSignature = ( bytes: Uint8Array, start: number, length: number ) => {
    if ( length < FLIR_CHUNK_HEADER_SIZE ) {
        return false;
    }
    return FLIR_SIGNATURE.every( ( value, index ) => bytes[ start + index ] === value );
};

/**
 * Iterate the header segments of a JPEG until the image data starts.
 * Returns `false` when the marker structure is broken.
 */
const forEachHeaderSegment = (
    bytes: Uint8Array,
    callback: ( segment: JpegSegment ) => boolean | void
): boolean => {

    let position = 2;

    while ( position < bytes.length ) {

        if ( bytes[ position ] !== 0xFF ) {
            return false;
        }

        // Markers may be preceded by any number of fill bytes
        while ( position < bytes.length && bytes[ position ] === 0xFF ) {
            position++;
        }

        if ( position >= bytes.length ) {
            return false;
        }

        const marker = bytes[ position ];
        position++;

        if ( marker === SOS || marker === EOI ) {
            return true;
        }

        // Standalone markers without a length field
        if ( ( marker >= 0xD0 && marker <= 0xD7 ) || marker === 0x01 ) {
            continue;
        }

        if ( position + 2 > bytes.length ) {
            return false;
        }

        const size = ( bytes[ position ] << 8 ) | bytes[ position + 1 ];

        if ( size < 2 || position + size > bytes.length ) {
            return false;
        }

        const stop = callback( { marker, start: position + 2, length: size - 2 } );

        if ( stop === true ) {
            return true;
        }

        position += size;

    }

    return true;

};

/** Quick content check: is this a JPEG with at least one FLIR APP1 segment? */
export const hasFlirSegment = ( buffer: ArrayBuffer ): boolean => {

    const bytes = new Uint8Array( buffer );

    if ( ! isJpeg( bytes ) ) {
        return false;
    }

    let found = false;

    forEachHeaderSegment( bytes, segment => {
        if ( segment.marker === APP1 && hasFlirSignature( bytes, segment.start, segment.length ) ) {
            found = true;
            return true;
        }
    } );

    return found;

};

/**
 * Join the numbered FLIR APP1 chunks into one FFF/AFF container.
 * @throws FlirDecodingError
 */
export const extractFlirContainer = ( buffer: ArrayBuffer ): Uint8Array => {

    const bytes = new Uint8Array( buffer );

    requireFlir( isJpeg( bytes ), "The file is not a JPEG." );

    const chunks = new Map<number, Uint8Array>();
    let lastIndex: number | undefined;

    const isValid = forEachHeaderSegment( bytes, segment => {

        if ( segment.marker !== APP1 || ! hasFlirSignature( bytes, segment.start, segment.length ) ) {
            return;
        }

        const index = bytes[ segment.start + 6 ];
        const last = bytes[ segment.start + 7 ];

        requireFlir( ! chunks.has( index ), `Duplicate FLIR APP1 chunk ${index}.` );
        requireFlir( lastIndex === undefined || lastIndex === last, "Inconsistent FLIR APP1 chunk count." );

        lastIndex = last;
        chunks.set(
            index,
            bytes.subarray( segment.start + FLIR_CHUNK_HEADER_SIZE, segment.start + segment.length )
        );

    } );

    requireFlir( isValid, "Broken JPEG marker structure." );
    requireFlir( lastIndex !== undefined, "The JPEG does not contain FLIR radiometric data." );

    let totalLength = 0;

    for ( let index = 0; index <= lastIndex; index++ ) {
        const chunk = chunks.get( index );
        requireFlir( chunk !== undefined, `Missing FLIR APP1 chunk ${index} of ${lastIndex + 1}.` );
        totalLength += chunk.length;
    }

    const container = new Uint8Array( totalLength );
    let offset = 0;

    for ( let index = 0; index <= lastIndex; index++ ) {
        const chunk = chunks.get( index )!;
        container.set( chunk, offset );
        offset += chunk.length;
    }

    return container;

};
