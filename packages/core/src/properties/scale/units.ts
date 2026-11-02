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
    name: string,
    symbol: string,
    key: ThermalUnit,
    /** Convert a value to Celsius */
    toCelsius: (value: number) => number,
    /** Convert a value from Celsius to this unit */
    fromCelsius: (value: number) => number,
    /** Convert a value to Fahrenheit */
    toFahrenheit: (value: number) => number,
    /** Convert a value to Kelvin */
    toKelvin: (value: number) => number,
}

const noConversion = (value: number): number => value;

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

