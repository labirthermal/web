/** Timing of one frame in file order. All time values are in milliseconds. */
export type ParsedTimelineFrame = {
    /** Zero-based frame index, also used by `IParserObject.getFrameSubset`. */
    index: number,
    /** Frame timestamp as milliseconds since the Unix epoch (UTC). */
    absolute: number,
    /** Elapsed time since the first frame: `absolute - file.timestamp`. */
    relative: number,
    /** Time until the next frame; zero for the last frame. Not a byte offset. */
    offset: number
}

/**
 * Format-independent metadata for a non-empty thermal image or sequence.
 * Temperatures are in degrees Celsius unless a property explicitly says Kelvin.
 */
export type ParsedFileBaseInfo = {
    /** Raster width in pixels, shared by all frames. */
    width: number,
    /** Raster height in pixels, shared by all frames. */
    height: number,
    /** First frame timestamp as milliseconds since the Unix epoch (UTC). */
    timestamp: number,
    /** Number of frames; a still image has one frame. */
    frameCount: number,
    /** Last frame timestamp minus the first, in milliseconds; zero for a still. */
    duration: number,
    /**
     * Current convention: `duration / frameCount`, in milliseconds.
     * This is not the mean of the `frameCount - 1` gaps between frames.
     */
    frameInterval: number,
    /** `1000 / frameInterval`; currently `Infinity` when the interval is zero. */
    fps: number,
    /** Minimum temperature across all frames, in degrees Celsius. */
    min: number,
    /** Maximum temperature across all frames, in degrees Celsius. */
    max: number,
    /** One timing entry per frame, in file order. */
    timeline: ParsedTimelineFrame[],
    /** Arithmetic mean of frame emissivities, dimensionless. */
    averageEmissivity: number,
    /** Arithmetic mean of frame reflected apparent temperatures, in Kelvin. */
    averageReflectedKelvins: number,
    /** Original file size in bytes, not the size of a decoded working buffer. */
    bytesize: number
}

/** Decoded data of one frame, independent of the source file encoding. */
export type ParsedFileFrame = {
    /** Frame timestamp as milliseconds since the Unix epoch (UTC). */
    timestamp: number,
    /** Minimum temperature of the frame, in degrees Celsius. */
    min: number,
    /** Maximum temperature of the frame, in degrees Celsius. */
    max: number,
    /** Frame emissivity, dimensionless. */
    emissivity: number,
    /** Frame reflected apparent temperature, in Kelvin. */
    reflectedKelvins: number,
    /**
     * Temperatures in degrees Celsius, row-major from the top-left corner.
     * Contains `width * height` entries; pixel `(x, y)` is at `y * width + x`.
     */
    pixels: number[]
}


/** 
 * Definition of a supported file type 
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
*/
type ParserFileType = {
    /** File extension, lowercase and without starting dots */
    extension: string,
    /** MIME type of the original file. The property name is retained for compatibility. */
    minme: string
}

/** Descriptive device metadata; not used to detect or validate a file. */
type SupportedDeviceType = {
    /** Display name of the device or device family. */
    deviceName: string,
    /** Human-readable description of the device. */
    deviceDescription: string,
    /** Device information URL. */
    deviceUrl: string,
    /** Manufacturer display name. */
    manufacturer: string,
    /** Manufacturer website URL. */
    manufacturerUrl: string,
}

/**
 * Point temperatures in degrees Celsius keyed by elapsed milliseconds since
 * the first frame, not by frame index or absolute timestamp.
 * A still image uses key `0`. Equal relative timestamps share the same key.
 */
export type PointAnalysisData = {
    [time: number]: number
}

/**
 * Area statistics keyed by elapsed milliseconds since the first frame.
 * A still image uses key `0`. Equal relative timestamps share the same key.
 *
 * An empty selection yields `min = Infinity`, `max = -Infinity`,
 * `avg = NaN` and `count = 0`.
 */
export type AreaAnalysisData = {
    [time: number]: {
        /** Minimum selected temperature, in degrees Celsius. */
        min: number,
        /** Maximum selected temperature, in degrees Celsius. */
        max: number,
        /** Arithmetic mean of selected temperatures, in degrees Celsius. */
        avg: number,
        /** Number of pixels included in the statistics. */
        count: number
    }
}



/**
 * Public behavioral contract for a thermal file format adapter.
 *
 * Lifecycle: `is(source, url)` -> optional `prepare(source, url)` -> data jobs.
 * Only `is` and `prepare` receive the original source file. Subsequent methods
 * receive the working buffer, except `frameData`, which receives a frame subset.
 * Without `prepare`, the original source is also the working buffer (LRC).
 * FLIR decodes its JPEG once into a separate working buffer of temperatures.
 * The working layout is private to each parser, not shared between formats.
 *
 * Data jobs must not mutate their input buffers. Frame, point, area and
 * histogram reads should describe the same temperatures, allowing for Float32
 * rounding. Known implementation gaps are called out below; documentation alone
 * does not make the current parsers conform.
 *
 * Worker execution is a caller concern, not a consequence of returning a
 * Promise. `baseInfo`, `frameData`, `histogramPixels` and the analysis jobs must
 * remain self-contained when serialised by workerpool: no captured values or
 * runtime imports. Type-only references are fine. `is`, `prepare` and
 * `getFrameSubset` have no blanket worker guarantee.
 *
 * ArrayBuffers can be cloned or transferred between threads. Transferring
 * detaches the sender's buffer: callers must not transfer a retained working
 * buffer. A dedicated frame subset or pixel copy can be transferred instead.
 *
 * @remarks The invalid-point and invalid-frame-index policies are not yet
 * unified. Their current differences are documented on the relevant methods.
 * Area analyses already share one clipping policy.
 * Other than preparation errors, malformed-buffer errors are not normalised
 * across parsers; callers must not rely on a common error class or message.
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

    /** Original file extensions and MIME types for display and file input hints. */
    extensions: ParserFileType[],

    /**
     * Synchronously recognise the original file by its content, without mutation.
     * Return `false` for unrecognised content. Recognition is not full validation:
     * preparing or reading a recognised but damaged file can still fail.
     *
     * The target rule is content-based detection: a filename or extension must
     * not reject otherwise recognised supported content. `url` identifies the
     * source and may also be an uploaded filename rather than a URL.
     *
     * Both parsers conform: LRC checks its `LRC\0` signature and a complete
     * header, FLIR checks for a FLIR APP1 segment in the JPEG.
     */
    is(buffer: ArrayBuffer, url: string): boolean,

    /**
     * Optionally convert the original file into the parser's working buffer.
     * Called once by the loading pipeline after recognition and before the
     * reader is created. The source must remain unchanged.
     *
     * Currently awaited on the main thread. FLIR performs decoding and
     * radiometry here; LRC omits it and reads its source buffer directly.
     * `ThermalFileReader.fileBuffer` preserves the original file for downloads.
     *
     * @param buffer Original source file, not an already prepared buffer.
     * @param url Source URL or uploaded filename, used for error reporting.
     * @returns The working buffer for metadata, frame selection and analyses.
     * @throws FileLoadingError when preparation fails. The loading pipeline
     * also wraps other preparation errors as `FileErrors.PARSING_ERROR`.
     */
    prepare?(buffer: ArrayBuffer, url: string): Promise<ArrayBuffer>,


    /** 
     * Read format-independent metadata from the working buffer, without
     * returning pixel arrays. Repeat calls must give equivalent metadata;
     * caching belongs to the reader, not to the parser.
     *
     * Must be self-contained for worker execution.
     * @param entireFileBuffer The full working buffer, not necessarily the source file.
     */
    baseInfo(entireFileBuffer: ArrayBuffer): Promise<ParsedFileBaseInfo>,

    /** 
     * Synchronously create an independently owned buffer for one frame.
     * Keep it as small as the format permits; transferring it must not detach
     * or modify the retained working buffer. Currently called on the main thread.
     *
     * @param entireFileBuffer The full working buffer.
     * @param frameIndex Zero-based integer in `[0, frameCount)`.
     * @returns `array` is the frame subset; `dataType` is an opaque parser-local
     * encoding hint. Pass both unchanged to this same parser's `frameData`.
     * LRC uses its pixel encoding byte; FLIR returns `0` and ignores the hint.
     *
     * @remarks Invalid indices have no shared policy yet. LRC slices according
     * to the supplied index without validation; the later frame read can fail.
     * FLIR ignores the index and always returns its single frame.
     */
    getFrameSubset(entireFileBuffer: ArrayBuffer, frameIndex: number): { array: ArrayBuffer, dataType: number}

    /**
     * Decode the subset returned by this parser's `getFrameSubset`.
     * Must be self-contained for worker execution.
     *
     * @param frameSubset Independently owned frame data, not the full source file.
     * @param dataType Parser-local hint returned together with the subset.
     * @returns Metadata and row-major temperatures for the selected frame.
     */
    frameData(frameSubset: ArrayBuffer, dataType: number): Promise<ParsedFileFrame>,


    /**
     * Copy all frame temperatures from one working buffer into a Float32Array,
     * in frame order and row-major order within each frame. The values must
     * agree with `frameData`, allowing for Float32 rounding.
     * The result must not share storage with the working buffer.
     * Must be self-contained for worker execution.
     *
     * This is the parser's only histogram responsibility. Binning is format
     * independent and done by the shared `histogramFromPixels`, so histograms
     * of one format and of mixed formats follow the same rules.
     *
     * Values that do not represent a temperature (e.g. pixels of an unsupported
     * encoding) must be `NaN`; the shared histogram ignores non-finite values.
     * This is not a general validation guarantee for malformed working buffers.
     */
    histogramPixels( file: ArrayBuffer ): Promise<Float32Array>,

    /**
     * Read one pixel across all frames of the working buffer.
     * Coordinates are zero-based from the top-left: x is column, y is row.
     * For an in-bounds integer point, temperatures must agree with `frameData`.
     * Must be self-contained for worker execution.
     *
     * @returns Temperatures keyed by elapsed milliseconds since the first frame.
     * @remarks No common invalid-coordinate policy has been selected. FLIR
     * returns `NaN` for non-integer or out-of-bounds points. LRC computes a byte
     * offset without coordinate validation, which can read an unintended value
     * or throw `RangeError`.
     */
    pointAnalysisData( file: ArrayBuffer, x: number, y: number ): Promise<PointAnalysisData>,

    /**
     * Calculate rectangular area statistics for every frame of the working buffer.
     * `(x, y)` is the top-left corner in pixel coordinates. Boundaries are
     * inclusive: the area covers x through x + width and y through y + height,
     * so width=height=0 selects one in-bounds pixel.
     *
     * Pixel selection is shared by all parsers:
     * - only integer pixel coordinates are read: columns
     *   `ceil(x)`..`floor(x + width)` and rows `ceil(y)`..`floor(y + height)`;
     * - the selection is clipped to the raster, pixels outside it are ignored
     *   and never cause an error;
     * - an area entirely outside the raster, or one containing no integer
     *   coordinate, selects no pixels and yields the empty statistics
     *   described in `AreaAnalysisData`.
     *
     * Must be self-contained for worker execution.
     *
     * @returns Statistics keyed by elapsed milliseconds since the first frame.
     */
    rectAnalysisData( file: ArrayBuffer, x: number, y: number, width: number, height: number ): Promise<AreaAnalysisData>,

    /**
     * Calculate elliptical area statistics for every frame of the working buffer.
     * `(x, y, width, height)` defines its bounding rectangle in pixel coordinates;
     * the centre is `(x + width / 2, y + height / 2)` and radii are half the extents.
     * Pixels on the ellipse boundary are included.
     *
     * Candidate pixels are selected and clipped exactly as in `rectAnalysisData`;
     * of those, only pixels inside the ellipse contribute. The part of the
     * ellipse outside the raster is therefore ignored.
     *
     * Must be self-contained for worker execution.
     *
     * @returns Statistics keyed by elapsed milliseconds since the first frame.
     * @remarks A zero radius currently selects no pixels because the ellipse
     * test divides by that radius; the result is then the empty statistics.
     * A policy for degenerate ellipses has not been selected yet.
     */
    ellipsisAnalysisData( file: ArrayBuffer, x: number, y: number, width: number, height: number ): Promise<AreaAnalysisData>,

}
