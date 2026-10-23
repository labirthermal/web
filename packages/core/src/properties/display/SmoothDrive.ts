import { ThermalManager } from "../../hierarchy/ThermalManager";
import { AbstractProperty } from "../abstractProperty";


/** Controls image smoothing */
export class SmoothDrive extends AbstractProperty<boolean, ThermalManager> {
    protected validate(value: boolean): boolean {
        return value;
    }
    protected afterSetEffect(value: boolean): void {

        this.parent.forEveryRegistry( registry => registry.forEveryInstance( instance => {

            const canvasLayer = instance.dom?.canvasLayer;
            if ( canvasLayer ) {
                canvasLayer.canvas.style.imageRendering = value === true ? "auto" : "pixelated";
            } else {
                console.warn("Canvas layer not found when trying to set image smooth rendering", instance);
            }

        } ) );

    }

    setSmooth(value: boolean) {
        this.value = value;
    }
}