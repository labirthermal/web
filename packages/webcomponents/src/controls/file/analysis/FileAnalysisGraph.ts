import type { AnalysisDataStateValue, ThermalFileInstance } from "@labirthermal/core";
import { TimeFormat } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import type { FileControllerCurrentFrameType } from "../../../controllers/FileController";
import { fileCurrentFrameContext, fileTimeCursorContext } from "../../../controllers/FileController";
import { managerGraphFunctionContext } from "../../../controllers/ManagerController";
import { AbstractFileConsumer } from "../../../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../../../translations/Languages";
import type { ThermalChartElement } from "./chart/chart";

/** High level component around `thermal-chart` that provides the functionality of a file analysis graph */
export class FileAnalysisGraphElement extends AbstractFileConsumer {

    @state()
    protected hydrated: boolean = false;

    @property({type: Number, reflect: true})
    public graphWidth: number = 0;

    @property({type: Number, reflect: true})
    public graphHeight: number = 0;

    @property({ type: Boolean, reflect: true })
    public hasDownloads: boolean = true;

    @property({ type: Boolean, reflect: true })
    public standalone: boolean = false;

    container: Ref<HTMLDivElement> = createRef();

    graphRef: Ref<ThermalChartElement> = createRef();

    @state()
    protected graphs: AnalysisDataStateValue = {
        values: [[]],
        colors: []
    }

    private chartDataSource?: AnalysisDataStateValue;
    private chartDataCache?: unknown[][];
    private chartOptionsCache?: object;
    private chartOptionsCacheKey?: string;
    private boundFile?: ThermalFileInstance;
    private observer?: ResizeObserver;
    private observedContainer?: HTMLDivElement;

    private readonly receiveGraphData = (value: AnalysisDataStateValue): void => {
        this.graphs = value;
    };

    @consume({context: fileCurrentFrameContext, subscribe: true})
    protected currentFrame?: FileControllerCurrentFrameType;

    @consume({ context: fileTimeCursorContext, subscribe: true })
    protected cursor: typeof fileTimeCursorContext["__context__"];

    @state()
    protected shadowLeft: number = 0;

    @state()
    protected shadowTop: number = 0;

    @state()
    protected shadowWidth: number = 0;

    @state()
    protected shadowHeight: number = 0;

    @consume( {context: managerGraphFunctionContext, subscribe: true} )
    protected graphSmooth: boolean = false;

    public onInstanceCreated(instance: ThermalFileInstance): void {
        this.graphs = instance.analysisData.value;
        this.hydrated = true;
        this.requestUpdate();
    }


    public connectedCallback(): void {
        super.connectedCallback();

        if ( this.file ) {
            this.graphs = this.file.analysisData.value;
            this.hydrated = true;
        }
        this.requestUpdate();
    }

    public disconnectedCallback(): void {
        this.unbindFile();
        this.disconnectObserver();
        super.disconnectedCallback();
    }

    public onFailure(): void {
        this.unbindFile();
        this.disconnectObserver();
    }

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);
        // Side effect of file changing - derive graph data before rendering the new file.
        if (changedProperties.has("file")) {
            this.graphs = this.file?.analysisData.value ?? { values: [[]], colors: [] };
            this.hydrated = this.file !== undefined;
        }
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        // Bind after rendering so subscriptions and observers use the current DOM, including on reconnect.
        this.bindFile();
        this.toggleAttribute("data-has-graphs", !!this.file?.timeline.isSequence && this.graphs.colors.length > 0);
        this.observeContainer();
    }

    private bindFile(): void {
        if (!this.isConnected || this.boundFile === this.file) {
            return;
        }
        this.unbindFile();
        this.boundFile = this.file;
        this.boundFile?.analysisData.addListener(this.UUID, this.receiveGraphData);
    }

    private unbindFile(): void {
        this.boundFile?.analysisData.removeListener(this.UUID);
        this.boundFile = undefined;
    }

    private observeContainer(): void {
        const container = this.isConnected && this.standalone ? this.container.value : undefined;
        if (container === this.observedContainer) {
            return;
        }
        this.disconnectObserver();
        if (!container) {
            return;
        }
        this.observedContainer = container;
        this.observer = new ResizeObserver(entries => {
            if (!this.isConnected || this.observedContainer !== container) {
                return;
            }
            const entry = entries.find(entry => entry.target === container);
            if (entry) {
                this.graphWidth = entry.contentRect.width;
                this.graphHeight = entry.contentRect.height;
            }
        });
        this.observer.observe(container);
    }

    private disconnectObserver(): void {
        this.observer?.disconnect();
        this.observer = undefined;
        this.observedContainer = undefined;
    }

    private readonly syncChartArea = (): void => {
        const chart = this.graphRef.value;
        if (chart) {
            this.shadowLeft = chart.left;
            this.shadowTop = chart.top;
            this.shadowWidth = chart.w;
            this.shadowHeight = chart.h;
        }
    };

    protected downloadSVG = (svgEl: SVGElement, fileName: string) => {

        // Add missing svg attributes
        if (!svgEl.getAttribute('xmlns')) {
            svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }

        // Get the outer HTML of the element
        const svgData = svgEl.outerHTML;

        // Create blob and URL
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        // Create a link and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    protected downloadPNG = (svgEl: SVGElement, fileName: string) => {

        // Add missing svg attributes
        if (!svgEl.getAttribute('xmlns')) {
            svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }

        // Get the outer HTML of the element
        const svgData = svgEl.outerHTML;

        // Create blob and URL
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            const pngUrl = canvas.toDataURL('image/png');

            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        img.src = url;

    }

    private getChartData(): unknown[][] {
        if (this.chartDataSource === this.graphs && this.chartDataCache) {
            return this.chartDataCache;
        }

        const [headers, ...rows] = this.graphs.values;

        this.chartDataSource = this.graphs;
        this.chartDataCache = [
            [
                { label: headers[0], type: "number" },
                ...headers.slice(1).flatMap(label => [
                    { label, type: "number" },
                    { type: "string", role: "tooltip", p: { html: true } }
                ])
            ],
            ...rows.map(row => {
                const relativeTime = row[0].getTime();

                return [
                    relativeTime,
                    ...row.slice(1).flatMap((value, index) => [
                        value,
                        `<div style="padding: 6px 8px"><div>${this.escapeHtml(t(T.time))}: <strong>${TimeFormat.duration(relativeTime)}</strong></div><div>${this.escapeHtml(headers[index + 1])}: <strong>${this.escapeHtml(String(value))} °C</strong></div></div>`
                    ])
                ];
            })
        ];

        return this.chartDataCache;
    }

    private getChartOptions(): object {
        const duration = this.file?.duration ?? 0;
        const timeLabel = t(T.time);
        const temperatureLabel = `${t(T.temperature)} °C`;
        const key = JSON.stringify([
            this.graphs.colors,
            this.graphSmooth,
            this.graphWidth,
            this.graphHeight,
            duration,
            timeLabel,
            temperatureLabel
        ]);

        if (this.chartOptionsCache && this.chartOptionsCacheKey === key) {
            return this.chartOptionsCache;
        }

        this.chartOptionsCacheKey = key;
        this.chartOptionsCache = {
            colors: this.graphs.colors,
            curveType: this.graphSmooth ? "function" : "default",
            legend: { position: "bottom" },
            hAxis: {
                title: timeLabel,
                ticks: this.getDurationAxisTicks(),
                viewWindow: { min: 0, max: duration }
            },
            vAxis: { title: temperatureLabel },
            tooltip: { isHtml: true },
            width: this.graphWidth,
            height: this.graphHeight,
            chartArea: { width: "80%" },
            backgroundColor: { fill: "transparent" }
        };

        return this.chartOptionsCache;
    }

    private getDurationAxisTicks(): { v: number, f: string }[] {
        const duration = this.file?.duration ?? 0;

        if (duration <= 0) {
            return [];
        }

        const rawStep = duration / 5;
        const magnitude = 10 ** Math.floor(Math.log10(rawStep));
        const normalizedStep = rawStep / magnitude;
        const step = (normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10) * magnitude;
        const ticks: { v: number, f: string }[] = [];

        for (let value = 0; value <= duration; value += step) {
            ticks.push({ v: value, f: TimeFormat.duration(value) });
        }

        if (ticks[ticks.length - 1]?.v !== duration) {
            ticks.push({ v: duration, f: TimeFormat.duration(duration) });
        }

        return ticks;
    }

    private escapeHtml(value: string): string {
        return value.replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
        })[character] ?? character);
    }

    private handleGraphClick = (relativeTimeMs: number): void => {
        const file = this.file;
        if (file?.timeline.isSequence) {
            void file.timeline.setRelativeTime(relativeTimeMs);
        }
    }

    private handleGraphHover = (percentage: number | undefined): void => {
        this.fileController.setTimeCursorPercentage(percentage);
    }

    public static styles = css`

        :host {
            position: relative;
        }

        :host([standalone="true"]) {
            display: block;
            height: var(--thermal-analysis-graph-height, 12rem);
            min-width: 0;
            margin-top: .5em;
        }

        :host([standalone="true"]:not([data-has-graphs])) {
            display: none;
        }

        :host([standalone="true"]) .chart-container {
            height: 100%;
            width: 100%;
        }
    
        google-chart {
            width: 100%;
            height: 100%;
        }

        .download {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            gap: 0.25em;
        }

        thermal-icon {
            width: .8em;
            height: .8em;
            vertical-align: middle;
            margin-top: 1px;
        }
    `;

    protected render(): unknown {

        if (
            this.file?.timeline.isSequence === false
            || (this.standalone && (!this.file || this.graphs.colors.length === 0))
        ) {
            return nothing;
        }

        return html`

            <div style="position: relative; background-color: white; border-radius: var(--thermal-radius); height: 100%;">

            

            <div data-video-style style="position: absolute; top:${this.shadowTop}px; left: ${this.shadowLeft}px; width: ${this.shadowWidth}px; height: ${this.shadowHeight}px; pointer-events: none;">
            ${this.currentFrame && html`
                <div data-video-style style="position: absolute; height: 100%; background-color: #eee; left: 0px; width: ${this.currentFrame.percentage}%"></div>
            `}

                ${this.cursor !== undefined ? html`
                    <div data-video-style style="position: absolute; height: 100%; width: 1px; background-color: black; left: ${this.cursor}%"></div>
                ` : nothing}
            </div>
        
            <div class="chart-container" ${ref(this.container)}>
                ${this.graphs.colors.length > 0
                ? html`<thermal-chart 
                        ${ref(this.graphRef)}
                        data-video-svg
                        type="line" 
                        .data=${guard([this.graphs], () => this.getChartData())}
                        .onGraphClick=${this.handleGraphClick}
                        .onGraphHover=${this.handleGraphHover}
                        @google-chart-ready=${this.syncChartArea}
                        .options=${guard([
                            this.graphs.colors,
                            this.graphSmooth,
                            this.graphWidth,
                            this.graphHeight,
                            this.file?.duration,
                            t(T.time),
                            t(T.temperature)
                        ], () => this.getChartOptions())}
                        ></thermal-chart>`
                : nothing
            }
            </div>

            ${this.renderDownloads()}
            

            

            </div>
        
        `
    }


    private renderDownloads() {

        if ( !this.hasDownloads ) {
            return nothing;
        }

        return html`<div class="download">
                <thermal-icon icon="download" variant="micro"></thermal-icon>
                <thermal-btn
                    size="sm"
                    @click=${() => {
                        if ( this.graphRef.value ) {
                            const svgData = this.graphRef.value.getRef()?.querySelector( 'svg' );
                            if ( svgData ) {
                                this.downloadSVG( svgData, "graph.svg" );
                            }
                        }
                    }}
                    variant="background"
                    plain
                    tooltip="Stáhnout graf jako obrázek SVG"
                >SVG</thermal-btn>
                <thermal-btn
                    size="sm"
                    @click=${() => {
                        if ( this.graphRef.value ) {
                            const svgData = this.graphRef.value.getRef()?.querySelector( 'svg' );
                            if ( svgData ) {
                                this.downloadPNG( svgData, "graph.png" );
                            }
                        }
                    }}
                    variant="background"
                    plain
                    tooltip="Stáhnout graf jako obrázek PNG"
                >PNG</thermal-btn>
                <thermal-btn
                    size="sm"
                    @click=${() => this.file?.analysisData.downloadData()}
                    variant="background"
                    plain
                    tooltip="${t(T.downloadgraphdataascsv)}"
                >CSV</thermal-btn>
            </div>`;


    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-analysis-graph": FileAnalysisGraphElement;
    }
}
