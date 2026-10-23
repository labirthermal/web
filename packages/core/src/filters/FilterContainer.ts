import { AbstractThermalFile } from "../file/AbstractThermalFile";
import { ThermalGroup } from "../hierarchy/ThermalGroup";
import { ThermalManager } from "../hierarchy/ThermalManager";
import { ThermalRegistry } from "../hierarchy/ThermalRegistry";
import { CallbacksManager } from "../properties/callbacksManager";
import { AbstractFilter } from "./AbstractFilter";

type FilterParent = ThermalManager|ThermalRegistry|ThermalGroup|AbstractThermalFile;



export class FilterContainer {

    private _layers: AbstractFilter[] = [];
    public get layers() { return this._layers; }
    public onLayers = new CallbacksManager< ( layers: AbstractFilter[] ) => void >
    protected setLayers( layers: AbstractFilter[] ) {
        if ( layers.length !== this._layers.length ) {
            this._layers = layers;
            this.onLayers.call( this.layers );
        }
    }

    public constructor(
        public readonly parent: FilterParent
    ) {

    }



    public getActiveFilters(): AbstractFilter[] {
        return this.layers.filter( layer => layer.bypass === false );
    }

    public addFilter( filter: AbstractFilter ) {

        if ( this.layers.includes( filter ) ) {
            console.error( `filter ${filter} is already in ${this.parent}` );
        }

        this._layers.push( filter );
        this.onLayers.call( this.layers );

    }

    public removeFilter(
        filter: AbstractFilter
    ) {
        if ( this.layers.includes( filter ) ) {
            this._layers = this.layers.filter( layer => layer !== filter );
            this.onLayers.call( this.layers );
        }
    }

    public applyFilters() {

        this.parent.getInstances().forEach( instance => {
            instance.applyAllAvailableFilters();
        } );

    }

    public getFiltersArray() {

    }

}