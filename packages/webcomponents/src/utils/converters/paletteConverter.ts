import type { AvailableThermalPalette} from "@labirthermal/core";
import { ThermalPalettes } from "@labirthermal/core";

/** A unified converter for thermal palettes. Recommended usage:
 * @example
 * ```ts
 * import { paletteConverter } from "path/to/paletteConverter";
 * class MyComponent extends LitElement {
 *      @property({
 *          type: String,
 *          reflect: true,
 *          converter: paletteConverter,
 *      })
 *      public palette: AvailableThermalPalette = "jet";
 * }
 * ```
 *
 * Empty or invalid values fall back to `jet`, the default palette of the core manager.
 */
export const paletteConverter = {
    fromAttribute: (value: unknown): AvailableThermalPalette => {
        if ( 
            value === undefined
            || value === null
            || typeof value !== "string"
            || value === ""
            || !(value in ThermalPalettes)
        ) {
            return "jet";
        }
        return value as AvailableThermalPalette
    },
    toAttribute: (value: AvailableThermalPalette): string => value as string,
};