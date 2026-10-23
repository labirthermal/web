export const stringOrUndefinedConverter = {

    fromAttribute(value: unknown): string | undefined {
        // All except strings is undefined
        if ( typeof value !== "string" ) {
            return undefined;
        }
        // Too short strings are undefined
        const trimmed = (value as string ).trim();
        if ( trimmed.length === 0 ) {
            return undefined;
        }
        return trimmed;
    },

    toAttribute(value: string | undefined): string | undefined {
        const trimmed = value?.trim();
        return trimmed?.length ? trimmed : undefined;
    }

}