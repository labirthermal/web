import { IParserObject, ParsedFileFrame } from "../../structure";

/** A FLIR JPEG has one frame only, the subset is a copy of the working buffer. */
export const getFrameSubset: IParserObject["getFrameSubset"] = ( workingBuffer ) => {
    return {
        array: workingBuffer.slice( 0 ),
        dataType: 0
    };
};

/**
 * **Must stay self-contained, it may be executed in a worker.**
 */
export const frameData: IParserObject["frameData"] = async ( frameSubset ) => {

    const view = new DataView( frameSubset );

    const width = view.getUint16( 10, true );
    const height = view.getUint16( 12, true );

    return {
        timestamp: view.getFloat64( 16, true ),
        min: view.getFloat32( 32, true ),
        max: view.getFloat32( 36, true ),
        emissivity: view.getFloat32( 40, true ),
        reflectedKelvins: view.getFloat32( 44, true ),
        pixels: Array.from( new Float32Array( frameSubset, 64, width * height ) )
    } as ParsedFileFrame;

};
