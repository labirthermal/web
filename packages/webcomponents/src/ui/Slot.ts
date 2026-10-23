import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";

export class ThermalSlotElement extends AbstractThermalElement {

    @property()
    public label?: string;

    @state()
    private _slottedElements: Element[] = [];

    protected get slottedElements() {
        // Vrátí všechny děti tohoto elementu (obsah slotu)
        return Array.from(this.children);
    }

    private handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._slottedElements = slot.assignedElements();
        this.requestUpdate();
    }

    public static styles = css`

        :host {
            font-size: var( --thermal-fs );
        }
    
        h3 {

            margin: 0 0 .5em 0;
            padding: 0;
            
            font-weight: normal;
            font-size: .7em;
            text-transform: uppercase;

            color: var(--thermal-slate);
            
            display: flex;
            align-items: center;
            gap: .5em;

            &::after {
                content: "";
                flex: 1;
                height: var(--thermal-border-width);
                background: var(--thermal-slate-light);
            }

        }

        .content {
            display: flex;
            flex-wrap: wrap;
            gap: .5em;
        }

        :host(:hover) {
            h3 {
                color: var(--thermal-foreground);
                &::after {
                    background: var(--thermal-slate);
                }
            }


        }
    
    `;


    protected render(): unknown {

        if ( this.slottedElements.length === 0 ) {
            return nothing;
        }

        return html`<section>

            ${this.label ? html`<h3>${this.label}</h3>` : nothing}
            <div class="content">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        </section>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-slot": ThermalSlotElement;
    }
}
