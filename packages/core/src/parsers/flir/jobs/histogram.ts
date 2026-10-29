import { IParserObject } from "../../structure";

/**
 * Copy of the temperatures for histogram calculation.
 * **Must stay self-contained, it is executed in a worker.**
 */
export const histogramPixels: IParserObject["histogramPixels"] = async ( workingBuffer ) => {
    const view = new DataView( workingBuffer );
    const width = view.getUint16( 10, true );
    const height = view.getUint16( 12, true );
    return new Float32Array( workingBuffer.slice( 64, 64 + width * height * 4 ) );
};
