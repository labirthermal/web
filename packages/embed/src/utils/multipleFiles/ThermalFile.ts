import { css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AbstractThermalElement } from "../../hierarchy/AbstractThermalElement";

@customElement("thermal-file")
export class ThermalFileElement extends AbstractThermalElement {

    @property({ type: String })
    lrc?: string;

    @property({ type: String })
    png?: string;

    @property({ type: String })
    label?: string;

    static styles = css`
        :host {
            display: none;
        }
    `;

    protected render(): unknown {
        return nothing;
    }

}