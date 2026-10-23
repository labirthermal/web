import { consume } from "@lit/context";
import { t } from "i18next";
import type { CSSResultGroup} from "lit";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { AbstractThermalElement } from "../../hierarchy/AbstractThermalElement";
import type { ManagerController} from "../../controllers/ManagerController";
import { managerControllerContext } from "../../controllers/ManagerController";
import { managerAdvancedPalettesContext } from "../../controllers/ManagerController";
import { T } from "../../translations/Languages";

export class DisplayPanel extends AbstractThermalElement {

    static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: contents;
        }
    
    `;

    @consume({ context: managerAdvancedPalettesContext, subscribe: true })
    @state()
    advancedPalettes: boolean = false;

    @consume({ context: managerControllerContext, subscribe: true })
    @state()
    managerController!: ManagerController;


    protected render(): unknown {
        return html`
        <thermal-field label="${t(T.colourpalette)}" hint="Zvolte, jaké chcete používat palety.">
            <thermal-btn-group>
                <thermal-btn 
                    variant="${!this.advancedPalettes ? 'foreground' : 'default'}"
                    @click=${() => this.managerController.setAdvancedPalettes( false )}
                    tooltip="IRON, JET, White hot, Black hot"
                >Základní</thermal-btn>
                <thermal-btn 
                    variant="${this.advancedPalettes ? 'foreground' : 'default'}"
                    @click=${() => this.managerController.setAdvancedPalettes( true )}
                    tooltip="Všechny dostupné palety"
                >Pokročilé</thermal-btn>
            </thermal-btn-group>
        </thermal-field>
        <thermal-field label="${t(T.filerendering)}" hint="${t(T.filerenderinghint)}">
            <manager-image-smooth-switch></manager-image-smooth-switch>
        </thermal-field>
        <thermal-field label="${t(T.graphlines)}" hint="${t(T.graphlineshint)}">
            <manager-graph-smooth-switch></manager-graph-smooth-switch>
        </thermal-field>
        `;
    }


}