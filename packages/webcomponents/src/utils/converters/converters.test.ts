// @vitest-environment jsdom
import { ThermalUnit } from "@labirthermal/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ManagerProviderElement } from "../../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../../hierarchy/providers/RegistryProvider";
import { optionalNumberConverter } from "./optionalNumberConverter";
import { parseThermalUnit, unitConverter } from "./unitConverter";

// Providers only need these barrel exports, not unrelated chart/browser modules.
vi.mock("../../index.export", async () => ({
    ...await import("./booleanConverter"),
    ...await import("../../controllers/RegistryController"),
}));

customElements.define("test-converters-manager", ManagerProviderElement);
customElements.define("test-converters-registry", RegistryProviderElement);

describe("unitConverter", () => {

    it.each([
        ["C", ThermalUnit.C],
        ["f", ThermalUnit.F],
        [" k ", ThermalUnit.K],
    ])("parses %j case-insensitively", (value, expected) => {
        expect(unitConverter.fromAttribute(value)).toBe(expected);
    });

    it.each([null, "", "  ", "X", "celsius"])("gives undefined for the missing or invalid value %j", value => {
        expect(unitConverter.fromAttribute(value)).toBeUndefined();
    });

    it("reflects only valid units", () => {
        expect(unitConverter.toAttribute(ThermalUnit.F)).toBe("F");
        expect(unitConverter.toAttribute(undefined)).toBeUndefined();
        expect(parseThermalUnit(42)).toBeUndefined();
    });

});

describe("optionalNumberConverter", () => {

    it.each([
        ["10", 10],
        [" -5.5 ", -5.5],
        ["0", 0],
        ["1e2", 100],
    ])("parses %j", (value, expected) => {
        expect(optionalNumberConverter.fromAttribute(value)).toBe(expected);
    });

    it.each([null, "", "  ", "abc", "Infinity", "NaN"])("gives undefined for %j", value => {
        expect(optionalNumberConverter.fromAttribute(value)).toBeUndefined();
    });

    it("removes the attribute for values that are not finite numbers", () => {
        expect(optionalNumberConverter.toAttribute(12.5)).toBe("12.5");
        expect(optionalNumberConverter.toAttribute(0)).toBe("0");
        expect(optionalNumberConverter.toAttribute(undefined)).toBeUndefined();
        expect(optionalNumberConverter.toAttribute(NaN)).toBeUndefined();
    });

});

describe("converters on the providers", () => {
    let manager: ManagerProviderElement;
    let registry: RegistryProviderElement;

    async function mount() {
        manager.append(registry);
        document.body.append(manager);
        await manager.updateComplete;
        await registry.updateComplete;
    }

    beforeEach(() => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        manager.autoclear = true;
        registry = new RegistryProviderElement();
    });

    afterEach(() => {
        manager.remove();
        vi.restoreAllMocks();
    });

    it("accepts a lowercase unit attribute", async () => {
        manager.setAttribute("unit", "f");
        await mount();
        expect(manager.managerObject.unit.value).toBe(ThermalUnit.F);
        expect(manager.unit).toBe(ThermalUnit.F);
    });

    it("falls back to Celsius for an invalid unit attribute", async () => {
        manager.setAttribute("unit", "X");
        await mount();
        expect(manager.managerObject.unit.value).toBe(ThermalUnit.C);
        expect(manager.getAttribute("unit")).toBe("C");
    });

    it("reads empty and invalid range attributes as undefined", async () => {
        registry.setAttribute("from", "");
        registry.setAttribute("to", "abc");
        await mount();
        expect(registry.from).toBeUndefined();
        expect(registry.to).toBeUndefined();
    });

    it("reads a removed range attribute as undefined, not null", async () => {
        registry.setAttribute("from", "10");
        registry.setAttribute("to", "20");
        await mount();
        expect(registry.from).toBe(10);

        registry.removeAttribute("from");
        await registry.updateComplete;
        expect(registry.from).toBeUndefined();
    });

});
