import { BaseStructureObject } from "../base/BaseStructureObject";
import { ThermalFileInstance } from "../file/ThermalFileInstance";
import { FilterContainer } from "../filters/FilterContainer";
import { BatchLoader } from "../loading/batch/BatchLoader";
import { ThermalFileRequest } from "../loading/ThermalRequest";
import { ThermalFileFailure } from "../loading/workers/ThermalFileFailure";
import { ThermalFileReader } from "../loading/workers/ThermalFileReader";
import { CallbacksManager } from "../properties/callbacksManager";
import { OpacityDrive } from "../properties/display/OpacityDrive";
import { GroupsState } from "../properties/lists/GroupsState";
import { MinmaxRegistryProperty } from "../properties/scale/MinmaxRegistryState";
import { RangeDriver } from "../properties/scale/RangeDriver";
import { HistogramState } from "../properties/states/HistogramState";
import { LoadingState } from "../properties/states/LoadingState";
import { ThermalGroup } from "./ThermalGroup";
import { ThermalManager } from "./ThermalManager";

export type ThermalRegistryOptions = {
    histogramResolution?: number,
}

export type BatchLoadingCallback = ( 
    result: ThermalFileFailure|ThermalFileInstance 
) => Promise< void >;

/**
 * The global thermal registry
 * @todo implementing EventTarget
 */
export class ThermalRegistry extends BaseStructureObject {

    public readonly hash = Math.random();

    public constructor(
        public readonly id: string,
        public readonly manager: ThermalManager,
        options?: ThermalRegistryOptions
    ) {
        super();

        // Set thermal palette
        this.palette = this.manager.palette;

        // Set histogram resolution
        if (options)
            if (options.histogramResolution !== undefined)
                if (options.histogramResolution > 0)
                    this.histogram.setResolution(options.histogramResolution)
    }


    /** Service */
    public get service() { return this.manager.service; }

    public get pool() {return this.manager.pool; }



    /** Groups are stored in an observable property */
    public readonly groups: GroupsState = new GroupsState(this, []);



    /** Iterator methods */

    public forEveryGroup(fn: ((group: ThermalGroup) => void)) {
        this.groups.value.forEach(fn);
    }

    public forEveryInstance(fn: (instance: ThermalFileInstance) => void) {
        this.forEveryGroup(group => group.files.forEveryInstance(fn));
    }

    /** Full load of the registry with multiple files @deprecated */
    public async loadFullMultipleFiles(
        files: {
            [index: string]: ThermalFileRequest[]
        }
    ) {

        this.reset();

        this.loading.markAsLoading();

        // Load services for every group
        const servicesByGroup = await Promise
            .all( Object.entries( files ).map( async ([groupId, fs]) => {

            const group = this.groups.addOrGetGroup( groupId );

            const groupFiles = await Promise.all(fs.map(( file ) => {
                return this.service.loadFile(file.thermalUrl, file.visibleUrl)
            }));

            return {
                group,
                groupFiles
            }

        } ) );

        // Create instances from loaded services
        const result = await Promise.all( servicesByGroup.map( async ({group, groupFiles}) => {

            const instances = await Promise.all( groupFiles.map( async ( service ) => {

                if ( service instanceof ThermalFileReader ) {
                    return await service.createInstance( group )
                } else {
                    return false;
                }

            } ) );

            return instances;

        } ) );


        this.postLoadedProcessing();

        return result;

    }


    /** Load the registry with only one file. @deprecated */
    public async loadFullOneFile(file: ThermalFileRequest, groupId: string) {

        this.reset();

        this.loading.markAsLoading();

        const group = this.groups.addOrGetGroup(groupId);

        const result = await this.service.loadFile( file.thermalUrl, file.visibleUrl );

        const instanceOrError = result instanceof ThermalFileReader
            ? await result.createInstance( group )
            : result as ThermalFileFailure;

        this.loading.markAsLoaded();

        this.postLoadedProcessing();

        return instanceOrError;

    }

    private _batch?: BatchLoader;
    public get batch(): BatchLoader {
        if ( ! this._batch ) this._batch = new BatchLoader( this );
        return this._batch;
    }

    /** @deprecated use batch member class instead */
    public registerRequest(
        thermalUrl: string,
        visibleUrl: undefined|string = undefined,
        group: ThermalGroup,
        callback: BatchLoadingCallback,
    ) {

        this.batch.request(thermalUrl, visibleUrl, group, callback);        

    }


    public readonly onProcessingStart = new CallbacksManager< () => void >;
    public readonly onProcessingEnd = new CallbacksManager< () => void >;



    /** 
     * Actions to take after the registry is loaded 
     * - recalculate the minmax of groups
     * - recalculate minmax of registry
     * - impose new minmax as new range
     * - recalculate the histogram
    */
    public async postLoadedProcessing() {

        this.onProcessingStart.call();


        // Recalculate individual minmaxes
        this.forEveryGroup(group => group.minmax.recalculateFromInstances());

        // Recalculate the minmax
        this.minmax.recalculateFromGroups();

        // If there is minmax, impose it down as range
        if (this.minmax.value)

            // Impose only when the range is not set already
            if ( this.range.value === undefined ) {
                this.range.imposeRange({ from: this.minmax.value.min, to: this.minmax.value.max });
            } 
            // If the range is set already, clamp it to the new minmax
            else {

                const newFrom = Math.max( this.range.value.from, this.minmax.value.min );
                const newTo = Math.min( this.range.value.to, this.minmax.value.max );


                if ( newFrom !== this.range.value.from || newTo !== this.range.value.to ) {
                    this.range.imposeRange({
                        from: Math.max( this.range.value.from, this.minmax.value.min ),
                        to: Math.min( this.range.value.to, this.minmax.value.max )
                    });
                }
            }

        // Reuse a cached histogram when the same source readers were already processed.
        this.histogram.recalculateHistogramBufferInWorker();

        this.loading.markAsLoaded();

        this.onProcessingEnd.call();

    }




    public reset() {

        this.groups.removeAllGroups();
        this.opacity.reset();
        this.minmax.reset();

    }

    public removeAllChildren() {
        this.groups.removeAllGroups();
    };

    public destroySelfAndBelow() {
        this.reset();
    }

    public destroySelfInTheManager() {
        this.manager.removeRegistry(this.id);
    }








    /**
     * Observable properties and drives
     */


    /** 
     * Opacity property 
     */
    public readonly opacity: OpacityDrive = new OpacityDrive(this, 1);

    /** 
     * Minmax property 
     */
    public readonly minmax: MinmaxRegistryProperty = new MinmaxRegistryProperty(this, undefined);

    /**
     * Loading
     */
    public readonly loading: LoadingState = new LoadingState(this, false);

    /**
     * Range
     */
    public readonly range: RangeDriver = new RangeDriver(this, undefined);

    /**
     * Histogram
     */
    public readonly histogram: HistogramState = new HistogramState(this, []);

    /**
     * Palette
     */
    public readonly palette;


    public readonly filters = new FilterContainer( this );

    public getInstances() {
        let instances: ThermalFileInstance[] = [];

        this.groups.value.forEach( group => {
            instances = [ 
                ...instances, 
                ...group.getInstances() 
            ];
        } );

        return instances;
    }





}

export type ThermalStatistics = {
    from: number,
    to: number,
    percentage: number,
    count: number,
    height: number
}