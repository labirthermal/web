// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nothing } from "lit";
import { FileAnalysisComplexElement } from "./FileAnalysisComplex";

vi.mock("../../../hierarchy/consumers/AbstractFileConsumer", async () => {
    const { LitElement } = await import("lit");
    class AbstractFileConsumer extends LitElement {
        static properties = { file: { attribute: false } };
        declare public file?: unknown;
        public readonly UUID = "complex-test";
    }
    return { AbstractFileConsumer };
});

class TestComplex extends FileAnalysisComplexElement {
    public get stateSnapshot() {
        return {
            hasAnalysis: this.hasAnalysis,
            hasGraph: this.hasGraph,
            mayHaveGraph: this.mayHaveGraph,
            drawing: this.isDrawingAnalysis,
            width: this.graphWidth,
            height: this.graphHeight,
        };
    }

    public startDrawing(): void {
        this.isDrawingAnalysis = true;
    }

    protected renderCurrentTooltip() {
        return nothing;
    }
}

customElements.define("test-analysis-complex-lifecycle", TestComplex);

class TestResizeObserver implements ResizeObserver {
    static instances: TestResizeObserver[] = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();

    constructor(private readonly callback: ResizeObserverCallback) {
        TestResizeObserver.instances.push(this);
    }

    emit(target: Element): void {
        this.callback([{
            target,
            contentRect: new DOMRectReadOnly(0, 0, 320, 160),
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
        }], this);
    }
}

function analysis(active = false) {
    return {
        graph: {
            state: { MIN: active, MAX: false, AVG: false },
            onGraphActivation: new Map<string, () => void>(),
        },
    };
}

function fixture(analyses = [analysis()], sequence = true) {
    const listeners = new Map<string, (value: typeof analyses) => void>();
    const layer = document.createElement("div");
    const file = {
        timeline: { isSequence: sequence },
        analysis: {
            value: analyses,
            addListener: vi.fn((id: string, callback: (value: typeof analyses) => void) => {
                listeners.set(id, callback);
            }),
            removeListener: vi.fn((id: string) => listeners.delete(id)),
        },
        dom: { listenerLayer: { getLayerRoot: () => layer } },
        group: { tool: { tools: {} } },
    };
    return {
        file, listeners, layer,
        setAnalyses(value: typeof analyses) {
            file.analysis.value = value;
            listeners.forEach(callback => callback(value));
        },
    };
}

beforeEach(() => {
    TestResizeObserver.instances = [];
    vi.stubGlobal("ResizeObserver", TestResizeObserver);
});

afterEach(() => {
    document.body.replaceChildren();
    vi.unstubAllGlobals();
});

describe("FileAnalysisComplex lifecycle", () => {
    it("binds in one update and switches subscriptions and render state between files", async () => {
        const component = new TestComplex();
        const first = fixture([analysis(true)]);
        Object.assign(component, { file: first.file });
        document.body.append(component);
        expect(await component.updateComplete).toBe(true);
        expect(component.stateSnapshot.hasGraph).toBe(true);
        expect(first.file.analysis.addListener).toHaveBeenCalledTimes(1);
        const observer = TestResizeObserver.instances[0];
        const graph = component.shadowRoot?.querySelector(".graph");
        expect(graph).not.toBeNull();
        if (!graph) throw new Error("Missing graph container");
        observer.emit(graph);
        expect(await component.updateComplete).toBe(true);
        expect(component.stateSnapshot.width).toBe(320);
        expect(component.stateSnapshot.height).toBe(160);
        expect(TestResizeObserver.instances).toHaveLength(1);

        const second = fixture([], false);
        Object.assign(component, { file: second.file });
        expect(await component.updateComplete).toBe(true);
        expect(first.listeners.size).toBe(0);
        expect(first.file.analysis.value[0].graph.onGraphActivation.size).toBe(0);
        expect(second.listeners.size).toBe(1);
        expect(component.stateSnapshot.hasAnalysis).toBe(false);
        expect(component.stateSnapshot.hasGraph).toBe(false);
        expect(component.stateSnapshot.mayHaveGraph).toBe(false);
        expect(observer.disconnect).toHaveBeenCalledTimes(1);

        Object.assign(component, { file: undefined });
        expect(await component.updateComplete).toBe(true);
        expect(second.listeners.size).toBe(0);
    });

    it("updates graph presence on activation and removal even when other analyses remain", async () => {
        const component = new TestComplex();
        const active = analysis(true);
        const inactive = analysis();
        const source = fixture([active, inactive]);
        Object.assign(component, { file: source.file });
        document.body.append(component);
        await component.updateComplete;
        const observer = TestResizeObserver.instances[0];

        source.setAnalyses([inactive]);
        expect(await component.updateComplete).toBe(true);
        expect(component.stateSnapshot.hasAnalysis).toBe(true);
        expect(component.stateSnapshot.hasGraph).toBe(false);
        expect(active.graph.onGraphActivation.size).toBe(0);
        expect(observer.disconnect).toHaveBeenCalledTimes(1);

        inactive.graph.state.AVG = true;
        inactive.graph.onGraphActivation.forEach(callback => callback());
        expect(await component.updateComplete).toBe(true);
        expect(component.stateSnapshot.hasGraph).toBe(true);
        expect(TestResizeObserver.instances).toHaveLength(2);

        component.startDrawing();
        source.layer.dispatchEvent(new Event("pointerup"));
        expect(component.stateSnapshot.drawing).toBe(false);
        source.setAnalyses([]);
        await component.updateComplete;
        expect(component.stateSnapshot.hasAnalysis).toBe(false);
        expect(inactive.graph.onGraphActivation.size).toBe(0);
    });

    it("removes listeners and observers on disconnect and restores them on reconnect", async () => {
        const component = new TestComplex();
        const current = analysis(true);
        const source = fixture([current]);
        Object.assign(component, { file: source.file });
        document.body.append(component);
        await component.updateComplete;
        const observer = TestResizeObserver.instances[0];
        component.remove();
        expect(observer.disconnect).toHaveBeenCalledTimes(1);
        expect(source.listeners.size).toBe(0);
        expect(current.graph.onGraphActivation.size).toBe(0);
        component.startDrawing();
        source.layer.dispatchEvent(new Event("pointerup"));
        expect(component.stateSnapshot.drawing).toBe(true);
        await component.updateComplete;

        document.body.append(component);
        expect(await component.updateComplete).toBe(true);
        expect(source.listeners.size).toBe(1);
        expect(current.graph.onGraphActivation.size).toBe(1);
        expect(TestResizeObserver.instances).toHaveLength(2);
        source.layer.dispatchEvent(new Event("pointerup"));
        expect(component.stateSnapshot.drawing).toBe(false);
        await component.updateComplete;
    });
});
