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
 *      public palette: AvailableThermalPalette = "iron"; // IRON is used as default
 * }
 * ```
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
            return "iron";
        }
        return value as AvailableThermalPalette
    },
    toAttribute: (value: AvailableThermalPalette): string => value as string,
};