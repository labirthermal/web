import type { AbstractAnalysis, PointAnalysis } from "@labirthermal/core";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef } from "lit/directives/ref.js";
import { AbstractThermalElement } from "../../../../hierarchy/AbstractThermalElement";
import { T } from "../../../../translations/Languages";

/** 
 * The full table and form for editing a point analysis properties. Enables editing of name, color and coordinates (top, left). Property `analysis` needs to be passed down from the parent component 
 * @package \@labirthermal/embed
 * @author Jan Jáchim
 */ 
export class EditpointTable extends AbstractThermalElement {

    @property()
    public analysis!: PointAnalysis;

    @state()
    protected top?: number;

    @state()
    protected left?: number;

    @state()
    protected maxX!: number;

    @state()
    protected maxY!: number;

    topInputRef: Ref<HTMLInputElement> = createRef();
    leftInputRef: Ref<HTMLInputElement> = createRef();




    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        // Side effect of analysis changing - derive the displayed coordinates and file bounds before rendering.
        if ( changedProperties.has( "analysis" ) ) {
            const analysis = this.analysis;

            this.top = analysis.top;
            this.left = analysis.left;
            this.maxX = analysis.file.width;
            this.maxY = analysis.file.height;
        }

    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        // Rebind the serialization listener after rendering whenever the input analysis changes.
        if ( changedProperties.has( "analysis" ) ) {
            const oldAnalysis = changedProperties.get( "analysis" ) as AbstractAnalysis | undefined;
            if ( oldAnalysis ) {
                oldAnalysis.onSerializableChange.delete( this.UUID );
            }


            this.analysis.onSerializableChange.set(this.UUID, (analysis) => {
                this.top = analysis.top;
                this.left = analysis.left;
            });
        }
    }


    public handleInput( event: InputEvent, callback: (value: number) => void ) {

        const target = event.target as HTMLInputElement;

        const value = parseInt( target.value );

        if ( ! isNaN( value ) ) {
            callback( value );
            this.analysis.onMoveOrResize.call( this.analysis );
        }

    }

    public static styles = css`
    
        .table {

            display: table;
            width: 100%;
        
        }
    
    `;

    protected render() {
        return html`

            <div class="table">

                <thermal-field label=${t(T.name)}>
                    <analysis-name .analysis=${this.analysis}></analysis-name>
                </thermal-field>

                <thermal-field label=${t(T.color)}>
                    <analysis-color .analysis=${this.analysis}></analysis-color>
                </thermal-field>

                <thermal-field label=${t(T.top)} hint=${t(T.fromto, {from: 0, to: this.maxX})}>
                    <input 
                        name="top" 
                        value=${this.top} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.maxY}
                        @change=${ (event: InputEvent) => this.handleInput( event, value => { this.analysis.setTop( value )} ) }
                    />
                </thermal-field>

                <thermal-field label=${t(T.left)} hint=${t(T.fromto, {from: 0, to: this.maxX})}>
                    <input
                        name="left" 
                        value=${this.left} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.maxX}
                        @change=${ ( event: InputEvent ) => this.handleInput( event, value => {
                            this.analysis.setLeft( value );
                        } ) }
                    />
                </thermal-field>

            </div>
        
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "edit-point": EditpointTable;
    }
}
