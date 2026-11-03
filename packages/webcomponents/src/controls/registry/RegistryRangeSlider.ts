import type { ThermalUnit } from "@labirthermal/core";
import { consume } from "@lit/context";
import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { ManagerPaletteContextType } from "../../controllers/ManagerController";
import { managerPaletteContext, managerUnitContext } from "../../controllers/ManagerController";
import type { RegistryController } from "../../controllers/RegistryController";
import {
    registryLoadingContext,
    registryMaxContext,
    registryMinContext,
    registryRangeFromContext,
    registryRangeToContext,
} from "../../controllers/RegistryController";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";

type Handle = "from" | "to";

/** A committed or previewed range. Both endpoints are in Celsius. */
type SliderRange = {
    from: number;
    to: number;
};

/** A validated Celsius range together with its registry bounds. */
type SliderValues = SliderRange & {
    min: number;
    max: number;
};

/** Captured pointer and registry snapshot used to detect obsolete drag previews. */
type DragSession = {
    pointerId: number;
    handle: Handle;
    offsetPixels: number;
    track: HTMLElement;
    initialValues: SliderValues;
    controller: RegistryController;
};

/**
 * Two-handle slider for the enclosing registry's temperature range.
 *
 * Bounds, committed endpoints, drag previews and all interaction calculations stay
 * in Celsius. Only tooltips and ARIA values use the manager's current display unit.
 *
 * Pointer movement previews a range locally; releasing the pointer commits it once.
 * Keyboard and wheel changes commit immediately. Left/right arrows and the wheel
 * step by 1% of the full interval; Home/End and up/down select the exact bounds.
 * Handles stop at the registry bounds and cannot cross each other.
 */
export class RegistryRangeSlider extends AbstractRegistryConsumer {

    // Public configuration

    /** Optional CSS height, overriding `--thermal-range-slider-height` (15px by default). */
    @property({ type: String, reflect: true })
    public height: string | null = null;

    /**
     * Tracks whole-style replacements so they do not erase the height override.
     * @internal
     */
    @property({ type: String, attribute: "style" })
    public heightStyle: string | null = null;

    // Registry and manager context

    /** Registry minimum in Celsius. */
    @consume({ context: registryMinContext, subscribe: true })
    @state()
    public min?: number;

    /** Registry maximum in Celsius. */
    @consume({ context: registryMaxContext, subscribe: true })
    @state()
    public max?: number;

    /** Committed lower endpoint in Celsius, received from the registry context. */
    @consume({ context: registryRangeFromContext, subscribe: true })
    @state()
    public from?: number;

    /** Committed upper endpoint in Celsius, received from the registry context. */
    @consume({ context: registryRangeToContext, subscribe: true })
    @state()
    public to?: number;

    /** Palette used for the selected interval and handle colors. */
    @consume({ context: managerPaletteContext, subscribe: true })
    @state()
    protected palette?: ManagerPaletteContextType;

    /** Loading replaces the controls with a skeleton and cancels any drag preview. */
    @consume({ context: registryLoadingContext, subscribe: true })
    @state()
    protected loading = false;

    /** Rerenders display values when the unit changes; Celsius state is unaffected. */
    @state()
    @consume({ context: managerUnitContext, subscribe: true })
    protected unit?: ThermalUnit;

    // Interaction state

    /** Uncommitted pointer preview in Celsius. */
    @state()
    private draft?: SliderRange;

    /** Last selected handle, also used for track-wheel events and equidistant clicks. */
    @state()
    private activeHandle: Handle = "from";

    /** Active pointer capture and the Celsius values at the beginning of the drag. */
    private drag?: DragSession;

    // Lifecycle and layout

    protected getClassName(): string {
        return "RangeSliderElement";
    }

    /** Discards previews and releases pointer capture before leaving the document. */
    disconnectedCallback(): void {
        this.cancelDrag();
        super.disconnectedCallback();
    }

    /** Reapplies the height override and invalidates drags after registry changes. */
    willUpdate(changed: PropertyValues<this>): void {
        super.willUpdate(changed);

        // Context updates include protected properties, which are not part of `keyof this`.
        const changes: ReadonlyMap<PropertyKey, unknown> = changed;
        if (changes.has("height") || changes.has("heightStyle")) {
            this.updateHeightOverride(changes.has("height"));
        }

        const registryChanged = changes.has("min")
            || changes.has("max")
            || changes.has("from")
            || changes.has("to")
            || changes.has("loading")
            || changes.has("registryController");

        if (!registryChanged) {
            return;
        }

        this.cancelDrag();

        const hasAllValues = this.min !== undefined
            && this.max !== undefined
            && this.from !== undefined
            && this.to !== undefined;

        if (hasAllValues && !this.values) {
            this.log("Invalid range slider values", {
                min: this.min,
                max: this.max,
                from: this.from,
                to: this.to,
            });
        }
    }

    /** Validates CSS height; style-only changes must not repeat invalid-height logs. */
    private updateHeightOverride(reportInvalidHeight: boolean): void {
        const height = this.height?.trim();
        const style = document.createElement("div").style;
        if (height) {
            style.height = height;
        }

        const property = "--_range-slider-attribute-height";
        const current = this.style.getPropertyValue(property);
        const isUnsupportedHeight = /^(auto|inherit|initial|unset|revert|revert-layer|min-content|max-content|fit-content|stretch|contain)$/i.test(height ?? "");

        if (height && style.height && !isUnsupportedHeight) {
            if (current !== height) {
                this.style.setProperty(property, height);
            }
        } else {
            if (current) {
                this.style.removeProperty(property);
            }
            if (height && reportInvalidHeight) {
                this.log("Invalid range slider height", { height: this.height });
            }
        }
    }

    // Celsius range calculations

    /** Returns usable Celsius values; missing context or invalid data cannot drive a slider. */
    private get values(): SliderValues | undefined {
        const { min, max, from, to } = this;
        if (min === undefined || max === undefined || from === undefined || to === undefined) {
            return undefined;
        }

        const isFinite = [min, max, from, to, max - min].every(Number.isFinite);
        const isWithinBounds = min <= from && from <= to && to <= max;
        if (!isFinite || !isWithinBounds) {
            return undefined;
        }

        return { min, max, from, to };
    }

    /** Maps a Celsius temperature to its track position; a constant interval starts at 0%. */
    private percent(value: number, values: SliderValues): number {
        return values.max === values.min ? 0 : (value - values.min) / (values.max - values.min) * 100;
    }

    /** Clamps one Celsius endpoint to the registry bound and the opposite handle. */
    private constrain(handle: Handle, value: number, values: SliderValues, range: SliderRange): SliderRange {
        if (handle === "from") {
            return { from: Math.max(values.min, Math.min(range.to, value)), to: range.to };
        }
        return { from: range.from, to: Math.min(values.max, Math.max(range.from, value)) };
    }

    /**
     * Commits a Celsius range; context subscriptions receive the validated core values.
     * Never copy the controller's public display-unit endpoints back into local state:
     * rounding during that conversion can move an exact endpoint outside its bound.
     */
    private commit(range: SliderRange): void {
        this.cancelDrag();
        if (range.from === this.from && range.to === this.to) {
            return;
        }

        this.registryController.setRange(range.from, range.to);
    }

    /** Clears the session before releasing capture, which can fire `lostpointercapture`. */
    private cancelDrag(): void {
        const drag = this.drag;
        this.drag = undefined;
        this.draft = undefined;
        if (drag?.track.hasPointerCapture(drag.pointerId)) {
            drag.track.releasePointerCapture(drag.pointerId);
        }
    }

    // Pointer interaction

    /** Selects a handle, preserves the grab offset and starts a captured local preview. */
    private pointerDown(event: PointerEvent): void {
        const values = this.values;
        if (!values || this.loading || values.min === values.max || this.drag || event.button !== 0) {
            return;
        }

        const track = event.currentTarget;
        const target = event.target;
        if (!(track instanceof HTMLElement) || !(target instanceof HTMLElement)) {
            return;
        }

        const rect = track.getBoundingClientRect();
        if (rect.width === 0) {
            return;
        }

        const pointerPercent = (event.clientX - rect.left) / rect.width * 100;
        const clickedHandle = target.closest<HTMLElement>("[data-handle]")?.dataset.handle;
        let handle: Handle;
        let offsetPixels = 0;

        if (clickedHandle === "from" || clickedHandle === "to") {
            handle = clickedHandle;
            offsetPixels = event.clientX - rect.left - this.percent(values[handle], values) / 100 * rect.width;
        } else {
            const fromDistance = Math.abs(pointerPercent - this.percent(values.from, values));
            const toDistance = Math.abs(pointerPercent - this.percent(values.to, values));

            if (fromDistance === toDistance) {
                handle = this.activeHandle;
            } else {
                handle = fromDistance < toDistance ? "from" : "to";
            }
        }

        event.preventDefault();
        this.activeHandle = handle;
        track.querySelector<HTMLElement>(`[data-handle="${handle}"]`)?.focus({ preventScroll: true });
        this.draft = { from: values.from, to: values.to };
        this.drag = {
            pointerId: event.pointerId,
            handle,
            offsetPixels,
            track,
            initialValues: values,
            controller: this.registryController,
        };
        track.setPointerCapture(event.pointerId);
        this.pointerMove(event);
    }

    /** Updates only the Celsius draft, or cancels it if the captured registry state changed. */
    private pointerMove(event: PointerEvent): void {
        const drag = this.drag;
        const values = this.values;
        if (!drag || event.pointerId !== drag.pointerId) {
            return;
        }
        if (!values || !this.draft || this.loading) {
            this.cancelDrag();
            return;
        }

        const registryChanged = this.registryController !== drag.controller
            || values.min !== drag.initialValues.min
            || values.max !== drag.initialValues.max
            || values.from !== drag.initialValues.from
            || values.to !== drag.initialValues.to;

        if (registryChanged) {
            this.cancelDrag();
            return;
        }

        const rect = drag.track.getBoundingClientRect();
        if (rect.width === 0) {
            return;
        }

        const pointerFraction = (event.clientX - rect.left - drag.offsetPixels) / rect.width;
        const fraction = Math.max(0, Math.min(1, pointerFraction));

        // Use the original Celsius endpoint at each edge, not an interpolated approximation.
        let value: number;
        if (fraction === 0) {
            value = values.min;
        } else if (fraction === 1) {
            value = values.max;
        } else {
            value = values.min + fraction * (values.max - values.min);
        }

        this.draft = this.constrain(drag.handle, value, values, this.draft);
    }

    /** Includes the release position before committing the final, clamped Celsius draft. */
    private pointerUp(event: PointerEvent): void {
        if (this.drag?.pointerId !== event.pointerId) {
            return;
        }

        this.pointerMove(event);
        const range = this.draft;
        if (range) {
            this.commit(range);
        } else {
            this.cancelDrag();
        }
    }

    /** Pointer cancellation or lost capture must never commit a preview. */
    private pointerCancel(event: PointerEvent): void {
        if (this.drag?.pointerId === event.pointerId) {
            this.cancelDrag();
        }
    }

    // Keyboard and wheel interaction

    /** Moves by 1% of the Celsius interval, or selects an exact bound with Home/End. */
    private keyDown(event: KeyboardEvent, handle: Handle): void {
        const values = this.values;
        if (!values || this.loading || values.min === values.max) {
            return;
        }

        const step = (values.max - values.min) / 100;
        let value: number;
        switch (event.key) {
            case "ArrowLeft":
                value = Number((values[handle] - step).toPrecision(15));
                break;
            case "ArrowRight":
                value = Number((values[handle] + step).toPrecision(15));
                break;
            // Keep the existing horizontal slider's up/down shortcuts.
            case "ArrowUp":
            case "Home":
                value = values.min;
                break;
            case "ArrowDown":
            case "End":
                value = values.max;
                break;
            default:
                return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.activeHandle = handle;
        this.commit(this.constrain(handle, value, values, values));
    }

    /** Commits a 1% Celsius step per wheel direction; active drags take precedence. */
    private wheel(event: WheelEvent, handle: Handle): void {
        const values = this.values;
        if (!values || this.loading || values.min === values.max || event.deltaY === 0 || this.drag) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.activeHandle = handle;

        const step = Math.sign(event.deltaY) * (values.max - values.min) / 100;
        const value = Number((values[handle] + step).toPrecision(15));
        this.commit(this.constrain(handle, value, values, values));
    }

    // Rendering

    /** Converts Celsius to the display unit only for ARIA values and the visible tooltip. */
    private renderHandle(handle: Handle, values: SliderValues, range: SliderRange) {
        const disabled = values.min === values.max;
        const valueInCurrentUnit = this.managerController.toCurrentUnit(range[handle]);
        const minimumInCurrentUnit = this.managerController.toCurrentUnit(handle === "from" ? values.min : range.from);
        const maximumInCurrentUnit = this.managerController.toCurrentUnit(handle === "from" ? range.to : values.max);
        const label = this.managerController.formatSingle(valueInCurrentUnit);
        const background = handle === "from"
            ? this.palette?.data.pixels[0]
            : this.palette?.data.pixels[this.palette.data.pixels.length - 1];

        return html`
            <div class="handle-position ${this.activeHandle === handle ? "active" : ""}"
                style=${styleMap({ left: `${this.percent(range[handle], values)}%` })}>
                <button type="button" class="handle" data-handle=${handle} role="slider"
                    aria-label=${this.t(handle === "from" ? "minimaltemperature" : "maximaltemperature")}
                    aria-orientation="horizontal"
                    aria-valuemin=${minimumInCurrentUnit}
                    aria-valuemax=${maximumInCurrentUnit}
                    aria-valuenow=${valueInCurrentUnit}
                    aria-valuetext=${label}
                    ?disabled=${disabled}
                    style=${styleMap({ background })}
                    @focus=${() => { this.activeHandle = handle; }}
                    @keydown=${(event: KeyboardEvent) => this.keyDown(event, handle)}
                    @wheel=${(event: WheelEvent) => this.wheel(event, handle)}>
                </button>
                <span class="tooltip" aria-hidden="true">${label}</span>
            </div>`;
    }

    static styles = css`
        :host {
            display: block;
            box-sizing: content-box;
            --_range-slider-attribute-height: initial;
            height: var(--_range-slider-attribute-height, var(--thermal-range-slider-height, 15px));
            padding-bottom: max(0px, calc(var(--thermal-gap) - 15px));
            margin-bottom: -6px;
        }

        .container {
            height: 100%;
            padding: 0 calc(var(--thermal-gap) * .5);
            color: var(--thermal-slate-dark);
            font-size: 12px;
        }

        .slider-row {
            display: flex;
            align-items: center;
            height: 100%;
        }

        .track {
            position: relative;
            flex: 1;
            min-width: 0;
            height: 100%;
            background: var(--thermal-slate);
            cursor: pointer;
            touch-action: none;
        }

        .fill {
            position: absolute;
            height: 100%;
            pointer-events: none;
        }

        .handle-position {
            position: absolute;
            top: 0;
            height: 100%;
            z-index: 20;
        }

        .handle-position.active {
            z-index: 21;
        }

        .handle {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            box-sizing: border-box;
            width: 14px;
            height: calc(100% + 5px);
            padding: 0;
            border-radius: 0;
            border: 2px solid var(--thermal-primary);
            background: var(--thermal-background);
            box-shadow: 0 0 5px var(--thermal-primary);
            cursor: grab;
            touch-action: none;
        }

        .handle:hover,
        .handle:focus-visible {
            box-shadow: 0 0 10px var(--thermal-primary);
        }

        .handle:focus-visible {
            outline: 2px solid var(--thermal-primary);
            outline-offset: 2px;
        }

        .handle:active {
            cursor: grabbing;
        }

        .handle:disabled {
            cursor: default;
        }

        .tooltip {
            position: absolute;
            transform: translate(-50%, -50%);
            white-space: nowrap;
            pointer-events: none;
            top: calc(100% + 16.5px);
            min-width: 40px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            padding: 0 3px;
            background: var(--thermal-slate-dark);
            color: var(--thermal-background);
            border: 1px solid var(--thermal-slate-dark);
            border-radius: 3px;
        }

        .tooltip::before {
            content: "";
            position: absolute;
            top: -4px;
            left: calc(50% - 4px);
            width: 7px;
            height: 7px;
            transform: rotate(45deg);
            background: var(--thermal-slate-dark);
        }

        .skeleton {
            height: 100%;
            background: var(--thermal-slate);
        }
    `;

    /** Renders the Celsius geometry with current-unit labels, or a loading placeholder. */
    protected render(): unknown {
        const values = this.values;
        if (this.loading || !values) {
            return html`
                <div class="container loading" aria-busy=${this.loading}>
                    <div class="skeleton"></div>
                </div>
                <slot></slot>
            `;
        }

        const range = this.draft ?? values;
        const left = this.percent(range.from, values);
        const right = this.percent(range.to, values);

        return html`
            <div class="container ready">
                <div class="slider-row">
                    <div class="track"
                        @pointerdown=${this.pointerDown}
                        @pointermove=${this.pointerMove}
                        @pointerup=${this.pointerUp}
                        @pointercancel=${this.pointerCancel}
                        @lostpointercapture=${this.pointerCancel}
                        @wheel=${(event: WheelEvent) => this.wheel(event, this.activeHandle)}>
                        <div class="fill" style=${styleMap({
                            left: `${left}%`,
                            width: `${right - left}%`,
                            background: this.palette?.data.gradient,
                        })}></div>
                        ${this.renderHandle("from", values, range)}
                        ${this.renderHandle("to", values, range)}
                    </div>
                </div>
            </div>
            <slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "registry-range-slider": RegistryRangeSlider;
    }
}
