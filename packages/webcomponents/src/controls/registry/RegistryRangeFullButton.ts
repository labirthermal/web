import { t } from "i18next";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref} from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { T } from "../../translations/Languages";
import { state } from "lit/decorators/state.js";

export class RegistryRangeFullButton extends AbstractRegistryConsumer {

    protected buttonRef: Ref<HTMLElement> = createRef();

    @state()
    private value?: string;

    connectedCallback() {
        super.connectedCallback();

        this.registryObject.minmax.addListener(
            this.UUID,
            () => this.setValue()
        );
    }

    private setValue() {

        const value = this.registryController.registryObject.minmax.value;

        if (value) {
            this.value = `${value.min.toFixed(2)} — ${value.max.toFixed(2)} °C`;
        } else {
            this.value = undefined;
        }

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
