import { format, formatISO9075 } from "date-fns";
import { AcceptableDateInput, TimeUtilsBase } from "./base";


/** Utility class for time formatting in the LabIR ecosystem. */
export class TimeFormat extends TimeUtilsBase {

    /** YYYY-MM-DD */
    public static isoDate = (value: AcceptableDateInput) => {
        value = TimeFormat.inputToDate(value);
        return formatISO9075(value, { representation: "date" });
    }

    /** HH:MM:SS */
    public static isoTime = (value: AcceptableDateInput) => {
        value = TimeFormat.inputToDate(value);
        return formatISO9075(value, { representation: "time" });
    }

    /** YYYY-MM-DD HH:MM:SS */
    public static isoComplete = (value: AcceptableDateInput) => {
        value = TimeFormat.inputToDate(value);
        return formatISO9075(value);
    }

    /** HH:mm */
    public static humanTime = (
        value: AcceptableDateInput,
        showSeconds: boolean = false
    ) => {
        value = TimeFormat.inputToDate(value);
        return format(value, showSeconds ? "HH:mm:ss" : "HH:mm");
    }

    /** Format a duration as m:ss.SSS, or h:mm:ss.SSS when it is at least an hour. */
    public static duration = (milliseconds: number): string => {
        if (!Number.isFinite(milliseconds) || milliseconds < 0) {
            throw new RangeError("Duration must be a finite, non-negative number.");
        }

        const totalMilliseconds = Math.floor(milliseconds);
        const hours = Math.floor(totalMilliseconds / 3_600_000);
        const minutes = Math.floor((totalMilliseconds % 3_600_000) / 60_000);
        const seconds = Math.floor((totalMilliseconds % 60_000) / 1_000);
        const remainingMilliseconds = totalMilliseconds % 1_000;
        const secondsPart = `${String(seconds).padStart(2, "0")}.${String(remainingMilliseconds).padStart(3, "0")}`;

        return hours > 0
            ? `${hours}:${String(minutes).padStart(2, "0")}:${secondsPart}`
            : `${minutes}:${secondsPart}`;
    }

    /** j. M. ???? (y) */
    public static humanDate = (
        value: AcceptableDateInput,
        includeYear: boolean = false
    ) => {
        value = TimeFormat.inputToDate(value);
        return format(value, includeYear ? "d. M." : "d. M. yyyy");
    }

    /** Range */
    public static humanRangeDates(from: AcceptableDateInput, to: AcceptableDateInput) {

        from = TimeFormat.inputToDate(from);
        to = TimeFormat.inputToDate(to);

        if (from.getUTCDate() === to.getUTCDate()) {
            return TimeFormat.humanDate(from);
        }

        return [
            TimeFormat.humanDate(from),
            TimeFormat.humanDate(to)
        ].join(" - ");

    }

    public static human(
        date: AcceptableDateInput
    ) {

        return `${TimeFormat.humanDate( date )} ${TimeFormat.humanTime( date, true )} `;

    }
}