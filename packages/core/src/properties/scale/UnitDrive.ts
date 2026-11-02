import { ThermalManager } from "../../hierarchy/ThermalManager";
import { AbstractProperty } from "../abstractProperty";
import { celsiusToFahrenheit, celsiusToKelvin, fahrenheitToCelsius, kelvinToCelsius, ThermalUnit, ThermalUnitDefinition, thermalUnits } from "./units";

export class UnitDrive extends AbstractProperty<ThermalUnit, ThermalManager> {

    public static readonly KEYS = ThermalUnit;
    public static readonly UNITS = Object.freeze(thermalUnits);

    private _current: ThermalUnitDefinition;

    public get current() { return this._current; }

    constructor(
        parent: ThermalManager,
        initial: ThermalUnit,
    ) {
        super(parent, initial);
        this._current = this.getUnitDefinition(initial);
    }

    protected validate(value: ThermalUnit): ThermalUnit {
        return value;
    }

    protected afterSetEffect(value: ThermalUnit): void {
        // No side effects for now
        this._current = this.getUnitDefinition(value);
    }

    public getUnitDefinition(key: ThermalUnit): ThermalUnitDefinition {
        return thermalUnits[key];
    }

    public set(key: ThermalUnit): void {
        this.value = key;
    }

    public setCelsius(): void {
        this.set(ThermalUnit.C);
    }

    public setFahrenheit(): void {
        this.set(ThermalUnit.F);
    }

    public setKelvin(): void {
        this.set(ThermalUnit.K);
    }

    /** Celsius is the internal unit - all conversions are based on it. */
    public celsiusToCurrent(value: number): number {
        return this.current.fromCelsius(value);
    }

    /** Celsius is the internal unit - all conversions are based on it. */
    public currentToCelsius(value: number): number {
        return this.current.toCelsius(value);
    }

    public formatSingle(
        value: number
    ): string {
        return `${value.toFixed(2)} ${this.current.symbol}`;
    }

    public formatRange(
        from: number,
        to: number
    ): string {
        return `${from.toFixed(2)} — ${to.toFixed(2)} ${this.current.symbol}`;
    }

    public getUnits() {
        return UnitDrive.UNITS;
    }

}