import { property, state } from "lit/decorators.js";
import { AbstractThermalElement } from "../../../hierarchy/AbstractThermalElement";
import type { AbstractAnalysis, AbstractAreaAnalysis} from "@labirthermal/core";
import { PointAnalysis } from "@labirthermal/core";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html } from "lit";
import { t } from "i18next";
import { T } from "../../../translations/Languages";

/** Trigger the edit dialog for an analysis */
export class FileAnalisisEditDialog extends AbstractThermalElement {

    @property({type: Object})
    public analysis!: AbstractAnalysis;

    @state()
    protected name?: string;

    @state()
    protected type?: string;

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        // Side effect of analysis changing - derive the dialog name and type before rendering.
        if ( changedProperties.has( "analysis" ) ) {
            this.name = this.analysis.name;
            this.type = this.analysis.getType();
        }

    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        // Rebind the name-change listener after rendering whenever the input analysis changes.
        if ( changedProperties.has( "analysis" ) ) {
            const oldAnalysis = changedProperties.get( "analysis" ) as AbstractAnalysis | undefined;
            if ( oldAnalysis ) {
                oldAnalysis.onSetName.delete( this.UUID );
            }


            this.analysis.onSetName.set(this.UUID, (value) => {
                this.name = value;
            });
        }
    }

    static styles?: CSSResultGroup | undefined = css`
    
        :host {
        
            display: inline-block;

        }

    `;

    protected render() {
        return html`

            <thermal-dialog label="${t(T.editsth, {what: t( T[this.type as keyof typeof T] )})}">
                <slot name="invoker" slot="invoker">
                    <thermal-btn 
                        icon="settings" 
                        iconStyle="solid" 
                        size="md" 
                        tooltip="${t(T.editsth, {what: this.analysis.name})}"
                    >
                    </thermal-btn>
                </slot>

                <div slot="content">
                    ${ this.analysis instanceof PointAnalysis
                        ? html`<edit-point .analysis=${this.analysis}></edit-point>`
                        : html`<edit-area .analysis=${this.analysis as AbstractAreaAnalysis}></edit-area>`
                     }
                </div>

            </thermal-dialog>
        
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-analysis-edit": FileAnalisisEditDialog;
    }
}
