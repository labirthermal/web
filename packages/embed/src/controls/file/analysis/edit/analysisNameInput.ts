import type { AbstractAnalysis } from "@labirthermal/core";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractThermalElement } from "../../../../hierarchy/AbstractThermalElement";

/** 
 * Render the input for editing the analysis name. Property `analysis` needs to be passed down from the parent component 
 * @package \@labirthermal/embed
 * @author Jan Jáchim
 */ 
export class AnalysisNameInput extends AbstractThermalElement {

    @property()
    public analysis!: AbstractAnalysis;

    @state()
    protected name?: string;

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        // Side effect of analysis changing - derive the displayed name before rendering.
        if ( changedProperties.has( "analysis" ) ) {
            this.name = this.analysis.name;
        }

    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        // Rebind the name-change listener after rendering when the input analysis changes.
        if ( changedProperties.has( "analysis" ) ) {
            const oldAnalysis = changedProperties.get( "analysis" ) as AbstractAnalysis | undefined;
            oldAnalysis?.onSetName.delete(this.UUID);

            this.analysis.onSetName.set(this.UUID, (value) => {
                this.name = value;
            });
        }

    }


    static styles?: CSSResultGroup | undefined = css`

    
    `;

    protected render(): unknown {
        return html`

            <input 
                type="text"
                value="${this.name}" 
                @change=${(event: InputEvent) => {
                    const target = event.target as HTMLInputElement;
                    const value = target.value !== "" 
                        ? target.value 
                        : this.analysis.nameInitial;
                    this.analysis.setName( value )
                }}
            />

        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "analysis-name": AnalysisNameInput;
    }
}
