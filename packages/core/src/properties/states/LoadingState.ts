import { AbstractProperty } from "../abstractProperty";
import { ThermalRegistry } from "../../hierarchy/ThermalRegistry";

export class LoadingState extends AbstractProperty<boolean, ThermalRegistry> {

    protected validate(value: boolean): boolean {
        return value;
    }

    protected afterSetEffect() {
        
    }

    public markAsLoading() {
        if ( this.value === false ) {
            this.value = true;
        }
    }

    public markAsLoaded() {
        if ( this.value === true ) {
            this.value = false;
        }
    }

}