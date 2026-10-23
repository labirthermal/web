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

    public getBatchById(
        id: string
    ) {
        const found = Array.from( this.set ).find( batch => batch.id === id );
        if ( found ) {
            return found;
        }
        return this.createBatch( id );
    }

    public createBatch( id?: string ): Batch {
        const item = Batch.init( this, id );
        this.set.add( item );
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

        let openBatch = id 
            ? this.getBatchById( id ) 
            : this.currentOpenBatch;

        if ( openBatch === undefined ) {

            openBatch = Batch.init( this );
            this.set.add( openBatch );

            /** Mark the registry as loading - in any case */
            this.registry.loading.markAsLoading();

        }

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