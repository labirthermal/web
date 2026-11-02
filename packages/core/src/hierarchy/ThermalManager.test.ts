import { describe, expect, test, vi } from 'vitest';
import { ThermalManager } from './ThermalManager';
import { ThermalRegistry } from './ThermalRegistry';
import { getPool } from '../utils/pool';

describe( "ThermalManager", async () => {
    
    const REGISTRY_ID = "registry_id";

    const pool = await getPool();

    test( "handling registries", async () => {

        const manager = new ThermalManager(pool);
        
        const registry = manager.registries.addOrGetRegistry( REGISTRY_ID );

        // Test creating one registry
        expect( registry ).toBeInstanceOf( ThermalRegistry );
        expect( registry.id ).toEqual( REGISTRY_ID );

        // Test getting an existing registry
        const registry_second = manager.registries.addOrGetRegistry( REGISTRY_ID );
        expect( registry_second.id ).toEqual( REGISTRY_ID );
        expect( registry_second.hash ).toEqual( registry.hash );
        expect( registry_second ).toEqual( registry );

        // Test the length of registries
        expect( manager.registries.value.length ).toEqual( 1 );

        // Remove the registry
        manager.registries.removeRegistry( REGISTRY_ID );
        expect( manager.registries.value.length ).toEqual( 0 );

    } );

    test( "notifies listeners only when the registry collection changes", () => {
        const manager = new ThermalManager(pool);
        const listener = vi.fn();
        manager.registries.addListener("test", listener);

        const first = manager.registries.addOrGetRegistry("first", { histogramResolution: 200 });
        const originalValue = manager.registries.value;
        expect(listener).toHaveBeenCalledExactlyOnceWith([first]);

        expect(manager.registries.addOrGetRegistry("first", { histogramResolution: 300 })).toBe(first);
        expect(first.histogram.resolution).toBe(200);
        expect(listener).toHaveBeenCalledTimes(1);

        const second = manager.registries.addOrGetRegistry("second");
        expect(listener).toHaveBeenLastCalledWith([first, second]);
        expect(originalValue).toEqual([first]);

        manager.registries.removeRegistry("missing");
        expect(listener).toHaveBeenCalledTimes(2);

        manager.registries.removeRegistry("first");
        expect(listener).toHaveBeenLastCalledWith([second]);
        expect(listener).toHaveBeenCalledTimes(3);

        manager.registries.removeListener("test");
        manager.registries.addOrGetRegistry("third");
        expect(listener).toHaveBeenCalledTimes(3);
    } );

    test( "removing a registry destroys its descendants and resets its properties once", () => {
        const manager = new ThermalManager(pool);
        const registry = manager.registries.addOrGetRegistry(REGISTRY_ID);
        const group = registry.groups.addOrGetGroup("group");
        registry.opacity.imposeOpacity(0.25);

        const destroyRegistry = vi.spyOn(registry, "destroySelfAndBelow");
        const destroyGroup = vi.spyOn(group, "destroySelfAndBelow");
        const removeInstances = vi.spyOn(group.files, "removeAllInstances");
        const resetMinmax = vi.spyOn(registry.minmax, "reset");
        const groupsListener = vi.fn();
        registry.groups.addListener("test", groupsListener);

        manager.registries.removeRegistry(REGISTRY_ID);

        expect(destroyRegistry).toHaveBeenCalledOnce();
        expect(destroyGroup).toHaveBeenCalledOnce();
        expect(removeInstances).toHaveBeenCalledOnce();
        expect(resetMinmax).toHaveBeenCalledOnce();
        expect(groupsListener).toHaveBeenCalledExactlyOnceWith([]);
        expect(registry.opacity.value).toBe(1);
        expect(registry.groups.value).toEqual([]);
        expect(manager.registries.value).toEqual([]);
        expect(manager.registries.addOrGetRegistry(REGISTRY_ID)).not.toBe(registry);
    } );

    test( "reset destroys all registries and notifies listeners with the empty collection", () => {
        const manager = new ThermalManager(pool);
        const registries = ["first", "second"].map(id => manager.registries.addOrGetRegistry(id));
        const groups = registries.map(registry => registry.groups.addOrGetGroup("group"));
        const registryDestructors = registries.map(registry => vi.spyOn(registry, "destroySelfAndBelow"));
        const groupDestructors = groups.map(group => vi.spyOn(group, "destroySelfAndBelow"));
        const listener = vi.fn();
        manager.registries.addListener("test", listener);

        manager.registries.reset();

        registryDestructors.forEach(destroy => expect(destroy).toHaveBeenCalledOnce());
        groupDestructors.forEach(destroy => expect(destroy).toHaveBeenCalledOnce());
        expect(listener).toHaveBeenCalledExactlyOnceWith([]);
        expect(manager.registries.value).toEqual([]);
        registries.forEach(registry => {
            expect(manager.registries.addOrGetRegistry(registry.id)).not.toBe(registry);
        });
    } );

    test( "iterates through registries and their groups in insertion order", () => {
        const manager = new ThermalManager(pool);
        const first = manager.registries.addOrGetRegistry("first");
        const second = manager.registries.addOrGetRegistry("second");
        const groups = [
            first.groups.addOrGetGroup("one"),
            first.groups.addOrGetGroup("two"),
            second.groups.addOrGetGroup("one")
        ];
        const registriesCallback = vi.fn();
        const groupsCallback = vi.fn();

        manager.registries.forEveryRegistry(registriesCallback);
        manager.registries.forEveryGroup(groupsCallback);

        expect(registriesCallback.mock.calls.map(([registry]) => registry)).toEqual([first, second]);
        expect(groupsCallback.mock.calls.map(([group]) => group)).toEqual(groups);

        manager.removeAllChildren();
        expect(manager.registries.value).toEqual([]);
        expect(first.groups.value).toEqual([]);
        expect(second.groups.value).toEqual([]);
    } );

    test( "initialisation with options", () => {

        const manager_with_defaults = new ThermalManager(pool);
        expect( manager_with_defaults.palette.value ).toEqual( "jet" );

        const manager_with_options = new ThermalManager( pool, { palette: "iron" } );
        expect( manager_with_options.palette.value ).toEqual( "iron" );

    } );

    test( "palette management", () => {
        const manager = new ThermalManager(pool);
        const registry = manager.registries.addOrGetRegistry( REGISTRY_ID );

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