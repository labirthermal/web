import { FileErrors, FileLoadingError } from "../../../loading/workers/errors";
import { IParserObject } from "../../structure";
import { prepareFlirWorkingBuffer } from "../decoder/decodeFlirJpeg";

/**
 * Decode the JPEG once into the working buffer used by all other jobs.
 * @throws FileLoadingError
 */
export const prepare: NonNullable<IParserObject["prepare"]> = async ( buffer, url ) => {
    try {
        return await prepareFlirWorkingBuffer( buffer );
    } catch ( error ) {
        throw new FileLoadingError(
            FileErrors.PARSING_ERROR,
            url,
            `Unable to read FLIR radiometric data from '${url}': ${( error as Error ).message}`
        );
    }
};
