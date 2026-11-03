import type { ThermalUnit } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref} from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { managerUnitContext } from "../../controllers/ManagerController";
import { registryMaxContext, registryMinContext } from "../../controllers/RegistryController";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { T } from "../../translations/Languages";
import { state } from "lit/decorators/state.js";

export class RegistryRangeFullButton extends AbstractRegistryConsumer {

    protected buttonRef: Ref<HTMLElement> = createRef();

    @state()
    @consume({ context: registryMinContext, subscribe: true })
    private min?: number;

    @state()
    @consume({ context: registryMaxContext, subscribe: true })
    private max?: number;

    @state()
    @consume({ context: managerUnitContext, subscribe: true })
    private unit?: ThermalUnit;

    /** Format Celsius bounds only when displaying them; interactions use the core bounds. */
    private get value(): string | undefined {
        const bounds = this.registryController?.registryObject.minmax.value;
        const min = this.min ?? bounds?.min;
        const max = this.max ?? bounds?.max;
        if (min === undefined || max === undefined) return undefined;

        return this.managerController.formatRange(
            this.managerController.toCurrentUnit(min),
            this.managerController.toCurrentUnit(max)
        );
    }

    doAction() {
        this.registryObject.range.applyMinmax();
    }

    mouseenter() {

        if (this.registryObject.minmax.value !== undefined && this.registryController) {
            this.registryController.setHighlight({
                from: this.registryObject.minmax.value.min,
                to: this.registryObject.minmax.value.max
            });
        }
    }

    mouseleave() {

        if (this.registryController) {
            this.registryController.setHighlight(undefined);
        }

    }

    protected render(): unknown {
        return html`<thermal-btn 
    ${ref(this.buttonRef)} 
    @click=${this.doAction} 
    @mouseenter="${this.mouseenter}" 
    @mouseleave="${this.mouseleave}"
    @focus="${this.mouseenter}"
    @blur="${this.mouseleave}"
    tooltip="${ifDefined( this.value )}"
>${t(T.fullrange)}</thermal-btn>`;
    }



}

declare global {
    interface HTMLElementTagNameMap {
        "registry-range-full-button": RegistryRangeFullButton;
    }
}
