import type { ThermalRangeOrUndefined, ThermalRegistry, ThermalUnit } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import { html, type PropertyValues } from "lit";
import { state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { managerUnitContext } from "../../controllers/ManagerController";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { T } from "../../translations/Languages";

export class RegistryRangeAutoButton extends AbstractRegistryConsumer {

    /** The auto range remains in Celsius until it is formatted for the tooltip. */
    @state()
    private autoRange: ThermalRangeOrUndefined;

    @state()
    @consume({ context: managerUnitContext, subscribe: true })
    private unit?: ThermalUnit;

    private boundRegistry?: ThermalRegistry;

    connectedCallback(): void {
        super.connectedCallback();
        this.bindRegistry();
    }

    disconnectedCallback(): void {
        this.unbindRegistry();
        super.disconnectedCallback();
    }

    willUpdate(changedProperties: PropertyValues<this>): void {
        super.willUpdate(changedProperties);
        this.bindRegistry();
    }

    /** Follow the auto range itself and remove the listener from the original registry. */
    private bindRegistry(): void {
        const registry = this.registryController?.registryObject;
        if (!this.isConnected || registry === this.boundRegistry) return;

        this.unbindRegistry();
        this.boundRegistry = registry;
        this.autoRange = registry?.range.autoValue;
        registry?.range.onAutoValueChanged.set(this.UUID, value => {
            this.autoRange = value;
        });
    }

    private unbindRegistry(): void {
        this.boundRegistry?.range.onAutoValueChanged.delete(this.UUID);
        this.boundRegistry = undefined;
    }

    private get value(): string | undefined {
        if (!this.autoRange) return undefined;
        return this.managerController.formatRange(
            this.managerController.toCurrentUnit(this.autoRange.from),
            this.managerController.toCurrentUnit(this.autoRange.to)
        );
    }

    doAction() {
        this.registryObject.range.applyAuto();
    }

    private onHighlight() {

        if (this.registryController.registryObject.range.autoValue) {
            this.registryController.setHighlight(this.registryController.registryObject.range.autoValue);
        }

    }

    private onOut() {
        this.registryController.setHighlight(undefined);
    }

    protected render(): unknown {
        return html`<thermal-btn 
            @click=${this.doAction}
            @mouseenter=${this.onHighlight}
            @mouseleave=${this.onOut}
            @focus=${this.onHighlight}
            @blur=${this.onOut}
            tooltip="${ifDefined( this.value )}"
        >${t(T.automaticrange)}</thermal-btn>`;
    }

    

}

declare global {
    interface HTMLElementTagNameMap {
        "registry-range-auto-button": RegistryRangeAutoButton;
    }
}