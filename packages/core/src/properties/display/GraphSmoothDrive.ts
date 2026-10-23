import { ThermalManager } from "../../hierarchy/ThermalManager";
import { AbstractProperty } from "../abstractProperty";


/** Controls image smoothing */
export class GraphSmoothDrive extends AbstractProperty<boolean, ThermalManager> {
    protected validate(value: boolean): boolean {
        return value;
    }
    protected afterSetEffect(): void {}

    setGraphSmooth(value: boolean) {
        this.value = value;
    }
}