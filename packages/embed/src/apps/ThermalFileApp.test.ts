// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThermalFileAppElement } from "./ThermalFileApp";

customElements.define("test-responsive-file-app", ThermalFileAppElement);

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

async function fixture() {
    const app = new ThermalFileAppElement();
    document.body.append(app);
    await app.updateComplete;
    const layout = app.shadowRoot?.querySelector<HTMLDivElement>(".layout");
    if (!layout) throw new Error("Missing interactive layout");
    return { app, layout, observer: TestResizeObserver.instances[0] };
}

beforeEach(() => {
    TestResizeObserver.instances = [];
    vi.stubGlobal("ResizeObserver", TestResizeObserver);
});

afterEach(() => {
    document.body.replaceChildren();
    vi.unstubAllGlobals();
});

describe("ThermalFileApp responsive layout", () => {
    it("switches at the exact content-width thresholds in both directions", async () => {
        const { layout, observer } = await fixture();
        expect(observer.observe).toHaveBeenCalledExactlyOnceWith(layout);

        for (const [width, stacked, compact] of [
            [900, false, false],
            [700, false, false],
            [699.5, true, false],
            [500, true, false],
            [499.5, true, true],
            [320, true, true],
            [500, true, false],
            [700, false, false],
        ] as const) {
            observer.emit(layout, width);
            expect(layout.classList.contains("layout--stacked")).toBe(stacked);
            expect(layout.classList.contains("layout--compact")).toBe(compact);
            expect(layout.classList.contains("layout")).toBe(true);
        }
    });

    it("preserves interactive children and responsive classes across app updates", async () => {
        const { app, layout, observer } = await fixture();
        const children = Array.from(layout.querySelectorAll(
            "manager-tool-bar, file-canvas, file-timeline, file-analysis-complex"
        ));
        expect(children.map(child => child.localName)).toEqual([
            "manager-tool-bar", "file-canvas", "file-timeline", "file-analysis-complex"
        ]);
        observer.emit(layout, 320);
        app.label = "Updated label";
        await app.updateComplete;

        expect(layout.className).toBe("layout layout--stacked layout--compact");
        expect(Array.from(layout.querySelectorAll(
            "manager-tool-bar, file-canvas, file-timeline, file-analysis-complex"
        ))).toEqual(children);
        expect(TestResizeObserver.instances).toHaveLength(1);
    });

    it("disconnects and restores observation, ignoring stale callbacks", async () => {
        const { app, layout, observer } = await fixture();
        observer.emit(layout, 600);
        app.remove();
        expect(observer.disconnect).toHaveBeenCalledOnce();
        observer.emit(layout, 320);
        expect(layout.classList.contains("layout--compact")).toBe(false);

        document.body.append(app);
        await app.updateComplete;
        expect(TestResizeObserver.instances).toHaveLength(2);
        const restored = TestResizeObserver.instances[1];
        expect(restored.observe).toHaveBeenCalledExactlyOnceWith(layout);
        restored.emit(layout, 320);
        observer.emit(layout, 900);
        expect(layout.classList.contains("layout--compact")).toBe(true);
        expect(layout.classList.contains("layout--stacked")).toBe(true);
    });
});
