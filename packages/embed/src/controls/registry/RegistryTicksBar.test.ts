// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ThermalMinmaxOrUndefined } from "@labirthermal/core";
import { RegistryTicksBar } from "./RegistryTicksBar";

vi.mock("../../hierarchy/consumers/AbstractRegistryConsumer", async () => {
    const { LitElement } = await import("lit");
    class AbstractRegistryConsumer extends LitElement {
        static properties = { registryController: { attribute: false } };
        declare public registryController?: unknown;
        public readonly UUID = "ticks-test";
    }
    return { AbstractRegistryConsumer };
});

customElements.define("test-registry-ticks-lifecycle", RegistryTicksBar);

class TestResizeObserver implements ResizeObserver {
    static instances: TestResizeObserver[] = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();

    constructor(private readonly callback: ResizeObserverCallback) {
        TestResizeObserver.instances.push(this);
    }

    emit(target: Element, width: number): void {
        this.callback([{
            target,
            contentRect: new DOMRectReadOnly(0, 0, width, 10),
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
        }], this);
    }
}

function fixture(value: ThermalMinmaxOrUndefined) {
    const listeners = new Map<string, (value: ThermalMinmaxOrUndefined) => void>();
    const registry = {
        minmax: {
            value,
            addListener: vi.fn((id: string, callback: (value: ThermalMinmaxOrUndefined) => void) => {
                listeners.set(id, callback);
            }),
            removeListener: vi.fn((id: string) => listeners.delete(id)),
        },
    };
    return {
        controller: { registryObject: registry },
        registry,
        listeners,
        setRange(next: ThermalMinmaxOrUndefined) {
            registry.minmax.value = next;
            listeners.forEach(callback => callback(next));
        },
    };
}

function labels(bar: RegistryTicksBar) {
    return Array.from(bar.shadowRoot?.querySelectorAll(".tick-value") ?? [])
        .map(label => label.textContent?.trim());
}

function ticksContainer(bar: RegistryTicksBar): Element {
    const ticks = bar.shadowRoot?.querySelector(".ticks");
    if (!ticks) throw new Error("Missing ticks container");
    return ticks;
}

beforeEach(() => {
    TestResizeObserver.instances = [];
    vi.stubGlobal("ResizeObserver", TestResizeObserver);
});

afterEach(() => {
    document.body.replaceChildren();
    vi.unstubAllGlobals();
});

describe("RegistryTicksBar lifecycle", () => {
    it("derives ticks in one update and handles resize and range events", async () => {
        const bar = new RegistryTicksBar();
        const source = fixture({ min: 0, max: 100 });
        Object.assign(bar, { registryController: source.controller });
        document.body.append(bar);
        expect(await bar.updateComplete).toBe(true);
        expect(labels(bar)).toEqual(["0.00", "100.00"]);
        expect(source.registry.minmax.addListener).toHaveBeenCalledTimes(1);

        TestResizeObserver.instances[0].emit(ticksContainer(bar), 240);
        expect(await bar.updateComplete).toBe(true);
        expect(labels(bar)).toEqual(["0.00", "25.00", "50.00", "75.00", "100.00"]);
        expect(TestResizeObserver.instances).toHaveLength(1);

        source.setRange({ min: 10, max: 50 });
        expect(await bar.updateComplete).toBe(true);
        expect(labels(bar)).toEqual(["10.00", "20.00", "30.00", "40.00", "50.00"]);
        source.setRange(undefined);
        expect(await bar.updateComplete).toBe(true);
        expect(labels(bar)).toEqual([]);
    });

    it("replaces the registry subscription and clears ticks when the provider is absent", async () => {
        const bar = new RegistryTicksBar();
        const first = fixture({ min: 0, max: 100 });
        Object.assign(bar, { registryController: first.controller });
        document.body.append(bar);
        await bar.updateComplete;

        const second = fixture({ min: 20, max: 40 });
        Object.assign(bar, { registryController: second.controller });
        expect(await bar.updateComplete).toBe(true);
        expect(first.listeners.size).toBe(0);
        expect(second.listeners.size).toBe(1);
        expect(labels(bar)).toEqual(["20.00", "40.00"]);

        Object.assign(bar, { registryController: undefined });
        expect(await bar.updateComplete).toBe(true);
        expect(second.listeners.size).toBe(0);
        expect(labels(bar)).toEqual([]);
    });

    it("cleans up on disconnect and refreshes range and width before reconnect rendering", async () => {
        const bar = new RegistryTicksBar();
        const source = fixture({ min: 0, max: 100 });
        Object.assign(bar, { registryController: source.controller });
        document.body.append(bar);
        await bar.updateComplete;
        const ticks = ticksContainer(bar);
        const observer = TestResizeObserver.instances[0];

        bar.remove();
        expect(source.listeners.size).toBe(0);
        expect(observer.disconnect).toHaveBeenCalledTimes(1);
        source.setRange({ min: 10, max: 50 });
        Object.defineProperty(ticks, "clientWidth", { value: 240, configurable: true });
        document.body.append(bar);
        expect(await bar.updateComplete).toBe(true);
        expect(labels(bar)).toEqual(["10.00", "20.00", "30.00", "40.00", "50.00"]);
        expect(source.listeners.size).toBe(1);
        expect(TestResizeObserver.instances).toHaveLength(2);

        observer.emit(ticks, 400);
        expect(labels(bar)).toEqual(["10.00", "20.00", "30.00", "40.00", "50.00"]);
    });
});
