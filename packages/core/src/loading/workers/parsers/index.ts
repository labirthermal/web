import { FileLoadingError, FileErrors } from "../errors";
import { LrcParser } from "./lrc/LrcParser";

import { IParserObject } from "./structure";

/**
 * Add parser objects here to register them
 */
const parsers = {
    LrcParser
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

