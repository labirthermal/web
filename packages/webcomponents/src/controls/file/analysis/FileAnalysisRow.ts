import { AbstractAreaAnalysis, PointAnalysis } from "@labirthermal/core";
import type { AbstractAnalysis } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import { css, html, nothing } from "lit";
import type { PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { AbstractThermalElement } from "../../../hierarchy/AbstractThermalElement";
import { registryControllerContext } from "../../../controllers/RegistryController";
import type { RegistryController } from "../../../controllers/RegistryController";
import { T } from "../../../translations/Languages";
import { getContrastColor } from "../../../utils/getContrastColor";
import type { AnalysisTableMode } from "./AnalysisTableOptions";

export class FileAnalysisRowElement extends AbstractThermalElement {

    @property({ attribute: false })
    public analysis?: AbstractAnalysis;

    @property({ attribute: "table-mode" })
    public tableMode: AnalysisTableMode = "full";

    /** Prevents selecting this analysis. */
    @property({ type: Boolean, attribute: "selection-disabled" })
    public selectionDisabled: boolean = false;

    /** Prevents editing and deleting this analysis, independently of selection. */
    @property({ type: Boolean, attribute: "edit-disabled" })
    public editDisabled: boolean = false;

    /** Prevents toggling graph values from this row. */
    @property({ type: Boolean, attribute: "graph-activation-disabled" })
    public graphActivationDisabled: boolean = false;

    /** Shows the action that applies the analysis range to the registry. */
    @property({ type: Boolean, attribute: "show-range-propagator" })
    public showRangePropagator: boolean = false;

    @property({ type: Boolean, reflect: true })
    protected selected: boolean = false;

    @consume({ context: registryControllerContext, subscribe: true })
    private registryController!: RegistryController;

    /** Actual subscription target, retained so old listeners can be removed after analysis changes. Not reactive. */
    private boundAnalysis?: AbstractAnalysis;
    /** Tracks pointer presence to preserve highlighting while focus moves within the row. Not reactive. */
    private hovered: boolean = false;
    /** Tracks focus presence to preserve highlighting while the pointer leaves the row. Not reactive. */
    private focused: boolean = false;

    protected get allowsEdit(): boolean {
        return !this.editDisabled;
    }

    private readonly refresh = () => {
        this.selected = this.analysis?.selected ?? false;
        this.requestUpdate();
        if (this.hovered || this.focused) {
            this.highlightAnalysis();
        }

    };

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);
        // Side effect of analysis changing - synchronize selection before rendering and rebind analysis listeners.
        if (changedProperties.has("analysis")) {
            this.selected = this.analysis?.selected ?? false;
            this.bindAnalysis();
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        // Refresh selection because it may have changed while disconnected, even without a new analysis reference.
        this.selected = this.analysis?.selected ?? false;
        this.bindAnalysis();
        this.renderRoot.addEventListener("mouseover", this.handleMouseOver);
        this.renderRoot.addEventListener("mouseout", this.handleMouseOut);
        this.renderRoot.addEventListener("focusin", this.handleFocusIn);
        this.renderRoot.addEventListener("focusout", this.handleFocusOut);
    }

    disconnectedCallback(): void {
        this.unbindAnalysis();
        if (this.hovered || this.focused) {
            this.registryController.setHighlight(undefined);
        }
        this.hovered = false;
        this.focused = false;
        this.renderRoot.removeEventListener("mouseover", this.handleMouseOver);
        this.renderRoot.removeEventListener("mouseout", this.handleMouseOut);
        this.renderRoot.removeEventListener("focusin", this.handleFocusIn);
        this.renderRoot.removeEventListener("focusout", this.handleFocusOut);
        super.disconnectedCallback();
    }

    /** Replaces subscriptions to the previous analysis and refreshes the row when a new binding is established. */
    private bindAnalysis(): void {
        if (this.boundAnalysis === this.analysis || !this.isConnected) {
            return;
        }
        this.unbindAnalysis();
        this.boundAnalysis = this.analysis;
        const analysis = this.boundAnalysis;
        if (analysis) {
            analysis.onSelected.set(this.UUID, this.refresh);
            analysis.onDeselected.set(this.UUID, this.refresh);
            analysis.onValues.set(this.UUID, this.refresh);
            analysis.onSerializableChange.set(this.UUID, this.refresh);
            analysis.onMoveOrResize.set(this.UUID, this.refresh);
            analysis.onSetInitialColor.set(this.UUID, this.refresh);
            analysis.onSetName.set(this.UUID, this.refresh);
            analysis.graph.onGraphActivation.set(this.UUID, this.refresh);
        }
        this.refresh();
    }

    /** Removes all subscriptions from the actual bound analysis, not necessarily the current property value. */
    private unbindAnalysis(): void {
        const analysis = this.boundAnalysis;
        if (analysis) {
            analysis.onSelected.delete(this.UUID);
            analysis.onDeselected.delete(this.UUID);
            analysis.onValues.delete(this.UUID);
            analysis.onSerializableChange.delete(this.UUID);
            analysis.onMoveOrResize.delete(this.UUID);
            analysis.onSetInitialColor.delete(this.UUID);
            analysis.onSetName.delete(this.UUID);
            analysis.graph.onGraphActivation.delete(this.UUID);
        }
        this.boundAnalysis = undefined;
    }

    private isWithinRow(target: EventTarget | null): boolean {
        return target instanceof Node && this.renderRoot.contains(target);
    }

    private get range(): { from: number, to: number } | undefined {
        const min = this.analysis?.min;
        const max = this.analysis?.max;
        if (min !== undefined && max !== undefined
            && Number.isFinite(min) && Number.isFinite(max) && min <= max) {
            return { from: min, to: max };
        }
        return undefined;
    }

    private highlightAnalysis(): void {
        this.registryController.setHighlight(this.range);
    }

    private readonly handleMouseOver: EventListener = event => {
        if (event instanceof MouseEvent && !this.isWithinRow(event.relatedTarget)) {
            this.hovered = true;
            this.highlightAnalysis();
        }
    };

    private readonly handleMouseOut: EventListener = event => {
        if (event instanceof MouseEvent && !this.isWithinRow(event.relatedTarget)) {
            this.hovered = false;
            if (!this.focused) {
                this.registryController.setHighlight(undefined);
            }
        }
    };

    private readonly handleFocusIn: EventListener = event => {
        if (event instanceof FocusEvent && !this.isWithinRow(event.relatedTarget)) {
            this.focused = true;
            this.highlightAnalysis();
        }
    };

    private readonly handleFocusOut: EventListener = event => {
        if (event instanceof FocusEvent && !this.isWithinRow(event.relatedTarget)) {
            this.focused = false;
            if (!this.hovered) {
                this.registryController.setHighlight(undefined);
            }
        }
    };

    public static styles = css`
        :host {
            display: table-row;
            white-space: nowrap;
        }

        td {
            padding: .25em .5em;
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs-sm);
        }

        td.compact {
            padding: .25em;
        }

        .identity, .name, .actions {
            display: inline-flex;
            align-items: center;
            gap: .5em;
        }

        .identity {
            width: max-content;
            min-width: 100%;
            justify-content: space-between;
        }

        .name, .actions {
            flex-shrink: 0;
        }

        .name {
            min-width: 0;
            color: inherit;
            font: inherit;
        }

        button.name {
            padding: 0;
            border: 0;
            background: transparent;
            cursor: pointer;
        }

        button.name:hover {
            color: var(--thermal-primary);
        }

        .color {
            display: inline-block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
        }

        .selection-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
        }

        :host([selected]) .selection-indicator {
            background: var(--thermal-slate-dark);
        }
    `;

    private renderActions(): unknown {
        const analysis = this.analysis;
        if (!analysis) {
            return nothing;
        }

        const size = this.tableMode === "compact" ? "sm" : "md";

        return html`<span class="actions">
            ${this.allowsEdit ? html`
                <file-analysis-edit .analysis=${analysis}>
                    <thermal-btn
                        slot="invoker"
                        size=${size}
                        icon="settings"
                        iconStyle="solid"
                        tooltip=${t(T.editsth, { what: analysis.name })}
                    ></thermal-btn>
                </file-analysis-edit>
                <thermal-btn
                    size=${size}
                    icon="trash"
                    iconStyle="micro"
                    tooltip="${t(T.delete)} ${analysis.name}"
                    @click=${() => analysis.file.analysis.layers.removeAnalysis(analysis.key)}
                ></thermal-btn>
            ` : nothing}
            ${this.showRangePropagator && !(analysis instanceof PointAnalysis) ? html`
                <thermal-btn
                    size=${size}
                    icon="range"
                    iconStyle="outline"
                    tooltip="${t(T.range)}: ${analysis.name}"
                    disabled=${this.range === undefined}
                    @click=${() => {
                        const range = this.range;
                        if (range) {
                            analysis.file.group.registry.range.imposeRange(range);
                        }
                    }}
                ></thermal-btn>
            ` : nothing}
        </span>`;
    }

    private renderName(): unknown {
        const analysis = this.analysis;
        if (!analysis) {
            return nothing;
        }
        const label = html`
            <span class="color" aria-hidden="true" style="background-color: ${analysis.initialColor}"></span>
            <span>${analysis.name}</span>
        `;
        return !this.selectionDisabled ? html`
            <button
                type="button"
                class="name"
                aria-pressed=${analysis.selected}
                @click=${() => {
                    if (analysis.selected) {
                        analysis.setDeselected(true);
                    } else {
                        analysis.setSelected(false, true);
                    }
                }}
            >
                <span class="selection-indicator" aria-hidden="true"></span>
                ${label}
            </button>
        ` : html`<span class="name">${label}</span>`;
    }

    private renderValue(statistic: "avg" | "min" | "max"): unknown {
        const analysis = this.analysis;
        if (!analysis) {
            return nothing;
        }
        const value = analysis[statistic];
        const text = value === undefined ? "-" : `${value.toFixed(2)} \u00b0C`;
        const active = analysis.graph.state[statistic === "avg" ? "AVG" : statistic === "min" ? "MIN" : "MAX"];
        const canActivate = !this.graphActivationDisabled && analysis.file.timeline.isSequence
            && (statistic === "avg" || analysis instanceof AbstractAreaAnalysis);
        const background = active ? analysis.initialColor : "transparent";
        const foreground = active ? getContrastColor(analysis.initialColor) : "var(--thermal-foreground)";

        return html`<td class=${this.tableMode === "compact" ? "compact" : ""}>
            ${canActivate ? html`
                <thermal-btn
                    size=${this.tableMode === "compact" ? "sm" : "md"}
                    aria-pressed=${active}
                    tooltip="${t(T.graph)}: ${t(T[statistic])}"
                    style="background-color: ${background}; color: ${foreground}; --bg: ${background}; --bg-hover: ${background}; --color: ${foreground}; --color-hover: ${foreground};"
                    @click=${() => {
                        if (statistic === "avg") {
                            analysis.graph.setAvgActivation(!active);
                        } else if (statistic === "min") {
                            analysis.graph.setMinActivation(!active);
                        } else {
                            analysis.graph.setMaxActivation(!active);
                        }
                    }}
                >${text}</thermal-btn>
            ` : text}
        </td>`;
    }

    protected render(): unknown {
        const analysis = this.analysis;
        if (!analysis) {
            return nothing;
        }
        const compact = this.tableMode === "compact";
        const hasActions = this.allowsEdit || this.showRangePropagator;
        const dimension = analysis instanceof AbstractAreaAnalysis
            ? `${analysis.width}x${analysis.height}`
            : "1x1";

        return html`
            <td class=${compact ? "compact" : ""}>
                <span class="identity">
                    ${this.renderName()}
                    ${compact && hasActions ? this.renderActions() : nothing}
                </span>
            </td>
            ${this.renderValue("avg")}
            ${this.renderValue("min")}
            ${this.renderValue("max")}
            ${compact ? nothing : html`<td>${dimension}</td>`}
            ${!compact && hasActions ? html`<td>${this.renderActions()}</td>` : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "file-analysis-table-row": FileAnalysisRowElement;
    }
}
