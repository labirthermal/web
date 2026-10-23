import type { PropertyValueMap } from "lit";
import { css, html, nothing } from "lit";

import type { ThermalRegistry } from "@labirthermal/core";
import { property, state } from "lit/decorators.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { booleanConverter } from "../../utils/converters/booleanConverter";

export class RegistryHistogram extends AbstractRegistryConsumer {

    @state()
    protected histogram: ThermalRegistry["histogram"]["value"] = [];

    @property( { type: String, reflect: true } )
    public height: string = "calc( var( --thermal-gap ) * 1.5 )";

    @property({type: String, reflect: true })
    public heightExpanded: string = "400px";

    @property({type: Boolean, reflect: true, converter: booleanConverter(false)})
    public expandable: boolean = false;

    @state()
    protected expanded: boolean = false;

    @state()
    protected loading: boolean = false;

    @state()
    protected error: boolean = false;

    protected getClassName(): string {
        return "HistogramElement";
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.loading = this.registryObject.histogram.loading;

        this.registryObject.histogram.onCalculationStart.set( this.UUID, () => {
            this.loading = true;
            this.error = false;
        } );

        this.registryObject.histogram.onCalculationEnd.set( this.UUID, (success) => {
            this.loading = false;
            this.error = !success;
        } );

        this.registryObject.loading.addListener( this.UUID, value => {
            if (value === true) {
                this.loading = true;
            }
        })

    }

    protected firstUpdated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void {
        super.firstUpdated( _changedProperties );

        this.registryObject.histogram.addListener( this.UUID, value => {
            this.histogram = value;
        } );

        

    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.registryObject.loading.removeListener(this.UUID);
        this.registryObject.histogram.removeListener( this.UUID );
        this.registryObject.histogram.onCalculationStart.delete( this.UUID );
        this.registryObject.histogram.onCalculationEnd.delete( this.UUID );
    }

    static styles = css`

        @keyframes spinner {
            0% {left: 0px; width: 0%;}
            50% {left: 25%; width: 50%;}
            100% {left: 100%; width: 0%;}
        }

        .container {
            padding: 0 calc( var( --thermal-gap ) * .5 );
            position: relative;

            .spinner {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: none;
                align-items: center;
                justify-content: center;
                

                span {
                    width: calc( 100% - var(--thermal-gap) );
                    height: 6px;
                    display: block;
                    position: relative;
                    overflow: hidden;
                    border-radius: 3px;

                    &::after {
                        content: "";
                        display: block;
                        background: var(--thermal-slate-dark);
                        position: absolute;
                        opacity: .2;
                        height: 100%;
                        animation-name: spinner;
                        animation-duration: 1s;
                        animation-iteration-count: infinite;
                        animation-timing-function: linear
                    }
                }

            }

            &.loading:not(.has-error) {

                .spinner {
                    display: flex;
                }

                .histogram {
                    opacity: .8;
                }
            }

        }

        .histogram {
            display: flex;
            width: 100%;
            background:  transparent;
            transition: opacity .3s ease-in-out;

            &.expandable {
                transition: all .2s ease-in-out;
                cursor: pointer;
                &:hover {
                    background: var(--thermal-background);
                }
            }
        }

        .histogram-bar {
            flex-grow: 1;
            position: relative;
            height: 100%;

            &:hover {
                .histogram-bar-inner {
                    background: var(--thermal-foreground);
                }
            }
        }

        .histogram-bar-inner {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            background: var(--thermal-slate-dark);
            transition: height .5s ease-in-out;
        }

        .error {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--thermal-slate-light);
            color: var(--thermal-slate);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }


    `;

    protected render(): unknown {

        const isLoading = this.histogram.length > 0 && this.loading === false;

        return html`

            <div class="container ${isLoading ? "ready" : "loading"} ${this.error ? "has-error" : "is-ok"}">

                <div class="histogram ${this.expandable === true ? "expandable" : ""}" style="height: ${this.expanded ? this.heightExpanded: this.height}" part="bg" @click=${() => {
                    if ( this.expandable === true ) {
                        this.expanded = !this.expanded;
                    }
                }}>

                    ${this.histogram.map( item => {

                        return html`
                            <div class="histogram-bar" data-height="${item.height}" data-percentage="${item.percentage}" data-count="${item.count}" data-from="${item.from}" data-to="${item.to}">
                                <div style="height: ${item.height}%" class="histogram-bar-inner"></div>
                            </div
                        `;

                    } )}

                </div>

                ${this.error === true
                    ? html`<div class="error">Unable to calculate the histogram</div>`
                    : nothing
                }

                <div class="spinner">
                    <span></span>
                </div>

            </div>
        
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "registry-histogram": RegistryHistogram;
    }
}