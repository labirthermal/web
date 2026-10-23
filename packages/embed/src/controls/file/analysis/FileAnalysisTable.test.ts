// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThermalFileInstance, ThermalFileReader, ThermalFileFailure } from "@labirthermal/core";
import { FileErrors } from "../../../../../core/src/loading/workers/errors";
import type { AbstractAnalysis } from "@labirthermal/core";
import type { IParserObject } from "../../../../../core/src/loading/workers/parsers/structure";
import { AbstractFileProvider } from "../../../hierarchy/abstraction/AbstractFileProvider";
import { GroupProviderElement } from "../../../hierarchy/providers/GroupProvider";
import { ManagerProviderElement } from "../../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../../hierarchy/providers/RegistryProvider";
import { ThermalBtnElement } from "../../../ui/Btn";
import { FileAnalysisTableElement } from "./FileAnalysisTable";
import { FileAnalysisRowElement } from "./FileAnalysisRow";
import { FileAnalysisComplexElement } from "./FileAnalysisComplex";
import { FileCanvasElement } from "../FileCanvas";

vi.mock("../../../index.export", async () => ({
    ...await import("../../../utils/converters/booleanConverter"),
    ...await import("../../../controllers/GroupController"),
}));

// The fixture exercises real core analyses and contexts, without canvas workers.
vi.mock("../../../../../core/src/file/render/CpuRenderer", () => ({
    CpuRenderer: class {
        init() {}
        render() {}
        destroy() {}
    }
}));

class TestFileProvider extends AbstractFileProvider {}

customElements.define("test-analysis-manager", ManagerProviderElement);
customElements.define("test-analysis-registry", RegistryProviderElement);
customElements.define("test-analysis-group", GroupProviderElement);
customElements.define("test-analysis-file", TestFileProvider);
customElements.define("file-analysis-table", FileAnalysisTableElement);
customElements.define("file-analysis-table-row", FileAnalysisRowElement);
customElements.define("file-analysis-complex", FileAnalysisComplexElement);
customElements.define("thermal-btn", ThermalBtnElement);
customElements.define("test-loading-canvas", FileCanvasElement);

describe("FileAnalysisTable", () => {
    let manager: ManagerProviderElement;
    let registry: RegistryProviderElement;
    let group: GroupProviderElement;
    let provider: TestFileProvider;
    let table: FileAnalysisTableElement;
    let instance: ThermalFileInstance;
    let area: AbstractAnalysis;

    function rows(): FileAnalysisRowElement[] {
        return Array.from(table.shadowRoot?.querySelectorAll<FileAnalysisRowElement>("file-analysis-table-row") ?? []);
    }

    async function settle() {
        for (let i = 0; i < 4; i++) {
            await Promise.all([
                manager.updateComplete, registry.updateComplete, group.updateComplete,
                provider.updateComplete, table.updateComplete,
                ...rows().map(row => row.updateComplete),
            ]);
        }
    }

    function element<E extends Element>(root: ParentNode | null, selector: string): E {
        const found = root?.querySelector<E>(selector);
        if (!found) throw new Error(`Missing fixture element: ${selector}`);
        return found;
    }

    function fixture(sequence = true): ThermalFileInstance {
        const timeline = Array.from({ length: sequence ? 2 : 1 }, (_, index) => ({
            index, relative: index * 100, absolute: 1700000000000 + index * 100, offset: index,
        }));
        const frame = {
            timestamp: timeline[0].absolute, min: 10, max: 25,
            emissivity: .95, reflectedKelvins: 293, pixels: Array.from({ length: 16 }, (_, i) => 10 + i),
        };
        const info = {
            ...frame, width: 4, height: 4, frameCount: timeline.length,
            duration: sequence ? 100 : 0, frameInterval: 100, fps: 10, timeline,
            averageEmissivity: .95, averageReflectedKelvins: 293, bytesize: 16,
        };
        const data = { 0: { min: 10, max: 25, avg: 17.5 }, 100: { min: 11, max: 26, avg: 18.5 } };
        const parser: IParserObject = {
            name: "fixture", description: "fixture", devices: [], extensions: [],
            is: () => true,
            baseInfo: async () => info,
            getFrameSubset: buffer => ({ array: buffer, dataType: 0 }),
            frameData: async () => frame,
            registryHistogram: async () => [],
            pointAnalysisData: async () => ({ 0: 10, 100: 11 }),
            rectAnalysisData: async () => data,
            ellipsisAnalysisData: async () => data,
        };
        const reader = new ThermalFileReader(
            manager.managerObject.service, new ArrayBuffer(16), parser, `fixture-${crypto.randomUUID()}.lrc`
        );
        const file = ThermalFileInstance.fromService(group.groupObject, reader, info, frame);
        file.setPreferWebGl(false);
        file.mountToDom(document.createElement("div"));
        return file;
    }

    beforeEach(async () => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        registry = new RegistryProviderElement();
        group = new GroupProviderElement();
        group.groupSlug = "analyses";
        provider = new TestFileProvider();
        table = new FileAnalysisTableElement();
        table.forceinteractiveanalysis = true;
        provider.append(table);
        group.append(provider);
        registry.append(group);
        manager.append(registry);
        document.body.append(manager);
        await settle();
        instance = fixture();
        area = instance.analysis.layers.placeRectAt("area", 0, 0, 2, 2);
        provider.fileController.receiveInstance(instance);
        await settle();
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
    });

    it.each(["full", "compact"] as const)("aligns the %s header and rows with independent actions", async mode => {
        table.tableMode = mode;
        await settle();
        const row = rows()[0];
        const expected = mode === "full" ? 6 : 4;
        expect(table.shadowRoot?.querySelectorAll("th")).toHaveLength(expected);
        expect(row.shadowRoot?.querySelectorAll("td")).toHaveLength(expected);
        expect(row.shadowRoot?.textContent).toContain(area.name);
        expect(row.shadowRoot?.querySelectorAll("file-analysis-edit")).toHaveLength(1);
        expect(row.shadowRoot?.querySelectorAll('[icon="range"]')).toHaveLength(1);
        expect(row.shadowRoot?.querySelectorAll("td")[1].textContent).toContain(area.avg?.toFixed(2));

        table.editEnabled = false;
        table.showRangePropagator = true;
        table.selectionEnabled = false;
        await settle();
        expect(row.shadowRoot?.querySelector("file-analysis-edit")).toBeNull();
        expect(row.shadowRoot?.querySelector('[icon="trash"]')).toBeNull();
        expect(row.shadowRoot?.querySelector("button.name")).toBeNull();
        expect(table.shadowRoot?.querySelector("button.selection")).toBeNull();
        const impose = vi.spyOn(instance.group.registry.range, "imposeRange");
        element<HTMLElement>(row.shadowRoot, '[icon="range"]').click();
        expect(impose).toHaveBeenCalledWith({ from: area.min, to: area.max });

        table.showRangePropagator = false;
        await settle();
        expect(row.shadowRoot?.querySelector('[icon="range"]')).toBeNull();
        expect(table.shadowRoot?.querySelectorAll("th")).toHaveLength(mode === "full" ? 5 : 4);
        expect(row.shadowRoot?.querySelectorAll("td")).toHaveLength(mode === "full" ? 5 : 4);
    });

    it("accepts table-mode as the layout attribute", async () => {
        table.setAttribute("table-mode", "compact");
        await settle();
        expect(table.tableMode).toBe("compact");
        expect(table.shadowRoot?.querySelector("table")?.classList.contains("compact")).toBe(true);
    });

    it("forwards full, forced interactivity and graph activation through the complex control", async () => {
        const complex = new FileAnalysisComplexElement();
        complex.tableMode = "full";
        complex.forceinteractiveanalysis = true;
        complex.graphActivationEnabled = true;
        provider.append(complex);
        for (let i = 0; i < 4; i++) {
            await complex.updateComplete;
            const nestedTable = complex.shadowRoot?.querySelector<FileAnalysisTableElement>("file-analysis-table");
            if (nestedTable) {
                await nestedTable.updateComplete;
            }
        }
        const nestedTable = element<FileAnalysisTableElement>(complex.shadowRoot, "file-analysis-table");
        expect(nestedTable.tableMode).toBe("full");
        expect(nestedTable.forceinteractiveanalysis).toBe(true);
        expect(nestedTable.graphActivationEnabled).toBe(true);
        complex.remove();
    });

    it("selects individual rows and all rows, and blocks selection when disabled", async () => {
        const point = instance.analysis.layers.placePointAt("point", 1, 1);
        await settle();
        element<HTMLButtonElement>(rows()[0].shadowRoot, "button.name").click();
        await settle();
        expect(area.selected).toBe(true);
        expect(rows()[0].hasAttribute("selected")).toBe(true);
        element<HTMLButtonElement>(table.shadowRoot, "button.selection").click();
        await settle();
        expect(point.selected).toBe(true);
        expect(element(table.shadowRoot, "button.selection").getAttribute("aria-pressed")).toBe("true");
        element<HTMLButtonElement>(table.shadowRoot, "button.selection").click();
        await settle();
        expect(instance.analysis.layers.selectedOnly).toHaveLength(0);
        table.selectionEnabled = false;
        await settle();
        expect(rows()[0].shadowRoot?.querySelector("button.name")).toBeNull();
    });

    it("gates graph toggles by sequence, analysis type and explicit permission", async () => {
        instance.analysis.layers.placePointAt("point", 1, 1);
        await settle();
        expect(rows()[0].shadowRoot?.querySelectorAll('thermal-btn[aria-pressed]')).toHaveLength(3);
        expect(rows()[1].shadowRoot?.querySelectorAll('thermal-btn[aria-pressed]')).toHaveLength(1);
        expect(rows()[1].shadowRoot?.querySelector('[icon="range"]')).toBeNull();
        element<HTMLElement>(rows()[0].shadowRoot, 'td:nth-child(2) thermal-btn').click();
        await settle();
        expect(area.graph.state.AVG).toBe(true);
        expect(element(rows()[0].shadowRoot, 'td:nth-child(2) thermal-btn').getAttribute("aria-pressed")).toBe("true");
        table.graphActivationEnabled = false;
        await settle();
        expect(rows()[0].shadowRoot?.querySelector('thermal-btn[aria-pressed]')).toBeNull();

        const still = fixture(false);
        still.analysis.layers.placeRectAt("still", 0, 0, 2, 2);
        table.graphActivationEnabled = true;
        provider.fileController.receiveInstance(still);
        await settle();
        expect(rows()[0].shadowRoot?.querySelector('thermal-btn[aria-pressed]')).toBeNull();
    });

    it("updates names, colors, dimensions and values without replacing keyed rows", async () => {
        const row = rows()[0];
        area.setName("renamed");
        area.setInitialColor("Red");
        area.setWidth(1);
        instance.setPixels(Array.from({ length: 16 }, (_, i) => 100 + i));
        area.recalculateValues();
        await settle();
        expect(rows()[0]).toBe(row);
        expect(row.shadowRoot?.textContent).toContain("renamed");
        expect(element<HTMLElement>(row.shadowRoot, ".color").style.backgroundColor).toBe("red");
        expect(row.shadowRoot?.querySelectorAll("td")[4].textContent).toBe("1x2");
        expect(row.shadowRoot?.querySelectorAll("td")[1].textContent).toContain(area.avg?.toFixed(2));
        table.tableMode = "compact";
        await settle();
        expect(rows()[0]).toBe(row);
        expect(row.shadowRoot?.querySelectorAll("td")).toHaveLength(4);
    });

    it("disables propagation of missing or invalid values and keeps highlights current", async () => {
        const row = rows()[0];
        const highlight = vi.spyOn(registry.registryController, "setHighlight");
        const name = element<HTMLElement>(row.shadowRoot, ".name");
        name.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        expect(highlight).toHaveBeenLastCalledWith({ from: area.min, to: area.max });
        const min = vi.spyOn(area, "min", "get").mockReturnValue(undefined);
        area.onValues.call(undefined, area.max, area.avg);
        await settle();
        expect(highlight).toHaveBeenLastCalledWith(undefined);
        const range = element<ThermalBtnElement>(row.shadowRoot, '[icon="range"]');
        expect(range.disabled).toBe(true);
        const impose = vi.spyOn(instance.group.registry.range, "imposeRange");
        range.click();
        expect(impose).not.toHaveBeenCalled();
        min.mockReturnValue(Infinity);
        area.onValues.call(Infinity, area.max, area.avg);
        await settle();
        expect(range.disabled).toBe(true);
        name.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
        expect(highlight).toHaveBeenLastCalledWith(undefined);
    });

    it("deletes rows and renders no table when the last analysis is removed", async () => {
        element<HTMLElement>(rows()[0].shadowRoot, '[icon="trash"]').click();
        await settle();
        expect(instance.analysis.layers.size).toBe(0);
        expect(table.shadowRoot?.querySelector("table")).toBeNull();
    });

    it.each(["full", "compact"] as const)("keeps %s value buttons transparent and updates active contrast", async mode => {
        table.tableMode = mode;
        await settle();
        const button = element<HTMLElement>(rows()[0].shadowRoot, "td:nth-child(2) thermal-btn");
        expect(button.style.getPropertyValue("--bg")).toBe("transparent");
        expect(button.style.getPropertyValue("--bg-hover")).toBe("transparent");
        area.setInitialColor("Blue");
        button.click();
        await settle();
        expect(button.style.getPropertyValue("--bg")).toBe("Blue");
        expect(button.style.getPropertyValue("--color")).toBe("#FFFFFF");
        expect(button.style.getPropertyValue("--color-hover")).toBe("#FFFFFF");
        area.setInitialColor("Yellow");
        await settle();
        expect(button.style.getPropertyValue("--bg")).toBe("Yellow");
        expect(button.style.getPropertyValue("--color")).toBe("#000000");
        button.click();
        await settle();
        expect(button.style.getPropertyValue("--bg")).toBe("transparent");
        expect(button.style.getPropertyValue("--color")).toBe("var(--thermal-foreground)");
    });

    it("detaches and reattaches listeners on replacement and reconnect", async () => {
        const row = rows()[0];
        const replacement = instance.analysis.layers.placeRectAt("area", 0, 0, 1, 1);
        await settle();
        expect(rows()[0]).toBe(row);
        expect(row.analysis).toBe(replacement);
        expect(area.onValues.has(row.UUID)).toBe(false);
        expect(area.onSerializableChange.has(row.UUID)).toBe(false);
        expect(replacement.onValues.has(row.UUID)).toBe(true);
        table.remove();
        expect(replacement.onValues.has(row.UUID)).toBe(false);
        expect(instance.analysis.layers.onSelectionChange.has(table.UUID)).toBe(false);
        provider.append(table);
        await settle();
        expect(instance.analysis.layers.onSelectionChange.has(table.UUID)).toBe(true);
        expect(replacement.onValues.has(row.UUID)).toBe(true);

        const next = fixture();
        next.analysis.layers.placeRectAt("next", 0, 0, 1, 1);
        provider.fileController.receiveInstance(next);
        await settle();
        expect(instance.analysis.layers.onSelectionChange.has(table.UUID)).toBe(false);
        expect(replacement.onValues.has(row.UUID)).toBe(false);
        expect(rows()).toHaveLength(1);
        expect(rows()[0].analysis?.key).toBe("next");
        expect(next.analysis.layers.onSelectionChange.has(table.UUID)).toBe(true);
    });

    it("clears reflected selection when analysis is removed while the row is disconnected", async () => {
        const row = new FileAnalysisRowElement();
        area.setSelected(false, true);
        row.analysis = area;
        provider.append(row);
        expect(await row.updateComplete).toBe(true);
        expect(row.hasAttribute("selected")).toBe(true);

        row.remove();
        row.analysis = undefined;
        provider.append(row);
        expect(await row.updateComplete).toBe(true);
        expect(row.hasAttribute("selected")).toBe(false);
        expect(row.shadowRoot?.querySelector("td")).toBeNull();
        expect(area.onValues.has(row.UUID)).toBe(false);
        row.remove();
    });

    it("refreshes selection on reconnect when the analysis reference is unchanged", async () => {
        const row = new FileAnalysisRowElement();
        row.analysis = area;
        provider.append(row);
        await row.updateComplete;
        expect(row.hasAttribute("selected")).toBe(false);

        row.remove();
        area.setSelected(false, true);
        provider.append(row);
        expect(await row.updateComplete).toBe(true);
        expect(row.hasAttribute("selected")).toBe(true);
        expect(area.onValues.has(row.UUID)).toBe(true);
        row.remove();
    });

    it("publishes loading independently of the old file and supplies it to late consumers", async () => {
        const canvas = new FileCanvasElement();
        const mount = vi.spyOn(instance, "mountToDom").mockImplementation(() => {});
        const unmount = vi.spyOn(instance, "unmountFromDom").mockImplementation(() => {});
        const draw = vi.spyOn(instance, "draw").mockImplementation(async () => {});
        provider.append(canvas);
        await settle();
        await canvas.updateComplete;
        expect(provider.loading).toBe(false);
        expect(canvas.shadowRoot?.querySelector(".is-success")).not.toBeNull();
        expect(mount).toHaveBeenCalledTimes(1);

        provider.fileController.startLoading();
        await settle();
        await canvas.updateComplete;
        expect(provider.loading).toBe(true);
        expect(canvas.file).toBe(instance);
        expect(canvas.shadowRoot?.querySelector(".is-loading")).not.toBeNull();
        expect(mount).toHaveBeenCalledTimes(1);

        const late = new FileCanvasElement();
        provider.append(late);
        await late.updateComplete;
        expect(late.shadowRoot?.querySelector(".is-loading")).not.toBeNull();
        late.remove();

        provider.fileController.receiveInstance(instance);
        await settle();
        await canvas.updateComplete;
        expect(provider.loading).toBe(false);
        expect(canvas.shadowRoot?.querySelector(".is-success")).not.toBeNull();

        draw.mockClear();
        canvas.prefersGpu = false;
        expect(await canvas.updateComplete).toBe(true);
        expect(draw).toHaveBeenCalledTimes(1);
        canvas.remove();
        expect(unmount).toHaveBeenCalled();
        provider.append(canvas);
        expect(await canvas.updateComplete).toBe(true);
        expect(mount).toHaveBeenCalledTimes(3);
        canvas.remove();
    });

    it("preserves Lit child parts across real canvas mounting, replacement and reconnect", async () => {
        const canvas = new FileCanvasElement();
        canvas.prefersGpu = false;
        vi.spyOn(instance, "draw").mockResolvedValue(undefined);
        provider.append(canvas);
        await settle();
        expect(await canvas.updateComplete).toBe(true);
        expect(instance.dom).toBeDefined();
        expect(canvas.container.value?.parentElement?.getAttribute("part")).toBe("file-canvas-container");

        provider.fileController.startLoading();
        await settle();
        await canvas.updateComplete;
        expect(canvas.shadowRoot?.querySelector(".file-canvas-loading")).not.toBeNull();
        const next = fixture();
        vi.spyOn(next, "draw").mockResolvedValue(undefined);
        provider.fileController.receiveInstance(next);
        await settle();
        await canvas.updateComplete;
        expect(canvas.file).toBe(next);
        expect(next.dom).toBeDefined();
        expect(canvas.shadowRoot?.querySelector(".file-canvas-loading")).toBeNull();

        canvas.remove();
        expect(next.dom).toBeUndefined();
        provider.append(canvas);
        expect(await canvas.updateComplete).toBe(true);
        expect(next.dom).toBeDefined();
        provider.fileController.receiveFailure(
            new ThermalFileFailure("missing.lrc", FileErrors.FILE_NOT_FOUND, "Missing file")
        );
        await settle();
        await canvas.updateComplete;
        expect(canvas.shadowRoot?.querySelector(".error-wrapper")).not.toBeNull();
        expect(canvas.container.value?.children).toHaveLength(0);
        canvas.remove();
    });

    it("publishes failure and ends loading for existing and newly connected consumers", async () => {
        const canvas = new FileCanvasElement();
        vi.spyOn(instance, "mountToDom").mockImplementation(() => {});
        provider.append(canvas);
        await settle();
        await canvas.updateComplete;
        provider.fileController.startLoading();
        const failure = new ThermalFileFailure("missing.lrc", FileErrors.FILE_NOT_FOUND, "Missing file");
        provider.fileController.receiveFailure(failure);
        await settle();
        await canvas.updateComplete;
        expect(provider.loading).toBe(false);
        expect(canvas.file).toBeUndefined();
        expect(canvas.shadowRoot?.querySelector(".is-error")).not.toBeNull();

        const late = new FileCanvasElement();
        provider.append(late);
        await late.updateComplete;
        expect(late.shadowRoot?.querySelector(".is-error")).not.toBeNull();
        provider.fileController.startLoading();
        await settle();
        await Promise.all([canvas.updateComplete, late.updateComplete]);
        expect(provider.failure).toBeUndefined();
        expect(late.shadowRoot?.querySelector(".is-loading")).not.toBeNull();
        expect(late.shadowRoot?.querySelector(".error-wrapper")).toBeNull();
        canvas.remove();
        late.remove();
    });

    it("parses boolean attributes and restores inherited defaults when overrides are removed", async () => {
        table.setAttribute("edit-enabled", "false");
        table.setAttribute("selection-enabled", "false");
        table.setAttribute("show-range-propagator", "");
        table.setAttribute("graph-activation-enabled", "false");
        await settle();
        expect(table.editEnabled).toBe(false);
        expect(table.selectionEnabled).toBe(false);
        expect(table.showRangePropagator).toBe(true);
        expect(table.graphActivationEnabled).toBe(false);
        table.removeAttribute("edit-enabled");
        table.removeAttribute("selection-enabled");
        table.removeAttribute("show-range-propagator");
        await settle();
        expect(table.editEnabled).toBeUndefined();
        expect(table.showRangePropagator).toBeUndefined();
        expect(rows()[0].shadowRoot?.querySelector("file-analysis-edit")).not.toBeNull();
        expect(rows()[0].shadowRoot?.querySelector("button.name")).not.toBeNull();
    });

    it("provides a keyboard-focusable scrolling region", () => {
        const overflow = element<HTMLElement>(table.shadowRoot, ".overflow");
        expect(overflow.tabIndex).toBe(0);
        expect(overflow.getAttribute("role")).toBe("region");
    });

    it("keeps hidden value tooltips out of the scrollable content", async () => {
        const button = element<ThermalBtnElement>(rows()[0].shadowRoot, "td:nth-child(2) thermal-btn");
        await button.updateComplete;
        const tooltip = element<HTMLElement>(button.shadowRoot, ".thermal-tooltip");
        expect(tooltip.style.display).toBe("none");
        expect(tooltip.style.position).toBe("fixed");
        button.dispatchEvent(new MouseEvent("mouseenter"));
        expect(tooltip.style.display).toBe("block");
        expect(tooltip.style.visibility).toBe("visible");
        button.dispatchEvent(new MouseEvent("mouseleave"));
        expect(tooltip.style.display).toBe("none");
        expect(tooltip.style.visibility).toBe("hidden");
    });
});
