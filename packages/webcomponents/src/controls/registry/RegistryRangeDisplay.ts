import { consume } from "@lit/context";
import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { registryRangeToContext } from "../../controllers/RegistryController";
import { registryRangeFromContext } from "../../controllers/RegistryController";
import type { ThermalUnit } from "@labirthermal/core";
import { managerUnitContext } from "../../controllers/ManagerController";

export class RegistryRangeDisplay extends AbstractRegistryConsumer {

    @consume({ context: registryRangeFromContext, subscribe: true })
    protected from?: number;

    @consume({ context: registryRangeToContext, subscribe: true })
    protected to?: number;

    /** Rerenders the labels when the manager's display unit changes. */
    @state()
    @consume({ context: managerUnitContext, subscribe: true })
    protected unit?: ThermalUnit;

    @property({
        type: String, reflect: true, attribute: true, converter: {
            fromAttribute: (value: string) => {
                return Math.round(parseFloat(value))
            },
            toAttribute: (value: number) => {
                return value.toString();
            }
        }
    })
    public fixed: number = 2;

    @property({ type: String, reflect: true, attribute: true })
    public separator: string = "-";

    protected render(): unknown {

        if (this.from === undefined || this.to === undefined) {
            return nothing;
        }

        const from = this.managerController.toCurrentUnit(this.from);
        const to = this.managerController.toCurrentUnit(this.to);
        const symbol = this.managerController.currentUnit.symbol;

        return html`
            <div>
                <span>${from.toFixed(this.fixed)} ${symbol}</span>
                <span>${this.separator}</span>
                <span>${to.toFixed(this.fixed)} ${symbol}</span>
            </div>
        `;
    }



}

declare global {
    interface HTMLElementTagNameMap {
        "registry-range-display": RegistryRangeDisplay;
    }
}