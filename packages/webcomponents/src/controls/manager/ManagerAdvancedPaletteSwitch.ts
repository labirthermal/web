import { html } from "lit";
import { AbstractManagerConsumer, managerAdvancedPalettesContext } from "../../index.export";
import { consume } from "@lit/context";

export class ManagerAdvancedPaletteSwitch extends AbstractManagerConsumer {

    @consume({context: managerAdvancedPalettesContext, subscribe: true})
    private advancedPalettes!: boolean;

    render() {
        return html`<thermal-btn-group>
            <thermal-btn
                variant="${!this.advancedPalettes ? 'foreground' : 'default'}"
                @click=${() => {
                    this.managerController.setAdvancedPalettes(false);
                }}
            >Základní palety</thermal-btn>
            <thermal-btn
                variant="${this.advancedPalettes ? 'foreground' : 'default'}"
                @click=${() => {
                    this.managerController.setAdvancedPalettes(true);
                }}
            >Všechny palety</thermal-btn>
        </thermal-btn-group>`;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "manager-advanced-palette-switch": ManagerAdvancedPaletteSwitch;
    }
}