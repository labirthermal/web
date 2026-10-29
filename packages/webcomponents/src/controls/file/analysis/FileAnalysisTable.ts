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
import type { AnalysisTableMode } from "./AnalysisTableOptions";

/**
 * Table of the analyses of the enclosing file provider.
 *
 * The table is interactive when the manager context enables interactive
 * analyses or when the `force-interactive` attribute is present. Selection
 * and editing follow the interactivity unless opted out. The range
 * propagator and the opt-outs are independent boolean attributes that
 * default to `false`.
 */
export class FileAnalysisTableElement extends AbstractFileConsumer {

    @property({ attribute: "table-mode" })
    public tableMode: AnalysisTableMode = "full";

    /** Shows the button applying the analysis MIN/MAX to the registry range, independently of interactivity. */
    @property({ type: Boolean, attribute: "show-range-propagator" })
    public showRangePropagator: boolean = false;

    /** Disables selection of individual rows and select/deselect all, even when the table is interactive. */
    @property({ type: Boolean, attribute: "selection-disabled" })
    public selectionDisabled: boolean = false;

    /** Hides editing and deletion actions, even when the table is interactive. */
    @property({ type: Boolean, attribute: "edit-disabled" })
    public editDisabled: boolean = false;

    /** Disables toggling the graph lines from the value cells. */
    @property({ type: Boolean, attribute: "graph-activation-disabled" })
    public graphActivationDisabled: boolean = false;

    /** Makes the table interactive regardless of the manager context. */
    @property({ type: Boolean, attribute: "force-interactive" })
    public forceInteractive: boolean = false;

    /** Interactivity provided by the manager context only. */
    @consume({ context: managerInteractiveAnalysesContext, subscribe: true })
    @state()
    protected interactiveFromContext: boolean = false;

    @consume({ context: fileAnalysisListContext, subscribe: true })
    @state()
    protected analysis: AbstractAnalysis[] = [];

    private boundFile?: ThermalFileInstance;

    private readonly selectionChanged = () => this.requestUpdate();

    protected get isInteractive(): boolean {
        return this.interactiveFromContext || this.forceInteractive;
    }

    protected get allowsSelection(): boolean {
        return this.isInteractive && !this.selectionDisabled;
    }

    protected get allowsEdit(): boolean {
        return this.isInteractive && !this.editDisabled;
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
                            ${!compact && (this.allowsEdit || this.showRangePropagator)
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
                                .graphActivationEnabled=${!this.graphActivationDisabled}
                                .showRangePropagator=${this.showRangePropagator}
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
