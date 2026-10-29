// @vitest-environment jsdom
import { ThermalFileInstance, ThermalFileReader } from "@labirthermal/core";
import type { IParserObject } from "@labirthermal/core/src/loading/workers/parsers/structure";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AbstractFileProvider } from "../../hierarchy/abstraction/AbstractFileProvider";
import { GroupProviderElement } from "../../hierarchy/providers/GroupProvider";
import { ManagerProviderElement } from "../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../hierarchy/providers/RegistryProvider";
import { calculateTicks } from "../../utils/timelineTicks";
import { FileTimelineElement } from "./FileTimelineElement";

vi.mock("../../index.export", async () => ({
    ...await import("../../utils/converters/booleanConverter"),
    ...await import("../../controllers/GroupController"),
}));

vi.mock("../../../../core/src/file/render/CpuRenderer", () => ({
    CpuRenderer: class {
        init() {}
        render() {}
        destroy() {}
    }
}));

class TestFileProvider extends AbstractFileProvider {}

class ResizeObserverMock implements ResizeObserver {
    static instances: ResizeObserverMock[] = [];

    observe = vi.fn<(target: Element) => void>();
    unobserve = vi.fn<(target: Element) => void>();
    disconnect = vi.fn<() => void>();

    constructor(private callback: ResizeObserverCallback) {
        ResizeObserverMock.instances.push(this);
    }

    notify(target: Element, width: number): void {
        this.callback([{
            target,
            contentRect: new DOMRect(0, 0, width, 40),
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
        }], this);
    }
}

customElements.define("test-timeline-manager", ManagerProviderElement);
customElements.define("test-timeline-registry", RegistryProviderElement);
customElements.define("test-timeline-group", GroupProviderElement);
customElements.define("test-timeline-file", TestFileProvider);
customElements.define("test-file-timeline", FileTimelineElement);

describe("FileTimelineElement", () => {
    let manager: ManagerProviderElement;
    let registry: RegistryProviderElement;
    let group: GroupProviderElement;
    let provider: TestFileProvider;
    let timeline: FileTimelineElement;
    let instance: ThermalFileInstance;

    function element<E extends Element>(root: ParentNode | null, selector: string): E {
        const found = root?.querySelector<E>(selector);
        if (!found) throw new Error(`Missing fixture element: ${selector}`);
        return found;
    }

    function container(): HTMLElement {
        return element<HTMLElement>(timeline.shadowRoot, ".container");
    }

    function observer(): ResizeObserverMock {
        const latest = ResizeObserverMock.instances.at(-1);
        if (!latest) throw new Error("Missing timeline ResizeObserver");
        return latest;
    }

    async function settle(): Promise<void> {
        for (let i = 0; i < 4; i++) {
            await Promise.all([
                manager.updateComplete, registry.updateComplete, group.updateComplete,
                provider.updateComplete, timeline.updateComplete,
            ]);
        }
    }

    function fixture(sequence = true): ThermalFileInstance {
        const duration = sequence ? 120000 : 0;
        const frames = Array.from({ length: sequence ? 2 : 1 }, (_, index) => ({
            index, relative: index * duration, absolute: 1700000000000 + index * duration, offset: index,
        }));
        const frame = {
            timestamp: frames[0].absolute, min: 10, max: 25,
            emissivity: .95, reflectedKelvins: 293, pixels: Array.from({ length: 16 }, (_, i) => 10 + i),
        };
        const info = {
            ...frame, width: 4, height: 4, frameCount: frames.length,
            duration, frameInterval: 120000, fps: 1 / 120, timeline: frames,
            averageEmissivity: .95, averageReflectedKelvins: 293, bytesize: 16,
        };
        const parser: IParserObject = {
            name: "fixture", description: "fixture", devices: [], extensions: [],
            is: () => true,
            baseInfo: async () => info,
            getFrameSubset: buffer => ({ array: buffer, dataType: 0 }),
            frameData: async () => frame,
            registryHistogram: async () => [],
            pointAnalysisData: async () => ({ 0: 10, 120000: 11 }),
            rectAnalysisData: async () => ({ 0: { min: 10, max: 25, avg: 17.5 } }),
            ellipsisAnalysisData: async () => ({ 0: { min: 10, max: 25, avg: 17.5 } }),
        };
        const reader = new ThermalFileReader(
            manager.managerObject.service, new ArrayBuffer(16), parser, `timeline-${crypto.randomUUID()}.lrc`
        );
        const file = ThermalFileInstance.fromService(group.groupObject, reader, info, frame);
        file.setPreferWebGl(false);
        file.mountToDom(document.createElement("div"));
        return file;
    }

    async function mount(attributeMarkup = ""): Promise<void> {
        provider.innerHTML = `<test-file-timeline ${attributeMarkup}></test-file-timeline>`;
        timeline = element<FileTimelineElement>(provider, "test-file-timeline");
        group.append(provider);
        registry.append(group);
        manager.append(registry);
        document.body.append(manager);
        await settle();
        instance = fixture();
        provider.fileController.receiveInstance(instance);
        await settle();
    }

    beforeEach(() => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        ResizeObserverMock.instances = [];
        vi.stubGlobal("ResizeObserver", ResizeObserverMock);
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        registry = new RegistryProviderElement();
        group = new GroupProviderElement();
        group.groupSlug = "timeline";
        provider = new TestFileProvider();
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("shows controls and frame information by default without false attributes", async () => {
        await mount();
        expect(timeline.disablePlayButton).toBe(false);
        expect(timeline.disableInfo).toBe(false);
        expect(timeline.hasAttribute("disable-play-button")).toBe(false);
        expect(timeline.hasAttribute("disable-info")).toBe(false);
        expect(timeline.shadowRoot?.querySelector(".controls")).not.toBeNull();
        expect(timeline.shadowRoot?.querySelector(".real")).not.toBeNull();
    });

    describe.each([
        { attribute: "disable-play-button", property: "disablePlayButton", selector: ".controls" },
        { attribute: "disable-info", property: "disableInfo", selector: ".real" },
    ] as const)("$attribute", ({ attribute, property, selector }) => {
        it.each(["", '=""', '="true"', '="false"'])(
            "hides the corresponding UI for initial presence %j", async suffix => {
                await mount(`${attribute}${suffix}`);
                expect(timeline[property]).toBe(true);
                expect(timeline.shadowRoot?.querySelector(selector)).toBeNull();
            }
        );

        it("follows attribute addition and removal after rendering", async () => {
            await mount();
            timeline.setAttribute(attribute, "false");
            await settle();
            expect(timeline[property]).toBe(true);
            expect(timeline.shadowRoot?.querySelector(selector)).toBeNull();
            timeline.removeAttribute(attribute);
            await settle();
            expect(timeline[property]).toBe(false);
            expect(timeline.shadowRoot?.querySelector(selector)).not.toBeNull();
        });

        it("reflects property changes as attribute presence and updates the UI", async () => {
            await mount();
            timeline[property] = true;
            await settle();
            expect(timeline.getAttribute(attribute)).toBe("");
            expect(timeline.shadowRoot?.querySelector(selector)).toBeNull();
            timeline[property] = false;
            await settle();
            expect(timeline.hasAttribute(attribute)).toBe(false);
            expect(timeline.shadowRoot?.querySelector(selector)).not.toBeNull();
        });
    });

    it("recalculates ticks and toggles compact classes at the exact breakpoint", async () => {
        await mount();
        for (const width of [FileTimelineElement.collapseWidth - 1, FileTimelineElement.collapseWidth, 1200]) {
            observer().notify(container(), width);
            await settle();
            const collapsed = width < FileTimelineElement.collapseWidth;
            expect(container().classList.contains("collapsed")).toBe(collapsed);
            expect(element(timeline.shadowRoot, ".real").classList.contains("collapsed")).toBe(collapsed);
            expect(timeline.shadowRoot?.querySelectorAll(".tick").length).toBe(
                calculateTicks(width, instance.duration).length
            );
        }
    });

    it("does not recreate the observer for updates to the same container", async () => {
        await mount();
        const currentObserver = observer();
        timeline.disableInfo = true;
        await settle();
        expect(observer()).toBe(currentObserver);
        expect(currentObserver.observe).toHaveBeenCalledExactlyOnceWith(container());
        expect(currentObserver.disconnect).not.toHaveBeenCalled();
    });

    it("disconnects on removal and observes the retained container again on reconnect", async () => {
        await mount();
        const previousObserver = observer();
        const retainedContainer = container();
        timeline.remove();
        expect(previousObserver.disconnect).toHaveBeenCalledOnce();
        provider.append(timeline);
        await settle();
        expect(container()).toBe(retainedContainer);
        expect(observer()).not.toBe(previousObserver);
        expect(observer().observe).toHaveBeenCalledExactlyOnceWith(retainedContainer);
        observer().notify(retainedContainer, 300);
        await settle();
        expect(container().classList.contains("collapsed")).toBe(true);
    });

    it("disconnects when the file disappears and observes the replacement container", async () => {
        await mount();
        const previousObserver = observer();
        const previousContainer = container();
        provider.fileController.removeInstance();
        await settle();
        expect(timeline.shadowRoot?.querySelector(".container")).toBeNull();
        expect(previousObserver.disconnect).toHaveBeenCalledOnce();

        provider.fileController.receiveInstance(instance);
        await settle();
        expect(container()).not.toBe(previousContainer);
        expect(observer().observe).toHaveBeenCalledExactlyOnceWith(container());
        observer().notify(container(), 800);
        await settle();
        previousObserver.notify(previousContainer, 100);
        await settle();
        expect(container().classList.contains("collapsed")).toBe(false);
    });

    it("rebinds the observer when switching through a single-frame file", async () => {
        await mount();
        const previousObserver = observer();
        provider.fileController.receiveInstance(fixture(false));
        await settle();
        expect(timeline.shadowRoot?.querySelector(".container")).toBeNull();
        expect(previousObserver.disconnect).toHaveBeenCalledOnce();
        provider.fileController.receiveInstance(instance);
        await settle();
        expect(observer()).not.toBe(previousObserver);
        expect(observer().observe).toHaveBeenCalledExactlyOnceWith(container());
    });
});
