import { describe, expect, it } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../devserver/node/mocks';
import { ThermalManager } from '../../hierarchy/ThermalManager';


const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


describe( "BatchLoader", () => {
    

    it( "should load one instance", async () => {

        // Init fake timer in this test

        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry( "registry" );
        const group = registry.groups.addOrGetGroup( "group" );

        const loader = registry.batch;


        // Zero before any action

        expect( loader.currentOpenBatch ).toEqual( undefined );
        expect( loader.hasLoadingBatches ).toEqual( false );
        expect( loader.numLoadingBatches ).toEqual(0);

        // The registry should not be loading yet
        expect( registry.loading.value ).toEqual( false );

        let counter = 0;

        // Register a request
        loader.request(
            THERMOGRAM_PATHS.SOUSTRUH,
            undefined,
            group,
            async () => {
                counter = counter + 1;
            }
        );

        // Now there should be one batch
        expect( loader.currentOpenBatch ).not.toBeUndefined();
        expect( loader.hasLoadingBatches ).toEqual( false );
        expect( loader.numLoadingBatches ).toEqual( 0 );

        // The registry should be loading by now
        expect( registry.loading.value ).toEqual( true );


        // In the next tick, the loading should have started
        await sleep(0);

        expect( registry.loading.value ).toEqual( true );

        expect( loader.currentOpenBatch ).toBeUndefined();
        expect( loader.hasLoadingBatches ).toEqual( true );
        expect( loader.numLoadingBatches ).toEqual( 1 );

        expect( counter ).toEqual( 0 );

        await sleep(1000);

        expect( registry.loading.value ).toEqual( false );
        expect( loader.currentOpenBatch ).toBeUndefined();
        expect( loader.hasLoadingBatches ).toEqual( false );
        expect( loader.numLoadingBatches ).toEqual( 0 );

        expect( counter ).toEqual( 1 );

    } );


    it( "should load more than one instances in a single batch", async () => {

        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry( "registry" );
        const group = registry.groups.addOrGetGroup( "group" );

        const loader = registry.batch;

        let counter = 0;

        loader.request(
            THERMOGRAM_PATHS.SEQUENCE,
            undefined,
            group,
            async () => {
                counter = counter + 1;
            }
        );

        loader.request(
            THERMOGRAM_PATHS.SOUSTRUH,
            undefined,
            group,
            async () => {
                counter = counter + 1;
            }
        );

        expect( loader.numLoadingBatches ).toEqual( 0 );
        expect( loader.numberOfBatches ).toEqual( 1 );
        expect( loader.currentOpenBatch?.size ).toEqual( 2 );

        loader.request(
            THERMOGRAM_PATHS.TUCNACI,
            undefined,
            group,
            async () => {
                counter = counter + 1;
            }
        );

        expect( loader.numLoadingBatches ).toEqual( 0 );
        expect( loader.numberOfBatches ).toEqual( 1 );
        expect( loader.currentOpenBatch?.size ).toEqual( 3 );

        await sleep( 0 );

        // In the next tick the current batch is loaded
        expect( loader.numLoadingBatches ).toEqual( 1 );
        expect( loader.currentOpenBatch ).toBeUndefined();

        await sleep( 1000 );

        expect( loader.numLoadingBatches ).toEqual( 0 );
        expect( loader.numberOfBatches ).toEqual( 0 );

        expect( counter ).toEqual(3);


    } );


    it( "should be able to run more than one batch at the same time", async () => {

        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry( "registry" );
        const group = registry.groups.addOrGetGroup( "group" );

        const loader = registry.batch;

        let instanceCounter = 0;
        let loadingCounter = 0;

        registry.loading.addListener( "test", () => {
            loadingCounter = loadingCounter + 1;
        } );

        const createBatch = (...urls: string[]) => {
            urls.forEach(url => loader.request(
                url,
                undefined,
                group,
                async () => {
                    instanceCounter = instanceCounter + 1;
                }
            ));

            loader.closeBatch();
            
        }

        expect( loadingCounter ).toEqual(0);

        /** The first batch is being created */
        createBatch(
            THERMOGRAM_PATHS.SOUSTRUH,
            THERMOGRAM_PATHS.TUCNACI,
            THERMOGRAM_PATHS.SEQUENCE
        );

        expect( loader.numberOfBatches ).toEqual(1);
        expect( loader.numLoadingBatches ).toEqual(1);
        expect( loader.currentOpenBatch ).toBeUndefined();

        expect( registry.loading.value ).toEqual( true );

        expect( loadingCounter ).toEqual(1);

        // In the next tick...
        await sleep(0);

        expect( loader.numberOfBatches ).toEqual(1);
        expect( loader.numLoadingBatches ).toEqual(1);
        expect( loader.currentOpenBatch ).toBeUndefined();

        // Create a second batch
        createBatch( 
            THERMOGRAM_PATHS.SOUSTRUH, 
            THERMOGRAM_PATHS.TUCNACI 
        );

        expect( loader.numberOfBatches ).toEqual(2);
        expect( loader.numLoadingBatches ).toEqual(2);

        expect( loadingCounter ).toEqual(1);

        // After another tick
        await sleep(0);

        expect( loader.numberOfBatches ).toEqual(1);
        expect( loader.numLoadingBatches ).toEqual(1);
        expect( loader.currentOpenBatch ).toBeUndefined();

        expect( registry.loading.value ).toEqual( false );

        expect( loadingCounter ).toEqual(2);

        // Wait for all batches to load

        await sleep( 1000 );

        expect( loader.numberOfBatches ).toEqual(0);
        expect( instanceCounter ).toEqual(5);
        expect( loader.currentOpenBatch ).toBeUndefined();
        expect( loader.numLoadingBatches ).toEqual(0);

        expect( loadingCounter ).toEqual(2);

        expect( registry.loading.value ).toEqual( false );


    } );


} );