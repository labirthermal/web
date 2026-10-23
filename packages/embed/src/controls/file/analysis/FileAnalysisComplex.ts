import type { AbstractAnalysis, ThermalFileInstance } from "@labirthermal/core";
import { AbstractAddTool } from "@labirthermal/core";
import { t } from "i18next";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AbstractFileConsumer } from "../../../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../../../translations/Languages";
import { booleanConverter } from "../../../utils/converters/booleanConverter";
import type { AnalysisTableMode } from "./AnalysisTableOptions";

export class FileAnalysisComplexElement extends AbstractFileConsumer {

    @property({ attribute: "table-mode" })
    public tableMode: AnalysisTableMode = "full";

    @property({ type: Boolean })
    public forceinteractiveanalysis: boolean = false;

    @property({ type: Boolean,attribute: "graph-activation-enabled" })
    public graphActivationEnabled: boolean = true;

    @state()
    protected mayHaveGraph: boolean = false;

    @state()
    protected hasAnalysis: boolean = false;

    @state()
    protected isDrawingAnalysis: boolean = false;

    @state()
    protected hasGraph: boolean = false;

    protected graphRef: Ref<HTMLDivElement> = createRef();

    @state()
    protected graphWidth: number = 0;

    @state()
    protected graphHeight: number = 0;

    protected observer?: ResizeObserver;

    private boundFile?: ThermalFileInstance;
    private readonly watchedAnalyses = new Set<AbstractAnalysis>();
    private listenerLayer?: HTMLElement;
    private observedGraph?: HTMLDivElement;

    @property({ type: Boolean, reflect: true, converter: booleanConverter(true) })
    public showhint: boolean = true;


    connectedCallback(): void {
        super.connectedCallback();
        this.refreshFileState();
        this.hydrate();
        this.requestUpdate();
    }

    disconnectedCallback(): void {
        this.dehydrate();
        this.disconnectObserver();
        super.disconnectedCallback();
    }


    public onInstanceCreated(): void {
        this.requestUpdate();
    }
    
    public onFailure(): void {}


    /** Derives render state from the current file without registering listeners. */
    private refreshFileState(): void {
        this.mayHaveGraph = this.file?.timeline.isSequence ?? false;
        this.hasAnalysis = (this.file?.analysis.value.length ?? 0) > 0;
        this.hasGraph = this.file?.analysis.value.some(analysis => {
            const { MIN, MAX, AVG } = analysis.graph.state;
            return MIN || MAX || AVG;
        }) ?? false;
        if (!this.hasAnalysis) {
            this.isDrawingAnalysis = false;
        }
    }

    /** Binds the current file and its existing analyses, replacing subscriptions to the previous file. */
    protected hydrate(): void {
        const instance = this.file;
        if (!this.isConnected || this.boundFile === instance) {
            return;
        }
        this.dehydrate();
        this.boundFile = instance;
        if (!instance) {
            return;
        }

        instance.analysis.addListener(this.UUID, analyses => {
            this.syncAnalyses(analyses);
            this.refreshFileState();
        });
        this.syncAnalyses(instance.analysis.value);
    }

    /** Keeps graph subscriptions and the pointer listener aligned with the current analysis list. */
    private syncAnalyses(analyses: AbstractAnalysis[]): void {
        for (const analysis of this.watchedAnalyses) {
            if (!analyses.includes(analysis)) {
                analysis.graph.onGraphActivation.delete(this.UUID);
                this.watchedAnalyses.delete(analysis);
            }
        }
        analyses.forEach(analysis => this.watchAnalysis(analysis));
        const layer = analyses.length > 0
            ? this.boundFile?.dom?.listenerLayer?.getLayerRoot()
            : undefined;
        if (layer !== this.listenerLayer) {
            this.listenerLayer?.removeEventListener("pointerup", this.pointerUpListener);
            this.listenerLayer = layer;
            this.listenerLayer?.addEventListener("pointerup", this.pointerUpListener);
        }
    }

    /** Observes graph activation once per analysis; rendering state is refreshed by external events. */
    protected watchAnalysis(analysis: AbstractAnalysis): void {
        if (this.watchedAnalyses.has(analysis)) {
            return;
        }
        this.watchedAnalyses.add(analysis);
        analysis.graph.onGraphActivation.set(this.UUID, () => {
            this.refreshFileState();
        });

    }

    private pointerUpListener = () => {
        this.isDrawingAnalysis = false;
    }

    /** Removes file, analysis and pointer listeners from the actual subscribed objects. */
    protected dehydrate(): void {
        this.boundFile?.analysis.removeListener(this.UUID);
        for (const analysis of this.watchedAnalyses) {
            analysis.graph.onGraphActivation.delete(this.UUID);
        }
        this.watchedAnalyses.clear();
        this.listenerLayer?.removeEventListener("pointerup", this.pointerUpListener);
        this.listenerLayer = undefined;
        this.boundFile = undefined;
    }

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        // Side effect of file changing - derive analysis and graph presence before rendering the new file.
        if (changedProperties.has("file")) {
            this.isDrawingAnalysis = false;
            this.refreshFileState();
        }
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        // Rebind external listeners after rendering without scheduling another update.
        if (changedProperties.has("file")) {
            this.hydrate();
        }
        this.observeGraph();
    }

    /** Observes the rendered graph container, including after reconnecting or replacing the DOM node. */
    private observeGraph(): void {
        const graph = this.isConnected ? this.graphRef.value : undefined;
        if (graph === this.observedGraph) {
            return;
        }
        this.disconnectObserver();
        if (!graph) {
            return;
        }
        this.observedGraph = graph;
        this.observer = new ResizeObserver(entries => {
            if (this.observedGraph !== graph || !this.isConnected) {
                return;
            }
            const entry = entries.find(entry => entry.target === graph);
            if (entry) {
                this.graphWidth = entry.contentRect.width;
                this.graphHeight = entry.contentRect.height;
            }
        });
        this.observer.observe(graph);
    }

    /** Releases the observer even when Lit has already cleared the graph reference. */
    private disconnectObserver(): void {
        this.observer?.disconnect();
        this.observer = undefined;
        this.observedGraph = undefined;
    }


    protected renderButtons() {


        const addTools = this.file !== undefined
            ? Object.values(this.file.group.tool.tools).filter(tool => tool instanceof AbstractAddTool)
            : [];


        return html`
            <div class="buttons">
                ${addTools.map(tool => {

            return html`<thermal-btn @click=${() => {
                    this.isDrawingAnalysis = true;
                    this.file?.group.tool.selectTool(tool);
                }}>
                    <div style="display: flex; align-items: center; gap: 10px">
                        <div style="width: 1.5em; display: inline-block;">
                            ${unsafeHTML(tool.icon)}
                        </div>
                        <div>
                            ${t(T[tool.name as keyof typeof T])}
                        </div>
                    </div>
                </thermal-btn>`;

        })
            }
            </div>

            <slot></slot>
        
        `;

    }

    protected renderCurrentTooltip() {
        return html`${t(T[this.managerObject.tool.value.description as keyof typeof T] )}`;
    }

    protected renderAddAnalysis() {

        return html`<div class="addanalysis">

            ${this.showhint
                ? html`<div>
                    <strong>${t(T.analysis)}</strong>
                </div>

                <div>${t(T.analysishint)}</div>`
                : nothing
            }


            ${this.isDrawingAnalysis === true
                ? this.renderCurrentTooltip()
                : this.renderButtons()
            }
        </div>`;

    }


    protected renderGraph() {

        if (!this.mayHaveGraph) {
            return nothing;
        }

        if (this.hasGraph === true) {
            return html`
            
            <div class="graph" ${ref(this.graphRef)}>
                <file-analysis-graph graphWidth=${this.graphWidth} graphHeight=${this.graphHeight}></file-analysis-graph>
            </div>`;
        }

        else {
            if (this.hasAnalysis === true) {
                return html`<div class="graph graph-prompt">
                    <div>
                        <strong>${t(T.graph)}</strong>
                    </div>
                    <div class="hint">${unsafeHTML( t(T.graphhint2) )}</div>
                </div>`;
            } else {
                return html`<div class="graph graph-prompt">
                    <div>
                        <strong>${t(T.graph)}</strong>
                    </div>
                    <div class="hint">${t(T.graphhint1)}</div>
                </div>`;
            }
        }


    }



    static styles?: CSSResultGroup | undefined = css`

        :host {
            display: block;
            min-width: 0;
            max-width: 100%;
        }

        .container {
            height: 100%;
            width: 100%;
            color: var(--thermal-foreground);
        }

        .container.may {
            display: flex;
            flex-direction: column;
            gap: var(--thermal-gap);

            > * {
                width: 100%;
            }

            .analysis {
                height: calc( 50% - var(--thermal-gap));
            }

        }

        .container.may-not {
            .analysis {
                height: 100%;
            }
        }

        .analysis {
            min-width: 0;
        }
    
        .addanalysis {
            padding: var(--thermal-gap);
            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--thermal-gap);
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        .graph {
            height: 50%;
        }

        .graph-prompt {
            padding: var(--thermal-gap);
            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--thermal-gap);
        }

        .hint {
            thermal-btn {
                display: inline-block;
                cursor: help;
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 5px;
        }

        file-analysis-table {
        }
    
    `;


    protected render(): unknown {
        return html`
            <div class="container ${this.mayHaveGraph === true ? "may" : "may-not"}">

            <div class="analysis">
                ${this.hasAnalysis === false || this.isDrawingAnalysis === true
                ? this.renderAddAnalysis()
                : html`<file-analysis-table
                    .tableMode=${this.tableMode}
                    .forceinteractiveanalysis=${this.forceinteractiveanalysis}
                    .graphActivationEnabled=${this.graphActivationEnabled}
                ></file-analysis-table>`
            }
            </div>
            ${this.renderGraph()}

            </div>

        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-analysis-complex": FileAnalysisComplexElement;
    }
}
