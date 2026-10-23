export type AcceptableDateInput = number | Date;

export abstract class TimeUtilsBase {

    /** Convert an input to a date object */
    public static inputToDate = (value: AcceptableDateInput) => {
        if (typeof value === "number") {
            const d = new Date;
            d.setTime(value);
            return d;
        }
        return value;
    }

}