import { html } from "lit";
import { AbstractManagerConsumer } from "../../hierarchy/consumers/AbstractManagerConsumer";
import { ThermalUnit, ThermalUnitDefinition } from "@labirthermal/core";

export class ManagerUnitSwitch extends AbstractManagerConsumer {


    private getUnit() {
        return this.managerObject.unit;
    }

    private renderUnit(
        definition: ThermalUnitDefinition
    ){

        const active = definition.key === this.getUnit().value;

        const variant = active ? "foreground" : "default";

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