import { detectRecordByteOrder, FffRecord } from "./fff";
import { requireFlir } from "./FlirDecodingError";

/** Radiometric parameters stored by the camera in the CameraInfo record */
export type FlirCameraInfo = {
    emissivity: number,
    /** Metres */
    objectDistance: number,
    reflectedKelvins: number,
    atmosphericKelvins: number,
    irWindowKelvins: number,
    irWindowTransmission: number,
    /** Ratio 0..1 */
    relativeHumidity: number,
    planckR1: number,
    planckB: number,
    planckF: number,
    planckO: number,
    planckR2: number,
    atmosphericTransAlpha1: number,
    atmosphericTransAlpha2: number,
    atmosphericTransBeta1: number,
    atmosphericTransBeta2: number,
    atmosphericTransX: number,
    /** UTC milliseconds */
    timestamp: number,
    /** Minutes, same sign convention as `Date.getTimezoneOffset()` */
    timezoneOffset: number
};

const OFFSETS = {
    emissivity: 0x20,
    objectDistance: 0x24,
    reflectedKelvins: 0x28,
    atmosphericKelvins: 0x2C,
    irWindowKelvins: 0x30,
    irWindowTransmission: 0x34,
    relativeHumidity: 0x3C,
    planckR1: 0x58,
    planckB: 0x5C,
    planckF: 0x60,
    atmosphericTransAlpha1: 0x70,
    atmosphericTransAlpha2: 0x74,
    atmosphericTransBeta1: 0x78,
    atmosphericTransBeta2: 0x7C,
    atmosphericTransX: 0x80,
    planckO: 0x308,
    planckR2: 0x30C,
    dateTimeSeconds: 0x384,
    dateTimeMilliseconds: 0x388,
    dateTimeZone: 0x38C
} as const;

const MIN_LENGTH = OFFSETS.dateTimeZone + 2;

/**
 * Read the radiometric parameters and the capture time from the CameraInfo record.
 * @throws FlirDecodingError
 */
export const readCameraInfo = ( record: FffRecord ): FlirCameraInfo => {

    const data = record.data;

    requireFlir( data.length >= MIN_LENGTH, "The FLIR camera info record is truncated." );

    const littleEndian = detectRecordByteOrder( data, "camera info" );
    const view = new DataView( data.buffer, data.byteOffset, data.byteLength );
    const float = ( offset: number ) => view.getFloat32( offset, littleEndian );

    const humidity = float( OFFSETS.relativeHumidity );

    const seconds = view.getUint32( OFFSETS.dateTimeSeconds, littleEndian );
    const milliseconds = view.getUint32( OFFSETS.dateTimeMilliseconds, littleEndian );

    return {
        emissivity: float( OFFSETS.emissivity ),
        objectDistance: float( OFFSETS.objectDistance ),
        reflectedKelvins: float( OFFSETS.reflectedKelvins ),
        atmosphericKelvins: float( OFFSETS.atmosphericKelvins ),
        irWindowKelvins: float( OFFSETS.irWindowKelvins ),
        irWindowTransmission: float( OFFSETS.irWindowTransmission ),
        // Some cameras store percents instead of a ratio
        relativeHumidity: humidity > 1 ? humidity / 100 : humidity,
        planckR1: float( OFFSETS.planckR1 ),
        planckB: float( OFFSETS.planckB ),
        planckF: float( OFFSETS.planckF ),
        planckO: view.getInt32( OFFSETS.planckO, littleEndian ),
        planckR2: float( OFFSETS.planckR2 ),
        atmosphericTransAlpha1: float( OFFSETS.atmosphericTransAlpha1 ),
        atmosphericTransAlpha2: float( OFFSETS.atmosphericTransAlpha2 ),
        atmosphericTransBeta1: float( OFFSETS.atmosphericTransBeta1 ),
        atmosphericTransBeta2: float( OFFSETS.atmosphericTransBeta2 ),
        atmosphericTransX: float( OFFSETS.atmosphericTransX ),
        timestamp: seconds * 1000 + ( milliseconds < 1000 ? milliseconds : 0 ),
        timezoneOffset: view.getInt16( OFFSETS.dateTimeZone, littleEndian )
    };

};
