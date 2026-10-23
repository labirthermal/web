import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";

export class ThermalPosterElement extends AbstractThermalElement {

    @state()
    protected loaded: boolean = false;

    @property({ type: Boolean, reflect: true })
    public loading: boolean = true;

    @property({ type: String })
    public icon?: string;

    @property({ type: String })
    public iconStyle?: string;

    @property({ type: String })
    public message?: string;

    @property({ type: String })
    public bordercolor: string = "var(--thermal-slate)";

    @property({ type: String })
    public bgcolor: string = "var(--thermal-slate-light)";

    @property({ type: String })
    public textcolor: string = "var(--thermal-slate-dark)";

    protected updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);
        this.style.borderColor = this.bordercolor;
        this.style.backgroundColor = this.bgcolor;
        this.style.color = this.textcolor;
    }

    public static styles?: CSSResultGroup | undefined = css`
    
        :host {
            font-size: var(--thermal-fs);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: .5em;
            width: 100%;
            min-height: 300px;

            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            
            box-sizing: border-box;
            padding: var(--thermal-gap);
            color: var(--thermal-slate-dark);
            background: var(--thermal-slate-light);
            
        }
    
    `;

    protected render(): unknown {

        const content = [];

        if (this.loading) {
            content.push(html`<thermal-spinner style="display: block"></thermal-spinner>`);
        } else {
            content.push(html`<thermal-icon icon="${this.icon}" variant="${this.iconStyle}" style="height: 2em; aspect-ratio: 1 / 1; display: block;"></thermal-icon>`);

            if (this.message) {
                content.push(html`<div>${this.message}</div>`);
            }
        }

        content.push(html`<slot></slot>`);

        return content;

    }


}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-loading": ThermalPosterElement;
    }
}
