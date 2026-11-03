// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { consume } from "@lit/context";
import { LitElement } from "lit";
import { RegistryProviderElement } from "../hierarchy/providers/RegistryProvider";
import { ManagerProviderElement } from "../hierarchy/providers/ManagerProvider";
import { registryRangeFromContext, registryRangeToContext } from "./RegistryController";

vi.mock("../index.export", async () => ({
    ...await import("../utils/converters/booleanConverter"),
    ...await import("./RegistryController"),
}));

class RegistryRangeContextProbe extends LitElement {
    @consume({ context: registryRangeFromContext, subscribe: true })
    from?: number;

    @consume({ context: registryRangeToContext, subscribe: true })
    to?: number;
}

customElements.define("test-unit-manager-provider", ManagerProviderElement);
customElements.define("test-unit-registry-provider", RegistryProviderElement);
customElements.define("test-registry-range-context-probe", RegistryRangeContextProbe);

describe("RegistryController units", () => {
    let manager: ManagerProviderElement;
    let provider: RegistryProviderElement;
    let probe: RegistryRangeContextProbe;

    async function settle() {
        await manager.updateComplete;
        await provider.updateComplete;
        await probe.updateComplete;
        await provider.updateComplete;
    }

    async function mount(from: string, to: string) {
        provider.setAttribute("from", from);
        provider.setAttribute("to", to);
        document.body.append(manager);
        await settle();
    }

    beforeEach(() => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        manager.setAttribute("unit", "F");
        provider = new RegistryProviderElement();
        probe = new RegistryRangeContextProbe();
        provider.append(probe);
        manager.append(provider);
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
    });

    it("reads public range attributes in the initial unit and keeps core and contexts in Celsius", async () => {
        await mount("50", "86");

        expect(provider.registryObject.range.value).toEqual({ from: 10, to: 30 });
        expect(provider.from).toBe(50);
        expect(provider.to).toBe(86);
        expect(probe.from).toBe(10);
        expect(probe.to).toBe(30);
    });

    it("updates reflected attributes when the unit changes without changing the Celsius range", async () => {
        await mount("50", "86");

        manager.setAttribute("unit", "K");
        await settle();

        expect(provider.from).toBeCloseTo(283.15);
        expect(provider.to).toBeCloseTo(303.15);
        expect(provider.getAttribute("from")).toBe("283.15");
        expect(provider.getAttribute("to")).toBe("303.15");
        expect(provider.registryObject.range.value).toEqual({ from: 10, to: 30 });
        expect(probe.from).toBe(10);
        expect(probe.to).toBe(30);
    });

    it("converts externally updated attributes from the current unit back to Celsius", async () => {
        await mount("50", "86");

        provider.setAttribute("from", "68");
        provider.setAttribute("to", "104");
        await settle();

        expect(provider.registryObject.range.value).toEqual({ from: 20, to: 40 });
        expect(provider.from).toBe(68);
        expect(provider.to).toBe(104);
        expect(probe.from).toBe(20);
        expect(probe.to).toBe(40);
    });
});
