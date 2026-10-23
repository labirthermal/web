import { consume } from "@lit/context";
import { css, html } from "lit";
import type { PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import type { RegistryController } from "../../controllers/RegistryController";
import type { ManagerPaletteContextType } from "../../controllers/ManagerController";
import { managerPaletteContext } from "../../controllers/ManagerController";
import { registryMaxContext } from "../../controllers/RegistryController";
import { registryMinContext } from "../../controllers/RegistryController";
import { registryLoadingContext } from "../../controllers/RegistryController";
import { registryRangeToContext } from "../../controllers/RegistryController";
import { registryRangeFromContext } from "../../controllers/RegistryController";

type Handle = "from" | "to";
type Range = { from: number; to: number };
type Values = Range & { min: number; max: number };
type Drag = { pointerId: number; handle: Handle; offset: number; element: HTMLElement; values: Values; controller: RegistryController };

export class RegistryRangeSlider extends AbstractRegistryConsumer {

    @property({ type: String, reflect: true })
    public height: string | null = null;

    // Whole-style replacements must not erase the height attribute's override.
    @property({ type: String, attribute: "style" })
    private heightStyle: string | null = null;

    @consume({ context: registryMinContext, subscribe: true })
    @state()
    public min?: number;

    @consume({ context: registryMaxContext, subscribe: true })
    @state()
    public max?: number;

    @consume({ context: registryRangeFromContext, subscribe: true })
    @state()
    public from?: number;

    @consume({ context: registryRangeToContext, subscribe: true })
    @state()
    public to?: number;

    @consume({ context: managerPaletteContext, subscribe: true })
    @state()
    protected palette?: ManagerPaletteContextType;

    @consume({ context: registryLoadingContext, subscribe: true })
    @state()
    protected loading = false;

    @state()
    private draft?: Range;

    @state()
    private activeHandle: Handle = "from";

    private drag?: Drag;

    protected getClassName(): string {
        return "RangeSliderElement";
    }

    disconnectedCallback(): void {
        this.cancelDrag();
        super.disconnectedCallback();
    }

    willUpdate(changed: PropertyValues): void {
        super.willUpdate(changed);
        if (changed.has("height") || changed.has("heightStyle")) {
            const height = this.height?.trim();
            const style = document.createElement("div").style;
            if (height) style.height = height;
            const current = this.style.getPropertyValue("--_range-slider-attribute-height");
            if (height && style.height && !/^(auto|inherit|initial|unset|revert|revert-layer|min-content|max-content|fit-content|stretch|contain)$/i.test(height)) {
                if (current !== height) this.style.setProperty("--_range-slider-attribute-height", height);
            } else {
                if (current) this.style.removeProperty("--_range-slider-attribute-height");
                if (height && changed.has("height")) this.log("Invalid range slider height", { height: this.height });
            }
        }
        if (["min", "max", "from", "to", "loading", "registryController"].some(key => changed.has(key))) {
            this.cancelDrag();
            if (this.min !== undefined && this.max !== undefined && this.from !== undefined && this.to !== undefined
                && !this.values) {
                this.log("Invalid range slider values", { min: this.min, max: this.max, from: this.from, to: this.to });
            }
        }
    }

    private get values(): Values | undefined {
        const { min, max, from, to } = this;
        if (min === undefined || max === undefined || from === undefined || to === undefined) return undefined;
        if (![min, max, from, to, max - min].every(Number.isFinite)
            || min > max || from < min || to > max || from > to) return undefined;
        return { min, max, from, to };
    }

    private percent(value: number, values: Values): number {
        return values.max === values.min ? 0 : (value - values.min) / (values.max - values.min) * 100;
    }

    private constrain(handle: Handle, value: number, values: Values, range: Range): Range {
        return handle === "from"
            ? { from: Math.max(values.min, Math.min(range.to, value)), to: range.to }
            : { from: range.from, to: Math.min(values.max, Math.max(range.from, value)) };
    }

    private commit(range: Range): void {
        this.cancelDrag();
        if (range.from === this.from && range.to === this.to) return;
        this.registryController.setRange(range.from, range.to);
        this.from = this.registryController.from;
        this.to = this.registryController.to;
    }

    private cancelDrag(): void {
        const drag = this.drag;
        this.drag = undefined;
        this.draft = undefined;
        if (drag?.element.hasPointerCapture(drag.pointerId)) {
            drag.element.releasePointerCapture(drag.pointerId);
        }
    }

    private pointerDown(event: PointerEvent): void {
        const values = this.values;
        if (!values || this.loading || values.min === values.max || this.drag || event.button !== 0) return;
        const track = event.currentTarget;
        const target = event.target;
        if (!(track instanceof HTMLElement) || !(target instanceof HTMLElement)) return;
        const rect = track.getBoundingClientRect();
        if (rect.width === 0) return;

        const pointerPercent = (event.clientX - rect.left) / rect.width * 100;
        const clickedHandle = target.closest<HTMLElement>("[data-handle]")?.dataset.handle;
        let handle: Handle;
        if (clickedHandle === "from" || clickedHandle === "to") {
            handle = clickedHandle;
        } else {
            const fromDistance = Math.abs(pointerPercent - this.percent(values.from, values));
            const toDistance = Math.abs(pointerPercent - this.percent(values.to, values));
            handle = fromDistance === toDistance ? this.activeHandle : fromDistance < toDistance ? "from" : "to";
        }

        event.preventDefault();
        this.activeHandle = handle;
        track.querySelector<HTMLElement>(`[data-handle="${handle}"]`)?.focus({ preventScroll: true });
        this.draft = { from: values.from, to: values.to };
        const offset = clickedHandle ? event.clientX - rect.left - this.percent(values[handle], values) / 100 * rect.width : 0;
        this.drag = { pointerId: event.pointerId, handle, offset, element: track, values, controller: this.registryController };
        track.setPointerCapture(event.pointerId);
        this.pointerMove(event);
    }

    private pointerMove(event: PointerEvent): void {
        const drag = this.drag;
        const values = this.values;
        if (!drag || event.pointerId !== drag.pointerId) return;
        if (!values || !this.draft || this.loading || this.registryController !== drag.controller
            || values.min !== drag.values.min || values.max !== drag.values.max
            || values.from !== drag.values.from || values.to !== drag.values.to) {
            this.cancelDrag();
            return;
        }
        const rect = drag.element.getBoundingClientRect();
        if (rect.width === 0) return;
        const fraction = Math.max(0, Math.min(1, (event.clientX - rect.left - drag.offset) / rect.width));
        const value = fraction === 0 ? values.min : fraction === 1 ? values.max
            : values.min + fraction * (values.max - values.min);
        this.draft = this.constrain(drag.handle, value, values, this.draft);
    }

    private pointerUp(event: PointerEvent): void {
        if (this.drag?.pointerId !== event.pointerId) return;
        this.pointerMove(event);
        const range = this.draft;
        if (range) this.commit(range);
        else this.cancelDrag();
    }

    private pointerCancel(event: PointerEvent): void {
        if (this.drag?.pointerId === event.pointerId) this.cancelDrag();
    }

    private keyDown(event: KeyboardEvent, handle: Handle): void {
        const values = this.values;
        if (!values || this.loading || values.min === values.max) return;
        let value: number;
        switch (event.key) {
            case "ArrowLeft":
                value = Number((values[handle] - (values.max - values.min) / 100).toPrecision(15));
                break;
            case "ArrowRight":
                value = Number((values[handle] + (values.max - values.min) / 100).toPrecision(15));
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

    private wheel(event: WheelEvent, handle: Handle): void {
        const values = this.values;
        if (!values || this.loading || values.min === values.max || event.deltaY === 0 || this.drag) return;
        event.preventDefault();
        event.stopPropagation();
        this.activeHandle = handle;
        const value = Number((values[handle] + Math.sign(event.deltaY) * (values.max - values.min) / 100).toPrecision(15));
        this.commit(this.constrain(handle, value, values, values));
    }

    private renderHandle(handle: Handle, values: Values, range: Range) {
        const disabled = values.min === values.max;
        return html`
            <div class="handle-position ${this.activeHandle === handle ? "active" : ""}"
                style=${styleMap({ left: `${this.percent(range[handle], values)}%` })}>
                <button type="button" class="handle" data-handle=${handle} role="slider"
                    aria-label=${this.t(handle === "from" ? "minimaltemperature" : "maximaltemperature")}
                    aria-orientation="horizontal"
                    aria-valuemin=${handle === "from" ? values.min : range.from}
                    aria-valuemax=${handle === "from" ? range.to : values.max}
                    aria-valuenow=${range[handle]}
                    aria-valuetext=${`${range[handle].toFixed(2)} \u00b0C`}
                    ?disabled=${disabled}
                    style=${styleMap({ background: handle === "from" ? this.palette?.data.pixels[0]
                        : this.palette?.data.pixels[this.palette.data.pixels.length - 1] })}
                    @focus=${() => { this.activeHandle = handle; }}
                    @keydown=${(event: KeyboardEvent) => this.keyDown(event, handle)}
                    @wheel=${(event: WheelEvent) => this.wheel(event, handle)}>
                </button>
                <span class="tooltip" aria-hidden="true">${range[handle].toFixed(2)}</span>
            </div>`;
    }

    static styles = css`
        :host {
            display: block; box-sizing: content-box;
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
        .slider-row { display: flex; align-items: center; height: 100%; }
        .track {
            position: relative; flex: 1; min-width: 0; height: 100%;
            background: var(--thermal-slate); cursor: pointer; touch-action: none;
        }
        .fill { position: absolute; height: 100%; pointer-events: none; }
        .handle-position { position: absolute; top: 0; height: 100%; z-index: 20; }
        .handle-position.active { z-index: 21; }
        .handle {
            position: absolute; top: 50%; transform: translate(-50%, -50%);
            box-sizing: border-box; width: 14px; height: calc(100% + 5px); padding: 0; border-radius: 0;
            border: 2px solid var(--thermal-primary); background: var(--thermal-background);
            box-shadow: 0 0 5px var(--thermal-primary); cursor: grab; touch-action: none;
        }
        .handle:hover, .handle:focus-visible { box-shadow: 0 0 10px var(--thermal-primary); }
        .handle:focus-visible { outline: 2px solid var(--thermal-primary); outline-offset: 2px; }
        .handle:active { cursor: grabbing; }
        .handle:disabled { cursor: default; }
        .tooltip {
            position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none;
            top: calc(100% + 16.5px); min-width: 40px; height: 20px; line-height: 20px; text-align: center;
            padding: 0 3px; background: var(--thermal-slate-dark); color: var(--thermal-background);
            border: 1px solid var(--thermal-slate-dark); border-radius: 3px;
        }
        .tooltip::before {
            content: ""; position: absolute; top: -4px; left: calc(50% - 4px);
            width: 7px; height: 7px; transform: rotate(45deg);
            background: var(--thermal-slate-dark);
        }
        .skeleton { height: 100%; background: var(--thermal-slate); }
    `;

    protected render(): unknown {
        const values = this.values;
        if (this.loading || !values) {
            return html`<div class="container loading" aria-busy=${this.loading}><div class="skeleton"></div></div><slot></slot>`;
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
                        <div class="fill" style=${styleMap({ left: `${left}%`, width: `${right - left}%`,
                            background: this.palette?.data.gradient })}></div>
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
