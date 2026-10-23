// @vitest-environment jsdom
import type { AnalysisDataStateValue } from "@labirthermal/core";
import i18next from "i18next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FileAnalysisGraphElement } from "./FileAnalysisGraph";

vi.mock("../../../hierarchy/consumers/AbstractFileConsumer", async () => {
    const { LitElement } = await import("lit");
    class AbstractFileConsumer extends LitElement {
        static properties = { file: { attribute: false } };
        declare public file?: unknown;
        public readonly UUID = "graph-test";
    }
    return { AbstractFileConsumer };
});

class TestGraph extends FileAnalysisGraphElement {
    public get data() {
        return this.graphs;
    }
}

customElements.define("test-standalone-analysis-graph", TestGraph);

class TestResizeObserver implements ResizeObserver {
    static instances: TestResizeObserver[] = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();

    constructor(private readonly callback: ResizeObserverCallback) {
        TestResizeObserver.instances.push(this);
    }

    emit(target: Element, width: number, height: number): void {
        this.callback([{
            target,
            contentRect: new DOMRectReadOnly(0, 0, width, height),
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
        }], this);
    }
}

function graphData(active: boolean): AnalysisDataStateValue {
    return active
        ? { values: [["time", "AVG"], [new Date(0), 25]], colors: ["red"] }
        : { values: [[]], colors: [] };
}

function fixture(active = false, sequence = true) {
    const listeners = new Map<string, (value: AnalysisDataStateValue) => void>();
    const file = {
        duration: 1000,
        timeline: { isSequence: sequence },
        analysisData: {
            value: graphData(active),
            addListener: vi.fn((id: string, callback: (value: AnalysisDataStateValue) => void) => {
                listeners.set(id, callback);
            }),
            removeListener: vi.fn((id: string) => listeners.delete(id)),
        },
    };
    return {
        file, listeners,
        setActive(active: boolean) {
            file.analysisData.value = graphData(active);
            listeners.forEach(callback => callback(file.analysisData.value));
        }
    };
}

beforeEach(async () => {
    await i18next.init({ lng: "en", resources: { en: { translation: {} } } });
    TestResizeObserver.instances = [];
    vi.stubGlobal("ResizeObserver", TestResizeObserver);
});

afterEach(() => {
    document.body.replaceChildren();
    vi.unstubAllGlobals();
});

describe("Standalone analysis graph", () => {
    it("hides inactive graphs and measures active graphs without replacing the host", async () => {
        const component = new TestGraph();
        const source = fixture();
        Object.assign(component, { file: source.file });
        component.setAttribute("standalone", "true");
        document.body.append(component);
        expect(await component.updateComplete).toBe(true);
        expect(component.hasAttribute("data-has-graphs")).toBe(false);
        expect(component.shadowRoot?.querySelector("thermal-chart")).toBeNull();
        expect(source.listeners.size).toBe(1);
        expect(TestResizeObserver.instances).toHaveLength(0);

        source.setActive(true);
        expect(await component.updateComplete).toBe(true);
        expect(component.hasAttribute("data-has-graphs")).toBe(true);
        expect(component.shadowRoot?.querySelector("thermal-chart")).not.toBeNull();
        const observer = TestResizeObserver.instances[0];
        const container = component.container.value!;
        observer.emit(container, 320, 192);
        expect(await component.updateComplete).toBe(true);
        expect(component.graphWidth).toBe(320);
        expect(component.graphHeight).toBe(192);
        expect(component.container.value).toBe(container);
        expect(source.file.analysisData.addListener).toHaveBeenCalledTimes(1);
        const chart = component.graphRef.value!;
        Object.assign(chart, { left: 12, top: 8, w: 250, h: 120 });
        chart.dispatchEvent(new CustomEvent("google-chart-ready"));
        expect(await component.updateComplete).toBe(true);
        expect(component.shadowRoot?.querySelector<HTMLElement>("[data-video-style]")?.style.left).toBe("12px");
        expect(component.graphRef.value).toBe(chart);
        observer.emit(container, 180, 192);
        await component.updateComplete;
        expect(component.graphWidth).toBe(180);

        source.setActive(false);
        await component.updateComplete;
        expect(component.hasAttribute("data-has-graphs")).toBe(false);
        expect(observer.disconnect).toHaveBeenCalledTimes(1);
        expect(component.shadowRoot?.querySelector(".download")).toBeNull();
    });

    it("rebinds on file changes and cleans up observers and listeners on disconnect", async () => {
        const component = new TestGraph();
        component.standalone = true;
        const first = fixture(true);
        Object.assign(component, { file: first.file });
        document.body.append(component);
        await component.updateComplete;
        const observer = TestResizeObserver.instances[0];
        const second = fixture(false, false);
        Object.assign(component, { file: second.file });
        expect(await component.updateComplete).toBe(true);
        expect(first.listeners.size).toBe(0);
        expect(second.listeners.size).toBe(1);
        expect(observer.disconnect).toHaveBeenCalledTimes(1);
        expect(component.hasAttribute("data-has-graphs")).toBe(false);

        Object.assign(component, { file: first.file });
        await component.updateComplete;
        component.remove();
        expect(first.listeners.size).toBe(0);
        expect(TestResizeObserver.instances[1].disconnect).toHaveBeenCalledTimes(1);
        first.setActive(false);
        document.body.append(component);
        expect(await component.updateComplete).toBe(true);
        expect(first.listeners.size).toBe(1);
        expect(component.hasAttribute("data-has-graphs")).toBe(false);
        expect(component.data.colors).toHaveLength(0);
    });

    it("preserves externally supplied graph dimensions outside standalone mode", async () => {
        const component = new TestGraph();
        const source = fixture(true);
        Object.assign(component, { file: source.file });
        component.graphWidth = 500;
        component.graphHeight = 250;
        document.body.append(component);
        expect(await component.updateComplete).toBe(true);
        expect(component.shadowRoot?.querySelector("thermal-chart")).not.toBeNull();
        expect(component.graphWidth).toBe(500);
        expect(component.graphHeight).toBe(250);
        expect(TestResizeObserver.instances).toHaveLength(0);
    });
});
