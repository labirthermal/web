import { ThermalRegistry } from "../../hierarchy/ThermalRegistry";
import { AbstractProperty } from "../abstractProperty";
import { CallbacksManager } from "../callbacksManager";


/** The range should allways contain both properties. The internal value is always in Celsius. */
type ThermalRangeType = {
    from: number,
    to: number
}
/** The range or undefined. The value is always in Celsius. */
export type ThermalRangeOrUndefined = ThermalRangeType | undefined;

/** Handles the thermal range display. Internal value is always stored in Celsius. */
export class RangeDriver extends AbstractProperty<ThermalRangeOrUndefined, ThermalRegistry> {

    public readonly onAutoValueChanged = new CallbacksManager<(value: ThermalRangeOrUndefined) => void>();

    private _autoValue: ThermalRangeOrUndefined = undefined;


    public get currentRange() {
        return this.value;
    }


    /** 
     * Make sure the range is allways within the minmax values.
     * 
     * If this method should work, the value needs to be set before the minmax is calculated.
     */
    protected validate(value: ThermalRangeOrUndefined): ThermalRangeOrUndefined {

        if (value === undefined) {
            return undefined;
        }

        const minmax = this.parent.minmax.value;

        if (minmax === undefined) {
            return value;
        }

        const result = { ...value };

        if (value.from < minmax.min)
            result.from = minmax.min;

        if (value.to > minmax.max)
            result.to = minmax.max;

        return result;

    }

    /**
     * Whenever the range changes, propagate the value to all instances
     */
    protected afterSetEffect(value: ThermalRangeOrUndefined) {

        if (value)
            this.parent.forEveryInstance(instance => instance.draw());

        this.recalculateAutoValue();

    }


    /** 
     * Imposes a range to itself and below
     * - needs to be called before the minmax is calculated!
     * - The value used here needs always to be in Celsius.
     */
    public imposeRange(valueInCelsius: ThermalRangeOrUndefined) {

        // If new and old are undefined, do nothing
        if (valueInCelsius === undefined && this.value === undefined) {
            // ..do nothing
        }
        // If the new one is undefined and old one exists, set undefined
        else if (valueInCelsius === undefined && this.value !== undefined) {
            this.value = valueInCelsius;
        }
        // If there is no value and the new one exists
        if (valueInCelsius !== undefined && this.value === undefined) {
            this.value = valueInCelsius;
        }
        // If the value changes...
        else if (valueInCelsius !== undefined && this.value !== undefined) {

            // ... set it only if it is different
            if (this.value.from !== valueInCelsius.from || this.value.to !== valueInCelsius.to) {
                this.value = valueInCelsius;
            }

        }

        return this.value;
    }


    /** Sets the range to the current minmax values. The internal value here is always in Celsius. */
    public applyMinmax() {
        if (this.parent.minmax.value) {
            const newRange = { from: this.parent.minmax.value.min, to: this.parent.minmax.value.max };
            this.imposeRange(newRange);
        }
    }

    /** Sets the range automatically based on the current histogram. The internal value here is always in Celsius. */
    public applyAuto() {

        this.imposeRange(this._autoValue);

    }

    /** The automatically calculated range based on the current histogram. This value is always in Celsius. */
    public get autoValue(): ThermalRangeOrUndefined {
        return this._autoValue;
    }

    /** Recalculate the internal automatic value based on the current histogram. The internal value is always in Celsius. */
    public recalculateAutoValue(): ThermalRangeOrUndefined {
        const previousValue = this._autoValue;

        if (this.parent.histogram.value) {

            const percentage = 10; //100 / length;

            const histogramBarsOverPercentage = this.parent.histogram.value.filter(bar => bar.height >= percentage);

            if (histogramBarsOverPercentage.length > 0) {
                this._autoValue = {
                    from: histogramBarsOverPercentage[0].from,
                    to: histogramBarsOverPercentage[
                        histogramBarsOverPercentage.length - 1
                    ].to
                };
            } else {
                this._autoValue = undefined;
            }

        } else {
            this._autoValue = undefined;
        }

        if (
            previousValue?.from !== this._autoValue?.from
            || previousValue?.to !== this._autoValue?.to
        ) {
            this.onAutoValueChanged.call(this._autoValue);
        }

        return this._autoValue;

    }



}