import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AbstractThermalElement } from "../../hierarchy/AbstractThermalElement";

@customElement("thermal-group")
export class ThermalGroup extends AbstractThermalElement {

    @property()
    name?: string;

    static styles = css`
        :host {
            display: none;
        }
    `;

    protected render(): unknown {
        return html`<slot></slot>`;
    }

}