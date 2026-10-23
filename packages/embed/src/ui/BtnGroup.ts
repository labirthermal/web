import { css, html } from "lit";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";

export class BtnGroupElement extends AbstractThermalElement {

    static styles = css`
    
        :host {
            display: block;
        }

        .btn-group {
            display: flex;
            flex-wrap: no-wrap;
        }

        ::slotted(thermal-btn:first-child) {

            --custom-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            border-right: none !important;
        
        }

        ::slotted(thermal-btn:last-child) {
            --custom-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
        }

        ::slotted(thermal-btn:not(:first-child):not(:last-child)) {
            --custom-radius: 0;
            border-right: none !important;
        }
    
    `;

    protected render(): unknown {
        return html`<div class="btn-group"><slot></slot></div>`;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-btn-group": BtnGroupElement;
    }
}
