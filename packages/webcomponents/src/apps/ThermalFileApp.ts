import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { AbstractSingleFileAppElement } from "./AbstractSingleFileApp";

export class ThermalFileAppElement extends AbstractSingleFileAppElement {

    /** Observes the interactive layout's content width; released on disconnect. */
    private layoutObserver?: ResizeObserver;

    connectedCallback(): void {
        super.connectedCallback();
        if (this.hasUpdated) {
            this.observeLayout();
        }
    }

    firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);
        this.observeLayout();
    }

    disconnectedCallback(): void {
        this.layoutObserver?.disconnect();
        this.layoutObserver = undefined;
        super.disconnectedCallback();
    }

    /** Applies responsive classes to the rendered layout without recreating its interactive children. */
    private observeLayout(): void {
        const layout = this.shadowRoot?.querySelector<HTMLDivElement>(".layout");
        if (!layout || this.layoutObserver) {
            return;
        }
        const observer = new ResizeObserver(entries => {
            if (!this.isConnected || this.layoutObserver !== observer) {
                return;
            }
            const entry = entries.find(entry => entry.target === layout);
            if (entry) {
                layout.classList.toggle("layout--stacked", entry.contentRect.width < 700);
                layout.classList.toggle("layout--compact", entry.contentRect.width < 500);
            }
        });
        this.layoutObserver = observer;
        observer.observe(layout);
    }

    static styles = css`
    
        .layout {
            display: grid;
            grid-template-columns: min-content minmax(0, 1fr) minmax(0, 1fr);
            grid-template-areas: "tools viewer analysis";
            gap: 1em;
            margin-top: 1em;
        }

        .layout > * {
            min-width: 0;
        }

        manager-tool-bar {
            grid-area: tools;
            align-self: start;
        }

        .viewer {
            grid-area: viewer;
        }

        file-analysis-complex {
            grid-area: analysis;
        }

        .layout--stacked {
            grid-template-columns: min-content minmax(0, 1fr);
            grid-template-areas:
                "tools viewer"
                "tools analysis";
        }

        .layout--compact {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas:
                "tools"
                "viewer"
                "analysis";
        }

        .layout--compact manager-tool-bar {
            flex-direction: row;
            flex-wrap: wrap;
        }
    
    `;

    
    render() {
        return html`<thermal-app 
            label="${ifDefined(this.label)}" 
            author="${ifDefined(this.author)}" 
            license="${ifDefined(this.license)}" 
            .showfullscreen=${this.showFullscreen}
        >

            <file-download-dropdown slot="bar-pre"></file-download-dropdown>
            <file-info-button slot="bar-pre"></file-info-button>

            <manager-palette-dropdown slot="bar-pre"></manager-palette-dropdown>
            <registry-range-form slot="bar-pre"></registry-range-form>
            <registry-opacity-slider slot="bar-pre"></registry-opacity-slider>

            <registry-histogram slot="pre" expandable="true"></registry-histogram>
            <registry-range-slider slot="pre"></registry-range-slider>
            <registry-ticks-bar slot="pre"></registry-ticks-bar>

            
            <div class="layout">
                <manager-tool-bar></manager-tool-bar>
                <div class="viewer">
                    <file-canvas></file-canvas>
                    <file-timeline></file-timeline>
                </div>
                <file-analysis-complex></file-analysis-complex>
            </div>
            
        </thermal-app>`;
    }

}