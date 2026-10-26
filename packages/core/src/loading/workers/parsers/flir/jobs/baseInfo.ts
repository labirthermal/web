import { IParserObject, ParsedFileBaseInfo } from "../../structure";

/**
 * Reads the working buffer header.
 * **Must stay self-contained, it is executed in a worker.**
 */
export const baseInfo: IParserObject["baseInfo"] = async ( workingBuffer ) => {

    const view = new DataView( workingBuffer );

    const timestamp = view.getFloat64( 16, true );

    return {
        width: view.getUint16( 10, true ),
        height: view.getUint16( 12, true ),
        timestamp,
        bytesize: view.getFloat64( 24, true ),
        frameCount: 1,
        duration: 0,
        frameInterval: 0,
        fps: Infinity,
        timeline: [ {
            index: 0,
            absolute: timestamp,
            relative: 0,
            offset: 0
        } ],
        min: view.getFloat32( 32, true ),
        max: view.getFloat32( 36, true ),
        averageEmissivity: view.getFloat32( 40, true ),
        averageReflectedKelvins: view.getFloat32( 44, true )
    } as ParsedFileBaseInfo;

};
