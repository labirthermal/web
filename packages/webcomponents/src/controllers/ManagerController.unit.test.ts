// @vitest-environment jsdom
import { ThermalUnit } from "@labirthermal/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ManagerProviderElement } from "../hierarchy/providers/ManagerProvider";

// Providers only need these barrel exports, not unrelated chart/browser modules.
vi.mock("../index.export", async () => ({
    ...await import("../utils/converters/booleanConverter"),
    ...await import("./RegistryController"),
}));

customElements.define("test-unit-manager", ManagerProviderElement);

describe("ManagerController unit", () => {

    const mounted: ManagerProviderElement[] = [];

    /** Mount a manager provider with the given attributes. */
    async function mount(attributes: Record<string, string>) {
        const manager = new ManagerProviderElement();
        manager.autoclear = true;
        Object.entries(attributes).forEach(([name, value]) => manager.setAttribute(name, value));
        document.body.append(manager);
        mounted.push(manager);
        await manager.updateComplete;
        return manager;
    }

    beforeEach(() => {
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        mounted.splice(0).forEach(manager => manager.remove());
        vi.restoreAllMocks();
    });

    // Creation

    it("creates a new manager directly with the requested unit and palette", async () => {
        const manager = await mount({ "manager-slug": "unit-new", unit: "K", palette: "lava" });
        expect(manager.managerObject.unit.value).toBe(ThermalUnit.K);
        expect(manager.managerObject.palette.value).toBe("lava");
    });

    it("uses Celsius for a new manager without the unit attribute", async () => {
        const manager = await mount({ "manager-slug": "unit-default" });
        expect(manager.managerObject.unit.value).toBe(ThermalUnit.C);
        expect(manager.unit).toBe(ThermalUnit.C);
    });

    it("uses jet for an invalid palette, the same as the core default", async () => {
        const manager = await mount({ "manager-slug": "palette-invalid", palette: "unknown" });
        expect(manager.managerObject.palette.value).toBe("jet");
    });

    // Shared manager

    it("keeps the unit of a shared manager when the next provider has no unit attribute", async () => {
        const first = await mount({ "manager-slug": "unit-shared", unit: "F" });
        const second = await mount({ "manager-slug": "unit-shared" });

        expect(second.managerObject).toBe(first.managerObject);
        expect(first.managerObject.unit.value).toBe(ThermalUnit.F);
        expect(second.unit).toBe(ThermalUnit.F);
    });

    it("lets the unit attribute of the next provider win on a shared manager", async () => {
        const first = await mount({ "manager-slug": "unit-shared-explicit", unit: "F" });
        await mount({ "manager-slug": "unit-shared-explicit", unit: "K" });
        await first.updateComplete;

        expect(first.managerObject.unit.value).toBe(ThermalUnit.K);
        expect(first.unit).toBe(ThermalUnit.K);
    });

    // Changes

    it("normalizes a unit set as a lowercase property", async () => {
        const manager = await mount({ "manager-slug": "unit-property" });
        manager.unit = "k" as ThermalUnit;
        await manager.updateComplete;
        expect(manager.managerObject.unit.value).toBe(ThermalUnit.K);
        expect(manager.unit).toBe(ThermalUnit.K);
    });

    it("stops following the core unit after disconnecting", async () => {
        const manager = await mount({ "manager-slug": "unit-disconnect", unit: "C" });
        const core = manager.managerObject;
        manager.autoclear = false;
        manager.remove();

        core.unit.set(ThermalUnit.F);
        expect(manager.unit).toBe(ThermalUnit.C);
    });

});
