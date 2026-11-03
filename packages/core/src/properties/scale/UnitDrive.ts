import { ThermalManager } from "../../hierarchy/ThermalManager";
import { AbstractProperty } from "../abstractProperty";
import { ThermalUnit, ThermalUnitDefinition, thermalUnits } from "./units";

/** 
 * Controls the thermal unit selection and conversion for the entire `ThermalManager` context. Internal states such as minmax and range are still kept in Celsius. But the GUI and exports will convert their values to the currently selected thermal unit. For this purpose, this class has all the necessary conversion methods.
 * @module `@labirthermal/core`
 */
export class UnitDrive extends AbstractProperty<ThermalUnit, ThermalManager> {

    /** Available thermal unit keys. */
    public static readonly KEYS = ThermalUnit;

    /** Available thermal units by keys. This object can also be accessed using the `getUnits` method. */
    public static readonly UNITS = Object.freeze(thermalUnits);

    /** Internal storage of currently used thermal unit definition. */
    private _current: ThermalUnitDefinition;

    /** The currently active thermal unit definition. Actual value of this driver is the unit key, but this is the whole object representing the unit. Set internally whenever the value changes. */
    public get current() { return this._current; }

    constructor(
        parent: ThermalManager,
        initial: ThermalUnit,
    ) {
        super(parent, initial);
        // Assign the initial thermal unit definition based on the initial key.
        this._current = this.getUnitDefinition(initial);
    }

    protected validate(value: ThermalUnit): ThermalUnit {
        // Defaults to celsius if the value is not valid.
        if (!(value in thermalUnits)) {
            return ThermalUnit.C;
        }
        return value;
    }

    protected afterSetEffect(value: ThermalUnit): void {
        // Whenever the value changes, we need to reassign the internal current unit definition.
        this._current = this.getUnitDefinition(value);
    }

    private getUnitDefinition(key: ThermalUnit): ThermalUnitDefinition {
        return UnitDrive.UNITS[key];
    }

    /** Set the current thermal unit by its key. Triggers internal updates and event listeners. */
    public set(key: ThermalUnit): void {
        this.value = key;
    }

    /** Set the current thermal unit to Celsius. Internal states are always in Celsius. */
    public setCelsius(): void {
        this.set(ThermalUnit.C);
    }

    /** Set the current thermal unit to Fahrenheit. Internal states are always in Celsius. In `@labirthermal/core`, the current unit is only applied in the GUI and in exports.
    */
    public setFahrenheit(): void {
        this.set(ThermalUnit.F);
    }

    /** Set the current thermal unit to Kelvin. Internal states are always in Celsius. In `@labirthermal/core`, the current unit is only applied in the GUI and in exports.
    */
    public setKelvin(): void {
        this.set(ThermalUnit.K);
    }

    /** 
     * Convert a value in Celsius to the current unit. 
     * 
     * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
     */
    public celsiusToCurrent(valueInCelsius: number): number {
        return this.current.fromCelsius(valueInCelsius);
    }

    /** 
     * Convert a value in the current unit to Celsius. 
     * 
     * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
     */
    public currentToCelsius(valueInCurrentUnit: number): number {
        return this.current.toCelsius(valueInCurrentUnit);
    }

    /** 
     * Format a single temperature value into the string ending with the current unit symbol. 
     * 
     * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
     */
    public formatSingle(
        valueInCurrentUnit: number
    ): string {
        return `${valueInCurrentUnit.toFixed(2)} ${this.current.symbol}`;
    }

    /** 
     * Format a range of temperatures into the string ending with the current unit symbol. 
     * 
     * Internal states in `@labirthermal/core` are in Celsius. The GUI and exports are in the current unit.
     */
    public formatRange(
        fromInCurrentUnit: number,
        toInCurrentUnit: number
    ): string {
        return `${fromInCurrentUnit.toFixed(2)} — ${toInCurrentUnit.toFixed(2)} ${this.current.symbol}`;
    }

    /** 
     * Get the list of available unit definitions. 
     * 
     * @see {@link ThermalUnitDefinition} - this is the structure of an unit definition
     * @see {@link thermalUnits} - this is the actual list of definitions
     * @see {@link ThermalUnits} - these are available keys that are used as values of this driver.
     */
    public getUnits() {
        return UnitDrive.UNITS;
    }

}