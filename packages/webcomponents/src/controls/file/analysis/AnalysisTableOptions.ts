import { booleanConverter } from "../../../utils/converters/booleanConverter";

export type AnalysisTableMode = "full" | "compact";

/** @deprecated Use the built-in boolean attribute handling instead. */
export const optionalBooleanConverter = {
    fromAttribute: (value: string | null) => value === null
        ? undefined
        : booleanConverter(true).fromAttribute(value)
};
