import { describe, expect, test } from 'vitest';
import { ThermalManager } from './ThermalManager';
import { ThermalRegistry } from './ThermalRegistry';
import { getPool } from '../utils/pool';

describe( "ThermalManager", async () => {
    
    const REGISTRY_ID = "registry_id";

    const pool = await getPool();

    test( "handling registries", async () => {

        const manager = new ThermalManager(pool);
        
        const registry = manager.addOrGetRegistry( REGISTRY_ID );

        // Test creating one registry
        expect( registry ).toBeInstanceOf( ThermalRegistry );
        expect( registry.id ).toEqual( REGISTRY_ID );

        // Test getting an existing registry
        const registry_second = manager.addOrGetRegistry( REGISTRY_ID );
        expect( registry_second.id ).toEqual( REGISTRY_ID );
        expect( registry_second.hash ).toEqual( registry.hash );
        expect( registry_second ).toEqual( registry );

        // Test the length of registries
        expect( Object.values( manager.registries ).length ).toEqual( 1 );

        // Remove the registry
        manager.removeRegistry( REGISTRY_ID );
        expect( Object.values( manager.registries ).length ).toEqual( 0 );

    } );

    test( "initialisation with options", () => {

        const manager_with_defaults = new ThermalManager(pool);
        expect( manager_with_defaults.palette.value ).toEqual( "jet" );

        const manager_with_options = new ThermalManager( pool, { palette: "iron" } );
        expect( manager_with_options.palette.value ).toEqual( "iron" );

    } );

    test( "palette management", () => {
        const manager = new ThermalManager(pool);
        const registry = manager.addOrGetRegistry( REGISTRY_ID );

        // Checks before the change
        expect( manager.palette.value ).toEqual( "jet" );
        expect( manager.palette.currentPalette.name ).toEqual( "JET" );
        expect( manager.palette.value ).toEqual( registry.palette.value );

        // Checks after the change
        manager.palette.setPalette( "iron" );
        
        expect( manager.palette.value ).toEqual( "iron" );
        expect( manager.palette.currentPalette.name ).toEqual( "IRON" );
        expect( manager.palette.value ).toEqual( registry.palette.value );

    } );

} );