import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { ThermalRegistry } from "../../hierarchy/ThermalRegistry";
import { AbstractMinmaxProperty, ThermalMinmaxOrUndefined } from "./abstractMinmaxProperty";

export class MinmaxRegistryProperty extends AbstractMinmaxProperty<ThermalRegistry> {

    protected validate(value: ThermalMinmaxOrUndefined): ThermalMinmaxOrUndefined {
        return value;
    }

    protected afterSetEffect() {
        
    }

    public recalculateFromGroups() {

        const groups = this.parent.groups.value;

        this.value = this._getMinmaxFromAllGroups( groups );

        return this.value;
    }

    protected _getMinmaxFromAllGroups(
        groups: ThermalGroup[]
    ): ThermalMinmaxOrUndefined {

        if (groups.length === 0) {
            return undefined;
        }

        const minmax = groups.reduce((state, current) => {

            if (current.minmax.value === undefined) {
                return state;
            }

            return {
                min: current.minmax.value.min < state.min ? current.minmax.value.min : state.min,
                max: current.minmax.value.max > state.max ? current.minmax.value.max : state.max
            }

        }, { min: Infinity, max: -Infinity });

        return minmax;

    }
}