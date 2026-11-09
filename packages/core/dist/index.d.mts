import Pool from "workerpool/types/Pool";
/**
 * Manage callbacks on optional property values. All callbacks are registered with a unique key. This class extends the built-in `Map` class.
 *
 * @module @labirthermal/core
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare class CallbacksManager<CallbackType extends (...args: any[]) => any> extends Map<string, CallbackType> {
  /** An alternative to built-in `set` method enabling one-shot callbacks */
  add(key: string, callback: CallbackType, oneShot?: boolean): void;
  /** Trigger all registered callbacks wuth the provided value(s) */
  call(...args: Parameters<CallbackType>): void;
}
export declare const getPool: () => Promise<Pool>;
/** Timing of one frame in file order. All time values are in milliseconds. */
type ParsedTimelineFrame = {
  /** Zero-based frame index, also used by `IParserObject.getFrameSubset`. */
  index: number;
  /** Frame timestamp as milliseconds since the Unix epoch (UTC). */
  absolute: number;
  /** Elapsed time since the first frame: `absolute - file.timestamp`. */
  relative: number;
  /** Time until the next frame; zero for the last frame. Not a byte offset. */
  offset: number;
};
/**
 * Format-independent metadata for a non-empty thermal image or sequence.
 * Temperatures are in degrees Celsius unless a property explicitly says Kelvin.
 */
type ParsedFileBaseInfo = {
  /** Raster width in pixels, shared by all frames. */
  width: number;
  /** Raster height in pixels, shared by all frames. */
  height: number;
  /** First frame timestamp as milliseconds since the Unix epoch (UTC). */
  timestamp: number;
  /** Number of frames; a still image has one frame. */
  frameCount: number;
  /** Last frame timestamp minus the first, in milliseconds; zero for a still. */
  duration: number;
  /**
   * Current convention: `duration / frameCount`, in milliseconds.
   * This is not the mean of the `frameCount - 1` gaps between frames.
   */
  frameInterval: number;
  /** `1000 / frameInterval`; currently `Infinity` when the interval is zero. */
  fps: number;
  /** Minimum temperature across all frames, in degrees Celsius. */
  min: number;
  /** Maximum temperature across all frames, in degrees Celsius. */
  max: number;
  /** One timing entry per frame, in file order. */
  timeline: ParsedTimelineFrame[];
  /** Arithmetic mean of frame emissivities, dimensionless. */
  averageEmissivity: number;
  /** Arithmetic mean of frame reflected apparent temperatures, in Kelvin. */
  averageReflectedKelvins: number;
  /** Original file size in bytes, not the size of a decoded working buffer. */
  bytesize: number;
};
/** Decoded data of one frame, independent of the source file encoding. */
type ParsedFileFrame = {
  /** Frame timestamp as milliseconds since the Unix epoch (UTC). */
  timestamp: number;
  /** Minimum temperature of the frame, in degrees Celsius. */
  min: number;
  /** Maximum temperature of the frame, in degrees Celsius. */
  max: number;
  /** Frame emissivity, dimensionless. */
  emissivity: number;
  /** Frame reflected apparent temperature, in Kelvin. */
  reflectedKelvins: number;
  /**
   * Temperatures in degrees Celsius, row-major from the top-left corner.
   * Contains `width * height` entries; pixel `(x, y)` is at `y * width + x`.
   */
  pixels: number[];
};
/**
 * Definition of a supported file type
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
type ParserFileType = {
  /** File extension, lowercase and without starting dots */
  extension: string;
  /** MIME type of the original file. The property name is retained for compatibility. */
  minme: string;
};
/** Descriptive device metadata; not used to detect or validate a file. */
type SupportedDeviceType = {
  /** Display name of the device or device family. */
  deviceName: string;
  /** Human-readable description of the device. */
  deviceDescription: string;
  /** Device information URL. */
  deviceUrl: string;
  /** Manufacturer display name. */
  manufacturer: string;
  /** Manufacturer website URL. */
  manufacturerUrl: string;
};
/**
 * Point temperatures in degrees Celsius keyed by elapsed milliseconds since
 * the first frame, not by frame index or absolute timestamp.
 * A still image uses key `0`. Equal relative timestamps share the same key.
 */
type PointAnalysisData = {
  [time: number]: number;
};
/**
 * Area statistics keyed by elapsed milliseconds since the first frame.
 * A still image uses key `0`. Equal relative timestamps share the same key.
 *
 * An empty selection yields `min = Infinity`, `max = -Infinity`,
 * `avg = NaN` and `count = 0`.
 */
type AreaAnalysisData = {
  [time: number]: {
    /** Minimum selected temperature, in degrees Celsius. */
    min: number;
    /** Maximum selected temperature, in degrees Celsius. */
    max: number;
    /** Arithmetic mean of selected temperatures, in degrees Celsius. */
    avg: number;
    /** Number of pixels included in the statistics. */
    count: number;
  };
};
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
interface IParserObject {
  /** Name of the file format */
  name: string;
  /** Description of the file format */
  description: string;
  /** List of supported devices */
  devices: SupportedDeviceType[];
  /** Original file extensions and MIME types for display and file input hints. */
  extensions: ParserFileType[];
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
  is(buffer: ArrayBuffer, url: string): boolean;
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
  prepare?(buffer: ArrayBuffer, url: string): Promise<ArrayBuffer>;
  /**
   * Read format-independent metadata from the working buffer, without
   * returning pixel arrays. Repeat calls must give equivalent metadata;
   * caching belongs to the reader, not to the parser.
   *
   * Must be self-contained for worker execution.
   * @param entireFileBuffer The full working buffer, not necessarily the source file.
   */
  baseInfo(entireFileBuffer: ArrayBuffer): Promise<ParsedFileBaseInfo>;
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
  getFrameSubset(entireFileBuffer: ArrayBuffer, frameIndex: number): {
    array: ArrayBuffer;
    dataType: number;
  };
  /**
   * Decode the subset returned by this parser's `getFrameSubset`.
   * Must be self-contained for worker execution.
   *
   * @param frameSubset Independently owned frame data, not the full source file.
   * @param dataType Parser-local hint returned together with the subset.
   * @returns Metadata and row-major temperatures for the selected frame.
   */
  frameData(frameSubset: ArrayBuffer, dataType: number): Promise<ParsedFileFrame>;
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
  histogramPixels(file: ArrayBuffer): Promise<Float32Array>;
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
  pointAnalysisData(file: ArrayBuffer, x: number, y: number): Promise<PointAnalysisData>;
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
  rectAnalysisData(file: ArrayBuffer, x: number, y: number, width: number, height: number): Promise<AreaAnalysisData>;
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
  ellipsisAnalysisData(file: ArrayBuffer, x: number, y: number, width: number, height: number): Promise<AreaAnalysisData>;
}
type AbstractFilterParameters = {
  key: number;
  text: string;
};
declare abstract class AbstractFilter<T extends AbstractFilterParameters = AbstractFilterParameters> {
  protected _bypass: boolean;
  get bypass(): boolean;
  setBypass(value: boolean): void;
  readonly onBypass: CallbacksManager<(value: boolean) => void>;
  readonly onParameterChanged: CallbacksManager<(parameters: T) => void>;
  protected parameterChanged(): void;
  protected abstract getParameters(): T;
  abstract apply(buffer: ArrayBuffer): Promise<ArrayBuffer>;
}
declare abstract class BaseStructureObject {
  abstract getInstances(): ThermalFileInstance[];
  abstract destroySelfAndBelow(): void;
  abstract removeAllChildren(): void;
  abstract reset(): void;
}
/** Both `ThermalFileReader` and `ThermalFileFailure` share common attributes since they are both results of `FilesService.loadFile()` */
export declare abstract class AbstractFileResult {
  readonly thermalUrl: string;
  readonly visibleUrl?: string | undefined;
  constructor(thermalUrl: string, visibleUrl?: string | undefined);
  abstract isSuccess(): boolean;
}
/** Turn any element into a dropzone! */
export declare class DropinElementListener {
  readonly service: FilesService;
  readonly element: HTMLElement;
  protected _hover: boolean;
  get hover(): boolean;
  readonly onMouseEnter: CallbacksManager<() => void>;
  readonly onMouseLeave: CallbacksManager<() => void>;
  readonly onDrop: CallbacksManager<() => void>;
  readonly onProcessingEnd: CallbacksManager<(results: AbstractFileResult[], event: Event | DragEvent) => void>;
  /** An invissible input element */
  input?: HTMLInputElement;
  protected hydrated: boolean;
  protected multiple: boolean;
  protected bindedEnterListener: DropinElementListener["handleEnter"];
  protected bindedLeaveListener: DropinElementListener["handleLeave"];
  protected bindedDropListener: DropinElementListener["handleDrop"];
  protected bindedInputChangeListener: DropinElementListener["handleInputChange"];
  protected bindedDragoverListener: DropinElementListener["handleDragover"];
  protected bindedClickListener: DropinElementListener["handleClick"];
  protected constructor(service: FilesService, element: HTMLElement, multiple?: boolean);
  static listenOnElement(service: FilesService, element: HTMLElement, multiple?: boolean): DropinElementListener;
  /** Bind all event listeners to the provided element */
  hydrate(): void;
  /** Remove all event listeners from the element */
  dehydrate(): void;
  handleClick(event: PointerEvent): void;
  handleDragover(event: DragEvent): void;
  protected handleFiles(files: File[]): Promise<AbstractFileResult[]>;
  handleDrop(event: DragEvent): Promise<{
    results: AbstractFileResult[];
    event: DragEvent;
  }>;
  handleInputChange(event: Event): Promise<{
    results: AbstractFileResult[];
    event: Event;
  }>;
  handleEnter(): void;
  handleLeave(): void;
  /** Build the internal input */
  protected getInput(): HTMLInputElement;
  openFileDialog(multiple?: boolean): void;
}
/**
 * Internal member of `FilesService`
 * - `FileService` members may listen to resolving of this object
 * - `load()` method effcently handles the fetch and processing of the file
 */
declare class FileRequest {
  protected readonly service: FilesService;
  readonly thermalUrl: string;
  readonly visibleUrl?: string | undefined;
  protected constructor(service: FilesService, thermalUrl: string, visibleUrl?: string | undefined);
  static fromUrl(service: FilesService, thermalUrl: string, visibleUrl?: string): FileRequest;
  /**
   * The request is stored internally, so that multiple calls of `load` will allways result in one single `Promise` - to this one.
   */
  response?: Promise<AbstractFileResult>;
  /**
   * Fetch a file, process the response and return the promise
   * - the promise is stored internally
   * - if the request is already loading/processing, any subsequent calls use the stored promise object
   */
  load(): Promise<AbstractFileResult>;
  /**
   * Process the raw response:
   * - decide if the file exists
   * - assign parser to the file
   * - create the service
   */
  protected processResponse(response: Response): Promise<AbstractFileResult>;
  /**
   * Actions taken on the `AbstractFileResult` object
   * @todo because there are no side effects, this method might appear redundant
   */
  protected pocessTheService(result: AbstractFileResult): AbstractFileResult;
}
/**
 * A singleton instance handling file loading
 */
declare class FilesService {
  readonly manager: ThermalManager;
  get pool(): Pool;
  constructor(manager: ThermalManager);
  /** @deprecated Intended only for tests & other internal purposes */
  static isolatedInstance(pool: Pool, registryName?: string): {
    service: FilesService;
    registry: ThermalRegistry;
  };
  /** Map of pending requests */
  protected readonly requestsByUrl: Map<string, FileRequest>;
  /** Number of currently pending requests */
  get requestsCount(): number;
  /** Is an URL currently pending? */
  fileIsPending(url: string): boolean;
  /** Cache of loaded files */
  protected readonly cacheByUrl: Map<string, AbstractFileResult>;
  /** Number of cached results */
  get cachedServicesCount(): number;
  /** Is the URL already in the cache? */
  fileIsInCache(url: string): boolean;
  /** Process a file obrained from anywhere */
  loadUploadedFile(file: File): Promise<AbstractFileResult>;
  /** Create a dropzone listener on a HTML element */
  handleDropzone(element: HTMLElement, multiple?: boolean): DropinElementListener;
  /** Load a file from URL, eventually using already cached result */
  loadFile(thermalUrl: string, visibleUrl?: string): Promise<AbstractFileResult>;
  /** Load multiple images at once using  */
  loadFiles(files: {
    lrc: string;
    png?: string;
    callback?: (result: AbstractFileResult) => Promise<void>;
  }[]): Promise<AbstractFileResult[]>;
}
/** Definition of a palette containing its name, gradient and pixels value. */
type ThermalPaletteType = {
  /** Actial pixels that shall be ised for drawings of thermograms. */
  pixels: string[];
  /** Human-readable name of the palette. */
  name: string;
  /** A CSS gradient representing the color scale in the UI. */
  gradient: string;
  /** The CSS slug */
  slug: AvailableThermalPalette;
  /** Float array containing color values for WebGL2 texture */
  texturePixels: Float32Array;
};
declare const PALETTES: {
  readonly iron: {
    readonly name: "IRON";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "iron";
  };
  readonly jet: {
    readonly name: "JET";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "jet";
  };
  readonly white_hot: {
    readonly name: "White Hot";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "white_hot";
  };
  readonly black_hot: {
    readonly name: "Black Hot";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "black_hot";
  };
  readonly lava: {
    readonly name: "Lava";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "lava";
  };
  readonly arctic: {
    readonly name: "Arctic";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "arctic";
  };
  readonly rainbow: {
    readonly name: "Rainbow";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "rainbow";
  };
  readonly rainbow_hc: {
    readonly name: "Rainbow HC";
    readonly gradient: string;
    readonly pixels: string[];
    readonly texturePixels: Float32Array<ArrayBufferLike>;
    readonly slug: "rainbow_hc";
  };
};
/** Keys of palettes available in `@labirthermal/core`. */
type AvailableThermalPalette = keyof typeof PALETTES;
/** Palette definitions available in `@labirthermal/core`. */
export declare const ThermalPalettes: Record<AvailableThermalPalette, ThermalPaletteType>;
declare class PaletteDrive extends AbstractProperty<AvailableThermalPalette, ThermalManager> {
  private get availablePalettes();
  /** All the current palette properties should be accessed through this property. */
  get currentPalette(): ThermalPaletteType;
  protected validate(value: AvailableThermalPalette): AvailableThermalPalette;
  /** Any changes to the value should propagate directly to every instance. */
  protected afterSetEffect(): void;
  /** Set a palette value and propagate the change to all instances. */
  setPalette(key: AvailableThermalPalette): void;
  /** Takes any string input and converts it to a valid AvailableThermalPalettes key */
  sanitizeInputKey(input: string | null | undefined): AvailableThermalPalette;
}
/** Codes of errors */
declare enum FileErrors {
  NOT_SPECIFIED = 0,
  FILE_NOT_FOUND = 1,
  MIME_UNSUPPORTED = 2,
  PARSING_ERROR = 3,
  OUT_OF_MEMORY = 4
}
/** The error that is thrown anytime something happens during the loading */
declare class FileLoadingError extends Error {
  readonly code: FileErrors;
  readonly url: string;
  constructor(code: FileErrors, url: string, message?: string);
}
export declare class ThermalFileFailure extends AbstractFileResult {
  readonly code: FileErrors;
  readonly message: string;
  constructor(thermalUrl: string, code: FileErrors, message: string);
  isSuccess(): boolean;
  static fromError(error: FileLoadingError): ThermalFileFailure;
}
/**
 * Handle batch loading of thermal files.
 *
 * This class should be used as a lazy-loaded member of a thermal registry.
 */
declare class BatchLoader {
  readonly registry: ThermalRegistry;
  readonly onBatchStart: CallbacksManager<() => void>;
  readonly onBatchComplete: CallbacksManager<(result: (ThermalFileInstance | ThermalFileFailure)[]) => void>;
  private set;
  get numberOfBatches(): number;
  get currentOpenBatch(): Batch | undefined;
  get hasLoadingBatches(): boolean;
  get numLoadingBatches(): number;
  constructor(registry: ThermalRegistry);
  /**
   * Get an open batch by its ID, creating it if necessary.
   *
   * A batch that already started loading is sealed - a new batch
   * with the same ID is created instead of reusing it.
   */
  getBatchById(id: string): Batch;
  /** Create a new batch and mark the registry as loading. */
  createBatch(id?: string): Batch;
  /**
   * Request a file through a batch
   *
   * If there is an open batch, register the request in it.
   * Else open a new batch.
   *
   * The batch will execute automatically in the next tick.
   */
  request(thermalUrl: string, visibleUrl: string | undefined, group: ThermalGroup, callback: BatchLoadingCallback, id?: string): Batch;
  closeBatch(): void;
  /**
   * This method is called from the inside of a batch object
   * to indicate its completion.
   *
   * Upon completion, the batch object is deleted and if there
   * are no other batches, mark the registry as loaded.
   */
  batchFinished(batch: Batch): void;
}
/** File URLs and an optional instance label for the registry's full-load methods. */
type ThermalFileRequest = {
  thermalUrl: string;
  visibleUrl?: string;
  label?: string;
};
declare class OpacityDrive extends AbstractProperty<number, ThermalRegistry> {
  /** Make sure the value is allways between 0 and 1 */
  protected validate(value: number): number;
  /**
   * Whenever the opacity changes, propagate the value to all instances
   */
  protected afterSetEffect(value: number): void;
  /** Impose an opacity to all instances */
  imposeOpacity(value: number): number;
}
/** Handles group creation and removal */
declare class GroupsState extends AbstractProperty<ThermalGroup[], ThermalRegistry> {
  protected _map: Map<string, ThermalGroup>;
  get map(): Map<string, ThermalGroup>;
  protected validate(value: ThermalGroup[]): ThermalGroup[];
  protected afterSetEffect(value: ThermalGroup[]): void;
  addExistingGroup(group: ThermalGroup): void;
  addOrGetGroup(groupId: string, name?: string, description?: string): ThermalGroup;
  removeGroup(groupId: string): void;
  removeAllGroups(): void;
  forEveryGroup(callback: (group: ThermalGroup) => void): void;
  forEveryInstance(callback: (instance: ThermalFileInstance) => void): void;
}
interface ThermalMinmaxType {
  min: number;
  max: number;
}
type ThermalMinmaxOrUndefined = ThermalMinmaxType | undefined;
/**
 * A common basis for all Minmax properties. The value is always in Celsius.
 */
declare abstract class AbstractMinmaxProperty<Target extends ThermalRegistry | ThermalGroup> extends AbstractProperty<ThermalMinmaxOrUndefined, Target> {
  /** Get the current distance between min and max */
  get distanceInCelsius(): undefined | number;
}
/** The current minmax values aggregated from all groups. The value is always in Celsius. */
declare class MinmaxRegistryProperty extends AbstractMinmaxProperty<ThermalRegistry> {
  protected validate(value: ThermalMinmaxOrUndefined): ThermalMinmaxOrUndefined;
  protected afterSetEffect(): void;
  recalculateFromGroups(): ThermalMinmaxOrUndefined;
  protected _getMinmaxFromAllGroups(groups: ThermalGroup[]): ThermalMinmaxOrUndefined;
}
/** The range should allways contain both properties. The internal value is always in Celsius. */
type ThermalRangeType = {
  from: number;
  to: number;
};
/** The range or undefined. The value is always in Celsius. */
type ThermalRangeOrUndefined = ThermalRangeType | undefined;
/** Handles the thermal range display. Internal value is always stored in Celsius. */
declare class RangeDriver extends AbstractProperty<ThermalRangeOrUndefined, ThermalRegistry> {
  readonly onAutoValueChanged: CallbacksManager<(value: ThermalRangeOrUndefined) => void>;
  private _autoValue;
  get currentRange(): ThermalRangeOrUndefined;
  /**
   * Make sure the range is allways within the minmax values.
   *
   * If this method should work, the value needs to be set before the minmax is calculated.
   */
  protected validate(value: ThermalRangeOrUndefined): ThermalRangeOrUndefined;
  /**
   * Whenever the range changes, propagate the value to all instances
   */
  protected afterSetEffect(value: ThermalRangeOrUndefined): void;
  /**
   * Imposes a range to itself and below
   * - needs to be called before the minmax is calculated!
   * - The value used here needs always to be in Celsius.
   */
  imposeRange(valueInCelsius: ThermalRangeOrUndefined): ThermalRangeOrUndefined;
  /** Sets the range to the current minmax values. The internal value here is always in Celsius. */
  applyMinmax(): void;
  /** Sets the range automatically based on the current histogram. The internal value here is always in Celsius. */
  applyAuto(): void;
  /** The automatically calculated range based on the current histogram. This value is always in Celsius. */
  get autoValue(): ThermalRangeOrUndefined;
  /** Recalculate the internal automatic value based on the current histogram. The internal value is always in Celsius. */
  recalculateAutoValue(): ThermalRangeOrUndefined;
}
/**
 * Stores the file's `ArrayBuffer` and provides all the data for instance
 * - this service is registered in FilesService
 * - the instances are retrieved using `FilesService.loadOneFile`
 */
export declare class ThermalFileReader extends AbstractFileResult {
  readonly service: FilesService;
  readonly parser: IParserObject;
  /** For the purpose of testing we have a unique ID */
  readonly id: number;
  /**
   * Buffers smaller than this run their data jobs directly on the main thread.
   *
   * Workerpool sends buffers through a structured clone which is paid synchronously
   * by the calling thread, plus a roundtrip overhead of the task itself. For small
   * buffers (still images, short sequences) this overhead costs more than the job,
   * while long sequences benefit from offloading the heavy per-pixel computation.
   */
  static readonly WORKER_THRESHOLD_BYTES: number;
  /** In-memory cache of the `baseInfo` request. This request might be expensive in larger files or in Vario Cam files. Because the return value is allways the same, there is no need to make the call repeatedly. */
  protected baseInfoCache?: ParsedFileBaseInfo;
  readonly fileName: string;
  private get pool();
  protected originalBuffer?: ArrayBuffer;
  /** The file exactly as it was loaded, if the parser works with a converted working buffer */
  protected readonly sourceBuffer?: ArrayBuffer;
  protected _buffer: ArrayBuffer;
  /** The working buffer passed to all parser methods */
  get buffer(): ArrayBuffer;
  protected set buffer(value: ArrayBuffer);
  /**
   * The original file content, e.g. for downloads.
   * Differs from `buffer` for formats decoded while loading (FLIR JPEG).
   */
  get fileBuffer(): ArrayBuffer;
  /** MIME type of the original file */
  get fileMimeType(): string;
  constructor(service: FilesService, buffer: ArrayBuffer, parser: IParserObject, thermalUrl: string, visibleUrl?: string, preserveOriginalBuffer?: boolean, sourceBuffer?: ArrayBuffer);
  isSuccess(): boolean;
  /** @todo This method relies on the functionality of filters. */
  protected copyBuffer(buffer: ArrayBuffer): ArrayBuffer;
  /** Read the fundamental data of the file. If this method had been called before, return the cached result. */
  baseInfo(): ReturnType<IParserObject["baseInfo"]>;
  /** Decide whether a job reading the given buffer is worth offloading to the worker pool. */
  protected shouldUseWorker(buffer: ArrayBuffer): boolean;
  /**
   * Before requesting a frame, create a dedicated `ArrayBuffer` containing only the frame's data
   *
   * @remark THIS IS SYNCHRONOUS AND MIGHT BE EXPENSIVE**
   */
  protected getFrameSubset(frameIndex: number): ReturnType<IParserObject["getFrameSubset"]>;
  /** Read a given frame
   * @todo Implement index range check
   */
  frameData(index: number): ReturnType<IParserObject["frameData"]>;
  /**
   *
   * Retrieves the point analysis data at the specified coordinates.
   *
   * Large buffers run in the workerpool, small ones directly on the main thread
   * (see `WORKER_THRESHOLD_BYTES`).
   *
   * @param x The x-coordinate of the point.
   * @param y The y-coordinate of the point.
   * @returns The analysis data for the specified point.
   */
  pointAnalysisData(x: number, y: number): ReturnType<IParserObject["pointAnalysisData"]>;
  /**
   *
   * Retrieves the rectangle analysis data for the specified area.
   *
   * Large buffers run in the workerpool, small ones directly on the main thread
   * (see `WORKER_THRESHOLD_BYTES`).
   *
   * @param x The x-coordinate of the top-left corner of the rectangle.
   * @param y The y-coordinate of the top-left corner of the rectangle.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   * @returns The analysis data for the specified rectangle.
   */
  rectAnalysisData(x: number, y: number, width: number, height: number): ReturnType<IParserObject["rectAnalysisData"]>;
  /**
   *
   * Retrieves the elliptical area analysis data.
   *
   * Large buffers run in the workerpool, small ones directly on the main thread
   * (see `WORKER_THRESHOLD_BYTES`).
   *
   * @param x The x-coordinate of the top-left corner of the bounding rectangle.
   * @param y The y-coordinate of the top-left corner of the bounding rectangle.
   * @param width The width of the bounding rectangle.
   * @param height The height of the bounding rectangle.
   * @returns The analysis data for the specified ellipse.
   */
  ellipsisAnalysisData(x: number, y: number, width: number, height: number): ReturnType<IParserObject["ellipsisAnalysisData"]>;
  /**
   * Recalculates the core array buffer using all available filters.
   *
   * This method does not emit anything - it only changes the array buffer.
   */
  applyFilters(filters: AbstractFilter[]): Promise<ThermalFileReader>;
  createInstance(group: ThermalGroup, doAdd?: boolean): Promise<ThermalFileInstance>;
}
/**
 * Handles the histogram creation and subscription.
 * - should be used only in registries
 */
declare class HistogramState extends AbstractProperty<ThermalStatistics[], ThermalRegistry> {
  protected _resolution: number;
  get resolution(): number;
  /** Map of temperature => countOfPixels in the scaled down resolution @deprecated */
  protected buffer: Map<number, number>;
  /** Total countOfPixels in every image @deprecated */
  protected bufferPixelsCount: number;
  /** @deprecated */
  protected _bufferResolution: number;
  set bufferResolution(value: number);
  get bufferResolution(): number;
  protected _loading: boolean;
  get loading(): boolean;
  protected set loading(value: boolean);
  readonly onCalculationStart: CallbacksManager<() => void>;
  readonly onCalculationEnd: CallbacksManager<(success: boolean) => void>;
  /** Set the historgam resolution
   * - does not recalculate the value!
   * - to recalculate value, call `recalculateWithCurrentSetting`
   *
   * @notice Higher the number, lower the resolution.
   * @deprecated Resolution is calculated in a separate thread, no resolution changes allowed
   */
  setResolution(value: number): void;
  /** If incorrect resolution is being set, set empty array @todo there may be an error in +1*/
  protected validate(value: ThermalStatistics[]): ThermalStatistics[];
  protected afterSetEffect(): void;
  /**
   * Keep the legacy entry point while recalculating the displayed histogram
   * through the shared result cache.
   */
  recalculateHistogramBufferInWorker(): void;
  protected recalculateHistogram(): Promise<void>;
  /**
   * Collect temperatures of every file with its own parser and bin them
   * in one shared range with the shared `histogramFromPixels`.
   */
  protected calculateHistogram(readers: ThermalFileReader[]): Promise<ThermalStatistics[]>;
}
declare class LoadingState extends AbstractProperty<boolean, ThermalRegistry> {
  protected validate(value: boolean): boolean;
  protected afterSetEffect(): void;
  markAsLoading(): void;
  markAsLoaded(): void;
}
type ThermalRegistryOptions = {
  histogramResolution?: number;
};
type BatchLoadingCallback = (result: ThermalFileFailure | ThermalFileInstance) => Promise<void>;
/**
 * The global thermal registry
 * @todo implementing EventTarget
 */
export declare class ThermalRegistry extends BaseStructureObject {
  readonly id: string;
  readonly manager: ThermalManager;
  readonly hash: number;
  constructor(id: string, manager: ThermalManager, options?: ThermalRegistryOptions);
  /** Service */
  get service(): FilesService;
  get pool(): import("workerpool/types/Pool");
  /** Groups are stored in an observable property */
  readonly groups: GroupsState;
  /** Iterator methods */
  forEveryGroup(fn: ((group: ThermalGroup) => void)): void;
  forEveryInstance(fn: (instance: ThermalFileInstance) => void): void;
  /** Full load of the registry with multiple files @deprecated */
  loadFullMultipleFiles(files: {
    [index: string]: ThermalFileRequest[];
  }): Promise<(false | ThermalFileInstance)[][]>;
  /** Load the registry with only one file. @deprecated */
  loadFullOneFile(file: ThermalFileRequest, groupId: string): Promise<ThermalFileInstance | ThermalFileFailure>;
  private _batch?;
  get batch(): BatchLoader;
  /** @deprecated use batch member class instead */
  registerRequest(thermalUrl: string, visibleUrl: undefined | string, group: ThermalGroup, callback: BatchLoadingCallback): void;
  readonly onProcessingStart: CallbacksManager<() => void>;
  readonly onProcessingEnd: CallbacksManager<() => void>;
  /**
   * Actions to take after the registry is loaded
   * - recalculate the minmax of groups
   * - recalculate minmax of registry
   * - impose new minmax as new range
   * - recalculate the histogram
   */
  postLoadedProcessing(): Promise<void>;
  reset(): void;
  removeAllChildren(): void;
  destroySelfAndBelow(): void;
  destroySelfInTheManager(): void;
  /**
   * Observable properties and drives
   */
  /**
   * Opacity property
   */
  readonly opacity: OpacityDrive;
  /**
   * Minmax property
   */
  readonly minmax: MinmaxRegistryProperty;
  /**
   * Loading
   */
  readonly loading: LoadingState;
  /**
   * Range
   */
  readonly range: RangeDriver;
  /**
   * Histogram
   */
  readonly histogram: HistogramState;
  /**
   * Palette
   */
  readonly palette: PaletteDrive;
  readonly filters: FilterContainer;
  getInstances(): ThermalFileInstance[];
}
type ThermalStatistics = {
  from: number;
  to: number;
  percentage: number;
  count: number;
  height: number;
};
/**
 * A single batch object
 *
 * A batch is created from all requests registered in a single tick.
 * The Batch creation and requests registration is handled completely
 * by `BatchLoader.request` method.
 *
 * Internally, this object stores an array of file requests along
 * with all the necessary additional information: the target group
 * and a callback that will be fired AFTER ALL FILES OF THE BATCH ARE LOADED.
 *
 */
export declare class Batch {
  protected readonly loader: BatchLoader;
  readonly id?: string | undefined;
  private _loading;
  get loading(): boolean;
  readonly onResolve: CallbacksManager<(result: (ThermalFileInstance | ThermalFileFailure)[]) => void>;
  /** The current timeout fn that is being overriden by every call of the `request` method */
  private timeout?;
  /** Array of currently queued requests */
  private queue;
  get size(): number;
  protected constructor(loader: BatchLoader, id?: string | undefined);
  static init(loader: BatchLoader, id?: string): Batch;
  static initWithRequest(loader: BatchLoader, thermalUrl: string, visibleUrl: undefined | string, group: ThermalGroup, callback: BatchLoadingCallback): Batch;
  /**
   * Request a thermal file.
   *
   * Every request re-arms a zero timeout, so the batch executes automatically
   * one tick after the last registered request. Calling `close()` skips the
   * waiting and executes the batch immediately.
   *
   * A request arriving after the batch started loading is delegated back to
   * the loader: it joins (or opens) another batch instead of being lost or
   * re-executing this one.
   */
  request(thermalUrl: string, visibleUrl: string | undefined, group: ThermalGroup, callback: BatchLoadingCallback): void;
  /** Seal the batch and execute it immediately instead of waiting for the next tick. */
  close(): void;
  /**
   * Load all queued files, create their instances and resolve the batch.
   *
   * - Every file runs its whole pipeline (fetch → parse → instance) independently,
   *   so a slow download of one file does not delay the processing of the others.
   * - The registry post-processing and the request callbacks run only after
   *   all the files of the batch settle.
   * - The batch always finishes and removes itself from the loader - even when
   *   a file or a callback throws. Otherwise the registry would stay in the
   *   loading state forever.
   */
  private execute;
}
type ThermalGroupGraphData = [string[], ...[Date, ...number[]][]];
type ThermalGraphDefinition = {
  data: ThermalGroupGraphData;
  colors: string[];
};
type ThermalGraphGroupDataOrUndefined = ThermalGraphDefinition | undefined;
declare class AnalysisGroupGraph extends AbstractProperty<ThermalGraphGroupDataOrUndefined, ThermalGroup> {
  static LISTENER_ID: string;
  constructor(parent: ThermalGroup);
  protected timeout?: ReturnType<typeof setTimeout>;
  protected calculateData(): void;
  turnOn(): void;
  turnOff(): void;
  protected validate(value: ThermalGraphGroupDataOrUndefined): ThermalGraphGroupDataOrUndefined;
  protected afterSetEffect(): void;
}
type AnalysisSlotsMap = Map<number, AnalysisSlot>;
/** Say the slot number. True = next free. False = no slot at all */
type SlotInitialisationValue = number | true | false;
/**
 * Create up to 7 slots for analysis of the image.
 *
 * Value of this property is a map.
 */
declare class AnalysisSlotsState extends AbstractProperty<AnalysisSlotsMap, ThermalFileInstance> {
  static readonly MAX_SLOTS = 7;
  /** Callback called every time any slot changes */
  readonly onAnySlotChanged: CallbacksManager<() => void>;
  private _onAnySlotChangedTimeout?;
  /** Mark the status as changed and emit the event in the folowing subsequent tick */
  markAsChanged(): void;
  readonly onSlot1Assignement: CallbacksManager<(slot: AnalysisSlot | undefined) => void>;
  readonly onSlot2Assignement: CallbacksManager<(slot: AnalysisSlot | undefined) => void>;
  readonly onSlot3Assignement: CallbacksManager<(slot: AnalysisSlot | undefined) => void>;
  readonly onSlot4Assignement: CallbacksManager<(slot: AnalysisSlot | undefined) => void>;
  readonly onSlot5Assignement: CallbacksManager<(slot: AnalysisSlot | undefined) => void>;
  readonly onSlot6Assignement: CallbacksManager<(slot: AnalysisSlot | undefined) => void>;
  readonly onSlot7Assignement: CallbacksManager<(slot: AnalysisSlot | undefined) => void>;
  readonly onSlot1Serialize: CallbacksManager<(value: string | undefined) => void>;
  readonly onSlot2Serialize: CallbacksManager<(value: string | undefined) => void>;
  readonly onSlot3Serialize: CallbacksManager<(value: string | undefined) => void>;
  readonly onSlot4Serialize: CallbacksManager<(value: string | undefined) => void>;
  readonly onSlot5Serialize: CallbacksManager<(value: string | undefined) => void>;
  readonly onSlot6Serialize: CallbacksManager<(value: string | undefined) => void>;
  readonly onSlot7Serialize: CallbacksManager<(value: string | undefined) => void>;
  /**
   * Calculate the next free slot number
   */
  getNextFreeSlotNumber(): number | undefined;
  /**
   * Assign an analysis to a given slot number
   */
  assignAnalysisToSlot(slot: number, analysis: AbstractAnalysis): AnalysisSlot;
  /** Does this instance have an analyasis on the given slot number? */
  hasSlot(slot: number): boolean;
  /** Get a slot control object by its number */
  getSlot(slot: number): AnalysisSlot | undefined;
  /**
   * Calculate a full map of slots including empty ones as undefined values
   *
   * The value of this drive contains only assigned slots, therefore this method contains the entire map of slots from 1 to 7. Beware, this operation is expensive since it creates a new map object and should not be used often.
   */
  getFullSlotsMap(): Map<number, AnalysisSlot | undefined>;
  /**
   * Get the number of the slot assigned to a given analysis
   */
  getAnalysisSlot(analysis: AbstractAnalysis): number | undefined;
  /**
   * Completely remove the slot and also the corresponding analysis
   */
  removeSlotAndAnalysis(slot: number): void;
  /**
   * Remove a slot that is assigned to a given analysis, but keep the analysis
   */
  unassignAnalysisFromItsSlot(analysis: AbstractAnalysis): void;
  /**
   * Create an analysis from a serialized state on a given slot
   */
  createAnalysisFromSerialized(serialized: string,
  /** If a slot number is provided, assign the analysis to this particular slot */
  slotNumber?: SlotInitialisationValue): AbstractAnalysis | undefined;
  protected validate(value: AnalysisSlotsMap): AnalysisSlotsMap;
  protected afterSetEffect(): void;
  /**
   * Whenever a slot is assigned, call both particular and general listeners
   */
  private emitOnAssignement;
  /**
   * Get a callback manager that is triggered upon a slot serialisation
   */
  getOnSerializeManager(slot: number): CallbacksManager<(value: string | undefined) => void> | undefined;
  /**
   * Get a callback manager that is triggered whenever a slot is assigned
   */
  private getOnAssignementManager;
  /**
   * Get value of a given slot
   */
  getSlotValue(slot: number): string | undefined;
  /**
   * Call a function on every existing slot skipping empty slots.
   */
  forEveryExistingSlot(fn: (slot: AnalysisSlot, num: number) => void): void;
}
declare enum PointPlacement {
  START = 1,
  MIDDLE = 2,
  END = 3
}
declare abstract class AbstractPoint {
  readonly key: string;
  readonly analysis: AbstractAnalysis;
  get file(): ThermalFileInstance;
  private pxX;
  private _x;
  get x(): number;
  onX: CallbacksManager<(x: number, prev: number) => void>;
  abstract mayMoveToX(value: number): boolean;
  private pxY;
  private _y;
  get y(): number;
  onY: CallbacksManager<(y: number, prev: number) => void>;
  abstract mayMoveToY(value: number): boolean;
  /**
   * Recieves X from the tool.
   *
   * Needs to determine the placement using `analyzeXFromTool`.
   * Calls `sideEffectOnXFromTool`.
   */
  setXFromTool(value: number): void;
  /** Recieves the X directly, along with the placement, with no side effects. */
  setXDirectly(value: number, placement: PointPlacement): void;
  /**
   * Recieves Y from the tool.
   *
   * Needs to determine the placement using `analyzeYFromTool`.
   * Calls `sideEffectOnYFromTool`.
   */
  setYFromTool(value: number): void;
  /** Recieves the Y directly, along with the placement, with no side effects. */
  setYDirectly(value: number, placement: PointPlacement): void;
  /** Format the `left` style from given position and placement */
  private getXStyle;
  private getYStyle;
  /** Convert a percentage and a offset in pixels into a CSS style string */
  private formatPositionStyle;
  protected abstract analyzeXFromTool(value: number): {
    x: number;
    placement: PointPlacement;
  };
  protected abstract sideEffectOnXFromTool(value: number, placement: PointPlacement): void;
  protected abstract analyzeYFromTool(value: number): {
    y: number;
    placement: PointPlacement;
  };
  protected abstract sideEffectOnYFromTool(value: number, placement: PointPlacement): void;
  protected _color: string;
  protected get color(): string;
  setColor(value: string): void;
  protected abstract onSetColor(value: string): void;
  get initialColor(): string;
  get activeColor(): string;
  get inactiveColor(): string;
  protected _active: boolean;
  get active(): boolean;
  protected _isHover: boolean;
  get isHover(): boolean;
  protected _isDragging: boolean;
  get isDragging(): boolean;
  get root(): HTMLDivElement;
  /** Get the size of the point's area in the file's listener layer. The active area serves for emulation of PointerEvents of this point. */
  abstract getRadius(): number;
  /** The container is allways positioned by percents. The container dimension is allways 1x1. The container contains the inner element which handles the display. */
  container: HTMLDivElement;
  /** The display element. */
  innerElement: HTMLDivElement;
  constructor(key: string, top: number, left: number, analysis: AbstractAnalysis, color: string, placementX: PointPlacement, placementY: PointPlacement);
  isWithin(top: number, left: number): boolean;
  isInSelectedLayer(): boolean;
  private calculatePercentageX;
  private calculatePercentageY;
  /** @deprecated */
  protected getPercentageX(): number;
  /** @deprecated */
  protected getPercentageY(): number;
  protected getPercentageCoordinates(): {
    x: number;
    y: number;
  };
  /** Create the display element */
  abstract createInnerElement(): HTMLDivElement;
  mouseEnter(): void;
  mouseLeave(): void;
  readonly onMouseEnter: CallbacksManager<(point: ThisType<AbstractPoint>) => void>;
  readonly onMouseLeave: CallbacksManager<(point: ThisType<AbstractPoint>) => void>;
  readonly onActivate: CallbacksManager<(point: ThisType<AbstractPoint>) => void>;
  readonly onDeactivate: CallbacksManager<(point: ThisType<AbstractPoint>) => void>;
  protected abstract actionOnMouseEnter(): void;
  protected abstract actionOnMouseLeave(): void;
  protected abstract actionOnActivate(): void;
  protected abstract actionOnDeactivate(): void;
  activate(): void;
  deactivate(): void;
}
interface ITool {
  key: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
}
export declare abstract class AbstractTool {
  readonly manager: ThermalManager;
  active: boolean;
  constructor(manager: ThermalManager);
  /** Action taken upon tool activation */
  activate(): void;
  protected abstract onActivate(): void;
  /** Actions taken upon tool deactivation */
  deactivate(): void;
  protected abstract onDeactivate(): void;
  abstract onCanvasClick(x: number, y: number, file: ThermalFileInstance): void;
  abstract onCanvasLeave(file: ThermalFileInstance): void;
  /** Whenever a point is entered by the mouse */
  abstract onPointEnter(point: AbstractPoint): void;
  /** Whenever the mouse leaves the point */
  abstract onPointLeave(point: AbstractPoint): void;
  /** Whenever the point should move to a new position */
  abstract onPointMove(point: AbstractPoint, top: number, left: number): void;
  /** Whenever a point is clicked */
  abstract onPointDown(point: AbstractPoint): void;
  /** Whenever a point is ended clicking */
  abstract onPointUp(point: AbstractPoint): void;
  /** Assamble the cursor label at the given point */
  abstract getLabelValue(x: number, y: number, file: ThermalFileInstance): string;
  protected get unit(): UnitDrive;
  protected getFormattedTemperature(x: number, y: number, file: ThermalFileInstance): string;
}
/** The tool type merging Abstract class and the interface */
type ThermalTool = AbstractTool & ITool & {
  key: string;
};
declare class ToolDrive extends AbstractProperty<ThermalTool, ThermalManager> {
  /** Create own set of tools from the registry of tools */
  protected _tools: {
    [x: string]: ThermalTool;
  };
  /** Readonly list of available tools */
  get tools(): {
    [x: string]: ThermalTool;
  };
  constructor(parent: ThermalManager, initial: ThermalTool);
  protected validate(value: ThermalTool): ThermalTool;
  protected afterSetEffect(value: ThermalTool): void;
  /** Pick a tool. Its activation is handled by the `afterSetEffect` */
  selectTool(tool: ThermalTool | keyof ToolDrive["tools"]): void;
}
/** Access list of points from analysis layers */
declare class AnalysisPointsAccessor {
  readonly drive: AnalysisDrive;
  constructor(drive: AnalysisDrive);
  /** Get all points from all layers */
  get all(): AbstractPoint[];
  /** Get all points from selected layers */
  get allInSelectedLayers(): AbstractPoint[];
  /** Get only active points from selected layers */
  get activeInSelectedLayers(): AbstractPoint[];
  /** Extract points from all provided layers */
  protected extractPointsFromLayers(layers: AbstractAnalysis[], activeOnly?: boolean): AbstractPoint[];
}
declare class AnalysisDrive extends AbstractProperty<AbstractAnalysis[], ThermalFileInstance> {
  readonly layers: AnalysisLayersStorage;
  readonly points: AnalysisPointsAccessor;
  protected listener?: HTMLElement;
  /** Alias of the current `ToolDrive` value. */
  protected get currentTool(): ThermalTool;
  /** Cached listener on `this.listenerLayerContainer` - pointermove event. */
  protected bindedPointerMoveListener?: (event: PointerEvent) => void;
  /** Cached listener on `this.listenerLayerContainer` - pointerdown event. */
  protected bindedPointerDownListener?: (event: PointerEvent) => void;
  /** Cached listener on `this.listenerLayerContainer` - pointerup event. */
  protected bindedPointerUpListener?: (event: PointerEvent) => void;
  /**
   * Value of this drive is stored in `AnalysisLayersStorage` and from there, it is mirrored to the drive.
   * It is better to add listeners to the storage, not to the drive.
   */
  dangerouslySetValueFromStorage(value: AbstractAnalysis[]): void;
  protected validate(value: AbstractAnalysis[]): AbstractAnalysis[];
  protected afterSetEffect(): void;
  /** Calculate the top/left position from a `MouseEvent` */
  private getRelativePosition;
  /**
   * Activate the DOM listeners for the current drive on the file's listener layer.
   */
  activateListeners(container: HTMLDivElement): void;
  /** Remove all listeners from the file's listener layer */
  deactivateListeners(): void;
}
declare abstract class AbstractArea {
  readonly analysis: AbstractAnalysis;
  private pxX;
  private pxY;
  get fileWidth(): number;
  get fileHeight(): number;
  get root(): HTMLDivElement;
  protected element: HTMLDivElement;
  protected _top: number;
  protected _width: number;
  protected _left: number;
  protected _height: number;
  get top(): number;
  set top(value: number);
  get left(): number;
  set left(value: number);
  get height(): number;
  set height(value: number);
  get width(): number;
  set width(value: number);
  get center(): {
    x: number;
    y: number;
  };
  constructor(analysis: AbstractAnalysis, top: number, right: number, left: number, bottom: number);
  build(): void;
  abstract onBuild(): void;
  setColor(value: string): void;
  abstract onSetColor(value: string): void;
}
type GraphDataTypes = PointAnalysisData | AreaAnalysisData;
export declare class AnalysisGraph {
  readonly analysis: AbstractAnalysis;
  constructor(analysis: AbstractAnalysis);
  protected _min: boolean;
  protected _max: boolean;
  protected _avg: boolean;
  get state(): {
    MIN: boolean;
    MAX: boolean;
    AVG: boolean;
  };
  protected _value?: GraphDataTypes;
  get value(): GraphDataTypes | undefined;
  /** The analysis values are derived from the graph data, so they are refreshed before the graph listeners are called. */
  protected set value(value: GraphDataTypes | undefined);
  /** True while a data job is running. Guards the coalescing in `fetchGraphData`. */
  protected _fetching: boolean;
  /** Set when a request arrives while a job runs. The running loop then performs one trailing refetch. */
  protected _refetchRequested: boolean;
  /** The currently running (or last finished) fetch, including its eventual trailing refetches. */
  protected _fetchPromise?: Promise<void>;
  /**
   * Fetch the analysis data from the parser job and store them.
   *
   * Requests are **coalesced**: at most one job runs per analysis at any time.
   * Reading the data means handing the whole working buffer to the parser job
   * (and cloning it when the job runs in the worker pool), so an unthrottled
   * source of requests - typically `onMoveOrResize` firing on every mouse move
   * while dragging - must not start one job per event.
   *
   * - When no job is running, the job starts immediately.
   * - When a job is already running, only a *trailing* refetch is noted and the
   *   in-flight promise is returned. Once the running job finishes, a single
   *   refetch reads the latest geometry, no matter how many requests arrived.
   *
   * The returned promise resolves after the data settle, i.e. after the eventual
   * trailing refetch. Intermediate results are applied as they arrive, so the
   * graph updates progressively even during a long drag.
   */
  protected fetchGraphData(): Promise<void>;
  /**
   * Resolve once the graph data are available.
   *
   * The graph data are fetched asynchronously from the parser jobs whenever the analysis
   * is created, moved or resized. Consumers reading `analysis.min/max/avg` or `graph.value`
   * right after creating an analysis (e.g. exports working on a copied file) must await
   * this method first - otherwise they read the values before the jobs resolve.
   *
   * When a fetch is in flight, the promise resolves after the data settle,
   * including the eventual trailing refetch (see `fetchGraphData`).
   */
  whenData(): Promise<GraphDataTypes | undefined>;
  setMinActivation(active: boolean): void;
  setMaxActivation(active: boolean): void;
  setAvgActivation(active: boolean): void;
  readonly onGraphActivation: CallbacksManager<(min: boolean, max: boolean, avg: boolean) => void>;
  readonly onGraphData: CallbacksManager<(data: GraphDataTypes | undefined, analysis: AbstractAnalysis) => void>;
  readonly onAnalysisSelection: CallbacksManager<(activated: boolean, analysis: AbstractAnalysis) => void>;
  protected emitGraphActivation(): void;
  protected hydrate(): Promise<void>;
  protected getGraphData(): Promise<GraphDataTypes>;
  getGraphColors(): string[];
  getGraphLabels(): string[];
  hasDataToPrint(): boolean;
  getDtaAtTime(timestamp: number): number[];
}
declare abstract class AbstractHandlePoint extends AbstractPoint {
  analysis: AbstractAreaAnalysis;
  constructor(key: string, top: number, left: number, analysis: AbstractAreaAnalysis, color: string, placementX: PointPlacement, placementY: PointPlacement);
  createInnerElement(): HTMLDivElement;
  actionOnMouseEnter(): void;
  actionOnMouseLeave(): void;
}
declare class CornerPoint extends AbstractHandlePoint {
  protected _pairX: CornerPoint;
  protected _pairY: CornerPoint;
  get pairX(): CornerPoint;
  get pairY(): CornerPoint;
  setPairX(point: CornerPoint): void;
  setPairY(point: CornerPoint): void;
  getRadius(): number;
  mayMoveToX(value: number): boolean;
  mayMoveToY(value: number): boolean;
  private getCenterX;
  private getCenterY;
  get isLeftSide(): boolean;
  get isTopSide(): boolean;
  get isRightSide(): boolean;
  get isBottomSide(): boolean;
  protected analyzeXFromTool(value: number): {
    x: number;
    placement: PointPlacement;
  };
  protected analyzeYFromTool(value: number): {
    y: number;
    placement: PointPlacement;
  };
  protected sideEffectOnXFromTool(value: number, placement: PointPlacement): void;
  protected sideEffectOnYFromTool(value: number, placement: PointPlacement): void;
  isMoving: boolean;
  protected onSetColor(value: string): void;
  protected actionOnActivate(): void;
  protected actionOnDeactivate(): void;
}
declare class RectangleArea extends AbstractArea {
  onBuild(): void;
  onSetColor(value: string): void;
}
export declare abstract class AbstractAreaAnalysis extends AbstractAnalysis {
  points: Map<string, CornerPoint>;
  protected readonly wPx: string;
  protected readonly hPx: string;
  readonly tl: CornerPoint;
  readonly tr: CornerPoint;
  readonly bl: CornerPoint;
  readonly br: CornerPoint;
  readonly area: RectangleArea;
  protected _graph: AnalysisGraph | undefined;
  get graph(): AnalysisGraph;
  isWithin(x: number, y: number): boolean;
  protected abstract buildArea(left: number, top: number, width?: number, height?: number): AbstractArea;
  static calculateDimensionsFromCorners(top: number, left: number, right: number, bottom: number): {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  protected constructor(key: string, color: string, file: ThermalFileInstance, top: number, left: number, width?: number, height?: number);
  setColorCallback(value: string): void;
  protected calculateBounds(): void;
  protected addPoint(role: string, top: number, left: number, placementX: PointPlacement, placementY: PointPlacement): CornerPoint;
  protected validateWidth(value: number): number;
  protected validateHeight(value: number): number;
  protected onSetLeft(validatedValue: number): void;
  protected onSetTop(validatedValue: number): void;
  protected onSetWidth(validatedValue: number): void;
  protected onSetHeight(validatedValue: number): void;
  protected getVerticalDimensionFromNewValue(value: number, preferredSide: "top" | "bottom"): {
    top: number;
    bottom: number;
    height: number;
  };
  protected getHorizontalDimensionsFromNewValue(value: number, preferredSide: "left" | "right"): {
    left: number;
    right: number;
    width: number;
  };
  get leftSidePoints(): CornerPoint[];
  get rightSidePoints(): CornerPoint[];
  get topSidePoints(): CornerPoint[];
  get bottomSidePoints(): CornerPoint[];
  protected forPoints(points: CornerPoint[], fn: (point: CornerPoint) => void): void;
  recievedSerialized(input: string): void;
  toSerialized(): string;
}
export declare class EllipsisAnalysis extends AbstractAreaAnalysis {
  getType(): string;
  static startAddingAtPoint(key: string, color: string, file: ThermalFileInstance, top: number, left: number): EllipsisAnalysis;
  static build(key: string, color: string, file: ThermalFileInstance, _top: number, _left: number, _right: number, _bottom: number): EllipsisAnalysis;
  protected buildArea(x: number, y: number, width?: number, height?: number): AbstractArea;
  isWithin(x: number, y: number): boolean;
  getAnalysisData(): Promise<AreaAnalysisData>;
}
declare class PointPoint extends AbstractPoint {
  static size: number;
  static sizePx(aspect?: number): string;
  protected axisX?: HTMLDivElement;
  protected axisY?: HTMLDivElement;
  protected center?: HTMLDivElement;
  protected analyzeXFromTool(value: number): {
    x: number;
    placement: PointPlacement;
  };
  protected analyzeYFromTool(value: number): {
    y: number;
    placement: PointPlacement;
  };
  protected sideEffectOnXFromTool(): void;
  protected sideEffectOnYFromTool(): void;
  constructor(key: string, top: number, left: number, analysis: AbstractAnalysis, color: string);
  mayMoveToX(value: number): boolean;
  mayMoveToY(value: number): boolean;
  createInnerElement(): HTMLDivElement;
  protected buildAxisX(): HTMLDivElement;
  protected buildAxisY(): HTMLDivElement;
  protected buildCenter(): HTMLDivElement;
  protected onSetColor(value: string): void;
  protected actionOnMouseEnter(): void;
  protected actionOnMouseLeave(): void;
  protected actionOnActivate(): void;
  protected actionOnDeactivate(): void;
  getRadius(): number;
  protected setBoxShadow(color?: string | undefined): void;
}
export declare class PointAnalysis extends AbstractAnalysis {
  getType(): string;
  readonly center: PointPoint;
  protected _graph: AnalysisGraph | undefined;
  get graph(): AnalysisGraph;
  static addAtPoint(key: string, color: string, file: ThermalFileInstance, top: number, left: number): PointAnalysis;
  protected constructor(key: string, color: string, file: ThermalFileInstance, top: number, left: number);
  setColorCallback(value: string): void;
  isWithin(x: number, y: number): boolean;
  getAnalysisData(): Promise<PointAnalysisData>;
  protected validateWidth(): number;
  protected validateHeight(): number;
  protected onSetLeft(validatedValue: number): void;
  protected onSetTop(validatedValue: number): void;
  onSetWidth(): void;
  onSetHeight(): void;
  protected getVerticalDimensionFromNewValue(value: number): {
    top: number;
    height: number;
    bottom: number;
  };
  protected getHorizontalDimensionsFromNewValue(value: number): {
    left: number;
    right: number;
    width: number;
  };
  recievedSerialized(input: string): void;
  toSerialized(): string;
}
export declare class RectangleAnalysis extends AbstractAreaAnalysis {
  getType(): string;
  static startAddingAtPoint(key: string, color: string, file: ThermalFileInstance, top: number, left: number): RectangleAnalysis;
  static build(key: string, color: string, file: ThermalFileInstance, _top: number, _left: number, _right: number, _bottom: number): RectangleAnalysis;
  protected buildArea(x: number, y: number, width?: number, height?: number): AbstractArea;
  getAnalysisData(): Promise<AreaAnalysisData>;
}
/** What kind of change occured with the given analysis? */
declare enum AnalysisSerializableChangeType {
  /** The analysis was added */
  ADD = 0,
  /** The analysis was removed */
  REMOVE = 1,
  /** The analysis was resized or moved */
  RESIZEMOVE = 2,
  /** Other properties of the analysis were changed */
  PROPERTIESCHANGE = 3,
  /** Graph visibility changes */
  GRAPH = 4
}
type AnalysisAddedCallback = (analysis: AbstractAnalysis, layers: AbstractAnalysis[]) => void;
type AnalysisRemovedCallback = (key: string) => void;
type SelectionChangeEvent = (selectedAnalysis: AbstractAnalysis[]) => void;
type AnySerializableChangeCallback = (analysis: AbstractAnalysis, change: AnalysisSerializableChangeType) => void;
declare class AnalysisLayersStorage extends Map<string, AbstractAnalysis> {
  readonly drive: AnalysisDrive;
  /** Array of all layers ordered from oldest to the newest */
  protected layers: Array<AbstractAnalysis>;
  /** Get the slots driver */
  protected get slots(): AnalysisSlotsState;
  /** Array of all analysis ordered from the oldest to the newest. */
  get all(): AbstractAnalysis[];
  /** Array of all active analysis ordered from the oldest to the newest. */
  get selectedOnly(): AbstractAnalysis[];
  /** Fired whenever an analysis is added @deprecated */
  readonly onAdd: CallbacksManager<AnalysisAddedCallback>;
  /** Fired whenever an analysis is removed @deprecated */
  readonly onRemove: CallbacksManager<AnalysisRemovedCallback>;
  /** Fired whenever the selection list changes */
  readonly onSelectionChange: CallbacksManager<SelectionChangeEvent>;
  /** Fired whenever a serialisable change occurs:
   * - added
   * - removed
   * - moved/resized
   * - updated
   */
  readonly onAnySerializableChange: CallbacksManager<AnySerializableChangeCallback>;
  /** Array of available colors */
  readonly colors: string[];
  constructor(drive: AnalysisDrive);
  /**
   * Internal method for adding analyses
   * - adds it locally
   * - assign its slot if needed
   * - update the layers container
   * - call the analysis add function
   */
  private addAnalysis;
  /**
   * Removes an analysis by its key
   * - removes the assigned slot
   * - updates the layers container
   * - call the analysis remove function
   */
  removeAnalysis(key: string): void;
  /** This is the proper way to remove all analyses */
  removeAllAnalyses(): void;
  /**
   * Create a rectangular analysis in the given position and start editing it.
   */
  createRectFrom(top: number, left: number): RectangleAnalysis;
  /**
   * Place an ellyptical analysis at the given position, providing optionally its color & slot number
   */
  placeRectAt(name: string, top: number, left: number, right: number, bottom: number, color?: string, slotNumber?: SlotInitialisationValue): RectangleAnalysis;
  /**
   * Create an ellyptical analysis in the given position and start editing it
   */
  createEllipsisFrom(top: number, left: number): EllipsisAnalysis;
  /**
   * Build an ellyptical analysis at the given position.
   */
  placeEllipsisAt(name: string, top: number, left: number, right: number, bottom: number, color?: string, slotNumber?: SlotInitialisationValue): EllipsisAnalysis;
  /**
   * Create a new point analysis at the given position
   * @returns
   */
  createPointAt(top: number, left: number): PointAnalysis;
  /**
   * Build a point analysis at the given position, providing optionally its color & slot number
   */
  placePointAt(name: string, top: number, left: number, color?: string, slotNumber?: SlotInitialisationValue): PointAnalysis;
  /**
   * Mark all analyses as selected
   */
  selectAll(): void;
  /**
   * Mark all analyses as deselected
   */
  deselectAll(): void;
  /** Get color for the next analysis */
  private getNextColor;
  /** Get name for the next analysis. The number is the lowest one not occupied by an existing analysis of the same type. */
  private getNextName;
}
type AnalysisEvent = (analysis: AbstractAnalysis) => void;
export declare abstract class AbstractAnalysis {
  readonly key: string;
  readonly file: ThermalFileInstance;
  /** Return a string representing the type of the analysis */
  abstract getType(): string;
  private static LISTENER_PROMOTE_PROPERTIES_CHANGE;
  private static LISTENER_PROMOTE_MOVE_RESIZE;
  private static SERIALISABLE_CHANGES;
  private static VALID_ANALYSIS_TYPES;
  static readonly COLOR_ACTIVE = "yellow";
  static readonly COLOR_INACTIVE = "black";
  private _ready;
  /** Indicating whether the analysis in the state of its creation (by the user's mouse) or if it is already finalised. */
  get ready(): boolean;
  /** Mark the analysis as ready (finalised) */
  setReady(): void;
  /** The main DOM element of this analysis. Is placed in `this.renderRoot` */
  readonly layerRoot: HTMLDivElement;
  /** Alias of the file's canvasLayer root. The analysis DOM will be placed here. */
  get renderRoot(): HTMLElement;
  /**
   * Map of the analysis control points
   * - key is the role of the point
   * - value is the point instance
   */
  readonly points: Map<string, AbstractPoint>;
  /** Create a new array containing all the points */
  get arrayOfPoints(): AbstractPoint[];
  /** Create a new array containing all the active points */
  get arrayOfActivePoints(): AbstractPoint[];
  /** Access all the file's analysis layers object. */
  get layers(): AnalysisLayersStorage;
  /** Accessor to the related graph control node */
  abstract get graph(): AnalysisGraph;
  /** Selection status */
  protected _selected: boolean;
  get selected(): boolean;
  readonly onSelected: CallbacksManager<AnalysisEvent>;
  readonly onDeselected: CallbacksManager<AnalysisEvent>;
  /**
   * Actions taken on any change that should trigger serialisation:
   * - modification of position or dimensions
   * - change of name or color
   */
  readonly onSerializableChange: CallbacksManager<(analysis: AbstractAnalysis, change: string) => void>;
  /** Actions taken when the value changes. Called internally by `this.recalculateValues()` */
  readonly onValues: CallbacksManager<(min?: number, max?: number, avg?: number) => void>;
  /** Actions taken when the analysis moves or resizes anyhow. This is very much important and it is called from the edit tool. */
  readonly onMoveOrResize: CallbacksManager<(analysis: AbstractAnalysis) => void>;
  /** Actions taken whenever the initial color changes. */
  readonly onSetInitialColor: CallbacksManager<(value: string) => void>;
  /** Actions taken whenever the color changes. */
  readonly onSetColor: CallbacksManager<(value: string) => void>;
  /** Actions taken whenever the name changes. */
  readonly onSetName: CallbacksManager<(value: string) => void>;
  protected _min?: number;
  protected _max?: number;
  protected _avg?: number;
  /** The current minimal value of this analysis */
  get min(): number | undefined;
  /** The current maximal value of this analysis */
  get max(): number | undefined;
  /** The current avarage value of this analysis */
  get avg(): number | undefined;
  protected _top: number;
  protected _left: number;
  protected _width: number;
  protected _height: number;
  get left(): number;
  get top(): number;
  /** This dimension does not count the last pixel. */
  get width(): number;
  /** This dimension does not count the last pixel. */
  get height(): number;
  get right(): number;
  get bottom(): number;
  protected abstract onSetTop(validatedValue: number): void;
  protected abstract onSetLeft(validatedValue: number): void;
  protected abstract onSetWidth(validatedValue: number): void;
  protected abstract onSetHeight(validatedValue: number): void;
  protected abstract validateWidth(value: number): number;
  protected abstract validateHeight(value: number): number;
  protected abstract getVerticalDimensionFromNewValue(bottom: number, preferredSide: "top" | "bottom"): {
    top: number;
    bottom: number;
    height: number;
  };
  protected abstract getHorizontalDimensionsFromNewValue(value: number, preferredSide: "left" | "right"): {
    left: number;
    right: number;
    width: number;
  };
  setTop(value: number): void;
  setLeft(value: number): void;
  setWidth(value: number): void;
  setHeight(value: number): void;
  setBottom(value: number): void;
  setRight(value: number): void;
  protected _color: string;
  get color(): string;
  setColor(value: string): void;
  protected abstract setColorCallback(value: string): void;
  protected _initialColor: string;
  get initialColor(): string;
  setInitialColor(value: string): void;
  readonly nameInitial: string;
  protected _name: string;
  get name(): string;
  setName(value: string): void;
  constructor(key: string, file: ThermalFileInstance, initialColor: string);
  /** Recieved a serialized representation of the analysis, parse it and change the internal state accordingly */
  abstract recievedSerialized(input: string): void;
  /** Convert the internal state of an analysis to a serialized representation */
  abstract toSerialized(): string;
  /**
   * Performs the basic validation of a serialised input string
   * - correct number of segments?
   * - correct type of analysis?
   * - the type matches this analysis instance?
   */
  serializedIsValid(input: string): boolean;
  /** When parsing incoming serialized attribute, look if segments have an exact value */
  static serializedSegmentsHasExact(segments: string[], lookup: string): boolean;
  /** When parsing incooming serialized attribute, try to extract it by its key as string */
  static serializedGetStringValueByKey(segments: string[], key: string): string | undefined;
  /** When parsing incooming serialized attribute, try to extract it by its key as number */
  static serializedGetNumericalValueByKey(segments: string[], key: string): number | undefined;
  /**
   * Remove the analysis from the file and from the DOM
   * - removes from the DOM
   * - DOES NOT REMOVE THE SLOT
   * - DOES NOT REMOVE FROM THE STORAGE
   * @internal Does not remove from broader context, so do not call this method from aywhere else than from the layers storage
   */
  destroyDom(): void;
  /**
   * Mark the analysis as selected
   * => inable its listeners
   * => change the color of its controls to its current color
   */
  setSelected(exclusive?: boolean, emitGlobalEvent?: boolean): void;
  /**
   * Mark the analysis as deselected
   * => disable its listeners
   * => change the color to inactive
   */
  setDeselected(emitGlobalEvent?: boolean): void;
  /** Detect whether a coordinate is withing the analysis. */
  abstract isWithin(x: number, y: number): boolean;
  /**
   * Refresh the analysis' values for the current frame from the graph data computed by the parser jobs.
   * The graph and the values therefore always share one source. Until the jobs resolve, the last known data are used.
   */
  recalculateValues(): void;
  /** Read the values of the current frame from the graph data. Non-finite values (empty selection, invalid point) become `undefined`. */
  protected getValuesFromGraphData(): {
    min?: number;
    max?: number;
    avg?: number;
  };
  /** Override this method to get proper analysis data. */
  abstract getAnalysisData(): Promise<PointAnalysisData | AreaAnalysisData>;
}
/**
 * Analysis slot takes care of serialisation
 *
 * Slot is an independent object that applies on the first 7 analysis.
 * All the serialisation is perfoemed here. An analysis does not know
 * about its slots at all.
 *
 * One analysis may be in one slot only. Never in two slots.
 */
declare class AnalysisSlot {
  readonly slot: number;
  private _analysis;
  get analysis(): AbstractAnalysis;
  private _serialized;
  get serialized(): string;
  /** @deprecated Serialisation is emitted by the driver. This emitter is used mainly in tests, but not elsewhere. */
  readonly onSerialize: CallbacksManager<(serializedValue: string, analysis: AbstractAnalysis) => void>;
  /** Serialisation is done in the next tick */
  protected enqueuedSerialisation?: ReturnType<typeof setTimeout>;
  constructor(slot: number, analysis: AbstractAnalysis);
  /** Generate the listener key for this slot */
  private listenerKey;
  /** Remove all listeners created by this slot */
  private dehydrate;
  /** Add all listeners to the analysis object */
  private hydrate;
  protected enqueueSerialisation(): void;
  protected serialize(): void;
  recieveSerialized(serialized: string): void;
  /** Call global and particular callbacks */
  protected propagateSerialisationUp(value: string | undefined): void;
}
type ExportHeaderEntryType = {
  key: string;
  displayLabel: string;
};
type ExportHeaderType = ExportHeaderEntryType[];
declare class GroupExportCSV {
  readonly drive: AnalysisSyncDrive;
  constructor(drive: AnalysisSyncDrive);
  /** The unit drive of the manager context. Used to convert exported values to the current thermal unit. */
  protected get unit(): UnitDrive;
  protected formatAnalysisDisplayName(analysis: AbstractAnalysis, scope?: string): string;
  protected formatAnalysisKey(analysis: AbstractAnalysis, scope?: string): string;
  protected formatFrameSlotValue(slot: AnalysisSlot, scope?: "min" | "max" | "avg"): {
    key: string;
    value: string;
  };
  /** Assamble the export header and data */
  protected getData(): {
    header: ExportHeaderType;
    data: {
      [index: string]: string | number;
    }[];
  };
  downloadAsCsv(): void;
}
type AbstractExportProps = {
  fileName?: string;
  width?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  showAnalysis?: boolean;
  showFileName?: boolean;
  showFileDate?: boolean;
  showThermalScale?: boolean;
  author?: string;
  license?: string;
};
type AbstractExportTypeMandatory = {
  fileName: string;
  width: number;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  showAnalysis: boolean;
  showFileName: boolean;
  showFileDate: boolean;
  showThermalScale: boolean;
  author?: string;
  license?: string;
};
declare abstract class AbstractPngExport<O extends AbstractExportProps, M extends AbstractExportTypeMandatory> {
  static FONT_SIZE_NORMAL: string;
  static FONT_SIZE_SMALL: string;
  static COLOR_BASE: string;
  static COLOR_GRAY: string;
  static COLOR_LIGHT: string;
  static WIDTH: string;
  static FONT_FAMILY: string;
  static GAP_BASE: string;
  static GAP_SMALL: string;
  static DEBUG: boolean;
  protected wrapper?: HTMLDivElement;
  protected container?: HTMLDivElement;
  private _exporting;
  get exporting(): boolean;
  readonly onExportingStatusChange: CallbacksManager<(status: boolean) => void>;
  /**
   * Indicate the exporting status. Internal method only!
   */
  private setExporting;
  /**
   * A helper function creating a DIV with default styles
   */
  protected createElementWithText<E extends HTMLElement>(element: string, text: string, fontSize?: string, fontWeight?: CSSStyleDeclaration["fontWeight"], color?: string): E;
  private buildWrapper;
  private buildContainer;
  /** Actions taken before the wrapper element is removed */
  protected abstract beforeDomRemoved(): void;
  /** Actions taken before the wrapper element is removed */
  protected abstract afterDomRemoved(): void;
  private clear;
  /** Action taken after the wrapper and container are built */
  protected abstract onBuildDom(params: M): void;
  /** Create the core DOM and append it to body */
  private buildDom;
  /**
   * Get final parameters from optional provided parameters
   */
  protected abstract getFinalParams(params?: O): M;
  /**
   * Make sure the file name has a valid extension
   */
  private makeSureFileNameIsValid;
  /**
   * This is the main method that shall create all the logic, append it to DOM and trigger a download via setTimeout. The download itself needs to be done through `this.downloadImage`.
   */
  protected abstract onDownload(params: M): void;
  downloadPng(params?: O): Promise<void>;
  /** A unified way to download an image */
  protected downloadImage(fileName: string, container: HTMLDivElement): void;
  buildHorizontalScale(element: HTMLDivElement, min: number, max: number, from: number, to: number, gradient: string, bgColor: string, text: string, highlight?: {
    from: number;
    to: number;
  }): HTMLDivElement;
}
type GroupExportPNGParams = AbstractExportProps & {
  columns?: number;
  showGroupName?: boolean;
  label?: string;
};
type GroupExportPNGParamsMandatory = AbstractExportTypeMandatory & {
  columns: number;
  showGroupName: boolean;
  label?: string;
};
declare class GroupExportPNG extends AbstractPngExport<GroupExportPNGParams, GroupExportPNGParamsMandatory> {
  readonly drive: AnalysisSyncDrive;
  static DEFAULT_PROPS: GroupExportPNGParamsMandatory;
  /** Alias to the group this exporter is attached to */
  protected get group(): ThermalGroup;
  /** Temporary local group is used to build a mirror of images. */
  protected localGroup?: ThermalGroup;
  /** The header element with title, description and other stuff */
  protected header?: HTMLDivElement;
  /** Images are mounted to this DIV */
  protected list?: HTMLDivElement;
  constructor(drive: AnalysisSyncDrive);
  /** @deprecated not needed anymore */
  protected buildHeader(): HTMLDivElement;
  protected buildList(): HTMLDivElement;
  protected buildInstance(instance: ThermalFileInstance, width: number, showAnalysis: boolean, showFileDate: boolean, showFileName: boolean, fontSize: string): Promise<void>;
  protected onBuildDom(): void;
  protected beforeDomRemoved(): void;
  protected afterDomRemoved(): void;
  protected onDownload(params: GroupExportPNGParamsMandatory): void;
  /**
   * Take provided parameters and combine them with defaults and add filename.
   */
  protected getFinalParams(params?: GroupExportPNGParams): GroupExportPNGParamsMandatory;
}
declare class AnalysisSyncDrive extends AbstractProperty<boolean, ThermalGroup> {
  static readonly LISTENER_KEY = "__analysis__sync";
  /** Event that is triggered every time a slot is synchronised & serialised */
  readonly onSlotSync: CallbacksManager<(serialized: string | undefined, slot: number) => void>;
  protected _currentPointer?: ThermalFileInstance;
  /** The synchronisation happens every time on the basis of one instance that projects its analyses to other instances in the group. The currentPointer should be set often times - by user events such as hover, click etc.. */
  get currentPointer(): ThermalFileInstance | undefined;
  protected _csv?: GroupExportCSV;
  /** Lazy loaded CSV export object. */
  get csv(): GroupExportCSV;
  protected _png?: GroupExportPNG;
  /** Lazy loaded PNG export object. */
  get png(): GroupExportPNG;
  protected validate(value: boolean): boolean;
  protected afterSetEffect(): void;
  /**
   * Enable analysis synchronisation for the group
   */
  turnOn(instance: ThermalFileInstance): void;
  /**
   * Disable the synchronisation analysis for the group
   */
  turnOff(): void;
  /**
   * Iterate  over all exsting slot in the current pointer instance
   */
  forEveryExistingSlot(fn: (slot: AnalysisSlot, num: number) => void): void;
  /**
   * Set a given instance as the current ponter for synchronisation
   */
  setCurrentPointer(instance?: ThermalFileInstance): void;
  private getSlotListeners;
  /**
   * Interrnal method to start synchronisation of a given slot number on the given instance
   */
  private startSyncingSlot;
  /**
   * Internal method to end synchronisation of a given slot number on the given instance
   */
  private endSyncingSlot;
  /**
   * Deletes a slot and analysis from all instances in the group except the provided one
   */
  deleteSlot(instance: ThermalFileInstance, slotNumber: number): void;
  /**
   * A method for synchronising selection state across all instances of the group
   */
  setSlotSelected(instance: ThermalFileInstance, slotNumber: number): void;
  /**
   * A method for synchronising selection state across all instances of the group
   */
  setSlotDeselected(instance: ThermalFileInstance, slotNumber: number): void;
  /**
   * Execute a given function on all files slot
   */
  private forEveryOtherSlot;
  /**
   * Recieve a serialised value from somewhere and propagate it to all instances in the group except the current pointer
   * @deprecated Used only by old webcomponents and perhaps unnecessary
   */
  recieveSlotSerialized(serialized: string | undefined, slot: number): void;
  /**
   * Take an instance and copy its value in one slot to all other instances in the group
   *
   * - this action deletes any existing slots in the affected instances and creates new ones from the serialised data
   */
  copyOneSlotToAllInstances(instance: ThermalFileInstance, slotNumber: number): void;
  /**
   * Copy the entire analysis state from one instance to all other instances in the group
   *
   * - this action deletes any existing slots in the affected instances and creates new ones from the serialised data
   */
  copyAllSlotsToAllInstances(instance: ThermalFileInstance): void;
}
/** The cursor position coordinates */
type ThermalCursorPosition = {
  x: number;
  y: number;
};
/** The cursor position coordinates or undefined */
type ThermalCursorPositionOrUndefined = ThermalCursorPosition | undefined;
/** Handles cursor position */
declare class CursorPositionDrive extends AbstractProperty<ThermalCursorPositionOrUndefined, ThermalGroup> {
  protected _hover: boolean;
  get hover(): boolean;
  protected validate(value: ThermalCursorPositionOrUndefined): ThermalCursorPositionOrUndefined;
  protected afterSetEffect(value: ThermalCursorPositionOrUndefined): void;
  recieveCursorPosition(position: ThermalCursorPositionOrUndefined): void;
}
declare class FilesState extends AbstractProperty<ThermalFileInstance[], ThermalGroup> {
  protected _map: Map<string, ThermalFileInstance>;
  get map(): Map<string, ThermalFileInstance>;
  protected validate(value: ThermalFileInstance[]): ThermalFileInstance[];
  /** Array of all files sorted by timestamp from the earliest to the latest. */
  get sortedFiles(): ThermalFileInstance[];
  /**
   * Whenever the instances change, recreate the index
   */
  protected afterSetEffect(value: ThermalFileInstance[]): void;
  addFile(file: ThermalFileInstance): ThermalFileInstance;
  removeFile(file: string | ThermalFileInstance): void;
  /**
   * Removal
   */
  removeAllInstances(): void;
  /**
   * Iteration through all instances
   */
  forEveryInstance(fn: ((instance: ThermalFileInstance) => void)): void;
  downloadAllFiles(): void;
  batchCreateInstances(readers: ThermalFileReader[], doReplaceExisting?: boolean): Promise<void>;
}
/** The min and max values of the current group. The value is always in Celsius. */
declare class MinmaxGroupProperty extends AbstractMinmaxProperty<ThermalGroup> {
  protected validate(value: ThermalMinmaxOrUndefined): ThermalMinmaxOrUndefined;
  protected afterSetEffect(): void;
  /** Call this method once all instances are created */
  recalculateFromInstances(): ThermalMinmaxOrUndefined;
  protected _getMinmaxFromInstances(): ThermalMinmaxOrUndefined;
}
/**
 * Control coordinated playback of files within a group.
 *
 * The value is actual time in relative MS (from start, to the end of the latest sequence).
 *
 * This functionality depends on batch analysis of all group files.
 *
 * @todo Group should have its own loading method for batch processing. This method should provide its own callbacks.
 */
declare class GroupPlayback extends AbstractProperty<number, ThermalGroup> {
  protected _hasAnyPlayback: boolean;
  /** Does this group include any sequence? */
  get hasAnyPlayback(): boolean;
  protected set hasAnyPlayback(value: boolean);
  readonly onHasAnyCallback: CallbacksManager<(value: boolean) => void>;
  protected recalculateHasAnyPlayback(instances: ThermalFileInstance[]): void;
  protected _playing: boolean;
  get playing(): boolean;
  protected set playing(value: boolean);
  readonly onPlayingStatusChange: CallbacksManager<(value: boolean) => void>;
  /** Internal pointer holding the current loop iteration*/
  protected loopStep: number;
  /** Internal setTimeout for playback. */
  protected loopTimer?: ReturnType<typeof setTimeout>;
  protected _loopInterval: number;
  /** Interval upon which the main loop triggers. In MS. */
  get loopInterval(): number;
  /** @deprecated The playback interval should not change during playback */
  setLoopInterval(value: number): void;
  /** @deprecated The loop playback should not change during playback */
  readonly onLoopIntervalChanged: CallbacksManager<(value: number) => void>;
  protected _duration: number;
  get duration(): number;
  protected set duration(value: number);
  readonly onDurationChanged: CallbacksManager<(value: number | undefined) => void>;
  protected recalculateDuration(instances: ThermalFileInstance[]): void;
  protected UUID: string;
  constructor(parent: ThermalGroup, initial: number);
  protected validate(value: number): number;
  protected afterSetEffect(value: number): void;
  /** Set time value by percent. The actual MS is calculated depending on the duration. */
  setValueByPercent(percent: number): void;
  /** Set the time value by MS. */
  setValueByRelativeMs(relativeMs: number): void;
  /** Convert percent value to relative time in MS */
  protected percentToMs(percent: number): number;
  /** Convert relative time in MS to percent value */
  protected msToPercent(ms: number): number;
  /**
   * The main method that shall create a timer leading to the next step.
   *
   * It might be called recursively to ensure fluent playback.
   */
  protected createTimerStep(recursive?: boolean): void;
  /**
   * Play the entire group
   */
  play(): void;
  /**
   * Stop the entire group
   */
  stop(): void;
  /**
   * Set the MS value to 0
   */
  reset(): void;
}
/**
 * Group of thermal images
 */
export declare class ThermalGroup extends BaseStructureObject {
  readonly registry: ThermalRegistry;
  readonly id: string;
  readonly name?: string | undefined;
  readonly description?: string | undefined;
  readonly hash: number;
  /** Human readable label = name or id or hasn */
  get label(): string;
  get pool(): import("workerpool/types/Pool");
  constructor(registry: ThermalRegistry, id: string, name?: string | undefined, description?: string | undefined);
  readonly minmax: MinmaxGroupProperty;
  /** Tool drive from above */
  get tool(): ToolDrive;
  readonly files: FilesState;
  readonly cursorPosition: CursorPositionDrive;
  readonly analysisSync: AnalysisSyncDrive;
  readonly analysisGraph: AnalysisGroupGraph;
  protected _playback?: GroupPlayback;
  get playback(): GroupPlayback;
  /** Iteration */
  forEveryInstance: (fn: ((instance: ThermalFileInstance) => void)) => void;
  /** Remove all instances, reset the minmax */
  destroySelfAndBelow(): void;
  removeAllChildren(): void;
  reset(): void;
  readonly filters: FilterContainer;
  getInstances(): ThermalFileInstance[];
  startBatch(id: string): Batch;
}
declare class CursorValueDrive extends AbstractProperty<number | undefined, ThermalFileInstance> {
  protected validate(value: number | undefined): number | undefined;
  protected afterSetEffect(): void;
  recalculateFromCursor(position: ThermalCursorPositionOrUndefined): void;
  protected _getValueAtCoordinate(x: number | undefined, y: number | undefined): number | undefined;
}
declare class FrameBuffer {
  protected readonly drive: TimelineDrive;
  /** @internal use accessors to get and set with side effects */
  protected _currentFrame: ParsedFileFrame;
  /** The current frame data @readonly */
  get currentFrame(): ParsedFileFrame;
  /** Upon every update of current frame, propagate current pixels to the instance */
  protected set currentFrame(frame: ParsedFileFrame);
  /** Get the current step value calculated from _currentFrame */
  get currentStep(): ParsedTimelineFrame;
  /** Number of images to preload at once */
  readonly bufferSize: number;
  /** The actual buffer holding pair of step & frame */
  protected buffer: Map<ParsedTimelineFrame, ParsedFileFrame>;
  /** Accessor to array of steps preloaded in the given moment */
  get preloadedSteps(): ParsedTimelineFrame[];
  /** Accessor to array of relative timestamps preloaded in the given moment */
  get preloadedTimestampsRelative(): number[];
  constructor(drive: TimelineDrive, firstFrame: ParsedFileFrame);
  init(): Promise<TimelineChangedStatusType>;
  /**
   * Activate a step
   * - look for the buffer for the corresponding frame
   * - if there is a corresponding frame, apply it
   * - if there is none, fetch it
   * - if sequence, fetch buffer
   *
   * **THIS IS THE MAIN SETTER**
   */
  recieveStep(step: ParsedTimelineFrame): Promise<TimelineChangedStatusType>;
  /** Preload frame data to the buffer based on the provided step */
  protected preloadAfterFrameSet(step: ParsedTimelineFrame): Promise<TimelineChangedStatusType>;
}
type FramesMap = Map<number, ParsedTimelineFrame>;
type TimelineChangedStatusType = {
  absoluteTime: number;
  relativeTime: number;
  currentFrame: ParsedFileFrame;
  currentStep: ParsedTimelineFrame;
  buffer: ParsedTimelineFrame[];
  preloaded: boolean;
  hasChanged: boolean;
};
export declare const playbackSpeed: {
  1: number;
  0.5: number;
  2: number;
  3: number;
  5: number;
  10: number;
};
type PlaybackSpeeds = keyof typeof playbackSpeed;
/** Stores the frames and the time pointer which is in the miliseconds */
declare class TimelineDrive extends AbstractProperty<number, ThermalFileInstance> {
  readonly steps: ParsedFileBaseInfo["timeline"];
  readonly parent: ThermalFileInstance;
  protected _playbackSpeed: PlaybackSpeeds;
  get playbackSpeed(): PlaybackSpeeds;
  set playbackSpeed(value: PlaybackSpeeds);
  get playbackSpeedAspect(): number;
  readonly onFrame: CallbacksManager<(currentFrame: ParsedTimelineFrame) => void>;
  get duration(): number;
  get frameCount(): number;
  readonly startTimestampRelative: number;
  /** @deprecated not in use? */
  readonly endTimestampRelative: number;
  readonly stepsByAbsolute: FramesMap;
  readonly stepsByRelative: FramesMap;
  readonly stepsByIndex: FramesMap;
  readonly relativeSteps: number[];
  protected _currentStep: ParsedTimelineFrame;
  get currentStep(): ParsedTimelineFrame;
  readonly isSequence: boolean;
  protected _isPlaying: boolean;
  get isPlaying(): boolean;
  protected timer?: ReturnType<typeof setTimeout>;
  readonly buffer: FrameBuffer;
  readonly callbackdPlaybackSpeed: CallbacksManager<(value: PlaybackSpeeds) => void>;
  readonly callbacksPlay: CallbacksManager<() => void>;
  readonly callbacksPause: CallbacksManager<() => void>;
  readonly callbacksStop: CallbacksManager<() => void>;
  readonly callbacksEnd: CallbacksManager<() => void>;
  readonly callbacksChangeFrame: CallbacksManager<(frame: ParsedTimelineFrame) => void>;
  get currentMs(): number;
  get currentPercentage(): number;
  get currentFrameIndex(): number;
  get currentTime(): string;
  get frames(): ParsedTimelineFrame[];
  constructor(parent: ThermalFileInstance, initial: number, steps: ParsedFileBaseInfo["timeline"], initialFrameData: ParsedFileFrame);
  init(): void;
  protected afterSetEffect(): void;
  protected validate(value: number): number;
  _validateRelativeTime(value: number): number;
  _validateIndex(value: number): number;
  _convertRelativeToAspect(relativeTimeInMs: number): number;
  _convertRelativeToPercent(relativeTimeInMs: number): number;
  _convertPercenttRelative(percent: number): number;
  formatDuration(ms: number): string;
  next(): void;
  prev(): void;
  protected findPreviousOrThis(relativeTimeInMs: number): ParsedTimelineFrame;
  /**
   * Find previous frame by relative ms.
   */
  findPreviousRelative(relativeTimeInMs: number): ParsedTimelineFrame;
  findNextRelative(relativeTimeInMs: number): false | ParsedTimelineFrame;
  setRelativeTime(relativeTimeInMs: number): Promise<TimelineChangedStatusType>;
  setValueByPercent(percent: number): Promise<TimelineChangedStatusType>;
  /** This is the main play method */
  protected createNextStepTimer(): void;
  play(): void;
  pause(): void;
  stop(): void;
}
declare class RecordingDrive extends AbstractProperty<boolean, ThermalFileInstance> {
  parent: ThermalFileInstance;
  protected stream?: MediaStream;
  protected recorder?: MediaRecorder;
  protected mimeType?: string;
  protected fileExt?: string;
  protected _isRecording: boolean;
  protected _mayStop: boolean;
  get mayStop(): boolean;
  protected set mayStop(value: boolean);
  protected recordedChunks: Blob[];
  readonly callbackMayStop: CallbacksManager<(value: boolean) => void>;
  protected validate(value: boolean): boolean;
  protected afterSetEffect(value: boolean): void;
  start(): void;
  end(): void;
  /** Records the entire file from start to the end. */
  recordEntireFile(): Promise<void>;
  getOutputMimeType(): {
    mime: string;
    ext: string;
  } | undefined;
  protected initRecording(): {
    stream: MediaStream;
    recorder: MediaRecorder;
    options: MediaRecorderOptions;
  };
  private createRecordingFileName;
  protected download(): void;
  protected clearRecording(): void;
}
declare abstract class AbstractLayer {
  readonly dom: InstanceDOM;
  get instance(): AbstractThermalFile;
  constructor(dom: InstanceDOM);
  abstract getLayerRoot(): HTMLElement;
  protected _mounted: boolean;
  get mounted(): boolean;
  mount(): void;
  unmount(): void;
  destroy(): void;
  protected abstract onDestroy(): void;
}
/** Displays the canvas and renders it */
declare class ThermalCanvasLayer extends AbstractLayer {
  private container;
  readonly canvas: HTMLCanvasElement;
  private _opacity;
  get opacity(): number;
  set opacity(value: number);
  constructor(dom: InstanceDOM);
  getLayerRoot(): HTMLElement;
  protected onDestroy(): void;
}
/** Displays the cursor pointer and its value */
declare class ThermalCursorLayer extends AbstractLayer {
  protected layerRoot: HTMLDivElement;
  protected center: HTMLDivElement;
  protected axisX: HTMLDivElement;
  protected axisY: HTMLDivElement;
  protected label: HTMLDivElement;
  private get unit();
  constructor(dom: InstanceDOM);
  protected _show: boolean;
  get show(): boolean;
  setShow(value: boolean): void;
  protected _hover: boolean;
  get hover(): boolean;
  set hover(value: boolean);
  protected recalculateLabelPosition(x: number, y: number): void;
  setLabel(x: number, y: number, value: string): void;
  setValue(value?: number): void;
  resetCursor(): void;
  protected px(number: number): string;
  getLayerRoot(): HTMLDivElement;
  protected onDestroy(): void;
}
/** Listens for the mouse events. Needs to be placed on top. */
declare class ThermalListenerLayer extends AbstractLayer {
  protected container: HTMLDivElement;
  constructor(dom: InstanceDOM);
  getLayerRoot(): HTMLElement;
  protected onDestroy(): void;
}
/** Contains the visible image. Needs to be placed on the bottom. */
declare class VisibleLayer extends AbstractLayer {
  _url?: string | undefined;
  protected container: HTMLDivElement;
  protected image?: HTMLImageElement;
  get url(): string | undefined;
  set url(value: string | undefined);
  get exists(): boolean;
  constructor(dom: InstanceDOM, _url?: string | undefined);
  getLayerRoot(): HTMLElement;
  protected onDestroy(): void;
}
declare class InstanceDOM {
  readonly parent: AbstractThermalFile;
  readonly root: HTMLDivElement;
  static CLASS_BASE: string;
  static CLASS_BUILT: string;
  static CLASS_HYDRATED: string;
  static CLASS_HOVER: string;
  protected _built: boolean;
  get built(): boolean;
  protected setBuilt(value: boolean): void;
  protected _hydrated: boolean;
  get hydrated(): boolean;
  protected setHydrated(value: boolean): void;
  private _hover;
  get hover(): boolean;
  setHover(value: boolean): void;
  /** The layer holding the canvas element and also analysis DOM */
  protected _canvasLayer?: ThermalCanvasLayer;
  get canvasLayer(): ThermalCanvasLayer | undefined;
  /** Visible layer holding an eventual visible object */
  protected _visibleLayer?: VisibleLayer;
  get visibleLayer(): VisibleLayer | undefined;
  /** Cursor layer will draw the cursor and its label on top of everything */
  protected _cursorLayer?: ThermalCursorLayer;
  get cursorLayer(): ThermalCursorLayer | undefined;
  /** Listener layer is on top of everything and it handles all mouse events */
  protected _listenerLayer?: ThermalListenerLayer;
  get listenerLayer(): ThermalListenerLayer | undefined;
  constructor(parent: AbstractThermalFile, root: HTMLDivElement);
  /**
   * Use the parent's create inner method to build and assign all inner DOM
   */
  build(): void;
  /** Destroy the entire DOM and remove all listeners */
  destroy(): void;
  /** Activate all listeners */
  hydrate(): void;
  /** Deactivate all listeners */
  dehydrate(): void;
}
declare abstract class AbstractRenderer {
  protected readonly file: AbstractThermalFile;
  /** Canvas musí být vytvořený před inicializací rendereru */
  protected readonly canvas: HTMLCanvasElement;
  private _initialised;
  get initialised(): boolean;
  protected get registry(): ThermalRegistry;
  /** Alias vedoucí na šířku syrového termogramu */
  protected get width(): number;
  /** Alias vedoucí na výšku syrového termogramu */
  protected get height(): number;
  /** Alias vedoucí na současné FROM teplotního rozsahu */
  protected get from(): number;
  /** Alias vedoucí na současné TO teplotního rozsahu */
  protected get to(): number;
  protected get palette(): string[];
  constructor(file: AbstractThermalFile,
  /** Canvas musí být vytvořený před inicializací rendereru */
  canvas: HTMLCanvasElement);
  /** Inicializace rendereru - vytvoření patřičných listenerů či shaderů atd... */
  init(): Promise<void>;
  /** Vlastní inicializace je asynchronní a vrací boolean */
  protected abstract onInit(): Promise<boolean>;
  /** Vykreslení probíhá pouze pokud je rendererr inicializován */
  render(): Promise<void>;
  /** Vykonání vlastního renderu do canvasu */
  protected abstract executeRender(): Promise<void>;
  /** Funkce volaná při zničení canvasu */
  abstract destroy(): Promise<void>;
}
/**
 * The file metadata = Parsed file base info.
 *
 * Stored here as a separate class. Purpose: separation of concern & provide listener on change.
 */
declare class FileMeta {
  private _current;
  get current(): ParsedFileBaseInfo;
  protected _onChange?: CallbacksManager<(value: ParsedFileBaseInfo) => void>;
  /**
   * Lazyloaded callback manager that is triggered whenever the value changes
   */
  get onChange(): CallbacksManager<(value: ParsedFileBaseInfo) => void>;
  get width(): number;
  get height(): number;
  constructor(baseInfo: ParsedFileBaseInfo);
  set(value: ParsedFileBaseInfo): void;
}
/**
 * Displayable object for every file type.
 *
 * This class takes care of the display fundamentals.
 *
 * Most drivers are set in individual implementations, not here.
 */
declare abstract class AbstractThermalFile extends BaseStructureObject {
  private _label?;
  get label(): string | undefined;
  setLabel(label: string | undefined): void;
  readonly onLabelChange: CallbacksManager<(label: string | undefined) => void>;
  readonly id: string;
  /** Internal limit for cursor label position */
  readonly horizontalLimit: number;
  /** Internal limit for cursor label position */
  readonly verticalLimit: number;
  /** Every file instance belongs to a group */
  readonly group: ThermalGroup;
  /** Alias to the file group's registry */
  get registry(): ThermalRegistry;
  /** Alias to the file group's registry's manager */
  get manager(): ThermalManager;
  /** Alias to the manager's pool object */
  get pool(): import("workerpool/types/Pool");
  /** The full URL of the thermal file */
  readonly thermalUrl: string;
  private _visibleUrl?;
  get visibleUrl(): string | undefined;
  readonly fileName: string;
  signature: string;
  version: number;
  streamCount: number;
  fileDataType: number;
  unit: number;
  /** Stored core information. They may change in time because of filters. */
  readonly meta: FileMeta;
  /** @deprecated Use meta instead */
  get width(): number;
  /** @deprecated Use meta instead */
  get height(): number;
  /** @deprecated Use meta instead */
  get timestamp(): number;
  /** @deprecated Use meta instead */
  get duration(): number;
  /** @deprecated Use meta instead */
  get min(): number;
  /** @deprecated Use meta instead */
  get max(): number;
  /** @deprecated Use meta instead */
  get bytesize(): number;
  /** @deprecated Use meta instead */
  get averageEmissivity(): number;
  /** @deprecated Use meta instead */
  get averageReflectedKelvins(): number;
  /** @deprecated Use meta instead */
  get fps(): number;
  /** @deprecated Use meta instead */
  get frameCount(): number;
  protected _dom?: InstanceDOM;
  get dom(): InstanceDOM | undefined;
  readonly onMount: CallbacksManager<() => void>;
  readonly onUnmount: CallbacksManager<() => void>;
  /** Renderer pro vykreslování do canvasu */
  protected renderer?: AbstractRenderer;
  get hover(): boolean;
  timeline: TimelineDrive;
  cursorValue: CursorValueDrive;
  analysis: AnalysisDrive;
  recording: RecordingDrive;
  private _preferWebGl;
  get preferWebGl(): boolean;
  switchToCPURenderer(): void;
  private _pixels;
  private _pixelsVersion;
  get pixels(): number[];
  /** Changes whenever pixels are supplied through setPixels, including reused arrays. */
  get pixelsVersion(): number;
  setPixels(value: number[]): void;
  abstract getPixelsForHistogram(): number[];
  constructor(group: ThermalGroup, baseInfo: ParsedFileBaseInfo, initialPixels: number[], thermalUrl: string, visibleUrl?: string);
  /**
   * Hotfix - remove the visible file
   * @used in FilePngExport - the PNG files are not being included in the PNG export. Since the data are transferred all to the export, I need to remove the visible file here.
   * @todo
   */
  removeVisibleFile(): this;
  /**
   * Hotfix - set renderer preference to WebGl.
   * - true = prefer WebGl,
   * - false = prefer CPU
   * This needs to be set before calling `mountToDom()` which creates the renderer.
   */
  setPreferWebGl(value: boolean): this;
  /** Build properties for the thermal file */
  abstract buildInternalProperties(): ThisType<AbstractThermalFile>;
  protected abstract onSetPixels(value: number[]): void;
  protected abstract formatId(thermalUrl: string): string;
  abstract hydrateListener(dom: InstanceDOM): void;
  abstract dehydrateListener(dom: InstanceDOM): void;
  private rendererFactory;
  mountToDom(container: HTMLDivElement,
  /** Optionally disable renderer initialization for the purpose of tests */
  initialiseRenderer?: boolean): void;
  unmountFromDom(): void;
  /**
   * @todo The render needs to be a little delayed. This should be foxed so that the render happens immediately.
   */
  draw(): Promise<void>;
  /** Remove the entire DOM structure */
  destroySelfAndBelow(): void;
  /** Remove the entire DOM structure */
  removeAllChildren(): void;
  getTemperatureAtPoint(x: number, y: number): number;
  getColorAtPoint(x: number, y: number): string | undefined;
  reset(): void;
}
type FilterParent = ThermalManager | ThermalRegistry | ThermalGroup | AbstractThermalFile;
declare class FilterContainer {
  readonly parent: FilterParent;
  private _layers;
  get layers(): AbstractFilter<AbstractFilterParameters>[];
  onLayers: CallbacksManager<(layers: AbstractFilter[]) => void>;
  protected setLayers(layers: AbstractFilter[]): void;
  constructor(parent: FilterParent);
  getActiveFilters(): AbstractFilter[];
  addFilter(filter: AbstractFilter): void;
  removeFilter(filter: AbstractFilter): void;
  applyFilters(): void;
  getFiltersArray(): void;
}
declare class AnalysisGraphsStorage {
  readonly drive: AnalysisDataState;
  readonly listenerKey = "___listen-to-graphs___";
  get layers(): AnalysisLayersStorage;
  protected readonly _graphs: Map<string, AnalysisGraph>;
  get graphs(): Map<string, AnalysisGraph>;
  protected addGraph(graph: AnalysisGraph): void;
  protected removeGraph(graph: string): void;
  protected _output: AnalysisDataStateValue;
  get output(): AnalysisDataStateValue;
  protected set output(output: AnalysisDataStateValue);
  onOutput: CallbacksManager<(output: AnalysisDataStateValue) => void>;
  onAddGraph: CallbacksManager<(graph: AnalysisGraph) => void>;
  onRemoveGraph: CallbacksManager<(graph: string) => void>;
  constructor(drive: AnalysisDataState);
  refreshOutput(): AnalysisDataStateValue;
  generateExportData(): {
    header: {
      key: string;
      displayLabel: string;
    }[];
    data: {
      [index: string]: string | number;
    }[];
  };
}
type HeaderRow = string[];
/** Elapsed time and Celsius values; null denotes a pending or missing series value. */
type ValueRow = [Date, ...(number | null)[]];
type DataType = [HeaderRow, ...ValueRow[]];
type AnalysisDataStateValue = {
  values: DataType;
  colors: string[];
};
/** Stores the data of all analysis. Purpose: store data for the purpose of graph. The graph data format is constructed for Google Charts webcomponent. */
declare class AnalysisDataState extends AbstractProperty<AnalysisDataStateValue, ThermalFileInstance> {
  protected _hasActiveGraphs: boolean;
  get hasActiveGraphs(): boolean;
  readonly onGraphsPresence: CallbacksManager<(hasActiveGraphs: boolean) => void>;
  readonly listeners: AnalysisGraphsStorage;
  constructor(parent: ThermalFileInstance);
  protected validate(value: AnalysisDataStateValue): AnalysisDataStateValue;
  protected afterSetEffect(): void;
  /** Assamble the current analysis data and download them as CSV directly. */
  downloadData(): void;
  /** Refresh the values of all analyses for the current frame from their graph data. No calculation is performed. */
  refreshAllAnalysesValues(): void;
}
type FileExportPngParams = AbstractExportProps;
type FileExportPngParamsMandatory = AbstractExportTypeMandatory;
declare class FilePngExport extends AbstractPngExport<FileExportPngParams, FileExportPngParamsMandatory> {
  readonly file: ThermalFileInstance;
  static DEFAULT_PARAMS: FileExportPngParamsMandatory;
  protected localInstance?: ThermalFileInstance;
  constructor(file: ThermalFileInstance);
  protected onBuildDom(): void;
  protected beforeDomRemoved(): void;
  protected afterDomRemoved(): void;
  protected getFinalParams(params?: AbstractExportProps | undefined): FileExportPngParamsMandatory;
  protected onDownload(params: AbstractExportTypeMandatory): Promise<void>;
}
/**
 * An instance of the loaded file
 *
 * Holds DOM, displays the canvas, handles playback and do all important stuff.
 *
 * Is necessarily tied to a `ThermalGroup` object and is based on a `ThermalFileReader`.
 */
export declare class ThermalFileInstance extends AbstractThermalFile {
  readonly group: ThermalGroup;
  readonly reader: ThermalFileReader;
  readonly firstFrame: ParsedFileFrame;
  timeline: TimelineDrive;
  analysis: AnalysisDrive;
  analysisData: AnalysisDataState;
  slots: AnalysisSlotsState;
  readonly filters: FilterContainer;
  /**
   * Exports
   */
  protected _export?: FilePngExport;
  /** Lazy-loaded `ThermalFileExport` object */
  get export(): FilePngExport;
  private constructor();
  hydrateListener(dom: InstanceDOM): void;
  dehydrateListener(dom: InstanceDOM): void;
  buildInternalProperties(): this;
  protected formatId(thermalUrl: string): string;
  protected onSetPixels(): void;
  getPixelsForHistogram(): number[];
  static fromService(group: ThermalGroup, service: ThermalFileReader, baseInfo: ParsedFileBaseInfo, firstFrame: ParsedFileFrame): ThermalFileInstance;
  recieveCursorPosition(position: ThermalCursorPositionOrUndefined): void;
  getInstances(): this[];
  getAllApplicableFilters(): AbstractFilter[];
  applyAllAvailableFilters(): Promise<void>;
}
/**
 * Available keys of thermal units. Used by {@link thermalUnits} and by {@link UnitDrive}.
 * @module `@labirthermal/core`
 */
export declare enum ThermalUnit {
  C = "C",
  F = "F",
  K = "K"
}
export declare const celsiusToFahrenheit: (celsius: number) => number;
export declare const celsiusToKelvin: (celsius: number) => number;
export declare const fahrenheitToCelsius: (fahrenheit: number) => number;
export declare const fahrenheitToKelvin: (fahrenheit: number) => number;
export declare const kelvinToCelsius: (kelvin: number) => number;
export declare const kelvinToFahrenheit: (kelvin: number) => number;
type ThermalUnitDefinition = {
  /** Name of the thermal unit */
  name: string;
  /** Symbol of the thermal unit WITHOUT the whitespace. */
  symbol: string;
  /** Key of the thermal unit. */
  key: ThermalUnit;
  /** Convert a value to Celsius. Celsius is used internally in all states. */
  toCelsius: (value: number) => number;
  /** Convert a value from Celsius to this unit. Celsius is used internally in all states. */
  fromCelsius: (value: number) => number;
  /** Convert a value to Fahrenheit */
  toFahrenheit: (value: number) => number;
  /** Convert a value to Kelvin */
  toKelvin: (value: number) => number;
};
/** Registry of all available thermal units along with their conversion functions. Celsius is still used internally in all states. The conversion will happen only on the output - in the GUI and when doing exports.
 * @module `@labirthermal/core`
 */
export declare const thermalUnits: Record<ThermalUnit, ThermalUnitDefinition>;
/** All available property data types */
type PropertyListenersTypes = boolean | number | string | ThermalRangeOrUndefined | ThermalMinmaxOrUndefined | ThermalCursorPositionOrUndefined | ThermalGroup[] | ThermalRegistry[] | ThermalStatistics[] | ThermalFileInstance[] | AbstractAnalysis[] | AbstractTool | AnalysisDataStateValue | AnalysisSlotsMap | ThermalGraphGroupDataOrUndefined | ThermalUnit;
type PropertyListenerFn<T extends PropertyListenersTypes> = (value: T) => void;
/**
 * A common basis for all observable properties.
 *
 * Principle:
 * - the value is stored internally
 * - update should be done only using `this.value = newValue` setter which will call
 *     - the validation
 *     - the side effects
 *     - the listeners on the value change
 * - Listeners are stored in a `CallbacksManager` object which is controlled by methods such as `addListener`, `removeListener` and `clearAllListeners`
 * - for the purpose of value assignment from the outside, every individual property should create its own public methods that respect principles mentioned above.
 *
 * @internal
 */
declare abstract class AbstractProperty<ValueType extends PropertyListenersTypes, ParentType extends BaseStructureObject> {
  readonly parent: ParentType;
  private readonly _initial;
  private _value;
  /** Validation is called before every value change through the `value` setter. */
  protected abstract validate(value: ValueType): ValueType;
  /** What should be done whenever the value changes? */
  protected abstract afterSetEffect(value: ValueType): void;
  /** Get the current value @readonly */
  get value(): ValueType;
  /** Get the initial value of this property @readonly */
  get valueInitial(): ValueType;
  /**
   * Set the value and call all listeners.
   * - Validates the value before settings
   * - Calls side effects after setting the value
   * - Calls all the listeners with the new values
   * @internal
   */
  protected set value(value: ValueType);
  private _listeners;
  constructor(parent: ParentType, _initial: ValueType);
  /** Set the value to its initial state */
  reset(): void;
  /**
   * Add a listener to the property value changes.
   * @param id Identificator of the listening object needs to be unique - it will be the key in the `Map of listeners`
   * @param listener The function that will be triggered whenever the value changes.
   */
  addListener(id: string, listener: PropertyListenerFn<ValueType>): void;
  /** Remove the listener from the `Map` by its unique ID. */
  removeListener(id: string): void;
  /** Remove all listeners from the `Map` */
  clearAllListeners(): void;
  /**
   * Arbitrary call all registered listeners usin the current value of the property.
   *
   * This method should be used only in special cases, for example when the value is concieved as a reference, therefore its updates does not use the standard setter which triggers the listeners, side effects ac ati.
   */
  protected callAllListenersWithCurrentValue(): void;
}
/**
 * Controls the thermal unit selection and conversion for the entire `ThermalManager` context. Internal states such as minmax and range are still kept in Celsius. But the GUI and exports will convert their values to the currently selected thermal unit. For this purpose, this class has all the necessary conversion methods.
 * @module `@labirthermal/core`
 */
export declare class UnitDrive extends AbstractProperty<ThermalUnit, ThermalManager> {
  /** Available thermal unit keys. */
  static readonly KEYS: typeof ThermalUnit;
  /** Available thermal units by keys. This object can also be accessed using the `getUnits` method. */
  static readonly UNITS: Readonly<Record<ThermalUnit, ThermalUnitDefinition>>;
  /** Internal storage of currently used thermal unit definition. */
  private _current;
  /** The currently active thermal unit definition. Actual value of this driver is the unit key, but this is the whole object representing the unit. Set internally whenever the value changes. */
  get current(): ThermalUnitDefinition;
  constructor(parent: ThermalManager, initial: ThermalUnit);
  protected validate(value: ThermalUnit): ThermalUnit;
  protected afterSetEffect(value: ThermalUnit): void;
  private getUnitDefinition;
  /** Set the current thermal unit by its key. Triggers internal updates and event listeners. */
  set(key: ThermalUnit): void;
  /** Set the current thermal unit to Celsius. Internal states are always in Celsius. */
  setCelsius(): void;
  /** Set the current thermal unit to Fahrenheit. Internal states are always in Celsius. In `@labirthermal/core`, the current unit is only applied in the GUI and in exports.
   */
  setFahrenheit(): void;
  /** Set the current thermal unit to Kelvin. Internal states are always in Celsius. In `@labirthermal/core`, the current unit is only applied in the GUI and in exports.
   */
  setKelvin(): void;
  /**
   * Convert a value in Celsius to the current unit.
   *
   * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
   */
  celsiusToCurrent(valueInCelsius: number): number;
  /**
   * Convert a value in the current unit to Celsius.
   *
   * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
   */
  currentToCelsius(valueInCurrentUnit: number): number;
  /**
   * Format a single temperature value into the string ending with the current unit symbol.
   *
   * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
   */
  formatSingle(valueInCurrentUnit: number): string;
  /**
   * Format a range of temperatures into the string ending with the current unit symbol.
   *
   * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
   */
  formatRange(fromInCurrentUnit: number, toInCurrentUnit: number): string;
  /**
   * Get the list of available unit definitions.
   *
   * @see {@link ThermalUnitDefinition} - this is the structure of an unit definition
   * @see {@link thermalUnits} - this is the actual list of definitions
   * @see {@link ThermalUnits} - these are available keys that are used as values of this driver.
   */
  getUnits(): Readonly<Record<ThermalUnit, ThermalUnitDefinition>>;
}
/** Controls image smoothing */
declare class GraphSmoothDrive extends AbstractProperty<boolean, ThermalManager> {
  protected validate(value: boolean): boolean;
  protected afterSetEffect(): void;
  setGraphSmooth(value: boolean): void;
}
/** Controls image smoothing */
declare class SmoothDrive extends AbstractProperty<boolean, ThermalManager> {
  protected validate(value: boolean): boolean;
  protected afterSetEffect(value: boolean): void;
  setSmooth(value: boolean): void;
}
declare class RegistriesState extends AbstractProperty<ThermalRegistry[], ThermalManager> {
  private map;
  protected validate(value: ThermalRegistry[]): ThermalRegistry[];
  protected afterSetEffect(value: ThermalRegistry[]): void;
  addOrGetRegistry(id: string, options?: ThermalRegistryOptions): ThermalRegistry;
  removeRegistry(id: string): void;
  reset(): void;
  forEveryRegistry(callback: (registry: ThermalRegistry) => void): void;
  forEveryGroup(callback: (group: ThermalGroup) => void): void;
  forEveryInstance(callback: (instance: ThermalFileInstance) => void): void;
}
type ThermalManagerOptions = {
  /** Optionaly set the initial palette value */
  palette?: AvailableThermalPalette;
  /** Optionally set the initial thermal unit value */
  unit?: ThermalUnit;
};
export declare class ThermalManager extends BaseStructureObject {
  readonly id: number;
  /** Service for creation of loading and caching the files. */
  readonly service: FilesService;
  /** Registries management state */
  readonly registries: RegistriesState;
  /** A palette is common to all registries within the manager */
  readonly palette: PaletteDrive;
  readonly smooth: SmoothDrive;
  readonly graphSmooth: GraphSmoothDrive;
  readonly tool: ToolDrive;
  readonly unit: UnitDrive;
  readonly pool: Pool;
  constructor(pool?: Pool, options?: ThermalManagerOptions);
  readonly filters: FilterContainer;
  getInstances(): ThermalFileInstance[];
  destroySelfAndBelow(): void;
  removeAllChildren(): void;
  reset(): void;
}
/**
 * Array of all supported file types and extensions
 * - this is only for the purpose of display!
 * - no functionality is relies on this data
 * - all the functionality needs to be implemented in static functions of the parser itself
 */
export declare const supportedFileTypes: IParserObject["extensions"][];
export declare const supportedFileTypesInputProperty: string;
export declare const availableAnalysisColors: string[];
type SlotNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type SlotUnion = "analysis1" | "analysis2" | "analysis3" | "analysis4" | "analysis5" | "analysis6" | "analysis7";
/** Tool for analysis addition */
export declare abstract class AbstractAddTool extends AbstractTool {}
export declare class AddEllipsisTool extends AbstractAddTool implements ITool {
  readonly key: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  protected onActivate(): void;
  protected onDeactivate(): void;
  onCanvasLeave(): void;
  onCanvasClick(top: number, left: number, file: ThermalFileInstance): void;
  onPointDown(): void;
  onPointUp(point: AbstractPoint): void;
  onPointMove(point: AbstractPoint, top: number, left: number): void;
  onPointLeave(): void;
  onPointEnter(): void;
  getLabelValue: (x: number, y: number, file: ThermalFileInstance) => string;
}
export declare class AddRectangleTool extends AbstractAddTool implements ITool {
  readonly key: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  protected onActivate(): void;
  protected onDeactivate(): void;
  onCanvasLeave(): void;
  onCanvasClick(x: number, y: number, file: ThermalFileInstance): void;
  onPointDown(): void;
  onPointUp(point: AbstractPoint): void;
  onPointMove(point: AbstractPoint, top: number, left: number): void;
  onPointLeave(): void;
  onPointEnter(): void;
  getLabelValue: (x: number, y: number, file: ThermalFileInstance) => string;
}
export declare class EditTool extends AbstractTool implements ITool {
  readonly key = "edit";
  readonly name = "editanalysis";
  readonly description = "dragcornersofselectedanalysis";
  readonly icon = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg class=\"thermal-tool-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\">\n  <polygon points=\"34 17.03 34 -.02 30 -.02 30 17.03 17 17.03 17 32 0 32 0 36 17 36 17 47 46.97 47 46.97 17.03 34 17.03\" fill=\"currentcolor\"/>\n</svg>";
  onActivate(): void;
  protected onDeactivate(): void;
  onCanvasLeave(): void;
  onCanvasClick(): void;
  onPointEnter(point: AbstractPoint): void;
  onPointLeave(point: AbstractPoint): void;
  onPointMove(point: AbstractPoint, top: number, left: number): void;
  onPointDown(point: AbstractPoint): void;
  onPointUp(point: AbstractPoint): void;
  getLabelValue(x: number, y: number, file: ThermalFileInstance): string;
}
export declare class InspectTool extends AbstractTool implements ITool {
  readonly key = "inspect";
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  protected onActivate(): void;
  protected onDeactivate(): void;
  onCanvasClick(): void;
  onCanvasLeave(): void;
  onPointEnter(): void;
  onPointLeave(): void;
  onPointMove(): void;
  onPointDown(): void;
  onPointUp(): void;
  getLabelValue: (x: number, y: number, file: ThermalFileInstance) => string;
}
type AcceptableDateInput = number | Date;
declare abstract class TimeUtilsBase {
  /** Convert an input to a date object */
  static inputToDate: (value: AcceptableDateInput) => Date;
}
/** Utility class for time formatting in the LabIR ecosystem. */
export declare class TimeFormat extends TimeUtilsBase {
  /** YYYY-MM-DD */
  static isoDate: (value: AcceptableDateInput) => string;
  /** HH:MM:SS */
  static isoTime: (value: AcceptableDateInput) => string;
  /** YYYY-MM-DD HH:MM:SS */
  static isoComplete: (value: AcceptableDateInput) => string;
  /** HH:mm */
  static humanTime: (value: AcceptableDateInput, showSeconds?: boolean) => string;
  /** Format a duration as m:ss.SSS, or h:mm:ss.SSS when it is at least an hour. */
  static duration: (milliseconds: number) => string;
  /** j. M. ???? (y) */
  static humanDate: (value: AcceptableDateInput, includeYear?: boolean) => string;
  /** Range */
  static humanRangeDates(from: AcceptableDateInput, to: AcceptableDateInput): string;
  static human(date: AcceptableDateInput): string;
}
/** Defined time periods used in the LabIR ecosystem. */
export declare enum TimePeriod {
  HOUR = "jednu hodinu",
  DAY = "jeden den",
  WEEK = "jeden týden",
  MONTH = "jeden měsíc",
  YEAR = "jeden rok"
}
/** Utility class for time rounding in the LabIR ecosystem. */
export declare class TimeRound extends TimeUtilsBase {
  static down: (value: AcceptableDateInput, roundTo: TimePeriod) => Date;
  static up: (value: AcceptableDateInput, roundTo: TimePeriod) => Date;
  static pick: (value: AcceptableDateInput, period: TimePeriod) => Date[];
  static modify: (value: AcceptableDateInput, amount: number, period: TimePeriod) => Date;
}
export type { AnalysisDataStateValue, AvailableThermalPalette, IParserObject, ParsedTimelineFrame, PlaybackSpeeds, SlotNumber, SlotUnion, ThermalCursorPositionOrUndefined, ThermalManagerOptions, ThermalMinmaxOrUndefined, ThermalPaletteType, ThermalRangeOrUndefined, ThermalRegistryOptions, ThermalTool, ThermalUnitDefinition };
//# sourceMappingURL=index.d.mts.map