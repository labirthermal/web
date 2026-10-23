// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import i18next from "i18next";
import { ThermalAppElement } from "./App";

class ResizeObserverStub {
    observe(): void { }
    unobserve(): void { }
    disconnect(): void { }
}

globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

customElements.define("test-slot-app", ThermalAppElement);

async function settle(element: ThermalAppElement): Promise<void> {
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 0));
    await element.updateComplete;
}

function mount(innerHTML: string): ThermalAppElement {
    const element = document.createElement("test-slot-app") as ThermalAppElement;
    element.language = "en";
    element.innerHTML = innerHTML;
    document.body.appendChild(element);
    return element;
}

function assigned(element: ThermalAppElement, slotName: string): Element[] {
    const slot = element.shadowRoot!.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement | null;
    return slot ? slot.assignedElements({ flatten: true }) : [];
}

describe("ThermalAppElement slots", () => {

    it("renders and fills the named slots whenever content is provided", async () => {

        const element = mount(`
            <div slot="bar-header">header</div>
            <div slot="pre-bar">pre bar</div>
            <div slot="pre">pre</div>
            <div slot="content">content</div>
        `);

        await settle(element);

        for (const name of ["bar-header", "pre-bar", "pre", "content"]) {
            expect(assigned(element, name).length, name).toBe(1);
        }

        expect(element.shadowRoot!.querySelector(".bar-header")!.hasAttribute("hidden")).toBe(false);
        expect(element.shadowRoot!.querySelector(".pre-bar")!.hasAttribute("hidden")).toBe(false);

        element.remove();

    });

    describe("ThermalAppElement lifecycle", () => {
        let frames: Map<number, FrameRequestCallback>;
        let observers: ResizeObserverStub[];

        beforeEach(() => {
            frames = new Map();
            observers = [];
            let nextFrame = 0;
            vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
                const id = ++nextFrame;
                frames.set(id, callback);
                return id;
            });
            vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
            vi.stubGlobal("ResizeObserver", class extends ResizeObserverStub {
                disconnect = vi.fn();
                constructor() {
                    super();
                    observers.push(this);
                }
            });
        });

        afterEach(() => {
            document.body.replaceChildren();
            vi.restoreAllMocks();
            vi.unstubAllGlobals();
            Reflect.deleteProperty(document, "fullscreenElement");
            Reflect.deleteProperty(document, "exitFullscreen");
        });

        async function flushFrame() {
            const pending = [...frames.values()];
            frames.clear();
            pending.forEach(callback => callback(0));
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        it("prepares populated slot flags in the first update", async () => {
            const element = mount('<div slot="pre">pre</div><div slot="content">content</div>');
            expect(await element.updateComplete).toBe(true);
            expect(element.shadowRoot?.querySelector(".pre")?.hasAttribute("hidden")).toBe(false);
            expect(element.shadowRoot?.querySelector(".has-content")).not.toBeNull();
        });

        it("does not perpetually measure overflow in response to its own slot changes", async () => {
            const element = mount('<div slot="bar-pre">one</div><div slot="bar-post">two</div>');
            await settle(element);
            const items = element.shadowRoot?.querySelector(".bar-items");
            if (!items) throw new Error("Missing toolbar");
            Object.defineProperty(items, "offsetWidth", { value: 100, configurable: true });
            for (const child of element.children) {
                Object.defineProperty(child, "offsetWidth", { value: 80 });
            }
            await flushFrame();
            await settle(element);
            expect(assigned(element, "bar-overflow")).toHaveLength(2);
            expect(frames.size).toBe(0);

            const removed = element.children[1];
            removed.remove();
            await settle(element);
            expect(frames.size).toBe(1);
            await flushFrame();
            await settle(element);
            expect(assigned(element, "bar-pre")).toHaveLength(1);
            expect(assigned(element, "bar-overflow")).toHaveLength(0);
            expect(frames.size).toBe(0);
        });

        it("cleans up both language subscriptions, observers and animation frames and restores them on reconnect", async () => {
            const on = vi.spyOn(i18next, "on");
            const off = vi.spyOn(i18next, "off");
            const element = mount("");
            await settle(element);
            const callbacks = on.mock.calls
                .filter(call => call[0] === "languageChanged")
                .map(call => call[1]);
            expect(callbacks).toHaveLength(2);
            expect(observers).toHaveLength(2);
            element.remove();
            for (const callback of callbacks) {
                expect(off).toHaveBeenCalledWith("languageChanged", callback);
            }
            for (const observer of observers) {
                expect(observer.disconnect).toHaveBeenCalledTimes(1);
            }
            expect(frames.size).toBe(0);
            element.shadowRoot?.querySelector('slot[name="bar-pre"]')?.dispatchEvent(new Event("slotchange"));
            expect(frames.size).toBe(0);

            document.body.append(element);
            expect(await element.updateComplete).toBe(true);
            expect(observers).toHaveLength(4);
            expect(frames.size).toBe(1);
        });

        it("reports rejected fullscreen requests and restores the reflected state", async () => {
            const element = mount("");
            await settle(element);
            const log = vi.spyOn(element, "log").mockImplementation(() => {});
            const error = new Error("Fullscreen denied");
            const request = vi.fn().mockRejectedValue(error);
            Object.defineProperty(element, "requestFullscreen", { value: request });
            element.toggleFullscreen();
            await settle(element);
            expect(request).toHaveBeenCalledTimes(1);
            expect(log).toHaveBeenCalledWith("Unable to enter fullscreen", error);
            expect(element.fullscreen).toBe("off");
            expect(element.getAttribute("fullscreen")).toBe("off");
        });

        it("does not exit another element's fullscreen and reflects the real owner", async () => {
            const element = mount("");
            await settle(element);
            const other = document.createElement("div");
            const exit = vi.fn().mockResolvedValue(undefined);
            Object.defineProperty(document, "exitFullscreen", { value: exit, configurable: true });
            let owner: Element = element;
            Object.defineProperty(document, "fullscreenElement", { get: () => owner, configurable: true });
            document.dispatchEvent(new Event("fullscreenchange"));
            await settle(element);
            expect(element.fullscreen).toBe("on");
            owner = other;
            document.dispatchEvent(new Event("fullscreenchange"));
            await settle(element);
            expect(element.fullscreen).toBe("off");
            expect(exit).not.toHaveBeenCalled();
        });
    });

    it("hides the wrappers of empty slots", async () => {

        const element = mount("");

        await settle(element);

        expect(element.shadowRoot!.querySelector(".bar-header")!.hasAttribute("hidden")).toBe(true);
        expect(element.shadowRoot!.querySelector(".pre-bar")!.hasAttribute("hidden")).toBe(true);

        element.remove();

    });

    it("reacts to content added after the first render", async () => {

        const element = mount("");

        await settle(element);

        const header = document.createElement("div");
        header.slot = "bar-header";
        element.appendChild(header);

        await settle(element);

        expect(assigned(element, "bar-header").length).toBe(1);
        expect(element.shadowRoot!.querySelector(".bar-header")!.hasAttribute("hidden")).toBe(false);

        element.remove();

    });

});
