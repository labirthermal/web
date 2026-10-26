import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { AbstractFileResult } from "./AbstractFileResult";
import { IParserObject, ParsedFileBaseInfo } from "./parsers/structure";

import { FilesService } from "./FilesService";
import { AbstractFilter } from "../../filters/AbstractFilter";

/**
 * Stores the file's `ArrayBuffer` and provides all the data for instance
 * - this service is registered in FilesService
 * - the instances are retrieved using `FilesService.loadOneFile`
 */
export class ThermalFileReader extends AbstractFileResult {

    /** For the purpose of testing we have a unique ID */
    public readonly id = Math.random();

    /** In-memory cache of the `baseInfo` request. This request might be expensive in larger files or in Vario Cam files. Because the return value is allways the same, there is no need to make the call repeatedly. */
    protected baseInfoCache?: ParsedFileBaseInfo;

    public readonly fileName: string;

    private get pool() {
        return this.service.pool;
    }

    protected originalBuffer?: ArrayBuffer;

    /** The file exactly as it was loaded, if the parser works with a converted working buffer */
    protected readonly sourceBuffer?: ArrayBuffer;

    protected _buffer: ArrayBuffer;
    /** The working buffer passed to all parser methods */
    public get buffer(): ArrayBuffer { return this._buffer; }
    protected set buffer( value: ArrayBuffer ) {
        this._buffer = value;
    }

    /** 
     * The original file content, e.g. for downloads. 
     * Differs from `buffer` for formats decoded while loading (FLIR JPEG).
     */
    public get fileBuffer(): ArrayBuffer {
        return this.sourceBuffer ?? this.buffer;
    }

    /** MIME type of the original file */
    public get fileMimeType(): string {
        return this.parser.extensions[ 0 ]?.minme ?? "application/octet-stream";
    }

    public constructor(
        public readonly service: FilesService,
        buffer: ArrayBuffer,
        public readonly parser: IParserObject,
        thermalUrl: string,
        visibleUrl?: string,
        preserveOriginalBuffer?: boolean,
        sourceBuffer?: ArrayBuffer
    ) {
        super( thermalUrl, visibleUrl );

        this._buffer = buffer;

        if ( sourceBuffer !== undefined && sourceBuffer !== buffer ) {
            this.sourceBuffer = sourceBuffer;
        }

        this.fileName = this.thermalUrl.substring( this.thermalUrl.lastIndexOf( "/" ) + 1 );

        if ( preserveOriginalBuffer === true ) {
            this.originalBuffer = this.copyBuffer( this.buffer );
        }
    }

    public isSuccess(): boolean {
        return true;    
    }

    /** @todo This method relies on the functionality of filters. */
    protected copyBuffer( buffer: ArrayBuffer ): ArrayBuffer {
        const copiedBuffer = new ArrayBuffer( buffer.byteLength );
        const copiedArray = new Uint8Array( copiedBuffer );
        copiedArray.set( new Uint8Array( buffer ) );
        return copiedArray.buffer;
    }

    /** Create copy of the self so that the instance refers to its own ThermalFileReader */
    protected cloneForInstance(): ThermalFileReader {

        /** @todo Until the filters are implemented properly, there is no need of copying the buffer.*/
        return this;


        return new ThermalFileReader( 
            this.service,
            this.buffer,
            this.parser,
            this.thermalUrl,
            this.visibleUrl,
            true,
            this.sourceBuffer
        );
    }


    /** Read the fundamental data of the file. If this method had been called before, return the cached result. */
    public async baseInfo(): ReturnType<IParserObject["baseInfo"]> {

        // Return the cached result if any
        if ( this.baseInfoCache ) {
            return this.baseInfoCache;
        }

        // Create the promise

        const baseInfo = await this.pool.exec( this.parser.baseInfo, [ this.buffer ] );

        this.baseInfoCache = baseInfo;

        // Return the promise
        return baseInfo;
        
    }

    /** 
     * Before requesting a frame, create a dedicated `ArrayBuffer` containing only the frame's data 
     * 
     * **THIS IS SYNCHRONOUSE AND MIGHT BE EXPENSIVE**
     */
    protected getFrameSubset( frameIndex: number ): ReturnType<IParserObject["getFrameSubset"]> {
        return this.parser.getFrameSubset( this.buffer, frameIndex );
    }

    /** Read a given frame
     * @todo Implement index range check
     */
    public async frameData( index: number ): ReturnType<IParserObject["frameData"]> {

        const data = this.getFrameSubset( index );

        const result = await this.parser.frameData( data.array, data.dataType);

        return result;

    }

    public async pointAnalysisData( x: number, y: number ): ReturnType<IParserObject["pointAnalysisData"]> {
        return await this.parser.pointAnalysisData( this.buffer, x, y );
    }

    public async rectAnalysisData( x: number, y: number, width: number, height: number ): ReturnType<IParserObject["rectAnalysisData"]> {
        return await this.parser.rectAnalysisData( this.buffer, x, y, width, height );
    }

    public async ellipsisAnalysisData( x: number, y: number, width: number, height: number ): ReturnType<IParserObject["ellipsisAnalysisData"]> {
        return await this.parser.ellipsisAnalysisData( this.buffer, x, y, width, height );
    }

    /** 
     * Recalculates the core array buffer using all available filters. 
     * 
     * This method does not emit anything - it only changes the array buffer.
     */
    async applyFilters(
        filters: AbstractFilter[]
    ): Promise<ThermalFileReader> {

        // Do nothing if there is no original buffer
        if ( this.originalBuffer === undefined ) {
            console.error( "trying to apply filters on a filereader template" );
            return this;
        }

        // Copy original buffer to the working buffer
        this.buffer = this.copyBuffer(this.originalBuffer);

        // Apply all filters one by one
        for ( const filter of filters ) {
            this.buffer = await filter.apply( this.buffer );
        }

        // Reset the base info cache
        this.baseInfoCache = undefined;

        // Create new base info cache
        await this.baseInfo();

        return this;

    }


    public async createInstance(
        group: ThermalGroup,
        doAdd: boolean = true
    ): Promise<ThermalFileInstance> {

        // Create a new instance with copied buffer
        const reader = this.cloneForInstance();

        // Collect all filters above the instance
        // const filters = [
        //    ...group.registry.manager.filters.getActiveFilters(),
        //    ...group.registry.filters.getActiveFilters(),
        //    ...group.filters.getActiveFilters()
        //];

        // Apply the filters
        // await reader.applyFilters( filters );

        // Collect the necessary information
        const baseInfo = await reader.baseInfo();
        const firstFrame = await reader.frameData( 0 );

        // Create the instance with the necessary information
        const instance = ThermalFileInstance.fromService( group, reader, baseInfo, firstFrame );

        // Register the instance to the group
        if (doAdd) {
            group.files.addFile( instance );
        }

        return instance;
    }


    

}