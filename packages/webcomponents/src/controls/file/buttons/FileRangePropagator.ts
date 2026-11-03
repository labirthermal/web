import type { ThermalFileInstance, ThermalUnit } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { managerUnitContext } from "../../../controllers/ManagerController";
import { T } from "../../../translations/Languages";
import { AbstractFileButton } from "./AbstractFileButton";

export class FileRangePropagator extends AbstractFileButton {

    @state()
    @consume({ context: managerUnitContext, subscribe: true })
    private unit?: ThermalUnit;

    @property({ type: Boolean, reflect: true, attribute: "hide-label"})
    public hideLabel: boolean = false;

    private boundFile?: ThermalFileInstance;

    connectedCallback(): void {
        super.connectedCallback();
        this.bindFile();
    }

    disconnectedCallback(): void {
        this.unbindFile();
        super.disconnectedCallback();
    }

    willUpdate(changedProperties: PropertyValues<this>): void {
        super.willUpdate(changedProperties);
        this.bindFile();
    }

    /** Metadata can change after filtering without replacing the file instance. */
    private bindFile(): void {
        if (!this.isConnected || this.file === this.boundFile) return;

        this.unbindFile();
        this.boundFile = this.file;
        this.boundFile?.meta.onChange.set(this.UUID, () => this.requestUpdate());
    }

    private unbindFile(): void {
        this.boundFile?.meta.onChange.delete(this.UUID);
        this.boundFile = undefined;
    }

    /** The file bounds and all range interactions remain in Celsius. */
    protected get tooltip(): string {
        if (!this.file) return t(T.range);
        return this.managerController.formatRange(
            this.managerController.toCurrentUnit(this.file.min),
            this.managerController.toCurrentUnit(this.file.max)
        );
    }

    /** The file context and metadata listener provide the tooltip values. */
    public onInstanceCreated(): void {}

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
