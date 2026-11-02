import { ThermalManager } from "../../hierarchy/ThermalManager";
import { AbstractProperty } from "../abstractProperty";
import { ThermalRegistry, ThermalRegistryOptions } from "../../hierarchy/ThermalRegistry";
import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { ThermalFileInstance } from "../../file/ThermalFileInstance";

export class RegistriesState extends AbstractProperty<ThermalRegistry[], ThermalManager> {

    private map = new Map<string, ThermalRegistry>();


    protected validate(value: ThermalRegistry[]): ThermalRegistry[] {
        
        // Zajisti, aby všechny registry měly unikátní ID a nic nebylo duplikováno
        const ids = value.map(registry => registry.id);
        const uniqueIds = Array.from( new Set(ids) );
        if (ids.length !== uniqueIds.length) {
            throw new Error("Duplicate registry IDs found.");
        }
        return value;

    }

    protected afterSetEffect(value: ThermalRegistry[]): void {
        
        // Clear the map
        this.map.clear();

        // Insert all registries into the map
        value.forEach( registry => this.map.set(registry.id, registry) );
    }

    public addOrGetRegistry(
        id: string,
        options?: ThermalRegistryOptions
    ): ThermalRegistry {

        if ( this.map.has(id) ) {
            return this.map.get(id)!;
        }

        const registry = new ThermalRegistry(id, this.parent,options);
        this.value = [...this.value, registry];

        return registry;

    }

    public removeRegistry(id: string): void {

        const registry = this.map.get(id);
        if ( !registry ) {
            return;
        }

        registry.destroySelfAndBelow();

        this.value = this.value.filter( registry => registry.id !== id );

    }

    public override reset(): void {
        this.forEveryRegistry( registry => registry.destroySelfAndBelow() );
        super.reset();
    }

    public forEveryRegistry(
        callback: (registry: ThermalRegistry) => void
    ): void {
        this.value.forEach(callback);
    }

    public forEveryGroup(
        callback: (group: ThermalGroup) => void
    ): void {
        this.forEveryRegistry( registry => {
            registry.groups.forEveryGroup(callback);
        });
    }

    public forEveryInstance(
        callback: (instance: ThermalFileInstance) => void
    ): void {
        this.forEveryRegistry( registry => {
            registry.groups.forEveryInstance(callback);
        });
    }


}