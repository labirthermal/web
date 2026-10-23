import type { AbstractAnalysis } from "@labirthermal/core";
import { availableAnalysisColors } from "@labirthermal/core";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { map } from 'lit/directives/map.js';
import { AbstractThermalElement } from "../../../../hierarchy/AbstractThermalElement";

/** 
 * Render the dropdown for color selection of an analysis. Property `analysis` needs to be passed down from the parent component 
 * @package \@labirthermal/webcomponents
 * @author Jan Jáchim
 */  
export class AnalysisColorDropdown extends AbstractThermalElement {

    @property()
    public analysis!: AbstractAnalysis;

    @state()
    protected color?: string;

    willUpdate(_changedProperties: PropertyValues): void {
        super.willUpdate(_changedProperties);

        // Side effect of analysis changing - derive the displayed color before rendering.
        if ( _changedProperties.has( "analysis" ) ) {

            this.color = this.analysis.initialColor;

        }



    }


    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);

        // Rebind the color-change listener after rendering when the input analysis changes.
        if ( _changedProperties.has( "analysis" ) ) {

            const oldAnalysis = _changedProperties.get( "analysis" ) as AbstractAnalysis;

            if ( oldAnalysis ) {
                oldAnalysis.onSetInitialColor.delete( this.UUID );
            }

            this.analysis.onSetInitialColor.set( this.UUID, value => {
                this.color = value;
            } );

        }
    }


    static styles?: CSSResultGroup | undefined = css`

        thermal-dropdown div {
            display: flex;
            gap: 0.5em;
            border-radius: var( --thermal-radius );
            cursor: pointer;
            align-items: center;
        }

        thermal-dropdown .option {
            margin-bottom: 0px;
            padding: 5px;
        }

        thermal-dropdown div i {
            width: 1em;
            height: 1em;
            border-radius: 50%;
        }

        thermal-dropdown .option:hover {
            background-color: var( --thermal-slate );
        }
    
    `;

    protected renderColor( value: string ) {
        return html`<i style="background-color: ${value};" aria-hidden></i><span>${value}</span>`;
    }

    protected render(): unknown {

        if ( this.color === undefined ) {
            return nothing;
        }
        return html`

            <thermal-dropdown>
                <div slot="invoker">
                    ${this.renderColor( this.color )}
                </div>

                ${map(availableAnalysisColors, color => html`
                    <div class="option" slot="option" @click=${() => {this.analysis.setInitialColor( color )}}>
                        ${this.renderColor( color )}
                    </div>
                `)}
                    
            </thermal-dropdown>

        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "analysis-color": AnalysisColorDropdown;
    }
}
