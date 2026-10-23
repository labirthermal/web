import type { AbstractAnalysis, AbstractAreaAnalysis } from "@labirthermal/core";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractThermalElement } from "../../../../hierarchy/AbstractThermalElement";
import { T } from "../../../../translations/Languages";

/** 
 * The full table and form for editing an area analysis properties. Enables editing of name, color and dimensions (top, left, width, height, right, bottom). Property `analysis` needs to be passed down from the parent component 
 * @package \@labirthermal/embed
 * @author Jan Jáchim
 */ 
export class AreaEditTable extends AbstractThermalElement {

    @property()
    public analysis!: AbstractAreaAnalysis;

    @state()
    protected color?: string;

    @state()
    protected top?: number;

    @state()
    protected left?: number;

    @state()
    protected width?: number;

    @state()
    protected height?: number;

    @state()
    protected type?: string;

    @state()
    protected right?: number;

    @state()
    protected bottom?: number;

    @state()
    protected maxX?: number;

    @state()
    protected maxY?: number;



    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        // Side effect of analysis changing - derive the displayed geometry and file bounds before rendering.
        if ( changedProperties.has( "analysis" ) ) {
            const analysis = this.analysis;

            this.top = analysis.top;
            this.left = analysis.left;
            this.width = analysis.width;
            this.height = analysis.height;
            this.right = analysis.left + analysis.width;
            this.bottom = analysis.top + analysis.height;
            this.maxX = analysis.file.width;
            this.maxY = analysis.file.height;
        }

    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        // Rebind the geometry-change listener after rendering whenever the input analysis changes.
        if ( changedProperties.has( "analysis" ) ) {
            const oldAnalysis = changedProperties.get( "analysis" ) as AbstractAnalysis | undefined;
            if ( oldAnalysis ) {
                oldAnalysis.onSerializableChange.delete( this.UUID );
            }


            this.analysis.onSerializableChange.set(this.UUID, (analysis) => {
                this.top = analysis.top;
                this.left = analysis.left;
                this.width = analysis.width;
                this.height = analysis.height;
                this.right = analysis.left + analysis.width;
                this.bottom = analysis.top + analysis.height;
            });            
        }
    }

    protected handleInput( event: InputEvent, callback: (value: number) => void ) { 

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

                <thermal-field label=${t(T.left)}>
                    <input 
                        name="left" 
                        value=${this.left} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.right !== undefined ? this.right - 1 : this.maxX}
                        @change=${ (event: InputEvent) => this.handleInput( event, value => { this.analysis.setLeft( value )} ) }
                    />
                </thermal-field>

                <thermal-field label=${t(T.right)}>
                    <input 
                        name="right" 
                        value=${this.right} 
                        type="number" 
                        step="1" 
                        min=${this.left !== undefined ? this.left + 1 : 0} 
                        max=${ this.maxX}
                        @change=${ (event: InputEvent) => this.handleInput( event, value => { this.analysis.setRight( value )} ) }
                    />
                </thermal-field>

                <thermal-field label=${t(T.top)}>
                    <input 
                        name="top" 
                        value=${this.top} 
                        type="number" 
                        step="1" 
                        min="0"
                        max=${ this.bottom !== undefined ? this.bottom - 1 : this.maxY}
                        @change=${ (event: InputEvent) => this.handleInput( event, value => { this.analysis.setTop( value )} ) }
                    />
                </thermal-field>

                <thermal-field label=${t(T.bottom)}>
                    <input 
                        name="bottom" 
                        value=${this.bottom} 
                        type="number" 
                        step="1" 
                        min=${this.top !== undefined ? this.top + 1 : 0 }
                        max=${this.maxY}
                        @change=${ (event: InputEvent) => this.handleInput( event, value => { this.analysis.setBottom( value )} ) }
                    />
                </thermal-field>
                

            </div>
    
        
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "edit-area": AreaEditTable;
    }
}
