import { describe, expect, it } from "vitest";
import { generateShortId } from "./shortId";

describe("generateShortId", () => {

    it("generates ids of the default length", () => {
        expect(generateShortId()).toHaveLength(8);
    });

    it("respects the requested length", () => {
        expect(generateShortId(6)).toHaveLength(6);
    });

    it("generates only lowercase alphanumeric characters", () => {
        for (let i = 0; i < 100; i++) {
            expect(generateShortId()).toMatch(/^[a-z0-9]+$/);
        }
    });

    it("never generates a duplicate", () => {
        const ids = new Set<string>();
        for (let i = 0; i < 20000; i++) {
            ids.add(generateShortId(4));
        }
        expect(ids.size).toBe(20000);
    });

});
