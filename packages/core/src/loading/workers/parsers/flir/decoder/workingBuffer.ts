import { FlirCameraInfo } from "./cameraInfo";
import { FlirRawEncoding } from "./rawData";
import { FlirTemperatures } from "./radiometry";

/**
 * Layout of the decoded working buffer used by `FlirParser` jobs.
 *
 * The original JPEG is decoded only once while loading. All subsequent
 * parser jobs (that may run in workers and therefore cannot import
 * anything) read this simple little-endian layout.
 *
 * **Keep in sync with the inlined constants in `../jobs/*`.**
 */
export const FLIR_WORKING_BUFFER = {
    MAGIC: "FLIRTEMP",
    VERSION: 1,
    OFFSET_VERSION: 8,
    OFFSET_WIDTH: 10,
    OFFSET_HEIGHT: 12,
    OFFSET_TIMEZONE: 14,
    OFFSET_TIMESTAMP: 16,
    OFFSET_BYTESIZE: 24,
    OFFSET_MIN: 32,
    OFFSET_MAX: 36,
    OFFSET_EMISSIVITY: 40,
    OFFSET_REFLECTED: 44,
    OFFSET_ENCODING: 48,
    HEADER_SIZE: 64
} as const;

export const createWorkingBuffer = (
    width: number,
    height: number,
    encoding: FlirRawEncoding,
    camera: FlirCameraInfo,
    temperatures: FlirTemperatures,
    originalByteSize: number
): ArrayBuffer => {

    const L = FLIR_WORKING_BUFFER;
    const buffer = new ArrayBuffer( L.HEADER_SIZE + width * height * 4 );
    const view = new DataView( buffer );

    for ( let index = 0; index < L.MAGIC.length; index++ ) {
        view.setUint8( index, L.MAGIC.charCodeAt( index ) );
    }

    view.setUint16( L.OFFSET_VERSION, L.VERSION, true );
    view.setUint16( L.OFFSET_WIDTH, width, true );
    view.setUint16( L.OFFSET_HEIGHT, height, true );
    view.setInt16( L.OFFSET_TIMEZONE, camera.timezoneOffset, true );
    view.setFloat64( L.OFFSET_TIMESTAMP, camera.timestamp, true );
    view.setFloat64( L.OFFSET_BYTESIZE, originalByteSize, true );
    view.setFloat32( L.OFFSET_MIN, temperatures.min, true );
    view.setFloat32( L.OFFSET_MAX, temperatures.max, true );
    view.setFloat32( L.OFFSET_EMISSIVITY, camera.emissivity, true );
    view.setFloat32( L.OFFSET_REFLECTED, camera.reflectedKelvins, true );
    view.setUint8( L.OFFSET_ENCODING, encoding === "PNG16" ? 1 : 0 );

    const pixels = new Float32Array( buffer, L.HEADER_SIZE, width * height );
    // Pixels use the platform byte order (little-endian on all supported platforms) so that jobs can read them as Float32Array
    pixels.set( temperatures.celsius );

    return buffer;

};
