import { ThermalUnit } from "@labirthermal/core";

/**
 * Normalize any value to a `ThermalUnit` key. The comparison is case-insensitive
 * and surrounding whitespace is ignored, so `"f"` and `" F "` both give `ThermalUnit.F`.
 *
 * @returns The unit key, or `undefined` when the value is missing or not a known unit.
 */
export const parseThermalUnit = (value: unknown): ThermalUnit | undefined => {
    if (typeof value !== "string") {
        return undefined;
    }
    const normalized = value.trim().toUpperCase();
    return normalized in ThermalUnit
        ? normalized as ThermalUnit
        : undefined;
}

/**
 * A unified converter for the `unit` attribute.
 *
 * A missing or invalid attribute gives `undefined` (not a default unit), so that
 * the consumer can distinguish "not set" from an explicit value and pick the
 * default itself, for example by taking over the unit of an existing manager.
 *
 * @example
 * ```ts
 * @property({ type: String, reflect: true, converter: unitConverter })
 * public unit?: ThermalUnit;
 * ```
 */
export const unitConverter = {
    fromAttribute: (value: string | null): ThermalUnit | undefined => parseThermalUnit(value),
    toAttribute: (value: ThermalUnit | undefined): string | undefined => parseThermalUnit(value),
};
