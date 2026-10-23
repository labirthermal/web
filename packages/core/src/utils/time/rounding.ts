import { addDays, addHours, addMonths, addYears, endOfDay, endOfHour, endOfMonth, endOfWeek, endOfYear, startOfDay, startOfHour, startOfMonth, startOfWeek, startOfYear } from "date-fns";
import { AcceptableDateInput, TimeUtilsBase } from "./base";
import { TimePeriod } from "./periods";

/** Utility class for time rounding in the LabIR ecosystem. */
export class TimeRound extends TimeUtilsBase {

    public static down = (
        value: AcceptableDateInput,
        roundTo: TimePeriod
    ) => {

        if (roundTo === TimePeriod.HOUR)
            return startOfHour(value);
        else if (roundTo === TimePeriod.DAY)
            return startOfDay(value);
        else if (roundTo === TimePeriod.WEEK)
            return startOfWeek(value);
        else if (roundTo === TimePeriod.MONTH)
            return startOfMonth(value);
        return startOfYear(value);

    }

    public static up = (
        value: AcceptableDateInput,
        roundTo: TimePeriod
    ) => {

        if (roundTo === TimePeriod.HOUR)
            return endOfHour(value);
        else if (roundTo === TimePeriod.DAY)
            return endOfDay(value);
        else if (roundTo === TimePeriod.WEEK)
            return endOfWeek(value);
        else if (roundTo === TimePeriod.MONTH)
            return endOfMonth(value);
        return endOfYear(value);
    }

    public static pick = (value: AcceptableDateInput, period: TimePeriod) => {

        return [
            TimeRound.down(value, period),
            TimeRound.up(value, period)
        ];

    }

    public static modify = (value: AcceptableDateInput, amount: number, period: TimePeriod) => {

        switch (period) {

            case TimePeriod.HOUR:
                return addHours(value, amount);
            case TimePeriod.DAY:
                return addDays(value, amount);
            case TimePeriod.WEEK:
                return addDays(value, amount * 7);
            case TimePeriod.MONTH:
                return addMonths(value, amount);
            case TimePeriod.YEAR:
                return addYears(value, amount);

        }

    }


}
