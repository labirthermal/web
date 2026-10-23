import { css, html, nothing } from "lit";
import { directive, Directive } from "lit/directive.js";
import { classMap } from "lit/directives/class-map.js";
import { ref } from "lit/directives/ref.js";
import type { StyleInfo } from 'lit/directives/style-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { AbstractSingleVideoExport } from "../AbstractSingleVideoExport";
import type { SingleVideoRenderProps } from "../ISingleVideoExportElement";
import { RecordingPhase } from "../ISingleVideoExportElement";

export class SingleVideoExportLayoutDirective extends Directive {

    /** Aktuální výška vnitřního obsahu */
    private innerHeight: number = 0;

    private observer?: ResizeObserver;


    private renderHistogram(
        props: SingleVideoRenderProps
    ): unknown {
        return html`<registry-histogram style="display: ${props.hasHistogram ? 'block' : 'none'};"></registry-histogram>`;
    }

    private renderThermalScale(
        props: SingleVideoRenderProps
    ): unknown {

        return html`<div style="display: ${props.hasThermalScale ? 'block' : 'none'};">
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
        </div>`;

    }
    
    private renderAnalyses(
        props: SingleVideoRenderProps
    ): unknown {

        if ( ! props.hasAnalysis ) {
            return nothing;
        }

        const width = ( props.exportFrameWidth / 2 ) - ( props.exportFramePadding * 2 ) - props.exportFrameGap;
        const height = props.exportGraphHeight;

        return html`<div class="export-element-content--analyses">
            <!-- Analysis content here -->
            <file-analysis-display></file-analysis-display>
            <file-analysis-graph 
                graphWidth=${width} 
                graphHeight=${height}
                .hasDownloads=${false}
                style="height: ${height}px; width: ${width}px; display: block;"
            ></file-analysis-graph>
        </div>`;

    }

    private renderMainContent(
        props: SingleVideoRenderProps
    ): unknown {


        const content: unknown[] = [
            html`<file-canvas
                .prefers-gpu=${false}
            ></file-canvas>`,
        ];

        if ( props.hasTimeline ) {
            content.push(html`<file-timeline hasplaybutton="false"></file-timeline>`);
        }

        return html`<div>
            ${content}
        </div>`;

    }

    public static readonly styles = css`
    
        .export-element {

            position: relative;


            --thermal-export-bg: white;
            --thermal-export-fg: black;

            --thermal-crop: 2em;

            padding: var( --thermal-crop );

            box-sizing: border-box;

            .crop {
                position: absolute;
                width: var( --thermal-crop );
                height: var( --thermal-crop );
                box-sizing: border-box;

                &.crop-t {
                    top: 0;
                }

                &.crop-b {
                    bottom: 0;
                }

                &.crop-l {
                    left: 0;
                }

                &.crop-r {
                    right: 0;
                }

                --thermal-export-crop-border-width: 3px;
                --thermal-export-border-color: var( --thermal-background );

                &.crop-t.crop-l {
                    border-bottom: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-right: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-t.crop-r {
                    border-bottom: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-left: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-b.crop-l {
                    border-top: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-right: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-b.crop-r {
                    border-top: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-left: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }
            }


            .export-overlay {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 99;
                cursor: help;

                box-sizing: border-box;
                padding: var( --thermal-crop );

                transition: all .3s ease;

                display: flex;
                align-items: stretch;
                justify-content: stretch;

                

                span {

                    font-size: 3em;
                    font-weight: normal !important;

                    width: 100%;
                    padding: 1em;
                
                    opacity: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    box-sizing: outline-box;

                    transition: opacity .3s ease;
                    
                    color: var( --thermal-export-bg );
                    
                }

                &:hover {
                    span {
                        background: color-mix(in srgb, var( --thermal-export-fg ) 50%, transparent);
                        opacity: 1;
                    }
                }
            }

            .export-element-content {
                display: grid;
                box-sizing: border-box;
                background-color: var( --thermal-export-bg );

                .export-element-content--analyses {

                    display: grid;
                    gap: 1em;
                    grid-template-columns: 100%;
                    grid-template-rows: 1fr auto;
                
                }

            }



            &.vertical {
                &.hasAnalysis {

                    .export-element-content {
                        grid-template-columns: auto;
                        grid-template-rows: auto auto;
                    }
        
                }
            }

            &.horizontal {
                &.hasAnalysis {

                    .export-element-content {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto;
                    }
                }
            }

            &.hasAnalysis {

            }

            &.hasTimeline {
            
            }

            &.hasHistogram {
            
            }

            &.hasThermalScale {
            
            }

            

            &.skin-light {
                --thermal-export-bg: white;
                --thermal-export-fg: black;
                --thermal-slate: var( --thermal-slate-base );
                --thermal-slate-dark: var( --thermal-slate-base-dark );
                --thermal-slate-light: var( --thermal-slate-base-light );
                --thermal-foreground: black;
                --thermal-background: white;
                --thermal-primary: var( --thermal-primary-base );
            }

            &.skin-dark {
                --thermal-export-bg: black;
                --thermal-export-fg: white;
                --thermal-background: black;
                --thermal-foreground: white;
                --thermal-slate: gray;
                --thermal-slate-dark: darkgray;
                --thermal-slate-light: lightgray;
            }

            &.skin-solarized {
                --thermal-export-bg: #1d5766ff;
                --thermal-export-fg: white;
                --thermal-background: #1d5766ff;
                --thermal-foreground: white;
                --thermal-slate: #27888bff;
                --thermal-slate-dark: #39aaa1ff;
                --thermal-slate-light: #073642;
            }

        
        }
    
    `;

    private initObserver( 
        svgElement: HTMLElement
    ): void {

        if ( this.observer ) {
            return;
        }

        const contentElement = svgElement?.querySelector(".export-element-content");

        if ( ! contentElement ) {
            return;
        }

        this.observer = new ResizeObserver((entries) => {
            for (const entry of entries) {

                this.innerHeight = entry.borderBoxSize[0].blockSize;
                
                // Aktualizuj SVG výšku
                svgElement.setAttribute("height", String(this.innerHeight));
            }
        });

        this.observer.observe(contentElement);

    }
    
    render(
        app: AbstractSingleVideoExport
    ): unknown {

        const reference = app.exportedDivRef;
        const props = app.renderProps;

        if ( reference.value ) {
            this.initObserver( reference.value );
        }

        const mainClasses = {

            "export-element": true,

            vertical: props.isVertical,
            horizontal: ! props.isVertical,

            hasAnalysis: props.hasAnalysis,
            hasHistogram: props.hasHistogram,
            hasTimeline: props.hasTimeline,
            hasThermalScale: props.hasThermalScale,
            ["skin-" + props.skin]: true

        }

        // Při exportu použij vždy scale 1
        const isExporting = app.recordingPhase !== RecordingPhase.IDLE;
        const effectiveScale = isExporting ? 1 : props.previewScale;

        const containerStyle: StyleInfo = {
            width: `calc( ${props.exportFrameWidth}px + var( --thermal-crop ) * 2 )`,
            scale: String( effectiveScale )
        };

        const contentStyle: StyleInfo = {
            width: props.exportFrameWidth + "px",
            gap: props.exportFrameGap + "px",
            padding: props.exportFramePadding + "px"
        }

        const mainContent = [
            this.renderHistogram( props ),
            this.renderThermalScale( props ),
            this.renderMainContent( props )
        ];

        const analyses = this.renderAnalyses( props );

        return html`<!-- The main content rendered through the SingleVideoExportLayoutDirective -->
        <main
            class=${classMap(mainClasses)}
            style=${styleMap(containerStyle)}
        >
            <b class="crop crop-t crop-l"></b>
            <b class="crop crop-t crop-r"></b>
            <b class="crop crop-b crop-l"></b>
            <b class="crop crop-b crop-r"></b>

            <section 
                ${ref(reference)}
                class="export-element-content" 
                style=${styleMap(contentStyle)}
            >

                <div class="export-element-content--main">
                    ${ mainContent }
                </div>

                ${analyses}

            </section>

            <aside class="export-overlay">
                <span>
                    <strong>Náhled</strong>
                </span>
            </aside>

        </main>
        
        `;


    }

}

export const exportLayoutDirective = directive( SingleVideoExportLayoutDirective );
