import { afterEach, describe, expect, test, vi } from "vitest";
import { THERMOGRAM_PATHS } from "../../../../../devserver/node/mocks";
import { loadFileForTests } from "../../../../../devserver/node/scaffold";
import type { AreaAnalysisData } from "../../../../parsers/structure";
import type { AnalysisDataStateValue } from "../AnalysisDataState";

function deferredData() {
    let resolve!: (data: AreaAnalysisData) => void;
    const promise = new Promise<AreaAnalysisData>(done => { resolve = done; });
    return { promise, resolve };
}

function statistics(avg: number) {
    return { min: avg - 1, max: avg + 1, avg, count: 4 };
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe("AnalysisGraphsStorage progressive output", () => {
    test.each([0, 1])("keeps every snapshot rectangular when graph %i finishes first", async first => {
        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);
        const jobs = [deferredData(), deferredData()];
        vi.spyOn(instance.reader, "rectAnalysisData")
            .mockReturnValueOnce(jobs[0].promise)
            .mockReturnValueOnce(jobs[1].promise);
        const snapshots: AnalysisDataStateValue[] = [];
        instance.analysisData.addListener("snapshots", value => { snapshots.push(value); });

        const layers = instance.analysis.layers;
        const analyses = [
            layers.placeRectAt("A", 10, 10, 20, 20, "red", false),
            layers.placeRectAt("B", 10, 10, 20, 20, "blue", false),
        ];
        analyses.forEach(analysis => {
            analysis.graph.setAvgActivation(true);
            analysis.graph.setMaxActivation(true);
        });

        expect(instance.analysisData.value.values).toEqual([["Time", "A MAX", "A AVG", "B MAX", "B AVG"]]);
        const data = [
            { 0: statistics(10), 200: statistics(20) },
            { 0: statistics(30), 200: statistics(40) },
        ];
        jobs[first].resolve(data[first]);
        await analyses[first].graph.whenData();
        const partial = instance.analysisData.value;
        expect(partial.values).toEqual([
            ["Time", "A MAX", "A AVG", "B MAX", "B AVG"],
            [new Date(0), ...(first === 0 ? [11, 10, null, null] : [null, null, 31, 30])],
            [new Date(200), ...(first === 0 ? [21, 20, null, null] : [null, null, 41, 40])],
        ]);

        const second = 1 - first;
        jobs[second].resolve(data[second]);
        await analyses[second].graph.whenData();
        expect(instance.analysisData.value.values).toEqual([
            ["Time", "A MAX", "A AVG", "B MAX", "B AVG"],
            [new Date(0), 11, 10, 31, 30],
            [new Date(200), 21, 20, 41, 40],
        ]);

        analyses[0].graph.setAvgActivation(false);
        analyses[1].graph.setMaxActivation(false);
        expect(instance.analysisData.value.values).toEqual([
            ["Time", "A MAX", "B AVG"], [new Date(0), 11, 30], [new Date(200), 21, 40],
        ]);
        layers.removeAnalysis(analyses[0].key);
        expect(instance.analysisData.value.values).toEqual([
            ["Time", "B AVG"], [new Date(0), 30], [new Date(200), 40],
        ]);
        analyses[1].graph.setAvgActivation(false);
        expect(instance.analysisData.value).toEqual({ values: [["Time"]], colors: [] });

        for (const snapshot of snapshots) {
            const [header, ...rows] = snapshot.values;
            expect(snapshot.colors).toHaveLength(header.length - 1);
            rows.forEach(row => { expect(row).toHaveLength(header.length); });
        }
        expect(partial.values[1]).toEqual([
            new Date(0), ...(first === 0 ? [11, 10, null, null] : [null, null, 31, 30]),
        ]);
    });

    test("joins sparse point and area data by timestamp, including zero and fractional times", async () => {
        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);
        vi.spyOn(instance.reader, "rectAnalysisData").mockResolvedValue({
            200: statistics(20), 0: statistics(0),
        });
        vi.spyOn(instance.reader, "pointAnalysisData").mockResolvedValue({
            300: 30, 200: 0, 100.5: 10,
        });
        const area = instance.analysis.layers.placeRectAt("Area", 10, 10, 20, 20, "red", false);
        area.graph.setAvgActivation(true);
        const point = instance.analysis.layers.placePointAt("Point", 10, 10, "blue", false);
        point.graph.setAvgActivation(true);
        await Promise.all([area.graph.whenData(), point.graph.whenData()]);

        expect(instance.analysisData.value).toEqual({
            values: [
                ["Time", "Area AVG", "Point"],
                [new Date(0), 0, null],
                [new Date(100.5), null, 10],
                [new Date(200), 20, 0],
                [new Date(300), null, 30],
            ],
            colors: ["red", "blue"],
        });
    });

    test("does not restore an analysis removed while its data are pending", async () => {
        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);
        const job = deferredData();
        vi.spyOn(instance.reader, "rectAnalysisData").mockReturnValueOnce(job.promise);
        const analysis = instance.analysis.layers.placeRectAt("Pending", 10, 10, 20, 20, "red", false);
        analysis.graph.setAvgActivation(true);
        instance.analysis.layers.removeAnalysis(analysis.key);
        job.resolve({ 0: statistics(10) });
        await analysis.graph.whenData();
        expect(instance.analysisData.value).toEqual({ values: [["Time"]], colors: [] });
    });
});
