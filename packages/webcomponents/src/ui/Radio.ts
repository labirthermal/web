import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";

export class ThermalRadioElement extends AbstractThermalElement {

    @property({ type: String, reflect: true })
    public type: "radio" | "checkbox" = "radio";

    @property({ type: Boolean, reflect: true })
    public checked: boolean = false;

    @property({ type: Function })
    public onChange?: (checked: boolean) => void;

    protected handleChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.checked = input.checked;

        if (this.onChange) {
            this.onChange(this.checked);
        }
        
        // Force re-render to update visual state
        this.requestUpdate();
    }

    updated(changedProperties: PropertyValues<ThermalRadioElement>): void {
        if (changedProperties.has('checked')) {
            const input = this.shadowRoot?.querySelector('input') as HTMLInputElement;
            if (input) {
                input.checked = this.checked;
            }
        }
    }

    protected handleClick(event: Event): void {
        event.preventDefault();
        this.checked = !this.checked;
        
        if (this.onChange) {
            this.onChange(this.checked);
        }
        
        // Force re-render to update visual state
        this.requestUpdate();
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    public static styles = css`
    
        :host {
            display: contents;
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
        }

        .radio {

            display: flex;
            align-items: center;
            gap: .25em;

            cursor: pointer;

            input,
            span {
                display: block;
            }

            span {
                font-size: .8em;
            }

            input[type="radio"] {
                transform: translateY(-.15em);
                pointer-events: none;
            }
        }

        input {    
            pointer-events: none;
        }
    
    `;

    render() {
        return html`
            <label class="radio" @click=${this.handleClick}>
                <input
                    type="${this.type}"
                    checked="${this.checked}"
                />
                <span><slot></slot></span>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-radio": ThermalRadioElement;
    }
}
