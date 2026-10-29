import { IParserObject } from "../../structure";

/** Length of the LRC file header preceding the first frame. */
const HEADER_BYTE_SIZE = 25;

/**
 * Detects LRC files by content, regardless of the file name or extension:
 * the `LRC\0` signature followed by a complete file header.
 */
export const is: IParserObject["is"] = ( buffer ) => {

    if ( buffer.byteLength < HEADER_BYTE_SIZE ) {
        return false;
    }

    const signature = new Uint8Array( buffer, 0, 4 );

    return signature[ 0 ] === 0x4C // L
        && signature[ 1 ] === 0x52 // R
        && signature[ 2 ] === 0x43 // C
        && signature[ 3 ] === 0x00;

};
