import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { BatchLoadingCallback } from "../../hierarchy/ThermalRegistry";
import { CallbacksManager } from "../../properties/callbacksManager";
import { FileErrors } from "../workers/errors";
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
    request(
        thermalUrl: string,
        visibleUrl: string | undefined,
        group: ThermalGroup,
        callback: BatchLoadingCallback,
    ) {

        // A loading batch is sealed - route the late request through the loader
        if ( this._loading ) {
            this.loader.request( thermalUrl, visibleUrl, group, callback );
            return;
        }

        this.queue.push({
            thermalUrl,
            visibleUrl,
            group,
            callback,
        });

        // Re-arm the timer so that the batch executes one tick after the last request
        if (this.timeout !== undefined) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => this.execute(), 0);

    }

    /** Seal the batch and execute it immediately instead of waiting for the next tick. */
    close() {
        this.execute();
    }

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
    private async execute(): Promise<void> {

        // Guard against a double run (e.g. `close()` followed by the pending timer)
        if ( this._loading ) {
            return;
        }

        this._loading = true;

        // The pending timer is consumed by this execution
        if ( this.timeout !== undefined ) {
            clearTimeout( this.timeout );
            this.timeout = undefined;
        }

        const results: (ThermalFileInstance|ThermalFileFailure)[] = [];

        try {

            // Load the files and create their instances in parallel
            const settled = await Promise.all(this.queue.map(async item => {

                try {

                    const result = await this.loader.registry.service.loadFile( item.thermalUrl, item.visibleUrl );

                    // Known loading errors come back as `ThermalFileFailure` and are passed through
                    const instanceOrFailure = result instanceof ThermalFileReader
                        ? await result.createInstance( item.group )
                        : result as ThermalFileFailure;

                    return { result: instanceOrFailure, callback: item.callback };

                } catch ( error ) {

                    // Unexpected errors (malformed buffer, ...) must not kill the entire batch
                    return {
                        result: new ThermalFileFailure( item.thermalUrl, FileErrors.NOT_SPECIFIED, ( error as Error ).message ),
                        callback: item.callback
                    };

                }

            }));

            // The post-processing (min/max, ranges, histogram) runs once for the entire batch
            this.loader.registry.postLoadedProcessing();

            // The callbacks run after the post-processing. A throwing callback
            // must not block the remaining callbacks nor the batch completion.
            await Promise.all(settled.map(async item => {
                try {
                    await item.callback( item.result );
                } catch ( error ) {
                    console.error( `A batch request callback of '${item.result.thermalUrl}' failed:`, error );
                }
            }));

            results.push( ...settled.map( item => item.result ) );

            this.loader.onBatchComplete.call( results );

        } finally {

            // Mark this batch as loaded and remove it from the loader in any case
            this.loader.batchFinished(this);

            this.onResolve.call( results );

        }

    }

}