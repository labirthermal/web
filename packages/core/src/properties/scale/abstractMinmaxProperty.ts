import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { ThermalRegistry } from "../../hierarchy/ThermalRegistry";
import { AbstractProperty } from "../abstractProperty";

export interface ThermalMinmaxType {
    min: number,
    max: number
}
export type ThermalMinmaxOrUndefined = ThermalMinmaxType | undefined;

/** 
 * A common basis for all Minmax properties 
 */
export abstract class AbstractMinmaxProperty<Target extends ThermalRegistry|ThermalGroup> extends AbstractProperty<ThermalMinmaxOrUndefined, Target> {

    /** Get the current distance between min and max */
    public get distanceInCelsius(): undefined|number {
        if ( this.value === undefined ) {
            return undefined;
        }
        return Math.abs( this.value.min - this.value.max );
    }

}