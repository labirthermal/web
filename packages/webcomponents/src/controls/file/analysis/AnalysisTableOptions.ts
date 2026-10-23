import { booleanConverter } from "../../../utils/converters/booleanConverter";

export type AnalysisTableMode = "full" | "compact";

export const optionalBooleanConverter = {
    fromAttribute: (value: string | null) => value === null
        ? undefined
        : booleanConverter(true).fromAttribute(value)
};
