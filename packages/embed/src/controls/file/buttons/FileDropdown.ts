import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractThermalElement } from "../../../hierarchy/AbstractThermalElement";

export class FileDropdown extends AbstractThermalElement {

    @property({type: String, reflect: true})
    label?: string;

    @state()
    protected expanded: boolean = false;

    protected toggle()  { this.expanded = ! this.expanded; }
    protected expand() { this.expanded = true; }
    protected collapse() { this.expanded = false; }

    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);
        if ( _changedProperties.has( "expanded" ) ) {
            if ( this.expanded === true ) {
                this.classList.add( "expanded" );
            } else {
                this.classList.remove( "expanded" );
            }

        }
    }


    static styles?: CSSResultGroup | undefined = css`
        :host {
            
        }

        .container {
            display: block;
            position: relative;
        }

        .dropdown {

            z-index: 999;

            position: absolute;
            right: 0px;
            
            box-sizing: border-box;
            
            overflow: hidden;
            max-height: 0px;

            > div {
                padding: 5px; 
                background-color: var(--thermal-background);
                border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                border-radius: var(--thermal-radius);

                display: flex;
                flex-direction: column;
                gap: 5px;
                align-items: flex-end;
                justify-content: flex-end;

            }

        }


        .backdrop {
            display: none;
            cursor: pointer;
        }


        button.default {
            font-size: calc( var(--thermal-fs) * .8 );
            color: var(--thermal-foreground);
            border-color: var(--thermal-slate);
            border-style: solid;
            border-width: 1px;
            border-radius: var( --thermal-radius );
            background-color: var(--thermal-slate-light);
            &:hover {
                cursor: pointer;
                background: var(--thermal-background);
            }
        }


        :host(.expanded) .dropdown {

            max-height: 500px;

        }

        :host(.expanded) .backdrop {

            display: block;
            position: fixed;
            top: -100vh;
            left: -100vw;
            height: 200vh;
            width: 200vw;
            z-index: 998;

        }



    `;


    protected render(): unknown {
        return html`
            <div class="backdrop" @click=${() => this.collapse() }></div>
            <div class="container">
                <thermal-btn variant="default" size="sm" icon="ellipsis" iconStyle="micro" @click=${() => { this.toggle() }}>${this.label ?? nothing}</thermal-btn>
                <nav class="dropdown">
                    <div>
                        <slot></slot>
                    </div>
                </nav>
            </div>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-dropdown-elt": FileDropdown;
    }
}
