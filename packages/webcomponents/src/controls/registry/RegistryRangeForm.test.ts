// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ManagerProviderElement } from "../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../hierarchy/providers/RegistryProvider";
import { RegistryRangeForm } from "./RegistryRangeForm";

// Providers only need these barrel exports, not unrelated chart/browser modules.
vi.mock("../../index.export", async () => ({
    ...await import("../../utils/converters/booleanConverter"),
    ...await import("../../controllers/RegistryController"),
}));

customElements.define("test-form-manager", ManagerProviderElement);
customElements.define("test-form-registry", RegistryProviderElement);
customElements.define("test-registry-range-form", RegistryRangeForm);

describe("RegistryRangeForm stacked", () => {
    let manager: ManagerProviderElement;
    let provider: RegistryProviderElement;
    let form: RegistryRangeForm;

    async function settle() {
        await manager.updateComplete;
        await provider.updateComplete;
        await form.updateComplete;
    }

    async function mount(attributeValue?: string) {
        form = new RegistryRangeForm();
        if (attributeValue !== undefined) {
            form.setAttribute("stacked", attributeValue);
        }
        provider.append(form);
        manager.append(provider);
        document.body.append(manager);
        await settle();
    }

    beforeEach(() => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        provider = new RegistryProviderElement();
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
    });

    it("defaults to false without reflecting a false string", async () => {
        await mount();
        expect(form.stacked).toBe(false);
        expect(form.hasAttribute("stacked")).toBe(false);
    });

    it.each(["", "true", "false"])("is true for the present attribute value %j", async value => {
        await mount(value);
        expect(form.stacked).toBe(true);
        expect(form.hasAttribute("stacked")).toBe(true);
    });

    it("follows attribute addition and removal after rendering", async () => {
        await mount();
        form.setAttribute("stacked", "");
        await settle();
        expect(form.stacked).toBe(true);
        form.removeAttribute("stacked");
        await settle();
        expect(form.stacked).toBe(false);
        expect(form.hasAttribute("stacked")).toBe(false);
    });

    it("reflects property assignment as attribute presence", async () => {
        await mount();
        form.stacked = true;
        await settle();
        expect(form.getAttribute("stacked")).toBe("");
        form.stacked = false;
        await settle();
        expect(form.hasAttribute("stacked")).toBe(false);
    });
});

describe("RegistryRangeForm units", () => {
    let manager: ManagerProviderElement;
    let provider: RegistryProviderElement;
    let form: RegistryRangeForm;

    async function settle() {
        await manager.updateComplete;
        await provider.updateComplete;
        await form.updateComplete;
        await form.updateComplete;
    }

    function inputs() {
        return Array.from(form.shadowRoot!.querySelectorAll<HTMLInputElement>("input[type=number]"));
    }

    beforeEach(async () => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        provider = new RegistryProviderElement();
        form = new RegistryRangeForm();
        provider.append(form);
        manager.append(provider);
        document.body.append(manager);
        await settle();

        const registry = provider.registryObject;
        (registry.minmax as unknown as { value: unknown }).value = { min: 0, max: 100 };
        registry.range.imposeRange({ from: 10, to: 30 });
        await settle();
    });

    afterEach(() => {
        manager.remove();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("displays Celsius by default", () => {
        expect(inputs().map(input => input.value)).toEqual(["10.00", "30.00"]);
        expect(form.shadowRoot!.querySelector("aside")?.textContent).toBe("°C");
    });

    it("converts the displayed values on a unit change while the registry stays in Celsius", async () => {
        manager.setAttribute("unit", "F");
        await settle();

        const [from, to] = inputs();
        expect(from.value).toBe("50.00");
        expect(to.value).toBe("86.00");
        expect(from.min).toBe("32");
        expect(to.max).toBe("212");
        expect(form.shadowRoot!.querySelector("aside")?.textContent).toBe("°F");
        expect(provider.registryObject.range.value).toEqual({ from: 10, to: 30 });
    });

    it("converts edited values back to Celsius", async () => {
        manager.setAttribute("unit", "F");
        await settle();
        vi.useFakeTimers();

        const [from] = inputs();
        from.value = "68";
        from.dispatchEvent(new Event("input"));
        vi.advanceTimersByTime(400);

        expect(provider.registryObject.range.value?.from).toBeCloseTo(20);
        expect(provider.registryObject.range.value?.to).toBe(30);
    });
});
