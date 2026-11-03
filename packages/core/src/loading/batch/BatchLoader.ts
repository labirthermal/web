import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { BatchLoadingCallback, ThermalRegistry } from "../../hierarchy/ThermalRegistry";
import { CallbacksManager } from "../../properties/callbacksManager";
import { ThermalFileFailure } from "../workers/ThermalFileFailure";
import { Batch } from "./Batch";


/**
 * Handle batch loading of thermal files.
 * 
 * This class should be used as a lazy-loaded member of a thermal registry.
 */
export class BatchLoader {

    public readonly onBatchStart = new CallbacksManager< () => void >();

    public readonly onBatchComplete = new CallbacksManager< ( result: (ThermalFileInstance|ThermalFileFailure)[] ) => void >();

    private set: Set<Batch> = new Set;

    public get numberOfBatches() {
        return this.set.size;
    }

    public get currentOpenBatch() {
        return Array.from( this.set ).find( batch => batch.loading === false );
    }

    public get hasLoadingBatches() {
        return Array.from( this.set ).some( batch => batch.loading === true );
    }

    public get numLoadingBatches() {
        return Array.from( this.set ).filter( batch => batch.loading === true ).length;
    }

    public constructor(
        public readonly registry: ThermalRegistry
    ) {}

    /**
     * Get an open batch by its ID, creating it if necessary.
     *
     * A batch that already started loading is sealed - a new batch
     * with the same ID is created instead of reusing it.
     */
    public getBatchById(
        id: string
    ) {
        const found = Array.from( this.set ).find( batch => batch.id === id && batch.loading === false );
        if ( found ) {
            return found;
        }
        return this.createBatch( id );
    }

    /** Create a new batch and mark the registry as loading. */
    public createBatch( id?: string ): Batch {
        const item = Batch.init( this, id );
        this.set.add( item );

        // Any new batch means the registry has something to load
        this.registry.loading.markAsLoading();

        return item;
    }




    /**
     * Request a file through a batch
     * 
     * If there is an open batch, register the request in it. 
     * Else open a new batch.
     * 
     * The batch will execute automatically in the next tick.
     */
    public request(
        thermalUrl: string,
        visibleUrl: string|undefined,
        group: ThermalGroup,
        callback: BatchLoadingCallback,
        id?: string
    ): Batch {

        // Reuse the open batch (by ID or the anonymous one) or create a new one
        const openBatch = ( id 
            ? this.getBatchById( id ) 
            : this.currentOpenBatch
        ) ?? this.createBatch();

        openBatch.request( 
            thermalUrl, 
            visibleUrl, 
            group, 
            callback 
        );

        return openBatch;

    }

    closeBatch() {
        if ( this.currentOpenBatch !== undefined ) {
            this.currentOpenBatch.close();
        }
    }



    /**
     * This method is called from the inside of a batch object
     * to indicate its completion. 
     * 
     * Upon completion, the batch object is deleted and if there 
     * are no other batches, mark the registry as loaded.
     */
    public batchFinished(
        batch: Batch
    ) {
        
        this.set.delete(batch);

        /** Mark the registry as loaded whenever there are no other loading batches */
        if ( this.numberOfBatches === 0 ) {
            this.registry.loading.markAsLoaded();
        }

    }

}