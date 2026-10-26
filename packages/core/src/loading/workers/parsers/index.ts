import { FileLoadingError, FileErrors } from "../errors";
import { LrcParser } from "./lrc/LrcParser";
import { FlirParser } from "./flir/FlirParser";

import { IParserObject } from "./structure";

/**
 * Add parser objects here to register them
 */
const parsers = {
    LrcParser,
    FlirParser
}

const parsersArray = Object.values( parsers );


/**
 * Determines the parser and returns it (throws error if none found)
 * 
 * @throws FileLoadingError
 */
export const determineParser = (
    buffer: ArrayBuffer,
    url: string
) => {
    const parser = parsersArray.find( parser => parser.is( buffer, url ) );
    if ( parser === undefined ) {
        throw new FileLoadingError( FileErrors.MIME_UNSUPPORTED, url, `No parser found for '${url}'.` );
    }
    return parser!;
}

/**
 * Determine the parser and create its working buffer.
 * - formats without `prepare` work directly with the loaded buffer
 * - any failure is reported as `FileLoadingError`
 *
 * @throws FileLoadingError
 */
export const determineAndPrepare = async (
    buffer: ArrayBuffer,
    url: string
): Promise<{ parser: IParserObject, workingBuffer: ArrayBuffer }> => {

    const parser = determineParser( buffer, url );

    if ( parser.prepare === undefined ) {
        return { parser, workingBuffer: buffer };
    }

    try {
        return { parser, workingBuffer: await parser.prepare( buffer, url ) };
    } catch ( error ) {
        if ( error instanceof FileLoadingError ) {
            throw error;
        }
        throw new FileLoadingError( FileErrors.PARSING_ERROR, url, ( error as Error ).message );
    }

}


/**
 * Array of all supported file types and extensions
 * - this is only for the purpose of display!
 * - no functionality is relies on this data
 * - all the functionality needs to be implemented in static functions of the parser itself
 */
export const supportedFileTypes: IParserObject["extensions"][] = parsersArray.map( parser => parser.extensions );

export const supportedFileTypesInputProperty = supportedFileTypes
.map( type => type
    .map( entry => entry.minme + ", ." + entry.extension ).join( ", " ) 
).join(", ");

