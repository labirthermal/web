// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { html, render } from "lit";
import { ManagerProviderElement } from "../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../hierarchy/providers/RegistryProvider";
import { RegistryHistogram } from "./RegistryHistogram";

// Providers only need these barrel exports, not unrelated chart/browser modules.
vi.mock("../../index.export", async () => ({
    ...await import("../../utils/converters/booleanConverter"),
    ...await import("../../controllers/RegistryController"),
}));

customElements.define("test-histogram-manager", ManagerProviderElement);
customElements.define("test-histogram-registry", RegistryProviderElement);
customElements.define("test-registry-histogram", RegistryHistogram);

describe("RegistryHistogram expandable", () => {
    let manager: ManagerProviderElement;
    let provider: RegistryProviderElement;
    let histogram: RegistryHistogram;

    async function settle() {
        await manager.updateComplete;
        await provider.updateComplete;
        await histogram.updateComplete;
    }

    function chart(): HTMLElement {
        const element = histogram.shadowRoot?.querySelector<HTMLElement>(".histogram");
        if (!element) throw new Error("Missing histogram");
        return element;
    }

    async function mount(attributeValue?: string) {
        histogram = new RegistryHistogram();
        histogram.height = "24px";
        histogram.heightExpanded = "180px";
        if (attributeValue !== undefined) {
            histogram.setAttribute("expandable", attributeValue);
        }
        provider.append(histogram);
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

    it("defaults to non-expandable without reflecting a false string", async () => {
        await mount();
        expect(histogram.expandable).toBe(false);
        expect(histogram.hasAttribute("expandable")).toBe(false);
        expect(chart().classList.contains("expandable")).toBe(false);
        expect(chart().style.height).toBe("24px");
        chart().click();
        await settle();
        expect(chart().style.height).toBe("24px");
    });

    it.each(["", "true", "false"])(
        "enables expansion for the present attribute value %j", async value => {
            await mount(value);
            expect(histogram.expandable).toBe(true);
            expect(histogram.hasAttribute("expandable")).toBe(true);
            expect(chart().classList.contains("expandable")).toBe(true);
            chart().click();
            await settle();
            expect(chart().style.height).toBe("180px");
            chart().click();
            await settle();
            expect(chart().style.height).toBe("24px");
        });

    it("reacts to attribute addition and removal after rendering", async () => {
        await mount();
        histogram.setAttribute("expandable", "");
        await settle();
        expect(histogram.expandable).toBe(true);
        expect(chart().classList.contains("expandable")).toBe(true);
        histogram.removeAttribute("expandable");
        await settle();
        expect(histogram.expandable).toBe(false);
        expect(chart().classList.contains("expandable")).toBe(false);
        chart().click();
        await settle();
        expect(chart().style.height).toBe("24px");
    });

    it("reflects property changes as empty presence or absence", async () => {
        await mount();
        histogram.expandable = true;
        await settle();
        expect(histogram.getAttribute("expandable")).toBe("");
        expect(chart().classList.contains("expandable")).toBe(true);
        histogram.expandable = false;
        await settle();
        expect(histogram.hasAttribute("expandable")).toBe(false);
        expect(chart().classList.contains("expandable")).toBe(false);
    });

    it("keeps an expanded histogram expanded when interaction is disabled", async () => {
        await mount("");
        chart().click();
        await settle();
        expect(chart().style.height).toBe("180px");
        histogram.expandable = false;
        await settle();
        expect(chart().classList.contains("expandable")).toBe(false);
        chart().click();
        await settle();
        expect(chart().style.height).toBe("180px");
        histogram.expandable = true;
        await settle();
        chart().click();
        await settle();
        expect(chart().style.height).toBe("24px");
    });

    it("accepts a bare attribute in static HTML", async () => {
        provider.innerHTML = "<test-registry-histogram expandable></test-registry-histogram>";
        const element = provider.querySelector<RegistryHistogram>("test-registry-histogram");
        if (!element) throw new Error("Missing histogram from HTML");
        histogram = element;
        manager.append(provider);
        document.body.append(manager);
        await settle();
        expect(histogram.expandable).toBe(true);
        expect(chart().classList.contains("expandable")).toBe(true);
    });

    it("accepts Lit boolean bindings in both directions", async () => {
        const template = (expandable: boolean) =>
            html`<test-registry-histogram ?expandable=${expandable}></test-registry-histogram>`;
        render(template(true), provider);
        const bound = provider.querySelector<RegistryHistogram>("test-registry-histogram");
        if (!bound) throw new Error("Missing histogram from Lit binding");
        histogram = bound;
        manager.append(provider);
        document.body.append(manager);
        await settle();
        expect(histogram.expandable).toBe(true);
        expect(histogram.getAttribute("expandable")).toBe("");

        render(template(false), provider);
        await settle();
        expect(histogram.expandable).toBe(false);
        expect(histogram.hasAttribute("expandable")).toBe(false);
        expect(chart().classList.contains("expandable")).toBe(false);
    });
});
