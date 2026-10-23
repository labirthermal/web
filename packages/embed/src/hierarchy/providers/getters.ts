import type { ThermalGroup, ThermalManagerOptions, ThermalRegistry } from "@labirthermal/core";
import { ThermalManager } from "@labirthermal/core";

export const defaultManager = new ThermalManager;

export const defaultRegistryKey = "__internal_default_registry";

export const defaultGroupyKey = "__internal_default_group";

declare global {
    interface Window { Thermal: {
        managers: Map<string,ThermalManager>
    }; }
}

window.Thermal = {
    managers: new Map
};

// window.Thermal.managers = new Map;
window.Thermal.managers.set( "default", defaultManager );

/** Create or get a manager instance from the global window object. */
export const createOrGetManager = (
    slug?: string,
    options?: ThermalManagerOptions
) => {

    if ( slug === undefined ) {
        return window.Thermal.managers.get( "default" )!;
    } else if ( window.Thermal.managers.has( slug ) ) {
        return window.Thermal.managers.get( slug )!;
    } else {
        const manager = new ThermalManager( undefined, options );
        window.Thermal.managers.set( slug, manager );
        return manager;
    }
    
}

/** Remove the manager along with all its contents. */
export const removeManager = (
    manager: ThermalManager
) => {

    let slug: string|undefined = undefined;

    window.Thermal.managers.forEach( ( m, key ) => {
        if ( m.id === manager.id ) {
            slug = key;
        }
    } );

    console.log( "removing", manager );

    if ( slug !== undefined ) {

        console.log( "found and removing", slug );

        const foundManager = window.Thermal.managers.get( slug );

        if ( foundManager ) {

            // Remove all objects internally
            foundManager.forEveryRegistry( registry => foundManager.removeRegistry( registry.id ) );

            // Delete the object from global key
            window.Thermal.managers.delete( slug );

        }

    }
    
}


export const getDefaultRegistry = (
    manager: ThermalManager
) => {
    return manager.addOrGetRegistry(defaultRegistryKey);
}

export const getDefaultGroup = (
    registry: ThermalRegistry
): ThermalGroup => {
    return registry.groups.addOrGetGroup(defaultGroupyKey);
}