import { describe, expect, test, vi } from "vitest";
import { THERMOGRAM_PATHS } from "../../../devserver/node/mocks";
import { ThermalManager } from "../../hierarchy/ThermalManager";
import { ThermalFileReader } from "../../loading/workers/ThermalFileReader";

describe("RangeDriverTest", () => {

    test("standard behavior", async () => {

        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry("reg");
        const group = registry.groups.addOrGetGroup("grp");
        const range = registry.range;

        let imposingCounter = 0;

        range.addListener("test", () => {
            imposingCounter++;
        });

        expect(range.value).toBeUndefined();
        expect(imposingCounter).toEqual(0);


        const reader = await registry.service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader;

        await reader.createInstance(group);

        registry.postLoadedProcessing();

        expect(range.value).not.toBeUndefined();
        expect(imposingCounter).toEqual(1);


    });

    test("with preset range", async () => {

        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry("reg");
        const group = registry.groups.addOrGetGroup("grp");
        const range = registry.range;

        let imposingCounter = 0;

        range.addListener("test", () => {
            imposingCounter++;
        });

        expect(range.value).toBeUndefined();
        expect(imposingCounter).toEqual(0);

        range.imposeRange({ from: 17, to: 20 });

        expect(imposingCounter).toEqual(1);


        const reader = await registry.service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader;

        const instance = await reader.createInstance(group);


        registry.postLoadedProcessing();

        expect(range.value).not.toBeUndefined();

        expect(range.value?.from).toEqual(17);
        expect(range.value?.to).toEqual(20);
        expect(instance.group.registry.range.value?.from).toEqual(17);
        expect(instance.group.registry.range.value?.to).toEqual(20);

        expect(imposingCounter).toEqual(1);


    });

    test("recalculates and notifies the automatic range when the histogram changes", async () => {

        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry("reg");
        const range = registry.range;

        const autoValueChanges: (typeof range.autoValue)[] = [];
        range.onAutoValueChanged.set("test", value => autoValueChanges.push(value));

        const histogramValue = [
            { from: 1, to: 2, percentage: 10, count: 1, height: 9 },
            { from: 2, to: 3, percentage: 10, count: 2, height: 10 },
            { from: 3, to: 4, percentage: 10, count: 1, height: 8 }
        ];
        vi.spyOn(registry.histogram, "value", "get").mockReturnValue(histogramValue);
        const recalculateAutoValue = vi.spyOn(range, "recalculateAutoValue");

        registry.histogram.reset();

        expect(recalculateAutoValue).toHaveBeenCalledOnce();
        expect(range.autoValue).toEqual({ from: 2, to: 3 });
        expect(autoValueChanges).toEqual([{ from: 2, to: 3 }]);

        range.applyAuto();
        expect(range.value).toEqual(range.autoValue);

    });

});