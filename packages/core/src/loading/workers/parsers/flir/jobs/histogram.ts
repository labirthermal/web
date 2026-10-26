import { IParserObject } from "../../structure";
import { histogramFromPixels } from "../../histogramFromPixels";

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

/**
 * Histogram of FLIR working buffers.
 *
 * Composed of other jobs and therefore **not** serialisable into a worker.
 * `HistogramState` runs `histogramPixels` and `histogramFromPixels` in the pool separately.
 */
export const registryHistogram: IParserObject["registryHistogram"] = async ( files ) => {
    const pixelSets = await Promise.all( files.map( file => histogramPixels( file ) ) );
    return histogramFromPixels( pixelSets );
};
