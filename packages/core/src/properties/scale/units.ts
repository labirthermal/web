/** 
 * Available keys of thermal units. Used by {@link thermalUnits} and by {@link UnitDrive}. 
 * @module `@labirthermal/core`
*/
export enum ThermalUnit {
    C = "C",
    F = "F",
    K = "K"
}

export const celsiusToFahrenheit = (celsius: number): number => (celsius * 9/5) + 32;
export const celsiusToKelvin = (celsius: number): number => celsius + 273.15;

export const fahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - 32) * 5/9;
export const fahrenheitToKelvin = (fahrenheit: number): number => (fahrenheit - 32) * 5/9 + 273.15;

export const kelvinToCelsius = (kelvin: number): number => kelvin - 273.15;
export const kelvinToFahrenheit = (kelvin: number): number => (kelvin - 273.15) * 9/5 + 32;

export type ThermalUnitDefinition = {

    /** Name of the thermal unit */
    name: string,
    
    /** Symbol of the thermal unit WITHOUT the whitespace. */
    symbol: string,
    
    /** Key of the thermal unit. */
    key: ThermalUnit,
    
    /** Convert a value to Celsius. Celsius is used internally in all states. */
    toCelsius: (value: number) => number,
    
    /** Convert a value from Celsius to this unit. Celsius is used internally in all states. */
    fromCelsius: (value: number) => number,
    
    /** Convert a value to Fahrenheit */
    toFahrenheit: (value: number) => number,
    
    /** Convert a value to Kelvin */
    toKelvin: (value: number) => number,
}

const noConversion = (value: number): number => value;

/** Registry of all available thermal units along with their conversion functions. Celsius is still used internally in all states. The conversion will happen only on the output - in the GUI and when doing exports. 
 * @module `@labirthermal/core`
*/
export const thermalUnits: Record<ThermalUnit, ThermalUnitDefinition> = {
    [ThermalUnit.C]: { 
        name: "Celsius", symbol: "°C", key: ThermalUnit.C,
        toCelsius: noConversion,
        fromCelsius: noConversion,
        toFahrenheit: celsiusToFahrenheit,
        toKelvin: celsiusToKelvin
    },
    [ThermalUnit.F]: { 
        name: "Fahrenheit", symbol: "°F", key: ThermalUnit.F,
        toCelsius: fahrenheitToCelsius,
        fromCelsius: celsiusToFahrenheit,
        toFahrenheit: noConversion,
        toKelvin: fahrenheitToKelvin
    },
    [ThermalUnit.K]: { 
        name: "Kelvin", symbol: "K", key: ThermalUnit.K,
        toCelsius: kelvinToCelsius,
        fromCelsius: celsiusToKelvin,
        toFahrenheit: kelvinToFahrenheit,
        toKelvin: noConversion
    }
}

