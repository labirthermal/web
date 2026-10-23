import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { AbstractMinmaxProperty, ThermalMinmaxOrUndefined, ThermalMinmaxType } from "./abstractMinmaxProperty";


export class MinmaxGroupProperty extends AbstractMinmaxProperty<ThermalGroup> {

    protected validate(value: ThermalMinmaxOrUndefined): ThermalMinmaxOrUndefined {
        return value;
    }

    protected afterSetEffect() {
    
    }

    /** Call this method once all instances are created */
    public recalculateFromInstances() {

        this.value = this._getMinmaxFromInstances();

        return this.value;
    }


    protected _getMinmaxFromInstances(): ThermalMinmaxOrUndefined {

        const instances = this.parent.files.value;

        if (instances.length === 0)
            return undefined;
        return instances.reduce((state, current) => {

            if (current.min < state.min || current.max > state.max) {
                return {
                    min: current.min < state.min ? current.min : state.min,
                    max: current.max > state.max ? current.max : state.max
                }
            }

            return state;

        }, { min: Infinity, max: -Infinity } as ThermalMinmaxType);
    }

}