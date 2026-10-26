import { readCameraInfo, FlirCameraInfo } from "./cameraInfo";
import { FffRecordType, readFffRecords } from "./fff";
import { requireFlir } from "./FlirDecodingError";
import { extractFlirContainer } from "./jpeg";
import { computeTemperatures, FlirTemperatures } from "./radiometry";
import { decodeRawData, FlirRawEncoding } from "./rawData";
import { createWorkingBuffer } from "./workingBuffer";

export type DecodedFlirJpeg = {
    width: number,
    height: number,
    encoding: FlirRawEncoding,
    camera: FlirCameraInfo,
    temperatures: FlirTemperatures
};

/**
 * Decode a radiometric FLIR JPEG into a temperature raster.
 * @throws FlirDecodingError
 */
export const decodeFlirJpeg = async ( buffer: ArrayBuffer ): Promise<DecodedFlirJpeg> => {

    const container = extractFlirContainer( buffer );
    const records = readFffRecords( container );

    const rawRecord = records.get( FffRecordType.RAW_DATA );
    const cameraRecord = records.get( FffRecordType.CAMERA_INFO );

    requireFlir( rawRecord !== undefined, "The FLIR data do not contain a raw thermal image." );
    requireFlir( cameraRecord !== undefined, "The FLIR data do not contain calibration parameters." );

    const camera = readCameraInfo( cameraRecord );
    const raw = await decodeRawData( rawRecord );
    const temperatures = computeTemperatures( raw.counts, camera );

    return {
        width: raw.width,
        height: raw.height,
        encoding: raw.encoding,
        camera,
        temperatures
    };

};

/**
 * Decode a FLIR JPEG into the working buffer read by `FlirParser` jobs.
 * @throws FlirDecodingError
 */
export const prepareFlirWorkingBuffer = async ( buffer: ArrayBuffer ): Promise<ArrayBuffer> => {

    const decoded = await decodeFlirJpeg( buffer );

    return createWorkingBuffer(
        decoded.width,
        decoded.height,
        decoded.encoding,
        decoded.camera,
        decoded.temperatures,
        buffer.byteLength
    );

};
