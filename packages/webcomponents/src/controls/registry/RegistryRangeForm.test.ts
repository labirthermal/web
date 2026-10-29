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
