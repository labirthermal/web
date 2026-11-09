// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GroupProviderElement } from "../../hierarchy/providers/GroupProvider";
import { ManagerProviderElement } from "../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../hierarchy/providers/RegistryProvider";
import { ThermalChartElement } from "../file/analysis/chart/chart";
import { GroupChartElement } from "./GroupChartElement";

vi.mock("../../index.export", async () => ({
    ...await import("../../utils/converters/booleanConverter"),
    ...await import("../../controllers/RegistryController"),
    ...await import("../../controllers/GroupController"),
}));

vi.mock("../file/analysis/chart/loader", () => ({
    createChartWrapper: async () => wrapper,
    dataTable: (data: unknown) => loadData(data),
}));

function createWrapper() {
    return {
        setChartType: vi.fn(),
        getChart: vi.fn(() => ({})),
        setDataTable: vi.fn(),
        setOptions: vi.fn(),
        draw: vi.fn(),
        visualization: { ha: { O: { left: 0, top: 0, width: 300, height: 200 } } },
    };
}

let wrapper: ReturnType<typeof createWrapper>;
let loadData: (data: unknown) => Promise<{ source: unknown }>;

customElements.define("test-group-chart-manager", ManagerProviderElement);
customElements.define("test-group-chart-registry", RegistryProviderElement);
customElements.define("test-group-chart-provider", GroupProviderElement);
customElements.define("test-group-chart", GroupChartElement);
customElements.define("thermal-chart", ThermalChartElement);

describe("GroupChartElement units", () => {
    let manager: ManagerProviderElement;
    let registry: RegistryProviderElement;
    let group: GroupProviderElement;
    let component: GroupChartElement;

    const firstTime = new Date("2025-01-01T10:00:00Z");
    const secondTime = new Date("2025-01-01T10:01:00Z");

    function graph() {
        return {
            data: [
                ["Time", "A", "B"],
                [firstTime, 0, 100],
                [secondTime, -40, 20],
            ] as [string[], ...[Date, ...number[]][]],
            colors: ["red", "blue"],
        };
    }

    async function settle() {
        for (let i = 0; i < 4; i++) {
            await Promise.all([manager.updateComplete, registry.updateComplete, group.updateComplete, component.updateComplete]);
            const chart = component.shadowRoot?.querySelector<ThermalChartElement>("thermal-chart");
            if (chart) await chart.updateComplete;
            await Promise.resolve();
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    function chart(): ThermalChartElement {
        const element = component.shadowRoot?.querySelector<ThermalChartElement>("thermal-chart");
        if (!element) throw new Error("Missing registered thermal chart");
        return element;
    }

    beforeEach(async () => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        vi.stubGlobal("google", {
            visualization: {
                events: { addListener: vi.fn(), addOneTimeListener: vi.fn() },
            },
        });
        wrapper = createWrapper();
        loadData = async data => ({ source: data });
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        registry = new RegistryProviderElement();
        group = new GroupProviderElement();
        group.groupSlug = "chart-fixture";
        component = new GroupChartElement();
        group.append(component);
        registry.append(group);
        manager.append(registry);
        document.body.append(manager);
        await settle();
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("redraws the registered chart in C, F and K without mutating graph data", async () => {
        const original = graph();
        Object.assign(group.groupObject.analysisGraph, { value: original });
        await settle();

        const rendered = chart();
        expect(rendered.data).toEqual([
            ["Time", "A", "B"], [firstTime, 0, 100], [secondTime, -40, 20],
        ]);
        expect(rendered.data).not.toBe(original.data);
        expect((rendered.data as unknown[][])[0]).not.toBe(original.data[0]);
        expect(rendered.options).toMatchObject({ vAxis: { title: "Temperature °C" } });
        expect(wrapper.draw).toHaveBeenCalled();

        manager.setAttribute("unit", "F");
        await settle();
        expect(chart()).toBe(rendered);
        expect(rendered.data).toEqual([
            ["Time", "A", "B"], [firstTime, 32, 212], [secondTime, -40, 68],
        ]);
        expect(rendered.options).toMatchObject({ vAxis: { title: "Temperature °F" } });
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: rendered.data });
        expect(wrapper.setOptions).toHaveBeenLastCalledWith(expect.objectContaining({
            vAxis: { title: "Temperature °F" },
        }));

        manager.setAttribute("unit", "K");
        await settle();
        const kelvin = rendered.data as [string[], ...[Date, ...number[]][]];
        expect(kelvin[1][0]).toBe(firstTime);
        expect(kelvin[1][1]).toBeCloseTo(273.15);
        expect(kelvin[1][2]).toBeCloseTo(373.15);
        expect(kelvin[2][1]).toBeCloseTo(233.15);
        expect(kelvin[2][2]).toBeCloseTo(293.15);
        expect(rendered.options).toMatchObject({ vAxis: { title: "Temperature K" } });
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: rendered.data });
        expect(group.groupObject.analysisGraph.value).toBe(original);
        expect(original.data).toEqual([
            ["Time", "A", "B"], [firstTime, 0, 100], [secondTime, -40, 20],
        ]);

        manager.setAttribute("unit", "C");
        await settle();
        expect(rendered.data).toEqual(original.data);
        expect(rendered.options).toMatchObject({ vAxis: { title: "Temperature °C" } });
    });

    it("hydrates existing data and removes subscriptions when disconnected or moved", async () => {
        const firstGraph = graph();
        Object.assign(group.groupObject.analysisGraph, { value: firstGraph });
        await settle();
        const removeGraph = vi.spyOn(group.groupObject.analysisGraph, "removeListener");
        const removeFiles = vi.spyOn(group.groupObject.files, "removeListener");

        component.remove();
        expect(removeGraph).toHaveBeenCalledWith(component.UUID);
        expect(removeFiles).toHaveBeenCalledWith(component.UUID);
        Object.assign(group.groupObject.analysisGraph, { value: undefined });
        group.append(component);
        await settle();
        expect(component.shadowRoot?.querySelector("thermal-chart")).toBeNull();

        const secondGroup = new GroupProviderElement();
        secondGroup.groupSlug = "second-chart-fixture";
        registry.append(secondGroup);
        await secondGroup.updateComplete;
        const secondGraph = graph();
        secondGraph.data[1][1] = 50;
        Object.assign(secondGroup.groupObject.analysisGraph, { value: secondGraph });
        secondGroup.append(component);
        await settle();
        expect(chart().data).toEqual([
            ["Time", "A", "B"], [firstTime, 50, 100], [secondTime, -40, 20],
        ]);
        expect(removeGraph).toHaveBeenCalledWith(component.UUID);

        Object.assign(secondGroup.groupObject.analysisGraph, { value: undefined });
        await settle();
        expect(component.shadowRoot?.querySelector("thermal-chart")).toBeNull();
    });

    it("keeps the newest unit when asynchronous chart-data conversions finish out of order", async () => {
        const pending: { data: unknown, resolve: (value: { source: unknown }) => void }[] = [];
        loadData = data => new Promise(resolve => pending.push({ data, resolve }));

        Object.assign(group.groupObject.analysisGraph, { value: graph() });
        await settle();
        manager.setAttribute("unit", "F");
        await settle();
        manager.setAttribute("unit", "K");
        await settle();
        expect(pending).toHaveLength(3);

        pending[2].resolve({ source: pending[2].data });
        await settle();
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: chart().data });

        pending[0].resolve({ source: pending[0].data });
        pending[1].resolve({ source: pending[1].data });
        await settle();
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: chart().data });
        expect(chart().options).toMatchObject({ vAxis: { title: "Temperature K" } });
    });

    it("does not redraw old data with a new unit while conversion is pending", async () => {
        Object.assign(group.groupObject.analysisGraph, { value: graph() });
        await settle();
        let pending: unknown;
        let resolveNext: ((value: { source: unknown }) => void) | undefined;
        loadData = data => {
            pending = data;
            return new Promise(resolve => { resolveNext = resolve; });
        };
        wrapper.setDataTable.mockClear();
        wrapper.setOptions.mockClear();
        wrapper.draw.mockClear();

        manager.setAttribute("unit", "F");
        await settle();
        expect(wrapper.setDataTable).not.toHaveBeenCalled();
        expect(wrapper.setOptions).not.toHaveBeenCalled();
        expect(wrapper.draw).not.toHaveBeenCalled();

        if (!resolveNext) throw new Error("Missing pending chart conversion");
        resolveNext({ source: pending });
        await settle();
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: chart().data });
        expect(wrapper.setOptions).toHaveBeenLastCalledWith(expect.objectContaining({
            vAxis: { title: "Temperature °F" },
        }));
        expect(wrapper.draw).toHaveBeenCalled();
    });

    it("reports a failed current conversion instead of showing stale values", async () => {
        Object.assign(group.groupObject.analysisGraph, { value: graph() });
        await settle();
        const error = vi.spyOn(console, "error").mockImplementation(() => {});
        loadData = async () => { throw new Error("Invalid chart data"); };
        wrapper.draw.mockClear();
        chart().redraw();

        manager.setAttribute("unit", "F");
        await settle();
        expect(chart().shadowRoot?.querySelector("#chartdiv")?.textContent).toContain("Invalid chart data");
        expect(error).toHaveBeenCalledWith("Failed to prepare chart data:", expect.any(Error));
        expect(wrapper.draw).not.toHaveBeenCalled();

        loadData = async data => ({ source: data });
        manager.setAttribute("unit", "K");
        await settle();
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: chart().data });
        expect(wrapper.draw).toHaveBeenCalled();
    });

    it("does not convert a stale response after newer data have arrived", async () => {
        Object.assign(group.groupObject.analysisGraph, { value: graph() });
        await settle();
        let resolveResponse!: (response: Response) => void;
        vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(resolve => { resolveResponse = resolve; })));
        const convert = vi.fn(async (data: unknown) => ({ source: data }));
        loadData = convert;
        const rendered = chart();
        rendered.data = "/old-chart.json";
        await settle();
        const newest = graph().data;
        rendered.data = newest;
        await settle();

        const stale = [["Time", "A", "B"], [firstTime, 10]];
        resolveResponse(Response.json(stale));
        await settle();
        expect(convert).toHaveBeenCalledTimes(1);
        expect(convert).toHaveBeenCalledWith(newest);
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: newest });
    });

    it("ignores failures of superseded conversions", async () => {
        let rejectOld!: (reason: Error) => void;
        loadData = () => new Promise((_, reject) => { rejectOld = reject; });
        Object.assign(group.groupObject.analysisGraph, { value: graph() });
        await settle();
        loadData = async data => ({ source: data });
        manager.setAttribute("unit", "F");
        await settle();
        const error = vi.spyOn(console, "error").mockImplementation(() => {});
        rejectOld(new Error("Obsolete snapshot"));
        await settle();
        expect(error).not.toHaveBeenCalled();
        expect(wrapper.setDataTable).toHaveBeenLastCalledWith({ source: chart().data });
    });
});
