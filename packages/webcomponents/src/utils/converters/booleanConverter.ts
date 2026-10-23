export const booleanConverter = (
    emptyValue: boolean
) => {

    const fromAttribute = (
        value: string|null
    ) => {

        if ( 
            value === undefined 
            || value === null
            || value?.trim().length === 0 
        ) {
            return emptyValue;
        }

        return value === "true";

    }

    const toAttribute = (
        value: boolean
    ) => {
        if ( value === true ) {
            return "true";
        }
        return "false";
    }

    return {
        fromAttribute,
        toAttribute
    }

}