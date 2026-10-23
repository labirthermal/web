import { t } from "i18next";
import { html } from "lit";
import { state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { T } from "../../translations/Languages";

export class RegistryRangeAutoButton extends AbstractRegistryConsumer {

    @state()
    private value?: string;

    connectedCallback() {

        super.connectedCallback();

        this.registryObject.histogram.addListener(
            this.UUID,
            () => this.setValue()
        );

    }

    private setValue() {

        const value = this.registryController.registryObject.range.autoValue;

        if (value) {
            this.value = `${value.from.toFixed(2)} — ${value.to.toFixed(2)} °C`;
        } else {
            this.value = undefined;
        }

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
            @onfocus=${this.onHighlight}
            @onblur=${this.onOut}
            tooltip="${ifDefined( this.value )}"
        >${t(T.automaticrange)}</thermal-btn>`;
    }

    

}

declare global {
    interface HTMLElementTagNameMap {
        "registry-range-auto-button": RegistryRangeAutoButton;
    }
}