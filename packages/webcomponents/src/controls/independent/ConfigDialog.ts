import { html } from "lit";
import { AbstractThermalElement } from "../../hierarchy/AbstractThermalElement";

export class ConfigDialog extends AbstractThermalElement {


    protected render(): unknown {
        return html`<thermal-dialog
            label="Nastavení aplikace"
        >
            <thermal-btn 
                slot="invoker"
                icon="settings"
                iconStyle="solid"
                tooltip=${this.t( "config" )}
            ></thermal-btn>

            <div slot="content">
                <manager-export-panel></manager-export-panel>
                <display-panel></display-panel>
            </div>
        </thermal-dialog>`;
    }



}