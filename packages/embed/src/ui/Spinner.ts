import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";

export class ThermalSpinnerElement extends AbstractThermalElement {

    @property({ type: String })
    public message?: string;

    @property({ type: String })
    public color: string = "var(--thermal-primary)";

    static shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: "open"
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
            text-align: center;
        }
        .spinner {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 5px solid var(--thermal-primary);
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .message {
            margin-top: var(--thermal-gap);
            color: var(--thermal-slate-dark);
        }
    `;
    protected render() {
        return html`
            <div class="spinner" style="border-color: ${this.color}; border-top-color: transparent;"></div>
            ${this.message ? html`<div class="message">${this.message}</div>` : nothing}
        `;
    }

    

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-spinner": ThermalSpinnerElement;
    }
}
