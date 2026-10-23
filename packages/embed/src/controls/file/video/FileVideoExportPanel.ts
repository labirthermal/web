import type { ThermalFileInstance } from "@labirthermal/core";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { state } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { T } from "../../../translations/Languages";
import { AbstractSingleVideoExport } from "./AbstractSingleVideoExport";
import { exportConfigDirective, SingleVideoExportConfigDirective } from "./directives/SingleVideoExportConfigDirective";
import { exportLayoutDirective, SingleVideoExportLayoutDirective } from "./directives/SingleVideoExportLayoutDirective";
import { singleVideoProviders } from "./directives/SingleVideoExportProvidersDirective";
import { RecordingPhase } from "./ISingleVideoExportElement";

export class FileVideoExportPanel extends AbstractSingleVideoExport {

    /** Reference na preview sekci pro měření výšky */
    private previewSectionRef: Ref<HTMLElement> = createRef();

    /** ResizeObserver pro automatické škálování */
    private previewResizeObserver?: ResizeObserver;

    /** ResizeObserver pro sledování rozměrů exportovaného elementu */
    private exportSizeObserver?: ResizeObserver;

    /** Reálná šířka exportu v pixelech */
    @state() private exportRealWidth: number = 0;

    /** Reálná výška exportu v pixelech */
    @state() private exportRealHeight: number = 0;

    public onInstanceCreated(instance: ThermalFileInstance): void {
        this.parentHasAnalyses = instance.analysis.value.length > 0;
    }

    public onFailure(): void {}

    connectedCallback(): void {
        super.connectedCallback();
        this.setupResizeObserver();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.previewResizeObserver?.disconnect();
        this.exportSizeObserver?.disconnect();
    }

    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);
        // Zajisti, že observer je nastaven po renderování
        this.setupResizeObserver();
        this.setupExportSizeObserver();
    }

    /** Nastaví ResizeObserver pro automatické škálování */
    private setupResizeObserver(): void {
        if (this.previewResizeObserver || !this.previewSectionRef.value) {
            return;
        }

        this.previewResizeObserver = new ResizeObserver((entries) => {
            if (!this.renderProps.autoScale) {
                return;
            }

            for (const entry of entries) {
                this.calculateAutoScale(entry.contentRect.height);
            }
        });

        this.previewResizeObserver.observe(this.previewSectionRef.value);
    }

    /** Nastaví ResizeObserver pro sledování rozměrů exportovaného elementu */
    private setupExportSizeObserver(): void {
        if (this.exportSizeObserver || !this.exportedDivRef.value) {
            return;
        }

        // Sledujeme parent element (main.export-element), který obsahuje crop padding
        const exportMainElement = this.exportedDivRef.value.parentElement;
        if (!exportMainElement) {
            return;
        }

        this.exportSizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                // contentRect je ve vlastních souřadnicích elementu (bez CSS transform/scale)
                this.exportRealWidth = Math.round(entry.contentRect.width);
                this.exportRealHeight = Math.round(entry.contentRect.height);
            }
        });

        this.exportSizeObserver.observe(exportMainElement);
    }

    /** Přepsaná metoda z AbstractSingleVideoExport - reaguje na změny layout vlastností */
    protected override onLayoutAffectingPropertyChanged(): void {
        if (!this.renderProps.autoScale) {
            return;
        }

        // Počkej na dokončení renderování a pak přepočti scale
        this.updateComplete.then(() => {
            // Další frame pro jistotu, že DOM je plně aktualizován
            requestAnimationFrame(() => {
                this.triggerAutoScaleRecalculation();
            });
        });
    }

    /** Spustí přepočet autoScale na základě aktuální velikosti preview sekce */
    private triggerAutoScaleRecalculation(): void {
        if (!this.previewSectionRef.value) {
            return;
        }
        const availableHeight = this.previewSectionRef.value.clientHeight;
        this.calculateAutoScale(availableHeight);
    }

    /** Vypočítá scale na základě dostupné výšky */
    private calculateAutoScale(availableHeight: number): void {
        const exportedElement = this.exportedDivRef.value;
        if (!exportedElement) {
            return;
        }

        // Získej reálnou výšku exportovaného obsahu (bez scale)
        // Musíme vzít v úvahu aktuální scale
        const currentScale = this.renderProps.previewScale;
        const currentHeight = exportedElement.getBoundingClientRect().height;
        const realHeight = currentHeight / currentScale;

        if (realHeight <= 0 || availableHeight <= 0) {
            return;
        }

        // Vypočítej nový scale tak, aby se obsah vešel do dostupné výšky
        // Přidáme malý padding (20px) pro okraje
        const padding = 20;
        const newScale = Math.min(1, (availableHeight - padding) / realHeight);

        // Omez scale na rozumné rozmezí
        const clampedScale = Math.max(0.1, Math.min(1, newScale));

        // Aktualizuj pouze pokud je rozdíl větší než 1% (prevence nekonečné smyčky)
        if (Math.abs(clampedScale - this.renderProps.previewScale) > 0.01) {
            this.renderProps.previewScale = clampedScale;
            this.requestUpdate();
        }
    }

    static styles?: CSSResultGroup | undefined = [
        SingleVideoExportLayoutDirective.styles,
        SingleVideoExportConfigDirective.styles,
        css`
            :host {
                font-size: var( --thermal-fs );
                color: var( --thermal-foreground );
                display: grid;
                grid-template-rows: auto 1fr auto;
                gap: 1em;
                height: 100%;
                min-height: 0;
                max-height: 100%;
            }

            .controls {
            }

            .preview {
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 0; /* klíčové - povolí zmenšení pod velikost obsahu */
                position: relative;

                background: var( --thermal-slate );

                border-radius: var( --thermal-radius );

                & > * {
                
                }


                .preview-size {
                
                    position: absolute;
                    bottom: 1em;
                    right: 1em;

                    z-index: 10000;

                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.5em;

                    

                    & > * {
                        background: var( --thermal-slate-light );
                        border-radius: var( --thermal-radius );
                        box-sizing: border-box;
                        padding: 0.5em 0.75em;
                        text-align: right;
                        font-size: .8em;

                        .preview-label {
                            text-transform: uppercase;
                            
                            font-weight: normal;
                            margin-bottom: .25em;
                            text-align: right;
                            opacity: .8;
                        }

                        .preview-value {
                            font-weight: bold;
                        }
                    }

                    .preview-size--preview {
                    }

                    .preview-size--export {
                        thermal-radio {
                            display: inline-block;
                        }
                    }

                }





            }

            .footer {
            }

            .progress-overlay {
            
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                z-index: 100000;

                display: flex;
                align-items: center;
                justify-content: center;

                text-align: center;

                background: color-mix(in srgb, var( --thermal-slate-light ) 90%, transparent);

                .progress-overlay-content {
                
                    display: flex;
                    flex-direction: column;
                    gap: 1em;

                    div {
                        color: var( --thermal-slate-dark );
                    }
                }
            
            }
        `
    ]

    private renderHeader(): unknown {

        return html`<header class="controls">
            ${exportConfigDirective(this)}
        </header>`;

    }

    private renderPreview(): unknown {
        const isExporting = this.recordingPhase !== RecordingPhase.IDLE;

        return html`<section class="preview" ${ref(this.previewSectionRef)}>
            ${exportLayoutDirective(this)}

            ${!isExporting ? html`
                <div class="preview-size">
                    <div class="preview-size--export">
                        <div class="preview-label">Export</div>
                        <div class="preview-value">${this.exportRealWidth} × ${this.exportRealHeight} px</div>
                    </div>
                    <div class="preview-size--preview">
                        <div class="preview-label">Náhled</div>

                        <div class="preview-value">Zoom: ${(this.renderProps.previewScale * 100).toFixed(0)}%</div>


                        ${!this.renderProps.autoScale ? html`
                            <input 
                                type="range" 
                                min="0.1" 
                                max="1" 
                                step="0.01" 
                                .value=${String(this.renderProps.previewScale)} 
                                @input=${(e: Event) => {
                                    const input = e.target as HTMLInputElement;
                                    const value = parseFloat(input.value);
                                    this.setPreviewScale(value);
                                }}
                            />
                        ` : nothing }

                        <thermal-radio
                            .checked=${this.renderProps.autoScale} 
                            .onChange=${(checked: boolean) => {
                                this.setAutoScale(checked);
                            }}
                        >Automatické přiblížení</thermal-radio>
                        
                    </div>
                </div>
            ` : html``}

        </section>`;
    }

    private renderOverview(): unknown {

        if ( this.recordingPhase === RecordingPhase.IDLE ) {
            return nothing;
        }

        let message = this.t( T.exportencodingfile );

        if ( this.recordingPhase === RecordingPhase.RECORDING ) {
            message = `${this.t( T.exportrecordingframes )} ${this.recordingPhaseProgress.toFixed(2)}%`;
        }

        return html`<div
            class="progress-overlay"
        >

            <div class="progress-overlay-content">

                <thermal-spinner
                    .message=${message}
                ></thermal-spinner>

                <div>${this.t(T.exportdonotclosewindowhint)}</div>

            </div>
            
        </div>`;

    }

    private renderFooter(): unknown {
        return html`<footer class="footer">
            <file-timeline></file-timeline>
        </footer>`;
    }

    protected render(): unknown {
        return singleVideoProviders(this, [
            this.renderHeader(),
            this.renderPreview(),
            this.renderFooter(),
            this.renderOverview()
        ] );
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-video-export-panel": FileVideoExportPanel;
    }
}
