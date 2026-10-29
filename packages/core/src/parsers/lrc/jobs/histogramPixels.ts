import { IParserObject } from "../../structure";

/**
 * All temperatures of all frames as one array.
 * **Must stay self-contained, it is executed in a worker.**
 */
export const histogramPixels: IParserObject["histogramPixels"] = async ( file ) => {

    const headerView = new DataView( file, 0, 25 );

    const dataType = headerView.getUint8( 15 );
    const width = headerView.getUint16( 17, true );
    const height = headerView.getUint16( 19, true );

    const pixelCount = width * height;
    const pixelByteSize = dataType === 1 ? 4 : 2;
    const frameHeaderSize = 57;
    const frameSize = frameHeaderSize + pixelCount * pixelByteSize;
    const frameCount = Math.floor( ( file.byteLength - 25 ) / frameSize );

    const output = new Float32Array( frameCount * pixelCount );

    for ( let frame = 0; frame < frameCount; frame++ ) {

        const frameStart = 25 + frame * frameSize;
        const pixelsStart = frameStart + frameHeaderSize;

        if ( dataType === 1 ) {
            output.set( new Float32Array( file.slice( pixelsStart, pixelsStart + pixelCount * 4 ) ), frame * pixelCount );
        } else if ( dataType === 0 ) {
            const frameView = new DataView( file, frameStart, frameHeaderSize );
            const min = frameView.getFloat32( 8, true );
            const max = frameView.getFloat32( 12, true );
            const distance = Math.abs( min - max );
            const values = new Uint16Array( file.slice( pixelsStart, pixelsStart + pixelCount * 2 ) );
            for ( let index = 0; index < pixelCount; index++ ) {
                output[ frame * pixelCount + index ] = min + distance * ( values[ index ] / 65535 );
            }
        } else {
            // Unsupported data types do not contribute to the histogram
            output.fill( NaN, frame * pixelCount, ( frame + 1 ) * pixelCount );
        }

    }

    return output;

};
