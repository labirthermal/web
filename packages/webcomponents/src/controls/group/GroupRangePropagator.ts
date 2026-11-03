import type { ThermalGroup, ThermalMinmaxOrUndefined, ThermalUnit } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import { html, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { state } from "lit/decorators/state.js";
import { managerUnitContext } from "../../controllers/ManagerController";
import { AbstractGroupConsumer } from "../../hierarchy/consumers/AbstractGroupConsumer";
import { T } from "../../translations/Languages";
import { AbstractFileButton } from "../file/buttons/AbstractFileButton";

export class GroupRangePropagatorElement extends AbstractGroupConsumer {

    public static styles = AbstractFileButton.styles;

    /** Group bounds are kept in Celsius and formatted only when rendered. */
    @state()
    private minmax: ThermalMinmaxOrUndefined;

    @state()
    @consume({ context: managerUnitContext, subscribe: true })
    private unit?: ThermalUnit;

    private boundGroup?: ThermalGroup;

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

        this.bindGroup();
    }

    disconnectedCallback(): void {
        this.unbindGroup();
        super.disconnectedCallback();
    }

    willUpdate(changedProperties: PropertyValues<this>): void {
        super.willUpdate(changedProperties);
        this.bindGroup();
    }

    /** Hydrate and subscribe to the group currently providing the Celsius bounds. */
    private bindGroup(): void {
        const group = this.groupController?.groupObject;
        if (!this.isConnected || group === this.boundGroup) return;

        this.unbindGroup();
        this.boundGroup = group;
        this.minmax = group?.minmax.value;
        group?.minmax.addListener(this.UUID, value => {
            this.minmax = value;
        });
    }

    private unbindGroup(): void {
        this.boundGroup?.minmax.removeListener(this.UUID);
        this.boundGroup = undefined;
    }

    private get value(): string | undefined {
        if (!this.minmax) return undefined;
        return this.managerController.formatRange(
            this.managerController.toCurrentUnit(this.minmax.min),
            this.managerController.toCurrentUnit(this.minmax.max)
        );
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