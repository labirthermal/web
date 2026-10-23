// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { availableAnalysisColors } from "@labirthermal/core";
import { getContrastColor } from "./getContrastColor";

describe("getContrastColor", () => {
    it.each([
        ["Blue", "#FFFFFF"],
        ["Navy", "#FFFFFF"],
        ["Yellow", "#000000"],
        ["Lightblue", "#000000"],
        ["Red", "#000000"],
        ["Green", "#FFFFFF"],
        ["#000", "#FFFFFF"],
        ["#fff", "#000000"],
        ["#777777", "#000000"],
        ["rgb(12, 20, 35)", "#FFFFFF"],
    ])("chooses the higher contrast for %s", (background, foreground) => {
        expect(getContrastColor(background)).toBe(foreground);
    });

    it("supports every built-in analysis color", () => {
        for (const color of availableAnalysisColors) {
            expect(["#000000", "#FFFFFF"]).toContain(getContrastColor(color));
        }
    });

    it.each(["not-a-color", "transparent", "rgba(0, 0, 0, 0.5)"])("rejects invalid or non-opaque %s", color => {
        expect(() => getContrastColor(color)).toThrow();
    });
});
