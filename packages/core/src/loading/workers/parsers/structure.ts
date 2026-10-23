import { ThermalStatistics } from "../../../hierarchy/ThermalRegistry"

export type ParsedTimelineFrame = {
    index: number,
    absolute: number,
    relative: number,
    offset: number
}

/** 
 * Every file needs to have this information
 */
export type ParsedFileBaseInfo = {
    width: number,
    height: number,
    timestamp: number,
    frameCount: number,
    duration: number,
    frameInterval: number,
    fps: number,
    min: number,
    max: number,
    timeline: ParsedTimelineFrame[],
    averageEmissivity: number,
    averageReflectedKelvins: number,
    bytesize: number
}

export type ParsedFileFrame = {
    timestamp: number,
    min: number,
    max: number,
    emissivity: number,
    reflectedKelvins: number,
    pixels: number[]
}


/** 
 * Definition of a supported file type 
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
*/
type ParserFileType = {
    /** File extension, lowercase and without starting dots */
    extension: string,
    /** Mime type of the file */
    minme: string
}

/** A supported device dedfinition */
type SupportedDeviceType = {
    deviceName: string,
    deviceDescription: string,
    deviceUrl: string,
    manufacturer: string,
    manufacturerUrl: string,
}

export type PointAnalysisData = {
    [time: number]: number
}

export type AreaAnalysisData = {
    [time: number]: {
        min: number,
        max: number,
        avg: number
    }
}



/**
 * Interface for a parser object
 * - all methods must be completely and totally static
 * - data needs to be transferred as ArrayBuffer, since it is serialisable
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects#transferring_objects_between_threads
 */
export interface IParserObject {

    /** Name of the file format */
    name: string,

    /** Description of the file format */
    description: string,

    /** List of supported devices */
    devices: SupportedDeviceType[],

    /** Define the supported file type for the purpose of display */
    extensions: ParserFileType[],

    /** Determine whether the file corresponds to the given parser */
    is(buffer: ArrayBuffer, url: string): boolean,


    /** 
     * Get the basic information necessary for every file
     * - without any pixels!
     * - this sould be called once only
     */
    baseInfo(entireFileBuffer: ArrayBuffer): Promise<ParsedFileBaseInfo>,

    /** 
     * Prepare an array buffer for `frameData()` so that we do not need to passe the entire file to it.
     * - the data passed to `frameData()` needs to be as little as possible to avoid memory problems
     * - because the data going to `frameData()` are created per every call, the may be transfered in threads (instead of clonning)
     * 
     * **THIS IS SYNCHRONOUS AND NEEDS TO BE CALLED IN THE MAIN THREAD**
     */
    getFrameSubset(entireFileBuffer: ArrayBuffer, frameIndex: number): { array: ArrayBuffer, dataType: number}

    /**
     * Calculate the pixels and other parameters of one frame
     * @param frameSubset ArrayBuffer of data related to the frame.
     * @param dataType 
     */
    frameData(frameSubset: ArrayBuffer, dataType: number): Promise<ParsedFileFrame>,


    registryHistogram( files: ArrayBuffer[] ): Promise<ThermalStatistics[]>,

    pointAnalysisData( file: ArrayBuffer, x: number, y: number ): Promise<PointAnalysisData>,

    rectAnalysisData( file: ArrayBuffer, x: number, y: number, width: number, height: number ): Promise<AreaAnalysisData>,

    ellipsisAnalysisData( file: ArrayBuffer, x: number, y: number, width: number, height: number ): Promise<AreaAnalysisData>,

}

