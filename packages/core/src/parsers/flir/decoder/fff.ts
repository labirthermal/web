import { requireFlir } from "./FlirDecodingError";

export enum FffRecordType {
    RAW_DATA = 0x0001,
    CAMERA_INFO = 0x0020
}

export type FffRecord = {
    type: number,
    subtype: number,
    data: Uint8Array
};

const DIRECTORY_OFFSET = 0x18;
const DIRECTORY_COUNT = 0x1C;
const FFF_HEADER_SIZE = 0x40;
const ENTRY_SIZE = 0x20;
const MAX_ENTRIES = 10000;

/**
 * Read the record directory of a FLIR FFF/AFF container.
 *
 * The directory byte order is not declared explicitly. Most cameras use
 * big-endian, but e.g. DJI Zenmuse XT uses little-endian, so the only
 * plausible interpretation is selected.
 *
 * @throws FlirDecodingError
 */
export const readFffRecords = ( container: Uint8Array ): Map<number, FffRecord> => {

    requireFlir( container.length >= FFF_HEADER_SIZE, "The FLIR container is truncated." );

    const signature = String.fromCharCode( ...container.subarray( 0, 4 ) );
    requireFlir( signature === "FFF\0" || signature === "AFF\0", "Invalid FLIR container signature." );

    const view = new DataView( container.buffer, container.byteOffset, container.byteLength );

    const candidates = [ false, true ]
        .map( littleEndian => ( {
            littleEndian,
            offset: view.getUint32( DIRECTORY_OFFSET, littleEndian ),
            count: view.getUint32( DIRECTORY_COUNT, littleEndian )
        } ) )
        .filter( candidate => candidate.offset >= FFF_HEADER_SIZE
            && candidate.count > 0
            && candidate.count < MAX_ENTRIES
            && candidate.offset + candidate.count * ENTRY_SIZE <= container.length
        );

    requireFlir( candidates.length === 1, "Unable to determine the FLIR record directory." );

    const { littleEndian, offset, count } = candidates[ 0 ];

    const records = new Map<number, FffRecord>();

    for ( let index = 0; index < count; index++ ) {

        const entry = offset + index * ENTRY_SIZE;
        const type = view.getUint16( entry, littleEndian );

        // Unused directory entries
        if ( type === 0 ) {
            continue;
        }

        const subtype = view.getUint16( entry + 2, littleEndian );
        const start = view.getUint32( entry + 12, littleEndian );
        const length = view.getUint32( entry + 16, littleEndian );

        requireFlir( start + length <= container.length, `FLIR record 0x${type.toString( 16 )} is outside the container.` );
        requireFlir( ! records.has( type ), `Duplicate FLIR record 0x${type.toString( 16 )}.` );

        records.set( type, {
            type,
            subtype,
            data: container.subarray( start, start + length )
        } );

    }

    return records;

};

/**
 * FLIR records start with a 16-bit value `2` in their own byte order.
 * @returns `true` for little-endian records
 * @throws FlirDecodingError
 */
export const detectRecordByteOrder = ( data: Uint8Array, recordName: string ): boolean => {

    requireFlir( data.length >= 2, `The FLIR ${recordName} record is truncated.` );

    const isLittleEndian = data[ 0 ] === 2 && data[ 1 ] === 0;
    const isBigEndian = data[ 0 ] === 0 && data[ 1 ] === 2;

    requireFlir( isLittleEndian || isBigEndian, `Unknown byte order of the FLIR ${recordName} record.` );

    return isLittleEndian;

};
