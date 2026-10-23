import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { BatchLoadingCallback } from "../../hierarchy/ThermalRegistry";
import { CallbacksManager } from "../../properties/callbacksManager";
import { ThermalFileFailure } from "../workers/ThermalFileFailure";
import { ThermalFileReader } from "../workers/ThermalFileReader";
import { BatchLoader } from "./BatchLoader";

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
export class Batch {

    private _loading = false;
    public get loading() { return this._loading; }

    public readonly onResolve = new CallbacksManager< ( result: (ThermalFileInstance|ThermalFileFailure)[] ) => void >();
    


    /** The current timeout fn that is being overriden by every call of the `request` method */
    private timeout?: ReturnType<typeof setTimeout> = undefined;

    /** Array of currently queued requests */
    private queue: Array<{
        thermalUrl: string,
        visibleUrl?: string,
        group: ThermalGroup,
        /** This callback will be fired AFTER */
        callback: BatchLoadingCallback,
    }> = [];

    public get size() { return this.queue.length; }

    protected constructor(
        protected readonly loader: BatchLoader,
        public readonly id?: string
    ) { }

    public static init(
        loader: BatchLoader,
        id?: string
    ) {
        return new Batch(loader, id);
    }

    public static initWithRequest(
        loader: BatchLoader,
        thermalUrl: string,
        visibleUrl: undefined | string = undefined,
        group: ThermalGroup,
        callback: BatchLoadingCallback
    ) {

        const item = new Batch(loader);

        item.request(thermalUrl, visibleUrl, group, callback);

        return item;

    }


    /**
     * Request a thermal file
     * 
     * Requesting adds new record to the queue and creates a new
     * timeout closure.
     */
    request(
        thermalUrl: string,
        visibleUrl: string | undefined,
        group: ThermalGroup,
        callback: BatchLoadingCallback,
    ) {

        this.queue.push({
            thermalUrl,
            visibleUrl,
            group,
            callback,
        });

        // From here, no function arguments shall ever be used!
        // in the timeout, I need to call the inner properties of already
        // registered request. Using fn parameters below caused plenty of
        // bugs. BEWARE OF THAT.


        if (this.timeout !== undefined) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(async () => {

            this._loading = true;

            const loadedReaders = await Promise.all(this.queue.map(async item => {
                return {
                    result: await this.loader.registry.service.loadFile(item.thermalUrl, item.visibleUrl),
                    callback: item.callback,
                    group: item.group,
                };
            }));

            // Create the instances eventually
            const createdInstances = await Promise.all(loadedReaders
                .map(async result => {

                    const item = result.result instanceof ThermalFileReader
                        ? await result.result.createInstance( result.group )
                        : await result.result as ThermalFileFailure

                    return {
                        result: item,
                        callback: result.callback
                    }

                }));

            this.loader.registry.postLoadedProcessing();

            const results = await Promise.all(createdInstances.map(async result => {
                await result.callback(result.result);
                return result.result;
            }));

            this.loader.onBatchComplete.call( results );

            // Mark this queue as loaded
            this.loader.batchFinished(this);

            this.onResolve.call( results );

        }, 0);

    }

    close() {
        this._loading = true;
    }

}