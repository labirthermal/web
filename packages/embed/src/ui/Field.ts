import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class ThermalFieldElement extends LitElement {

    @property({type: String})
    public label!: string;

    @property({type: String})
    public hint?: string;

    public static styles = css`
    
        :host {

            display: table-row;
            width: 100%;
            font-size: var( --thermal-fs );

        }

        .cell {

            display: table-cell;
            padding: calc( var( --thermal-gap ) * .5 );
        
        }

        .label {

        }

        .content {

        }

        .hint {
            font-size: calc( var( --thermal-fs-sm ) * .75 );
            padding-top: .5em;
            opacity: .5;
            max-width: 300px;
        }

    `;

    protected render(): unknown {
        return html`

            <div class="cell">${this.label}</div>

            <div class="cell">

                <div class="content">
                    <slot></slot>
                </div>

                ${this.hint && html`
                <div class="hint">
                    ${this.hint}
                </div>`}

            </div>
        
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-field": ThermalFieldElement;
    }
}
