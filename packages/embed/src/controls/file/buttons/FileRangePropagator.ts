import type { ThermalFileInstance } from "@labirthermal/core";
import { t } from "i18next";
import { property } from "lit/decorators.js";
import { T } from "../../../translations/Languages";
import { booleanConverter } from "../../../utils/converters/booleanConverter";
import { AbstractFileButton } from "./AbstractFileButton";

export class FileRangePropagator extends AbstractFileButton {

    protected tooltip: string = t(T.range)

    @property({ type: String, converter: booleanConverter(false) })
    public hideLabel: boolean = false;

    public onInstanceCreated(file: ThermalFileInstance): void {
        this.tooltip = [
            file.min.toFixed(2),
            "—",
            file.max.toFixed(2),
            "°C"
        ].join(" ");
    }

    enter() {

        if ( this.registryController && this.file ) {
            this.registryController.setHighlight({
                from: this.file.min,
                to: this.file.max
            });
        
        }

    }
    leave() {

        if (this.registryController) {
            this.registryController.setHighlight(undefined);
        }

    }

    action() {
        if (this.file) {
            this.file.group.registry.range.imposeRange({
                from: this.file.min,
                to: this.file.max
            });
        }
    }

    getDefaultLabel(): string {
        if (this.hideLabel) return "";
        return t(T.range).toLowerCase();
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-range-propagator": FileRangePropagator;
    }
}
