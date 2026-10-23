import { describe, expect, it } from "vitest";
import { TimeFormat } from "./formatting";

describe("TimeFormat.duration", () => {
    it.each([
        [0, "0:00.000"],
        [3_250, "0:03.250"],
        [187_250, "3:07.250"],
        [3_599_999, "59:59.999"],
        [3_600_000, "1:00:00.000"],
        [3_787_250, "1:03:07.250"]
    ])("formats %i milliseconds as %s", (milliseconds, expected) => {
        expect(TimeFormat.duration(milliseconds)).toBe(expected);
    });

    it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])(
        "rejects invalid duration %s",
        milliseconds => {
            expect(() => TimeFormat.duration(milliseconds)).toThrow(RangeError);
        }
    );
});
