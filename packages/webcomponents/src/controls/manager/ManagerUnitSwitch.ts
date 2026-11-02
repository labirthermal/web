import { html } from "lit";
import { AbstractManagerConsumer } from "../../hierarchy/consumers/AbstractManagerConsumer";
import { ThermalUnit, ThermalUnitDefinition } from "@labirthermal/core";
import { property } from "lit/decorators/property.js";
import { BtnVariants } from "../../index.export";

export class ManagerUnitSwitch extends AbstractManagerConsumer {

    @property({ type: String, reflect: true, attribute: "active-variant" })
    activeVariant: BtnVariants = "foreground";

    @property({ type: String, reflect: true, attribute: "default-variant" })
    defaultVariant: BtnVariants = "default";


    private getUnit() {
        return this.managerObject.unit;
    }

    private renderUnit(
        definition: ThermalUnitDefinition
    ){

        const active = definition.key === this.getUnit().value;

        const variant = active ? this.activeVariant : this.defaultVariant;

        return html`<thermal-btn
            variant=${variant}
            ?non-interactive=${active}
            tooltip=${definition.name}
            @click=${() => this.getUnit().set(definition.key)}
        >${definition.symbol}</thermal-btn>`;

    }

    render() {

        const units = Object.values( this.getUnit().getUnits() ).map(unit => this.renderUnit(unit));


        return html`<thermal-btn-group>${units}</thermal-btn-group>`;
    }


}