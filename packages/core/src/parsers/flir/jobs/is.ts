import { IParserObject } from "../../structure";
import { hasFlirSegment } from "../decoder/jpeg";

/** Detects radiometric FLIR JPEGs by content, regardless of the file extension. */
export const is: IParserObject["is"] = ( buffer ) => hasFlirSegment( buffer );
