import { describe, expect, test } from 'vitest';
import { FilesService } from './FilesService';
import { ThermalFileReader } from './ThermalFileReader';
import { THERMOGRAM_PATHS } from '../../../devserver/node/mocks';
import { ThermalFileFailure } from './ThermalFileFailure';
import { getPool } from '../../utils/pool';

describe( "FilesService", async () => {

    const pool = await getPool();

    test( "loading one file", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        // This file should load successfully
        const file = await service.loadFile( THERMOGRAM_PATHS.SOUSTRUH, "some_visible_url.png" ) as ThermalFileReader;
        expect( file ).toBeInstanceOf( ThermalFileReader );

        // The file should be already in cache
        expect( service.fileIsInCache( THERMOGRAM_PATHS.SOUSTRUH ) ).toEqual( true );

        // Make sure the URLs are in the service
        expect( file.thermalUrl ).toEqual( THERMOGRAM_PATHS.SOUSTRUH );
        expect( file.visibleUrl ).toEqual( "some_visible_url.png" );


    } );

    test( "loading fails when the file does not exist", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        // This file should be loaded insuccessfully
        const non_existing_file = await service.loadFile( THERMOGRAM_PATHS.ERR404 );
        expect( non_existing_file ).toBeInstanceOf( ThermalFileFailure );

        // The file should be already in cache
        expect( service.fileIsInCache( THERMOGRAM_PATHS.ERR404 ) ).toEqual( true );

    } );

    test( "loading file that is already in the cache", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const first_file = await service.loadFile( THERMOGRAM_PATHS.SEQUENCE ) as ThermalFileReader;
        const second_file = await service.loadFile( THERMOGRAM_PATHS.SEQUENCE ) as ThermalFileReader;

        expect( first_file.id ).toEqual( second_file.id );
        expect( first_file ).toEqual( second_file );

    } );

    test( "concurrent requests to one file", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        // The first request
        service.loadFile( THERMOGRAM_PATHS.DELAYED_SEQUENCE );

        // There should be one pending request on the given URL
        expect( service.requestsCount ).toEqual( 1 );
        expect( service.fileIsPending( THERMOGRAM_PATHS.DELAYED_SEQUENCE ) ).toEqual( true );

        // Any subsequent requests "hook" to the existing request
        service.loadFile( THERMOGRAM_PATHS.DELAYED_SEQUENCE );
        service.loadFile( THERMOGRAM_PATHS.DELAYED_SEQUENCE );
        service.loadFile( THERMOGRAM_PATHS.DELAYED_SEQUENCE );
        service.loadFile( THERMOGRAM_PATHS.DELAYED_SEQUENCE );

        // The number of requests should still be the same
        expect( service.requestsCount ).toEqual( 1 );
        expect( service.fileIsPending( THERMOGRAM_PATHS.DELAYED_SEQUENCE ) ).toEqual( true );

        // Now load start one request with avait
        const request_one = await service.loadFile( THERMOGRAM_PATHS.DELAYED_SEQUENCE ) as ThermalFileReader;

        // The service should be at hand
        expect( request_one.isSuccess() ).toEqual( true );

        // The request should be already off
        expect( service.fileIsPending( THERMOGRAM_PATHS.DELAYED_SEQUENCE ) ).toEqual( false );

        // Make sure any subsequent requests to the given file return same service
        const request_two = await service.loadFile( THERMOGRAM_PATHS.DELAYED_SEQUENCE ) as ThermalFileReader;

        expect( request_one.id ).toEqual( request_two.id );
        expect( request_one ).toEqual( request_two );        

    } );

    test( "loading multiple files paralelly", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const batch = await Promise.all([
            service.loadFile( THERMOGRAM_PATHS.SOUSTRUH ),
            service.loadFile( THERMOGRAM_PATHS.SEQUENCE ),
            service.loadFile( THERMOGRAM_PATHS.TUCNACI ),
            service.loadFile( THERMOGRAM_PATHS.ERR404 )
        ]);

        expect( batch.length ).toEqual( 4 );
        expect( service.cachedServicesCount ).toEqual( 4 );

    } );

} );