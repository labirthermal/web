import { describe, expect, test, vi } from "vitest";
import { ThermalStatistics } from "../../hierarchy/ThermalRegistry";
import { HistogramResultCache } from "./HistogramResultCache";

const histogram = (count: number): ThermalStatistics[] => [{
    from: 0,
    to: 1,
    count,
    percentage: 100,
    height: 100
}];

describe("HistogramResultCache", () => {

    test("reuses entries for the same source set regardless of source order", async () => {
        const cache = new HistogramResultCache();
        const firstReader = {};
        const secondReader = {};
        const calculate = vi.fn(async () => histogram(1));

        const first = await cache.getOrCalculate(
            [firstReader, secondReader],
            calculate
        );
        const second = await cache.getOrCalculate(
            [secondReader, firstReader],
            calculate
        );

        expect(calculate).toHaveBeenCalledTimes(1);
        expect(second).toEqual(first);
    });

    test("distinguishes different readers and repeated sources", async () => {
        const cache = new HistogramResultCache();
        const firstReader = {};
        const sameNameDifferentReader = {};
        let calculations = 0;
        const calculate = async () => histogram(++calculations);

        await cache.getOrCalculate([firstReader], calculate);
        await cache.getOrCalculate([sameNameDifferentReader], calculate);
        await cache.getOrCalculate([firstReader, firstReader], calculate);

        expect(calculations).toBe(3);
    });

    test("returns independent result objects to callers", async () => {
        const cache = new HistogramResultCache();
        const reader = {};

        const first = await cache.getOrCalculate([reader], async () => histogram(1));
        first[0].count = 99;

        const second = await cache.getOrCalculate([reader], async () => histogram(2));

        expect(second[0].count).toBe(1);
    });

    test("shares in-flight calculations for the same sources", async () => {
        const cache = new HistogramResultCache();
        const reader = {};
        let calculations = 0;
        let resolveCalculation: (value: ThermalStatistics[]) => void = () => undefined;
        const calculate = () => {
            calculations += 1;
            return new Promise<ThermalStatistics[]>(resolve => {
                resolveCalculation = resolve;
            });
        };

        const first = cache.getOrCalculate([reader], calculate);
        const second = cache.getOrCalculate([reader], calculate);
        await Promise.resolve();

        expect(calculations).toBe(1);
        resolveCalculation(histogram(1));
        await expect(Promise.all([first, second])).resolves.toEqual([
            histogram(1),
            histogram(1)
        ]);
    });

    test("does not evict in-flight calculations when the result cache is full", async () => {
        const cache = new HistogramResultCache();
        const readers = Array.from({ length: 65 }, () => ({}));
        const resolvers: Array<(value: ThermalStatistics[]) => void> = [];
        let calculations = 0;
        const calculate = () => {
            calculations += 1;
            return new Promise<ThermalStatistics[]>(resolve => resolvers.push(resolve));
        };

        const pending = readers.map(reader => cache.getOrCalculate([reader], calculate));
        await Promise.resolve();
        const repeated = cache.getOrCalculate([readers[0]], calculate);

        expect(calculations).toBe(65);
        resolvers.forEach(resolve => resolve(histogram(1)));
        await Promise.all([...pending, repeated]);
    });

    test("evicts the least recently used entry after reaching its limit", async () => {
        const cache = new HistogramResultCache();
        const readers = Array.from({ length: 65 }, () => ({}));
        let calculations = 0;
        const calculate = async () => histogram(++calculations);

        for (const reader of readers.slice(0, 64)) {
            await cache.getOrCalculate([reader], calculate);
        }

        await cache.getOrCalculate([readers[0]], calculate);
        await cache.getOrCalculate([readers[64]], calculate);
        await cache.getOrCalculate([readers[1]], calculate);

        expect(calculations).toBe(66);
    });

    test("does not cache rejected calculations", async () => {
        const cache = new HistogramResultCache();
        const reader = {};
        let calculations = 0;
        const calculate = async () => {
            calculations += 1;
            if (calculations === 1) {
                throw new Error("calculation failed");
            }
            return histogram(1);
        };

        await expect(cache.getOrCalculate([reader], calculate))
            .rejects.toThrow("calculation failed");
        await expect(cache.getOrCalculate([reader], calculate))
            .resolves.toEqual(histogram(1));

        expect(calculations).toBe(2);
    });
});
