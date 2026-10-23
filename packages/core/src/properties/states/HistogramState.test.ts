// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalManager } from "../../hierarchy/ThermalManager";
import { LrcParser } from "../../loading/workers/parsers/lrc/LrcParser";
import { getPool } from "../../utils/pool";

const createHistogramInputBuffer = (): ArrayBuffer => {
    const buffer = new ArrayBuffer(25 + 57 + 8);
    const view = new DataView(buffer);
    view.setUint8(15, 1);
    view.setUint16(17, 2, true);
    view.setUint16(19, 1, true);
    view.setFloat32(25 + 57, 10, true);
    view.setFloat32(25 + 61, 20, true);
    return buffer;
};

describe("HistogramState", async () => {

    const pool = await getPool();

    test("reuses a histogram when an isolated registry copies its reader", async () => {
        const execSpy = vi.spyOn(pool, "exec");
        const sourceManager = new ThermalManager(pool);
        const sourceRegistry = sourceManager.addOrGetRegistry("source-registry");
        const sourceGroup = sourceRegistry.groups.addOrGetGroup("source-group");
        const reader = { buffer: createHistogramInputBuffer() };
        const sourceInstance = {
            thermalUrl: "histogram-copy-source.lrc",
            timestamp: 0,
            min: 10,
            max: 20,
            draw: () => undefined,
            reader
        } as ThermalFileInstance;
        sourceGroup.files.addFile(sourceInstance);

        const sourceHistogramReady = new Promise<void>(resolve => {
            sourceRegistry.histogram.onCalculationEnd.set("test", () => resolve());
        });
        await sourceRegistry.postLoadedProcessing();
        await sourceHistogramReady;

        const copyManager = new ThermalManager(pool);
        const copyRegistry = copyManager.addOrGetRegistry("copy-registry");
        const copyGroup = copyRegistry.groups.addOrGetGroup("copy-group");
        const copiedInstance = {
            ...sourceInstance,
            reader
        } as ThermalFileInstance;
        copyGroup.files.addFile(copiedInstance);

        const copyHistogramReady = new Promise<void>(resolve => {
            copyRegistry.histogram.onCalculationEnd.set("test", () => resolve());
        });
        await copyRegistry.postLoadedProcessing();
        await copyHistogramReady;

        const parserCalls = execSpy.mock.calls.filter(([task]) => task === LrcParser.registryHistogram);
        expect(parserCalls).toHaveLength(1);
        expect(copyRegistry.histogram.value).toEqual(sourceRegistry.histogram.value);

        execSpy.mockRestore();
    });
});
