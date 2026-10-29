// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalManager } from "../../hierarchy/ThermalManager";
import { LrcParser } from "../../parsers/lrc/LrcParser";
import { histogramFromPixels } from "../../parsers/histogramFromPixels";
import { getPool } from "../../utils/pool";
import { FlirParser } from "../../parsers/flir/FlirParser";
import { FLIR_REFERENCE, readFlirFixture } from "../../../devserver/node/flirFixtures";
import { ThermalRegistry } from "../../hierarchy/ThermalRegistry";
import { readLrcFixture } from "../../../devserver/node/mocks";
import { ThermalFileReader } from "../../loading/workers/ThermalFileReader";

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
        const reader = { buffer: createHistogramInputBuffer(), parser: LrcParser };
        const sourceInstance = {
            thermalUrl: "histogram-copy-source.lrc",
            timestamp: 0,
            min: 10,
            max: 20,
            draw: () => undefined,
            reader
        } as unknown as ThermalFileInstance;
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

        const binningCalls = execSpy.mock.calls.filter(([task]) => task === histogramFromPixels);
        expect(binningCalls).toHaveLength(1);
        expect(copyRegistry.histogram.value).toEqual(sourceRegistry.histogram.value);
        // Every LRC pixel is counted exactly once
        expect(sourceRegistry.histogram.value.reduce((sum, bar) => sum + bar.count, 0)).toBe(2);

        execSpy.mockRestore();
    });

    const calculate = async (registry: ThermalRegistry) => {
        const ready = new Promise<void>((resolve, reject) => {
            registry.histogram.onCalculationEnd.set("test", success => {
                if (success) resolve();
                else reject(new Error("Histogram calculation failed"));
            });
        });
        await registry.postLoadedProcessing();
        await ready;
        return registry.histogram.value;
    };

    test.each([
        "sequence_uint16_small_short.lrc",
        "sequence_uint16_small_long.lrc",
        "sequence_uint16_large_20frames.lrc",
    ])("calculates every frame of %s through the worker pool", async name => {
        const registry = new ThermalManager(pool).addOrGetRegistry(name);
        const group = registry.groups.addOrGetGroup("sequence");
        const reader = new ThermalFileReader(
            registry.service, readLrcFixture(name), LrcParser, name
        );
        await reader.createInstance(group);
        const info = await reader.baseInfo();
        const histogram = await calculate(registry);

        expect(info.frameCount).toBeGreaterThan(1);
        expect(histogram).toHaveLength(255);
        expect(histogram.reduce((sum, bar) => sum + bar.count, 0))
            .toBe(info.width * info.height * info.frameCount);
        // Quantised pixels need not reach the exact extrema stored in the header.
        const tolerance = (info.max - info.min) / 65535 + 0.00001;
        expect(Math.abs(histogram[0].from - info.min)).toBeLessThanOrEqual(tolerance);
        expect(Math.abs(histogram[histogram.length - 1].to - info.max))
            .toBeLessThanOrEqual(tolerance);
        expect(histogram.every(bar => Number.isFinite(bar.height))).toBe(true);
        expect(registry.histogram.loading).toBe(false);
    });

    const flirInstance = async (name: string) => {
        const buffer = await FlirParser.prepare!(readFlirFixture(name), name);
        const reference = FLIR_REFERENCE[name];
        return {
            thermalUrl: name,
            timestamp: reference.timestamp,
            min: reference.min,
            max: reference.max,
            draw: () => undefined,
            reader: { buffer, parser: FlirParser }
        } as unknown as ThermalFileInstance;
    };

    test("calculates a histogram of FLIR images and of mixed LRC + FLIR registries", async () => {
        const execSpy = vi.spyOn(pool, "exec");

        const flirRegistry = new ThermalManager(pool).addOrGetRegistry("flir-registry");
        flirRegistry.groups.addOrGetGroup("flir").files.addFile(await flirInstance("flir_01.jpg"));
        const flirHistogram = await calculate(flirRegistry);

        const reference = FLIR_REFERENCE["flir_01.jpg"];
        expect(flirHistogram.reduce((sum, bar) => sum + bar.count, 0)).toBe(reference.width * reference.height);
        expect(flirHistogram[0].from).toBeCloseTo(reference.min, 2);
        expect(flirHistogram[flirHistogram.length - 1].to).toBeCloseTo(reference.max, 2);

        const mixedRegistry = new ThermalManager(pool).addOrGetRegistry("mixed-registry");
        const group = mixedRegistry.groups.addOrGetGroup("mixed");
        group.files.addFile({
            thermalUrl: "mixed.lrc",
            timestamp: 0,
            min: 10,
            max: 20,
            draw: () => undefined,
            reader: { buffer: createHistogramInputBuffer(), parser: LrcParser }
        } as unknown as ThermalFileInstance);
        group.files.addFile(await flirInstance("flir_01.jpg"));
        const mixedHistogram = await calculate(mixedRegistry);

        // One shared range covering both the LRC pixels (10, 20 °C) and the FLIR image
        expect(mixedHistogram.reduce((sum, bar) => sum + bar.count, 0)).toBe(reference.width * reference.height + 2);
        expect(mixedHistogram[0].from).toBeCloseTo(Math.min(10, reference.min), 2);
        expect(mixedHistogram[mixedHistogram.length - 1].to).toBeCloseTo(Math.max(20, reference.max), 2);

        execSpy.mockRestore();
    });

});
