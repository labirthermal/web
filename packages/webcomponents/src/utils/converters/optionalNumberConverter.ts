/**
 * Converter for optional numeric attributes.
 *
 * Unlike Lit's built-in `type: Number`, which turns a removed attribute into
 * `null`, an empty attribute into `0` and an invalid one into `NaN`, this
 * converter gives `undefined` for all of them. A property value that is not a
 * finite number removes the reflected attribute.
 *
 * @example
 * ```ts
 * @property({ reflect: true, converter: optionalNumberConverter })
 * public from?: number;
 * ```
 */
export const optionalNumberConverter = {

    fromAttribute(value: string | null): number | undefined {
        if (typeof value !== "string") {
            return undefined;
        }
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            return undefined;
        }
        const parsed = Number(trimmed);
        return Number.isFinite(parsed) ? parsed : undefined;
    },

    toAttribute(value: number | undefined): string | undefined {
        return typeof value === "number" && Number.isFinite(value)
            ? String(value)
            : undefined;
    }

}
