import { t } from "i18next";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { state } from "lit/decorators/state.js";
import { AbstractGroupConsumer } from "../../hierarchy/consumers/AbstractGroupConsumer";
import { T } from "../../translations/Languages";
import { AbstractFileButton } from "../file/buttons/AbstractFileButton";

export class GroupRangePropagatorElement extends AbstractGroupConsumer {

    public static styles = AbstractFileButton.styles;

    @state()
    private value?: string;

    connectedCallback(): void {
        super.connectedCallback();

        this.onmouseenter = () => {

            if (this.groupObject && this.groupObject.minmax.value && this.registryController) {
                this.registryController.setHighlight({
                    from: this.groupObject.minmax.value.min,
                    to: this.groupObject.minmax.value.max
                });
            }

        }

        this.onmouseleave = () => {

            if (this.registryController) {
                this.registryController.setHighlight(undefined);
            }

        }

        this.onclick = () => {
            if (this.groupObject && this.groupObject.minmax.value) {
                this.groupObject.registry.range.imposeRange({
                    from: this.groupObject.minmax.value.min,
                    to: this.groupObject.minmax.value.max
                });
            }
        }

        this.groupObject.minmax.addListener(
            this.UUID,
            () => this.setValue()
        );
    }

    private setValue() {

        const value = this.groupObject.minmax.value;

        if (value) {
            this.value = `${value.min.toFixed(2)} — ${value.min.toFixed(2)} °C`;
        } else {
            this.value = undefined;
        }

    }

    protected render(): unknown {
        return html`
            <slot>
                <thermal-btn 
                    class="default"
                    icon="range"
                    iconStyle="solid"
                    tooltip="${ifDefined(this.value)}"
                >${t(T.range).toLowerCase()}</thermal-btn>
            </slot>
        `;
    }



}

declare global {
    interface HTMLElementTagNameMap {
        "group-range-propagator": GroupRangePropagatorElement;
    }
}