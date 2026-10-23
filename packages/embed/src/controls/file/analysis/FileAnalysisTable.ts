import type { AbstractAnalysis, ThermalFileInstance } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { fileAnalysisListContext } from "../../../controllers/FileController";
import { managerInteractiveAnalysesContext } from "../../../controllers/ManagerController";
import { AbstractFileConsumer } from "../../../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../../../translations/Languages";
import { booleanConverter } from "../../../utils/converters/booleanConverter";
import type { AnalysisTableMode } from "./AnalysisTableOptions";
import { optionalBooleanConverter } from "./AnalysisTableOptions";

export class FileAnalysisTableElement extends AbstractFileConsumer {

    @property({ attribute: "table-mode" })
    public tableMode: AnalysisTableMode = "full";

    @property({ attribute: "show-range-propagator", converter: optionalBooleanConverter })
    public showRangePropagator?: boolean;

    @property({ attribute: "selection-enabled", converter: optionalBooleanConverter })
    public selectionEnabled?: boolean;

    @property({ attribute: "edit-enabled", converter: optionalBooleanConverter })
    public editEnabled?: boolean;

    @property({ attribute: "graph-activation-enabled", converter: booleanConverter(true) })
    public graphActivationEnabled: boolean = true;

    @consume({ context: managerInteractiveAnalysesContext, subscribe: true })
    @property({ converter: booleanConverter(false) })
    public interactiveanalysis: boolean = false;

    @property({ converter: booleanConverter(false) })
    public forceinteractiveanalysis: boolean = false;

    @consume({ context: fileAnalysisListContext, subscribe: true })
    @state()
    protected analysis: AbstractAnalysis[] = [];

    private boundFile?: ThermalFileInstance;

    private readonly selectionChanged = () => this.requestUpdate();

    protected get interactive(): boolean {
        return this.interactiveanalysis || this.forceinteractiveanalysis;
    }

    protected get allowsSelection(): boolean {
        return this.selectionEnabled ?? this.interactive;
    }


    protected get allowsEdit(): boolean {
        return this.editEnabled ?? this.interactive;
    }

    protected get showsRangePropagator(): boolean {
        return this.showRangePropagator ?? this.interactive;
    }

    private get allSelected(): boolean {
        return this.analysis.length > 0 && this.analysis.every(analysis => analysis.selected);
    }

    public onInstanceCreated(): void {
        this.requestUpdate();
    }

    public onFailure(): void {
        // Do nothing
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.bindFile();
    }

    
    disconnectedCallback(): void {
        this.unbindFile();        
        super.disconnectedCallback();
    }

    
    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        
        /** Rebinds the selection listener when the provided file instance changes. */
        if (changedProperties.has("file")) {
            this.bindFile();
        }

    }

    /**
     * Subscribes to selection changes on the current file.
     * Avoids duplicate subscriptions and replaces any listener attached to a previous file.
     */
    private bindFile(): void {
        if (this.boundFile === this.file || !this.isConnected) {
            return;
        }
        this.unbindFile();
        this.boundFile = this.file;
        this.boundFile?.analysis.layers.onSelectionChange.set(this.UUID, this.selectionChanged);
    }

    /** Removes this component's selection listener from the file it is currently bound to. */
    private unbindFile(): void {
        this.boundFile?.analysis.layers.onSelectionChange.delete(this.UUID);
        this.boundFile = undefined;
    }

    public static styles = css`
        :host {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            contain: inline-size;
            box-sizing: border-box;
            color: var(--thermal-foreground);
        }

        .overflow {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
            overflow-x: auto;
            overflow-y: hidden;
        }

        table {
            width: max-content;
            min-width: 100%;
            margin: 0;
            table-layout: auto;
            box-sizing: border-box;
            border-collapse: collapse;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            font-size: var(--thermal-fs-sm);
        }

        th {
            text-align: left;
            white-space: nowrap;
            padding: .5em;
        }

        table.compact th {
            padding: .25em;
        }

        file-analysis-table-row:not(:last-child) {
            border-bottom: var(--thermal-border-width) dotted var(--thermal-slate);
        }

        file-analysis-table-row[selected] {
            background-color: var(--thermal-background);
        }

        .selection {
            display: inline-flex;
            align-items: center;
            gap: .5em;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: pointer;
        }

        .selection:hover {
            color: var(--thermal-primary);
        }

        .selection-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
        }

        .selection[aria-pressed="true"] .selection-indicator {
            background: var(--thermal-slate-dark);
        }
    `;

    protected render(): unknown {
        if (this.file === undefined || this.analysis.length === 0) {
            return nothing;
        }

        const compact = this.tableMode === "compact";

        return html`
            <div class="overflow" tabindex="0" role="region" aria-label=${t(T.analysis)}>
                <table class=${compact ? "compact" : "full"} aria-label=${t(T.analysis)}>
                    <thead>
                        <tr>
                            <th scope="col">
                                ${this.allowsSelection ? html`
                                    <button
                                        type="button"
                                        class="selection"
                                        aria-pressed=${this.allSelected}
                                        @click=${() => {
                                            if (this.allSelected) {
                                                this.file?.analysis.layers.deselectAll();
                                            } else {
                                                this.file?.analysis.layers.selectAll();
                                            }
                                        }}
                                    >
                                        <span class="selection-indicator" aria-hidden="true"></span>
                                        ${t(T.analysis)}
                                    </button>
                                ` : t(T.analysis)}
                            </th>
                            <th scope="col">${t(T.avg)}</th>
                            <th scope="col">${t(T.min)}</th>
                            <th scope="col">${t(T.max)}</th>
                            ${compact ? nothing : html`<th scope="col">${t(T.size)}</th>`}
                            ${!compact && (this.allowsEdit || this.showsRangePropagator)
                                ? html`<th scope="col"></th>`
                                : nothing}
                        </tr>
                    </thead>
                    <tbody>
                        ${repeat(this.analysis, analysis => analysis.key, analysis => html`
                            <file-analysis-table-row
                                .analysis=${analysis}
                                .tableMode=${this.tableMode}
                                .interactiveanalysis=${this.allowsSelection}
                                .editEnabled=${this.allowsEdit}
                                .graphActivationEnabled=${this.graphActivationEnabled}
                                .showRangePropagator=${this.showsRangePropagator}
                            ></file-analysis-table-row>
                        `)}
                    </tbody>
                </table>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "file-analysis-table": FileAnalysisTableElement;
    }
}
