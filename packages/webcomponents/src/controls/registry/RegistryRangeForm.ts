import type { ThermalMinmaxOrUndefined, ThermalRangeOrUndefined, ThermalRegistry } from "@labirthermal/core";
import { t } from "i18next";
import { css, html } from "lit";
import type { CSSResultGroup, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { T } from "../../translations/Languages";
import { booleanConverter } from "../../utils/converters/booleanConverter";
import { ifDefined } from "lit/directives/if-defined.js";


/**
 * Form control for editing a thermal registry's active range. It keeps its
 * inputs synchronized with registry range data and provides range presets,
 * bounded stepping, and rounding.
 *
 * @see AbstractRegistryConsumer
 * @see RegistryController
 */
export class RegistryRangeForm extends AbstractRegistryConsumer {

    /**
     * Whether to arrange the form controls in a stacked layout. Reflected to
     * the `stacked` attribute; defaults to `false`.
     */
    @property({reflect: true, converter: booleanConverter(true)})
    public stacked: boolean = false;

    /** The registry minimum, or `undefined` until bounds are available. */
    @state()
    protected min: number | undefined;

    /** The registry maximum, or `undefined` until bounds are available. */
    @state()
    protected max: number | undefined;

    /** The active range's lower endpoint, or `undefined` before synchronization. */
    @state()
    protected from: number | undefined;

    /** The active range's upper endpoint, or `undefined` before synchronization. */
    @state()
    protected to: number | undefined;

    /** The increment used by the endpoint step controls; defaults to `1`. */
    @state()
    protected step: number = 1;

    /** Step sizes offered by the endpoint controls; defaults to `[0.01, 0.1, 0.5, 1, 5, 10]`. */
    @state()
    protected availableSteps: number[] = [0.01, 0.1, 0.5, 1, 5, 10];

    /** Input text for each endpoint; both values default to empty strings. */
    @state()
    protected inputValues: { from: string; to: string } = { from: "", to: "" };

    /** Whether a registry range is being applied; defaults to `false`. */
    @state()
    protected isUpdatingFromRegistry: boolean = false;

    /** Timer used to debounce endpoint input updates; initially `undefined`. */
    private debounceTimer: number | undefined;

    /** The latest automatic range, or `undefined` until one is available. */
    @state()
    protected autoValue: ThermalRangeOrUndefined;

    /** Registry currently observed by this form, initially unset. */
    private subscribedRegistry?: ThermalRegistry;

    /** Whether the automatic-range control is active; defaults to `false`. */
    private autoRangeHovered: boolean = false;

    connectedCallback(): void {
        super.connectedCallback();
        this.hydrate();
    }

    willUpdate(changedProperties: PropertyValues<this>): void {
        super.willUpdate(changedProperties);
        this.hydrate();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.dehydrate();
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
    }

    /**
     * Synchronizes local form state with the current registry and subscribes to
     * its range updates.
     */
    private hydrate(): void {
        const registry = this.registryController?.registryObject;
        if (registry === undefined || registry === this.subscribedRegistry) {
            return;
        }

        // Replace any previous subscriptions before observing the new registry.
        this.dehydrate();
        this.subscribedRegistry = registry;

        // Synchronize the initial values before listening for subsequent updates.
        this.recieveMinmax(registry.minmax.value);
        this.recieveRange(registry.range.value);
        this.recieveAutoValue(registry.range.autoValue);

        // Subscribe to bounds, active-range, and automatic-range changes.
        registry.minmax.addListener(this.UUID, this.recieveMinmax);
        registry.range.addListener(this.UUID, this.recieveRange);
        registry.range.onAutoValueChanged.set(this.UUID, this.recieveAutoValue);
    }

    /**
     * Removes this form's listeners from the subscribed registry and clears the
     * subscription reference.
     */
    private dehydrate(): void {
        const registry = this.subscribedRegistry;
        if (registry === undefined) {
            return;
        }

        // Remove every listener registered during hydration.
        registry.minmax.removeListener(this.UUID);
        registry.range.removeListener(this.UUID);
        registry.range.onAutoValueChanged.delete(this.UUID);
        this.subscribedRegistry = undefined;
    }

    /**
     * Updates the displayed registry bounds and clears range inputs when bounds
     * are unavailable.
     *
     * @param value The registry's current minimum and maximum, or `undefined`
     * when unavailable.
     */
    private recieveMinmax = (value: ThermalMinmaxOrUndefined): void => {
        if ( value ) {
            if (this.min !== value.min ) this.min = value.min;
            if (this.max !== value.max ) this.max = value.max;
        } else {
            // Clear range state when the registry no longer has known bounds.
            this.min = undefined;
            this.max = undefined;
            this.from = undefined;
            this.to = undefined;
            this.inputValues = { from: "", to: "" };
        }
    }

    /**
     * Synchronizes the form's range values and input text with the registry.
     *
     * @param value The registry's active range, or `undefined` when no range is set.
     */
    private recieveRange = (value: ThermalRangeOrUndefined): void => {
        // Prevent incoming registry values from being written back as user edits.
        this.isUpdatingFromRegistry = true;

        if ( value ) {
            if (this.from !== value.from ) {
                this.from = value.from;
                this.inputValues = { ...this.inputValues, from: value.from?.toFixed(2) ?? "" };
            }
            if (this.to !== value.to ) {
                this.to = value.to;
                this.inputValues = { ...this.inputValues, to: value.to?.toFixed(2) ?? "" };
            }
        } else {
            this.from = undefined;
            this.to = undefined;
            this.inputValues = { from: "", to: "" };
        }

        this.isUpdatingFromRegistry = false;
    }

    /**
     * Stores the latest automatic range and refreshes its highlight when hovered.
     *
     * @param value The registry's current automatic range, or `undefined` when
     * unavailable.
     */
    private recieveAutoValue = (value: ThermalRangeOrUndefined): void => {
        this.autoValue = value;
        if (this.autoRangeHovered) {
            // Keep the preview in sync while its control remains active.
            this.registryController.setHighlight(value);
        }
    }

    /**
     * Highlights the registry's full bounds while the full-range control is
     * hovered or focused.
     */
    private handleFullRangeMouseEnter = (): void => {
        const minmax = this.registryObject.minmax.value;
        if (minmax !== undefined) {
            this.registryController.setHighlight({ from: minmax.min, to: minmax.max });
        }
    }

    /** Applies the registry's full minimum-to-maximum range. */
    private handleFullRangeClick = (): void => {
        this.registryObject.range.applyMinmax();
    }

    /** Highlights the automatic range while its control is hovered or focused. */
    private handleAutoRangeMouseEnter = (): void => {
        this.autoRangeHovered = true;
        this.registryController.setHighlight(this.autoValue);
    }

    /** Applies the registry's automatically calculated range. */
    private handleAutoRangeClick = (): void => {
        this.registryObject.range.applyAuto();
    }

    /** Clears the automatic-range hover state and removes the registry highlight. */
    private handleHighlightMouseLeave = (): void => {
        this.autoRangeHovered = false;
        this.registryController.setHighlight(undefined);
    }

    /**
     * Updates the lower endpoint and imposes the resulting range on the registry
     * when both endpoints are available.
     *
     * @param value The new lower endpoint.
     */
    private updateFrom(value: number | undefined): void {
        if (this.registryObject && value !== undefined && this.to !== undefined) {
            this.from = value;
            this.registryObject.range.imposeRange({ from: value, to: this.to });
        }
    }

    /**
     * Updates the upper endpoint and imposes the resulting range on the registry
     * when both endpoints are available.
     *
     * @param value The new upper endpoint.
     */
    private updateTo(value: number | undefined): void {
        if (this.registryObject && value !== undefined && this.from !== undefined) {
            this.to = value;
            this.registryObject.range.imposeRange({ from: this.from, to: value });
        }
    }

    /**
     * Debounces input edits, validates the parsed value, and applies it to the
     * selected endpoint.
     *
     * @param type The endpoint being edited.
     * @param value The current text entered by the user.
     */
    private debouncedUpdate(type: 'from' | 'to', value: string): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = window.setTimeout(() => {
            // Ignore delayed edits while synchronizing a registry update.
            if (this.isUpdatingFromRegistry) return;

            // Parse and validate the input before applying it to the registry.
            const numValue = parseFloat(value);
            if (isNaN(numValue)) return;

            if (type === 'from' && this.isValidFromValue(numValue)) {
                this.updateFrom(numValue);
            } else if (type === 'to' && this.isValidToValue(numValue)) {
                this.updateTo(numValue);
            }
        }, 300);
    }

    /**
     * Checks whether a lower-endpoint value is within the known minimum and
     * upper endpoint.
     *
     * @param value The candidate lower endpoint.
     * @returns `true` if the value is valid; otherwise, `false`.
     */
    private isValidFromValue(value: number): boolean {
        if (this.min !== undefined && value < this.min) return false;
        if (this.to !== undefined && value > this.to) return false;
        return true;
    }

    /**
     * Checks whether an upper-endpoint value is within the known lower endpoint
     * and maximum.
     *
     * @param value The candidate upper endpoint.
     * @returns `true` if the value is valid; otherwise, `false`.
     */
    private isValidToValue(value: number): boolean {
        if (this.max !== undefined && value > this.max) return false;
        if (this.from !== undefined && value < this.from) return false;
        return true;
    }

    /**
     * Determines whether the lower endpoint can move one configured step in the
     * given direction.
     *
     * @param direction The direction in which to step.
     * @returns `true` if the stepped value is valid; otherwise, `false`.
     */
    private canStepFrom(direction: 'up' | 'down'): boolean {
        if (this.from === undefined) return false;

        const newValue = direction === 'up'
            ? this.from + this.step
            : this.from - this.step;

        return this.isValidFromValue(newValue);
    }

    /**
     * Determines whether the upper endpoint can move one configured step in the
     * given direction.
     *
     * @param direction The direction in which to step.
     * @returns `true` if the stepped value is valid; otherwise, `false`.
     */
    private canStepTo(direction: 'up' | 'down'): boolean {
        if (this.to === undefined) return false;

        const newValue = direction === 'up'
            ? this.to + this.step
            : this.to - this.step;

        return this.isValidToValue(newValue);
    }

    /**
     * Checks whether the registry minimum can replace the current lower endpoint.
     *
     * @returns `true` if the minimum can be applied; otherwise, `false`.
     */
    private canSetMin(): boolean {
        return this.min !== undefined
            && this.to !== undefined
            && this.min <= this.to
            && this.from !== this.min;
    }

    /**
     * Checks whether the registry maximum can replace the current upper endpoint.
     *
     * @returns `true` if the maximum can be applied; otherwise, `false`.
     */
    private canSetMax(): boolean {
        return this.max !== undefined
            && this.from !== undefined
            && this.max >= this.from
            && this.to !== this.max;
    }

    /**
     * Moves the lower endpoint by one configured step and applies the rounded
     * value when valid.
     *
     * @param direction The direction in which to move the endpoint.
     */
    private stepFrom(direction: 'up' | 'down'): void {
        if (this.from === undefined || !this.canStepFrom(direction)) return;

        const newValue = direction === 'up'
            ? this.from + this.step
            : this.from - this.step;

        // Round to two decimal places to avoid floating-point precision errors.
        const roundedValue = parseFloat(newValue.toFixed(2));
        this.inputValues.from = roundedValue.toFixed(2);
        this.updateFrom(roundedValue);
    }

    /**
     * Moves the upper endpoint by one configured step and applies the rounded
     * value when valid.
     *
     * @param direction The direction in which to move the endpoint.
     */
    private stepTo(direction: 'up' | 'down'): void {
        if (this.to === undefined || !this.canStepTo(direction)) return;

        const newValue = direction === 'up'
            ? this.to + this.step
            : this.to - this.step;

        // Round to two decimal places to avoid floating-point precision errors.
        const roundedValue = parseFloat(newValue.toFixed(2));
        this.inputValues.to = roundedValue.toFixed(2);
        this.updateTo(roundedValue);
    }

    /** Sets the lower endpoint to the registry minimum when the range permits it. */
    private setMinValue(): void {
        if (!this.canSetMin() || this.min === undefined) return;

        this.inputValues.from = this.min.toFixed(2);
        this.updateFrom(this.min);
    }

    /** Sets the upper endpoint to the registry maximum when the range permits it. */
    private setMaxValue(): void {
        if (!this.canSetMax() || this.max === undefined) return;

        this.inputValues.to = this.max.toFixed(2);
        this.updateTo(this.max);
    }

    /**
     * Sets the increment used when stepping range endpoints.
     *
     * @param newStep The step size to use.
     */
    private setStep(newStep: number): void {
        this.step = newStep;
    }

    /**
     * Rounds the selected range endpoint to the nearest valid integer and applies it.
     *
     * @param type The endpoint to round.
     */
    private roundToNearestInteger(type: 'from' | 'to'): void {
        const currentValue = type === 'from' ? this.from : this.to;
        if (currentValue === undefined) return;

        const rounded = Math.round(currentValue);
        let safeValue = rounded;

        // Keep rounding inside the registry bounds when they are available.
        if (type === "from" && rounded < this.min!) {
            safeValue = Math.ceil( currentValue );
        }

        if (type === "to" && rounded > this.max!) {
            safeValue = Math.floor( currentValue );
        }

        const isValid = type === 'from'
            ? this.isValidFromValue(safeValue)
            : this.isValidToValue(safeValue);

        // Update the displayed value and registry only when the rounded value is valid.
        if (isValid) {
            if (type === 'from') {
                this.inputValues.from = safeValue.toFixed(2);
                this.updateFrom(safeValue);
            } else {
                this.inputValues.to = safeValue.toFixed(2);
                this.updateTo(safeValue);
            }
        }
    }

    /**
     * Returns step sizes that can move at least one current endpoint in either
     * direction.
     *
     * @returns The available step sizes.
     */
    private getAvailableSteps(): number[] {
        return this.availableSteps.filter(step => {
            // Keep a step if either endpoint can move up or down by that amount.
            const fromCanStep = this.from !== undefined && (
                this.isValidFromValue(this.from + step) ||
                this.isValidFromValue(this.from - step)
            );
            const toCanStep = this.to !== undefined && (
                this.isValidToValue(this.to + step) ||
                this.isValidToValue(this.to - step)
            );
            return fromCanStep || toCanStep;
        });
    }

    /**
     * Checks whether a defined value is an integer.
     *
     * @param value The value to check.
     * @returns `true` if the value is an integer; otherwise, `false`.
     */
    private isWholeNumber(value: number | undefined): boolean {
        return value !== undefined && Math.round(value) === value;
    }

    /**
     * Parses endpoint input and clamps it to the currently valid range, falling
     * back to the current value when input is empty or invalid.
     *
     * @param inputValue The text entered in the endpoint input.
     * @param type The endpoint being validated.
     * @returns The parsed, clamped value, or the current endpoint value.
     */
    private getClosestValidValue(inputValue: string, type: 'from' | 'to'): number | undefined {
        // Preserve the current endpoint for empty input.
        if (!inputValue.trim()) {
            return type === 'from' ? this.from : this.to;
        }

        const numValue = parseFloat(inputValue);

        // Preserve the current endpoint when the input cannot be parsed.
        if (isNaN(numValue)) {
            return type === 'from' ? this.from : this.to;
        }

        // Clamp the parsed value to the selected endpoint's valid bounds.
        if (type === 'from') {
            const minBound = this.min ?? Number.NEGATIVE_INFINITY;
            const maxBound = this.to ?? Number.POSITIVE_INFINITY;

            if (numValue < minBound) return minBound;
            if (numValue > maxBound) return maxBound;
            return numValue;
        } else {
            const minBound = this.from ?? Number.NEGATIVE_INFINITY;
            const maxBound = this.max ?? Number.POSITIVE_INFINITY;

            if (numValue < minBound) return minBound;
            if (numValue > maxBound) return maxBound;
            return numValue;
        }
    }

    /**
     * Normalizes an endpoint input on blur and applies the corrected value to
     * the registry.
     *
     * @param type The endpoint whose input lost focus.
     * @param inputValue The input text to normalize.
     */
    private handleInputBlur(type: 'from' | 'to', inputValue: string): void {
        const correctedValue = this.getClosestValidValue(inputValue, type);

        if (correctedValue !== undefined) {
            // Update the displayed text with the normalized endpoint.
            this.inputValues = {
                ...this.inputValues,
                [type]: correctedValue.toFixed(2) 
            };

            // Apply the normalized endpoint to the registry.
            if (type === 'from') {
                this.updateFrom(correctedValue);
            } else {
                this.updateTo(correctedValue);
            }
        }
    }


    /** Styles the range inputs, step controls, and range preset buttons. */
    static styles?: CSSResultGroup | undefined = css`

        :host {
            font-family: inherit;
            font-style: normal;
            font-size: var(--font-size);
            display: flex !important;
            flex-wrap: wrap;
            flex-direction: var( --thermal-direction, row );
            gap: .5em;
        }

        .fields {

            display: flex;
            flex-wrap: no-wrap;
            gap: 0em;
        
        }

        .fields__buttons {

            thermal-btn {
                min-height: 2em;
                flex-grow: var(--thermal-collapsible-grow, 0);
            }
        
        }

        .fields__separated {
            gap: .5em;
        }


        .separator {
            width: .5em;
            &.separator__line {
                display: flex;
                align-items: center;
                &::after {
                    content: "";
                    display: block;
                    height: var(--thermal-border-width);
                    width: 100%;
                    background: var( --thermal-slate );
                }
            }
        }

        .input-group {
            position: relative;
        }
    
        .input-group-inner {
            display: flex;
            align-items: stretch;
            height: 2em;
            position: relative;
            z-index: 1;
        }


        .input-group-outer {
            position: absolute;
            z-index: 0;
            text-align: center;
            width: 100%;

            font-size: .75em;
            height: 2em;
            background: var( --thermal-slate-light );

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );

            opacity: 0;

            transition: all .25s ease-in-out;

            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .25em;

            &.input-group-outer__top {
                top: 3px;
                padding-bottom: .5em;
                border-radius: var( --thermal-radius ) var( --thermal-radius ) 0 0;
            }

            &.input-group-outer__bottom {
                bottom: 3px;
                padding-top: .5em;
                border-radius: 0 0 var( --thermal-radius ) var( --thermal-radius );
            }
        }

        .input-group:focus-within .input-group-outer {

            opacity: 1;

            &.input-group-outer__top {
                top: -1.5em;
            }

            &.input-group-outer__bottom {
                bottom: -1.5em;
            }
        }

        .input-group.is-whole-number .input-group-outer__bottom {
            opacity: 0;
            bottom: 3px;
        }

        .input-group button,
        .input-group aside,
        .input-group input {

            border: 0;
            border-top: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            border-bottom: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );

            color: var( --thermal-foreground );
            background: var( --thermal-background );
            
            font-family: inherit;
            font-size: 1em;
            line-height: 1em;

            transition: all .25s ease-in-out;
        
        }

        .input-group-inner input, 
        .input-group-inner aside {
            display: block;
            vertical-align: middle;
        }

        .input-group-inner aside {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: .3em;
        }

        .input-group-inner input {

            outline: 0;
            padding: 0;
            margin: 0;

            text-align: right;

            width: 3.5em;

            &:hover,
            &:focus {
                color: var( --thermal-primary );
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }

            &[type=number] {
                -moz-appearance:textfield; /* Firefox */
            }
            
        }

        .input-group-inner > button {

            cursor: pointer;

            outline: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            &.left {
                border-right: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            }

            &.right {
                border-left: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            }

            &:hover,
            &:focus {
                background: var( --thermal-slate-light );
            }

            &:disabled {
                
                cursor: not-allowed;
                color: var( --thermal-slate-light );
                
                &:hover,
                &:focus {
                    background: var( --thermal-background );
                }
            }

            &:first-child {
                border-left: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
                border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            }

            &:last-child {
                border-right: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
                border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
            }

            svg {
                display: block;
            }
        
        }

        .step-button {
            
            color: var( --thermal-slate ) !important;
            cursor: pointer;
            font-size: .7em;
            padding: .2em .3em;
            transition: all .25s ease-in-out;

            background: transparent !important;
            border: none !important;

            &:hover:not(:disabled) {
                color: var( --thermal-primary );
            }

            &.active {
                font-weight: bold;
                color: var( --thermal-foreground ) !important;
            }

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        }

        .round-button {
            
            color: var( --thermal-foreground );
            cursor: pointer;
            font-size: .8em;
            padding: .3em .6em;
            transition: all .25s ease-in-out;
            border: 0 !important;
            background: transparent !important;

            &:hover:not(:disabled) {
                color: var( --thermal-primary );
            }

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        }
    
    `;

    /**
     * Renders one range endpoint input with its step controls and interaction
     * handlers.
     *
     * @param type The endpoint represented by the input.
     * @param before Optional content rendered before the input controls.
     * @param after Optional content rendered after the input controls.
     * @returns The Lit template for the endpoint input.
     */
    protected renderInput(
        type: 'from' | 'to',
        before: unknown = undefined,
        after: unknown = undefined,
    ): unknown {
        const value = type === 'from' ? this.from : this.to;
        const inputValue = this.inputValues[type];
        const canStepDown = type === 'from' ? this.canStepFrom('down') : this.canStepTo('down');
        const canStepUp = type === 'from' ? this.canStepFrom('up') : this.canStepTo('up');
        const availableSteps = this.getAvailableSteps();
        const isWhole = this.isWholeNumber(value);

        return html`
        <div class="input-group ${isWhole ? 'is-whole-number' : ''}">
            <div class="input-group-outer input-group-outer__top">
                ${availableSteps.map(stepValue => html`
                    <button 
                        class="step-button ${stepValue === this.step ? 'active' : ''}"
                        ?disabled=${!availableSteps.includes(stepValue)}
                        @click=${() => this.setStep(stepValue)}
                    >
                        ${stepValue}
                    </button>
                `)}
            </div>
            <div class="input-group-inner">
                ${before}
                <button 
                    class="left"
                    ?disabled=${!canStepDown}
                    @click=${() => type === 'from' ? this.stepFrom('down') : this.stepTo('down')}
                >-</button>
                <input
                    .value=${inputValue}
                    type="number"
                    step=${this.step}
                    min=${ifDefined( type === 'from' ? this.min : this.from)}
                    max=${ifDefined( type === 'from' ? this.to : this.max)}
                    @input=${(e: InputEvent) => {
                        const target = e.target as HTMLInputElement;
                        this.inputValues = { ...this.inputValues, [type]: target.value };
                        this.debouncedUpdate(type, target.value);
                    }}
                    @blur=${(e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        this.handleInputBlur(type, target.value);
                    }}
                    @keydown=${(e: KeyboardEvent) => {
                        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                            e.preventDefault();
                            const direction = e.key === 'ArrowUp' ? 'up' : 'down';
                            if (type === 'from') {
                                this.stepFrom(direction);
                            } else {
                                this.stepTo(direction);
                            }
                        }
                    }}
                ></input>
                <aside>°C</aside>
                <button 
                    class="right"
                    ?disabled=${!canStepUp}
                    @click=${() => type === 'from' ? this.stepFrom('up') : this.stepTo('up')}
                >+</button>
                ${after}
            </div>
            <div class="input-group-outer input-group-outer__bottom">
                <button 
                    class="round-button"
                    @click=${() => this.roundToNearestInteger(type)}
                >
                    Zaokrouhlit
                </button>
            </div>
        </div>
        `;
    }

    protected render(): unknown {
        return html`
        <div class="fields">

            ${this.renderInput(
                'from',
                html`<button 
                    class="left"
                    ?disabled=${!this.canSetMin()}
                    @click=${() => this.setMinValue()}
                >
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <line x1="5" y1="2" x2="5" y2="14" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="10" y2="4" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="16" y2="8" stroke="currentColor" stroke-width="1"/>
                    </svg>
                </button>`,
                undefined
            )}
            <div class="separator separator__line"></div>
            ${this.renderInput(
                'to',
                undefined,
                html`<button 
                    class="right"
                    ?disabled=${!this.canSetMax()}
                    @click=${() => this.setMaxValue()}
                >
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <line x1="15" y1="2" x2="15" y2="14" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="10" y2="4" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="4" y2="8" stroke="currentColor" stroke-width="1"/>
                    </svg>
                </button>`
            )}

        </div>

        <div class="fields fields__separated fields__buttons">
            <thermal-btn
                tooltip=${t(T.fullrange)}
                @click=${this.handleFullRangeClick}
                @mouseenter=${this.handleFullRangeMouseEnter}
                @mouseleave=${this.handleHighlightMouseLeave}
                @focusin=${this.handleFullRangeMouseEnter}
                @focusout=${this.handleHighlightMouseLeave}
                style="padding: 0 0.5em; display: flex; align-items: center; justify-content: center;"
                ?disabled=${!this.canSetMin() && !this.canSetMax()}
            >
                <svg width="35" height="16" viewBox="0 0 35 16" fill="none" style="display: block;" stroke-linecap="butt" stroke-linejoin="miter">
                    <!-- Minimum-bound icon. -->
                    <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" stroke-width="1"/>
                    <line x1="3" y1="8" x2="8" y2="3" stroke="currentColor" stroke-width="1"/>
                    <line x1="3" y1="8" x2="8" y2="13" stroke="currentColor" stroke-width="1"/>
                    <!-- Line connecting the endpoint arrows. -->
                    <line x1="3" y1="8" x2="32" y2="8" stroke="currentColor" stroke-width="1"/>
                    <!-- Maximum-bound icon. -->
                    <line x1="32" y1="2" x2="32" y2="14" stroke="currentColor" stroke-width="1"/>
                    <line x1="32" y1="8" x2="27" y2="3" stroke="currentColor" stroke-width="1"/>
                    <line x1="32" y1="8" x2="27" y2="13" stroke="currentColor" stroke-width="1"/>
                </svg>
            </thermal-btn>
            
            <thermal-btn
                tooltip=${t(T.automaticrange)}
                @click=${this.handleAutoRangeClick}
                @mouseenter=${this.handleAutoRangeMouseEnter}
                @mouseleave=${this.handleHighlightMouseLeave}
                @focusin=${this.handleAutoRangeMouseEnter}
                @focusout=${this.handleHighlightMouseLeave}
                ?disabled=${this.autoValue === undefined}
                style="padding: 0 0.5em; display: flex; align-items: center; justify-content: center;"
            >
                <svg width="56" height="16" viewBox="0 0 56 16" fill="none" style="display: block;">
                    <!-- All bars sorted by X coordinate - background (slate color) -->
                    <rect x="2" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="4" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="6" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="8" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="10" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="12" y="9" width="2" height="5" fill="var(--thermal-slate)"/>
                    <rect x="14" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="16" y="11" width="2" height="3" fill="var(--thermal-slate)"/>
                    <rect x="18" y="6" width="2" height="8" fill="var(--thermal-slate)"/>
                    <rect x="20" y="2" width="2" height="12" fill="var(--thermal-slate)"/>
                    <rect x="22" y="3" width="2" height="11" fill="var(--thermal-slate)"/>
                    <rect x="24" y="1" width="2" height="13" fill="var(--thermal-slate)"/>
                    <rect x="26" y="2" width="2" height="12" fill="var(--thermal-slate)"/>
                    <rect x="28" y="4" width="2" height="10" fill="var(--thermal-slate)"/>
                    <rect x="30" y="8" width="2" height="6" fill="var(--thermal-slate)"/>
                    <rect x="32" y="10" width="2" height="4" fill="var(--thermal-slate)"/>
                    <rect x="34" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="36" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="38" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="40" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="42" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="44" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="46" y="11" width="2" height="3" fill="var(--thermal-slate)"/>
                    <rect x="48" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="50" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="52" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <!-- Highlighted section - foreground color (sorted by X) -->
                    <rect x="18" y="6" width="2" height="8" fill="var(--thermal-foreground)"/>
                    <rect x="20" y="2" width="2" height="12" fill="var(--thermal-foreground)"/>
                    <rect x="22" y="3" width="2" height="11" fill="var(--thermal-foreground)"/>
                    <rect x="24" y="1" width="2" height="13" fill="var(--thermal-foreground)"/>
                    <rect x="26" y="2" width="2" height="12" fill="var(--thermal-foreground)"/>
                    <rect x="28" y="4" width="2" height="10" fill="var(--thermal-foreground)"/>
                    <!-- Bottom line with offset -->
                    <line x1="17" y1="15.5" x2="31" y2="15.5" stroke="currentColor" stroke-width="1"/>
                </svg>
            </thermal-btn>
        </div>

        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "registry-range-form": RegistryRangeForm;
    }
}