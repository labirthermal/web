// @vitest-environment jsdom
import { ThermalFileInstance, ThermalFileReader } from "@labirthermal/core";
import type { ThermalRangeOrUndefined } from "@labirthermal/core";
import type { IParserObject } from "@labirthermal/core/src/parsers/structure";
import { consume } from "@lit/context";
import i18next from "i18next";
import { LitElement } from "lit";
import { state } from "lit/decorators.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { registryHighlightContext } from "../../controllers/RegistryController";
import { AbstractFileProvider } from "../../hierarchy/abstraction/AbstractFileProvider";
import { GroupProviderElement } from "../../hierarchy/providers/GroupProvider";
import { ManagerProviderElement } from "../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../hierarchy/providers/RegistryProvider";
import { FileInfoButton } from "../file/FileInfoButton";
import { FileRangePropagator } from "../file/buttons/FileRangePropagator";
import { GroupRangePropagatorElement } from "../group/GroupRangePropagator";
import { RegistryRangeAutoButton } from "./RegistryRangeAutoButton";
import { RegistryRangeDisplay } from "./RegistryRangeDisplay";
import { RegistryRangeFullButton } from "./RegistryRangeFullButton";

vi.mock("../../index.export", async () => ({
    ...await import("../../utils/converters/booleanConverter"),
    ...await import("../../controllers/RegistryController"),
    ...await import("../../controllers/GroupController"),
}));

class TestFileProvider extends AbstractFileProvider {}

class HighlightProbe extends LitElement {
    @state()
    @consume({ context: registryHighlightContext, subscribe: true })
    public highlight: ThermalRangeOrUndefined;
}

customElements.define("test-temperature-manager", ManagerProviderElement);
customElements.define("test-temperature-registry", RegistryProviderElement);
customElements.define("test-temperature-group", GroupProviderElement);
customElements.define("test-temperature-file", TestFileProvider);
customElements.define("test-temperature-highlight", HighlightProbe);
customElements.define("test-temperature-display", RegistryRangeDisplay);
customElements.define("test-temperature-full", RegistryRangeFullButton);
customElements.define("test-temperature-auto", RegistryRangeAutoButton);
customElements.define("test-temperature-group-range", GroupRangePropagatorElement);
customElements.define("test-temperature-file-range", FileRangePropagator);
customElements.define("test-temperature-file-info", FileInfoButton);

describe("Temperature range displays", () => {
    let manager: ManagerProviderElement;
    let registry: RegistryProviderElement;
    let group: GroupProviderElement;
    let fileProvider: TestFileProvider;
    let display: RegistryRangeDisplay;
    let full: RegistryRangeFullButton;
    let auto: RegistryRangeAutoButton;
    let groupRange: GroupRangePropagatorElement;
    let fileRange: FileRangePropagator;
    let fileInfo: FileInfoButton;
    let highlight: HighlightProbe;
    let file: ThermalFileInstance;

    async function settle() {
        for (let i = 0; i < 4; i++) {
            await Promise.all([
                manager.updateComplete, registry.updateComplete, group.updateComplete,
                fileProvider.updateComplete, display.updateComplete, full.updateComplete,
                auto.updateComplete, groupRange.updateComplete, fileRange.updateComplete,
                fileInfo.updateComplete, highlight.updateComplete,
            ]);
        }
    }

    function fileFixture(): ThermalFileInstance {
        const timeline = [{ index: 0, relative: 0, absolute: 1700000000000, offset: 0 }];
        const frame = {
            timestamp: timeline[0].absolute, min: 10, max: 25,
            emissivity: .95, reflectedKelvins: 293, pixels: Array.from({ length: 16 }, (_, i) => 10 + i),
        };
        const info = {
            ...frame, width: 4, height: 4, frameCount: 1, duration: 0,
            frameInterval: 100, fps: 10, timeline,
            averageEmissivity: .95, averageReflectedKelvins: 293, bytesize: 16,
        };
        const analysis = { 0: { min: 10, max: 25, avg: 17.5, count: 16 } };
        const parser: IParserObject = {
            name: "fixture", description: "fixture", devices: [], extensions: [],
            is: () => true,
            baseInfo: async () => info,
            getFrameSubset: buffer => ({ array: buffer, dataType: 0 }),
            frameData: async () => frame,
            histogramPixels: async () => new Float32Array(frame.pixels),
            pointAnalysisData: async () => ({ 0: 10 }),
            rectAnalysisData: async () => analysis,
            ellipsisAnalysisData: async () => analysis,
        };
        const reader = new ThermalFileReader(
            manager.managerObject.service, new ArrayBuffer(16), parser, "temperature-fixture.lrc"
        );
        return ThermalFileInstance.fromService(group.groupObject, reader, info, frame);
    }

    function button(element: LitElement): HTMLElement {
        const result = element.shadowRoot?.querySelector<HTMLElement>("thermal-btn");
        if (!result) throw new Error("Missing range button");
        return result;
    }

    function tooltip(element: LitElement): string | null {
        return button(element).getAttribute("tooltip");
    }

    function displayValues(): string[] {
        return Array.from(display.shadowRoot?.querySelectorAll("span") ?? [])
            .map(element => element.textContent?.trim() ?? "");
    }

    function setHistogram(from: number, to: number) {
        Object.assign(registry.registryObject.histogram, {
            value: [{ from, to, percentage: 100, count: 10, height: 100 }],
        });
    }

    beforeEach(async () => {
        await i18next.init({ lng: "en", resources: { en: { translation: {} } } });
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        registry = new RegistryProviderElement();
        group = new GroupProviderElement();
        group.groupSlug = "temperature-controls";
        fileProvider = new TestFileProvider();
        display = new RegistryRangeDisplay();
        display.fixed = 1;
        display.separator = "to";
        full = new RegistryRangeFullButton();
        auto = new RegistryRangeAutoButton();
        groupRange = new GroupRangePropagatorElement();
        fileRange = new FileRangePropagator();
        fileInfo = new FileInfoButton();
        highlight = new HighlightProbe();

        fileProvider.append(fileRange, fileInfo);
        group.append(groupRange, fileProvider);
        registry.append(display, full, auto, highlight, group);
        manager.append(registry);
        document.body.append(manager);
        await settle();

        Object.assign(group.groupObject.minmax, { value: { min: 5, max: 40 } });
        Object.assign(registry.registryObject.minmax, { value: { min: 0, max: 100 } });
        setHistogram(20, 40);
        file = fileFixture();
        fileProvider.fileController.receiveInstance(file);
        registry.registryController.setRange(10, 30);
        await settle();
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
    });

    it("updates every label for C, F and K without changing Celsius range or highlight", async () => {
        registry.registryController.setHighlight({ from: 12, to: 22 });
        await settle();
        const imposeRange = vi.spyOn(registry.registryObject.range, "imposeRange");

        expect(displayValues()).toEqual(["10.0 °C", "to", "30.0 °C"]);
        expect(tooltip(full)).toBe("0.00 — 100.00 °C");
        expect(tooltip(auto)).toBe("20.00 — 40.00 °C");
        expect(tooltip(groupRange)).toBe("5.00 — 40.00 °C");
        expect(tooltip(fileRange)).toBe("10.00 — 25.00 °C");
        expect(fileInfo.shadowRoot?.textContent).toContain("10.00 °C");
        expect(fileInfo.shadowRoot?.textContent).toContain("25.00 °C");

        manager.setAttribute("unit", "F");
        await settle();
        expect(displayValues()).toEqual(["50.0 °F", "to", "86.0 °F"]);
        expect(tooltip(full)).toBe("32.00 — 212.00 °F");
        expect(tooltip(auto)).toBe("68.00 — 104.00 °F");
        expect(tooltip(groupRange)).toBe("41.00 — 104.00 °F");
        expect(tooltip(fileRange)).toBe("50.00 — 77.00 °F");
        expect(fileInfo.shadowRoot?.textContent).toContain("50.00 °F");
        expect(fileInfo.shadowRoot?.textContent).toContain("77.00 °F");

        manager.setAttribute("unit", "K");
        await settle();
        expect(displayValues()).toEqual(["283.1 K", "to", "303.1 K"]);
        expect(tooltip(full)).toBe("273.15 — 373.15 K");
        expect(tooltip(auto)).toBe("293.15 — 313.15 K");
        expect(tooltip(groupRange)).toBe("278.15 — 313.15 K");
        expect(tooltip(fileRange)).toBe("283.15 — 298.15 K");
        expect(fileInfo.shadowRoot?.textContent).toContain("283.15 K");
        expect(fileInfo.shadowRoot?.textContent).toContain("298.15 K");

        expect(registry.registryObject.range.value).toEqual({ from: 10, to: 30 });
        expect(group.groupObject.minmax.value).toEqual({ min: 5, max: 40 });
        expect({ min: file.min, max: file.max }).toEqual({ min: 10, max: 25 });
        expect(highlight.highlight).toEqual({ from: 12, to: 22 });
        expect(imposeRange).not.toHaveBeenCalled();
    });

    it("keeps clicks, hover and keyboard-focus highlights in Celsius in Fahrenheit mode", async () => {
        manager.setAttribute("unit", "F");
        await settle();

        button(full).dispatchEvent(new MouseEvent("mouseenter"));
        expect(highlight.highlight).toEqual({ from: 0, to: 100 });
        button(full).click();
        expect(registry.registryObject.range.value).toEqual({ from: 0, to: 100 });
        button(full).dispatchEvent(new MouseEvent("mouseleave"));
        expect(highlight.highlight).toBeUndefined();

        button(auto).dispatchEvent(new FocusEvent("focus"));
        expect(highlight.highlight).toEqual({ from: 20, to: 40 });
        button(auto).click();
        expect(registry.registryObject.range.value).toEqual({ from: 20, to: 40 });
        button(auto).dispatchEvent(new FocusEvent("blur"));
        expect(highlight.highlight).toBeUndefined();

        groupRange.dispatchEvent(new MouseEvent("mouseenter"));
        expect(highlight.highlight).toEqual({ from: 5, to: 40 });
        groupRange.click();
        expect(registry.registryObject.range.value).toEqual({ from: 5, to: 40 });
        groupRange.dispatchEvent(new MouseEvent("mouseleave"));
        expect(highlight.highlight).toBeUndefined();

        button(fileRange).dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        expect(highlight.highlight).toEqual({ from: 10, to: 25 });
        button(fileRange).click();
        expect(registry.registryObject.range.value).toEqual({ from: 10, to: 25 });
        button(fileRange).dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
        expect(highlight.highlight).toBeUndefined();
    });

    it("hydrates late consumers and refreshes bounds after disconnect and reconnect", async () => {
        manager.setAttribute("unit", "F");
        await settle();

        const lateFull = new RegistryRangeFullButton();
        const lateAuto = new RegistryRangeAutoButton();
        const lateGroup = new GroupRangePropagatorElement();
        const lateFile = new FileRangePropagator();
        registry.append(lateFull, lateAuto);
        group.append(lateGroup);
        fileProvider.append(lateFile);
        await Promise.all([lateFull.updateComplete, lateAuto.updateComplete, lateGroup.updateComplete, lateFile.updateComplete]);
        expect(tooltip(lateFull)).toBe("32.00 — 212.00 °F");
        expect(tooltip(lateAuto)).toBe("68.00 — 104.00 °F");
        expect(tooltip(lateGroup)).toBe("41.00 — 104.00 °F");
        expect(tooltip(lateFile)).toBe("50.00 — 77.00 °F");

        const removeAuto = vi.spyOn(registry.registryObject.range.onAutoValueChanged, "delete");
        const removeGroup = vi.spyOn(group.groupObject.minmax, "removeListener");
        auto.remove();
        groupRange.remove();
        expect(removeAuto).toHaveBeenCalledWith(auto.UUID);
        expect(removeGroup).toHaveBeenCalledWith(groupRange.UUID);

        setHistogram(0, 10);
        Object.assign(group.groupObject.minmax, { value: { min: 0, max: 50 } });
        registry.append(auto);
        group.append(groupRange);
        await settle();
        expect(tooltip(auto)).toBe("32.00 — 50.00 °F");
        expect(tooltip(groupRange)).toBe("32.00 — 122.00 °F");

        Object.assign(registry.registryObject.histogram, { value: [] });
        Object.assign(group.groupObject.minmax, { value: undefined });
        await settle();
        expect(tooltip(auto)).toBeNull();
        expect(tooltip(groupRange)).toBeNull();
    });

    it("keeps the file tooltip and Celsius interactions in sync with changed metadata", async () => {
        manager.setAttribute("unit", "F");
        await settle();
        file.meta.set({ ...file.meta.current, min: 15, max: 35 });
        await settle();
        expect(tooltip(fileRange)).toBe("59.00 — 95.00 °F");

        button(fileRange).dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        expect(highlight.highlight).toEqual({ from: 15, to: 35 });
        button(fileRange).click();
        expect(registry.registryObject.range.value).toEqual({ from: 15, to: 35 });

        const removeListener = vi.spyOn(file.meta.onChange, "delete");
        fileRange.remove();
        expect(removeListener).toHaveBeenCalledWith(fileRange.UUID);
        file.meta.set({ ...file.meta.current, min: 12, max: 22 });
        fileProvider.append(fileRange);
        await settle();
        expect(tooltip(fileRange)).toBe("53.60 — 71.60 °F");
    });

    it("moves the metadata subscription when the provided file is replaced or cleared", async () => {
        manager.setAttribute("unit", "F");
        await settle();
        const previous = file;
        const replacement = fileFixture();
        replacement.meta.set({ ...replacement.meta.current, min: -5, max: 45 });
        expect(previous.meta.onChange.has(fileRange.UUID)).toBe(true);

        fileProvider.fileController.receiveInstance(replacement);
        await settle();
        expect(previous.meta.onChange.has(fileRange.UUID)).toBe(false);
        expect(replacement.meta.onChange.has(fileRange.UUID)).toBe(true);
        expect(tooltip(fileRange)).toBe("23.00 — 113.00 °F");

        previous.meta.set({ ...previous.meta.current, min: 0, max: 100 });
        await settle();
        expect(tooltip(fileRange)).toBe("23.00 — 113.00 °F");

        fileProvider.fileController.removeInstance();
        await settle();
        expect(replacement.meta.onChange.has(fileRange.UUID)).toBe(false);
        expect(tooltip(fileRange)).toBe("range");
    });
});
