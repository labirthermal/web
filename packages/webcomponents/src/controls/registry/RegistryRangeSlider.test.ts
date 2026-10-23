// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ManagerProviderElement } from "../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../hierarchy/providers/RegistryProvider";
import { RegistryRangeForm } from "./RegistryRangeForm";
import { RegistryRangeSlider } from "./RegistryRangeSlider";

// Providers only need these barrel exports, not unrelated chart/browser modules.
vi.mock("../../index.export", async () => ({
    ...await import("../../utils/converters/booleanConverter"),
    ...await import("../../controllers/RegistryController"),
}));

customElements.define("test-range-manager", ManagerProviderElement);
customElements.define("test-range-registry", RegistryProviderElement);
customElements.define("test-range-form", RegistryRangeForm);
customElements.define("test-range-slider", RegistryRangeSlider);

describe("RegistryRangeSlider", () => {
    let manager: ManagerProviderElement;
    let provider: RegistryProviderElement;
    let slider: RegistryRangeSlider;
    let form: RegistryRangeForm;

    async function settle() {
        for (let i = 0; i < 4; i++) {
            await Promise.all([manager.updateComplete, provider.updateComplete, slider.updateComplete, form.updateComplete]);
        }
    }

    async function range(min: number, max: number, from = min, to = max) {
        const group = provider.registryObject.groups.addOrGetGroup("range-fixture");
        vi.spyOn(group.minmax, "value", "get").mockReturnValue({ min, max });
        provider.registryObject.minmax.recalculateFromGroups();
        provider.registryController.setRange(from, to);
        await settle();
    }

    function handle(which: "from" | "to"): HTMLButtonElement {
        const element = slider.shadowRoot?.querySelector<HTMLButtonElement>(`[data-handle="${which}"]`);
        if (!element) throw new Error(`Missing ${which} handle`);
        return element;
    }

    function track(): HTMLElement {
        const element = slider.shadowRoot?.querySelector<HTMLElement>(".track");
        if (!element) throw new Error("Missing track");
        return element;
    }

    function setupPointer() {
        const element = track();
        vi.spyOn(element, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 200, 15));
        let captured = false;
        Object.defineProperties(element, {
            setPointerCapture: { configurable: true, value: vi.fn(() => { captured = true; }) },
            hasPointerCapture: { configurable: true, value: vi.fn(() => captured) },
            releasePointerCapture: { configurable: true, value: vi.fn(() => { captured = false; }) },
        });
        return element;
    }

    function pointer(element: HTMLElement, type: string, clientX: number, pointerId = 1) {
        const event = new MouseEvent(type, { bubbles: true, clientX, button: 0, cancelable: true });
        Object.defineProperty(event, "pointerId", { value: pointerId });
        element.dispatchEvent(event);
    }

    function key(which: "from" | "to", value: string) {
        handle(which).dispatchEvent(new KeyboardEvent("keydown", { key: value, bubbles: true, cancelable: true }));
    }

    beforeEach(async () => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        provider = new RegistryProviderElement();
        slider = new RegistryRangeSlider();
        form = new RegistryRangeForm();
        provider.append(slider, form);
        manager.append(provider);
        document.body.append(manager);
        await settle();
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it("leaves the default height in CSS without an inline override", () => {
        expect(slider.height).toBeNull();
        expect(slider.hasAttribute("height")).toBe(false);
        expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("");
        expect(slider.style.height).toBe("");
    });

    it.each(["10px", "30px", "2rem", "calc(1rem + 5px)", "var(--custom-height)", "50%", "0px"])(
        "accepts the height attribute %s without changing the range", async height => {
            await range(0, 200, 50, 150);
            const commit = vi.spyOn(provider.registryObject.range, "imposeRange");
            slider.setAttribute("height", height);
            await settle();
            expect(slider.height).toBe(height);
            expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe(height);
            expect(slider.style.height).toBe("");
            expect(commit).not.toHaveBeenCalled();
            expect(provider.registryObject.range.value).toEqual({ from: 50, to: 150 });
        });

    it("updates and removes the attribute override without touching user styles", async () => {
        slider.style.cssText = "height: 40px; --thermal-range-slider-height: 25px; color: red";
        slider.setAttribute("height", "30px");
        await settle();
        slider.height = "10px";
        await settle();
        expect(slider.getAttribute("height")).toBe("10px");
        expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("10px");
        slider.removeAttribute("height");
        await settle();
        expect(slider.height).toBeNull();
        expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("");
        expect(slider.style.height).toBe("40px");
        expect(slider.style.getPropertyValue("--thermal-range-slider-height")).toBe("25px");
        expect(slider.style.color).toBe("red");
    });

    it("restores the attribute override after replacing or removing the entire style", async () => {
        slider.height = "30px";
        await settle();
        slider.setAttribute("style", "height: 10px; color: red");
        await settle();
        expect(slider.style.height).toBe("10px");
        expect(slider.style.color).toBe("red");
        expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("30px");
        slider.removeAttribute("style");
        await settle();
        expect(slider.style.height).toBe("");
        expect(slider.style.color).toBe("");
        expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("30px");
    });

    it.each(["", "   ", "invalid", "30", "-5px", "auto", "inherit", "initial", "unset", "min-content"])(
        "clears a previous override for height %j and logs invalid input", async height => {
            slider.height = "30px";
            await settle();
            const log = vi.spyOn(slider, "log");
            slider.setAttribute("height", height);
            await settle();
            expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("");
            if (height.trim()) {
                expect(log).toHaveBeenCalledWith("Invalid range slider height", { height });
            } else {
                expect(log).not.toHaveBeenCalled();
            }
        });

    it("retains the configured height while loading and reconnecting", async () => {
        await range(0, 200, 50, 150);
        slider.height = "30px";
        provider.registryObject.loading.markAsLoading();
        await settle();
        expect(slider.shadowRoot?.querySelector(".skeleton")).not.toBeNull();
        expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("30px");
        provider.registryObject.loading.markAsLoaded();
        await settle();
        slider.remove();
        provider.append(slider);
        await settle();
        expect(slider.style.getPropertyValue("--_range-slider-attribute-height")).toBe("30px");
        expect(handle("from").getAttribute("aria-valuenow")).toBe("50");
    });

    it("hydrates the exact registry range above 100 and places handles at both ends", async () => {
        await range(Number("21.170000076293945"), Number("126.83999633789062"));
        expect(slider.from).toBe(provider.registryObject.range.value?.from);
        expect(slider.to).toBe(provider.registryObject.range.value?.to);
        expect(handle("to").getAttribute("aria-valuenow")).toBe("126.83999633789062");
        expect(handle("from").parentElement?.style.left).toBe("0%");
        expect(handle("to").parentElement?.style.left).toBe("100%");
        expect(slider.shadowRoot?.querySelector(".fill")?.getAttribute("style")).toContain("width:100%");
        expect(form.shadowRoot?.querySelectorAll("input")[1].value).toBe("126.84");
        expect(slider.shadowRoot?.querySelector(".bound")).toBeNull();
        expect(slider.shadowRoot?.querySelectorAll(".tooltip")).toHaveLength(2);
    });

    it("receives changes to either endpoint without writing them back", async () => {
        await range(0, 200, 50, 150);
        const commit = vi.spyOn(provider.registryObject.range, "imposeRange");
        provider.registryObject.range.imposeRange({ from: 60, to: 150 });
        await settle();
        expect(slider.from).toBe(60);
        expect(slider.to).toBe(150);
        expect(commit).toHaveBeenCalledTimes(1);
        expect(handle("from").parentElement?.style.left).toBe("30%");
        commit.mockClear();
        provider.registryObject.range.imposeRange({ from: 60, to: 180 });
        await settle();
        expect(commit).toHaveBeenCalledTimes(1);
        expect(slider.to).toBe(180);
    });

    it("updates the hovered auto-range highlight when the histogram changes", async () => {
        let histogram = [
            { from: 1, to: 2, percentage: 20, count: 1, height: 20 },
            { from: 2, to: 3, percentage: 5, count: 1, height: 5 },
        ];
        vi.spyOn(provider.registryObject.histogram, "value", "get").mockImplementation(() => histogram);
        provider.registryObject.histogram.reset();
        await settle();

        const buttons = form.shadowRoot?.querySelectorAll("thermal-btn");
        const autoButton = buttons?.[buttons.length - 1];
        if (!autoButton) throw new Error("Missing auto-range button");

        const setHighlight = vi.spyOn(provider.registryController, "setHighlight");
        autoButton.dispatchEvent(new MouseEvent("mouseenter"));
        expect(setHighlight).toHaveBeenLastCalledWith({ from: 1, to: 2 });

        histogram = [
            { from: 4, to: 5, percentage: 5, count: 1, height: 5 },
            { from: 5, to: 6, percentage: 20, count: 1, height: 20 },
        ];
        provider.registryObject.histogram.reset();
        await settle();

        expect(setHighlight).toHaveBeenLastCalledWith({ from: 5, to: 6 });

        autoButton.dispatchEvent(new MouseEvent("mouseleave"));
        expect(setHighlight).toHaveBeenLastCalledWith(undefined);
    });

    it("commits a 1 percent keyboard step immediately and retains focus", async () => {
        await range(0, 200, 50, 150);
        const focused = handle("from");
        focused.focus();
        key("from", "ArrowRight");
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 52, to: 150 });
        expect(form.shadowRoot?.querySelector("input")?.value).toBe("52.00");
        expect(slider.shadowRoot?.activeElement).toBe(focused);
        key("from", "ArrowLeft");
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 50, to: 150 });
    });

    it("uses the real decimal interval for keyboard steps without rounding the other endpoint", async () => {
        const min = Number("21.170000076293945");
        const max = Number("126.83999633789062");
        await range(min, max);
        key("from", "ArrowRight");
        await settle();
        expect(provider.registryObject.range.value?.from).toBeCloseTo(min + (max - min) / 100, 12);
        expect(provider.registryObject.range.value?.to).toBe(max);
        key("from", "ArrowLeft");
        await settle();
        expect(provider.registryObject.range.value?.from).toBeCloseTo(min, 12);
    });

    it("previews dragging without committing, then commits once on release outside the track", async () => {
        await range(0, 200, 50, 150);
        const element = setupPointer();
        const commit = vi.spyOn(provider.registryObject.range, "imposeRange");
        pointer(handle("from"), "pointerdown", 53);
        pointer(element, "pointermove", 83);
        await settle();
        expect(handle("from").getAttribute("aria-valuenow")).toBe("80");
        expect(provider.registryObject.range.value).toEqual({ from: 50, to: 150 });
        expect(commit).not.toHaveBeenCalled();
        pointer(element, "pointerup", -20);
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 0, to: 150 });
        expect(commit).toHaveBeenCalledTimes(1);
    });

    it.each(["pointercancel", "lostpointercapture"])("discards the preview on %s", async type => {
        await range(0, 200, 50, 150);
        const element = setupPointer();
        pointer(handle("from"), "pointerdown", 50);
        pointer(element, "pointermove", 80);
        pointer(element, type, 80);
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 50, to: 150 });
        expect(handle("from").getAttribute("aria-valuenow")).toBe("50");
    });

    it("lets an external update supersede an active drag", async () => {
        await range(0, 200, 50, 150);
        const element = setupPointer();
        pointer(handle("from"), "pointerdown", 50);
        pointer(element, "pointermove", 80);
        provider.registryController.setRange(20, 180);
        pointer(element, "pointerup", 100);
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 20, to: 180 });
        expect(handle("from").getAttribute("aria-valuenow")).toBe("20");
    });

    it("ignores unrelated pointers and allows track clicks to choose the nearest handle", async () => {
        await range(0, 200, 50, 150);
        const element = setupPointer();
        pointer(element, "pointerdown", 160);
        pointer(element, "pointermove", 20, 2);
        pointer(element, "pointerup", 160);
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 50, to: 160 });
    });

    it("handles negative values, zero, exact bounds and touching handles", async () => {
        await range(-100, 100, 0, 1);
        key("from", "ArrowRight");
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 1, to: 1 });
        expect(handle("from").getAttribute("aria-valuemax")).toBe("1");
        key("to", "Home");
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 1, to: 1 });
        key("from", "Home");
        key("to", "End");
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: -100, to: 100 });
    });

    it("commits mouse wheel changes immediately", async () => {
        await range(0, 200, 50, 150);
        handle("to").dispatchEvent(new WheelEvent("wheel", { deltaY: 1, bubbles: true, cancelable: true }));
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 50, to: 152 });
    });

    it("disables a constant interval without invalid geometry", async () => {
        await range(0, 0);
        expect(handle("from").disabled).toBe(true);
        expect(handle("to").disabled).toBe(true);
        expect(slider.shadowRoot?.innerHTML).not.toMatch(/NaN|Infinity/);
    });

    it("shows loading, discards drafts and reconnects with current contexts", async () => {
        await range(0, 200, 50, 150);
        const element = setupPointer();
        pointer(handle("from"), "pointerdown", 50);
        pointer(element, "pointermove", 80);
        provider.registryObject.loading.markAsLoading();
        await settle();
        expect(slider.shadowRoot?.querySelector(".skeleton")).not.toBeNull();
        provider.registryObject.loading.markAsLoaded();
        await settle();
        expect(handle("from").getAttribute("aria-valuenow")).toBe("50");
        slider.remove();
        provider.registryController.setRange(20, 180);
        provider.append(slider);
        await settle();
        expect(slider.from).toBe(20);
        expect(slider.to).toBe(180);
    });

    it("receives form edits and full-range changes through the same registry", async () => {
        await range(0, 200, 50, 150);
        vi.useFakeTimers();
        const input = form.shadowRoot?.querySelector("input");
        if (!input) throw new Error("Missing range input");
        input.value = "65";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        await vi.advanceTimersByTimeAsync(300);
        await settle();
        expect(slider.from).toBe(65);
        expect(handle("from").parentElement?.style.left).toBe("32.5%");
        provider.registryObject.range.applyMinmax();
        await settle();
        expect(slider.from).toBe(0);
        expect(slider.to).toBe(200);
    });

    it("repositions against changed bounds and drops an obsolete drag", async () => {
        await range(0, 200, 50, 150);
        const element = setupPointer();
        pointer(handle("from"), "pointerdown", 50);
        pointer(element, "pointermove", 80);
        await range(0, 400, 50, 150);
        pointer(element, "pointerup", 100);
        await settle();
        expect(provider.registryObject.range.value).toEqual({ from: 50, to: 150 });
        expect(handle("from").parentElement?.style.left).toBe("12.5%");
    });

    it("updates the palette without changing range, geometry or focus", async () => {
        await range(0, 200, 50, 150);
        const focused = handle("from");
        focused.focus();
        const fill = slider.shadowRoot?.querySelector<HTMLElement>(".fill");
        const background = fill?.style.background;
        manager.palette = "iron";
        await settle();
        expect(fill?.style.background).not.toBe(background);
        expect(provider.registryObject.range.value).toEqual({ from: 50, to: 150 });
        expect(handle("from").parentElement?.style.left).toBe("25%");
        expect(slider.shadowRoot?.activeElement).toBe(focused);
    });
});
