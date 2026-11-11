// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ManagerProviderElement } from "../hierarchy/providers/ManagerProvider";

vi.mock("../index.export", async () => ({
    ...await import("../utils/converters/booleanConverter"),
    ...await import("./RegistryController"),
}));

customElements.define("test-palette-manager", ManagerProviderElement);

describe("ManagerController palette", () => {
    const mounted: ManagerProviderElement[] = [];

    async function mount(
        attributes: Record<string, string>,
        configure?: (manager: ManagerProviderElement) => void
    ): Promise<ManagerProviderElement> {
        const manager = new ManagerProviderElement();
        manager.autoclear = true;
        Object.entries(attributes).forEach(([name, value]) => manager.setAttribute(name, value));
        configure?.(manager);
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

    it("uses jet for a new manager without a requested palette", async () => {
        const manager = await mount({ "manager-slug": "palette-default" });
        expect(manager.palette).toBe("jet");
        expect(manager.managerObject.palette.value).toBe("jet");
    });

    it("keeps a shared manager's palette when another provider omits it", async () => {
        const first = await mount({ "manager-slug": "palette-shared", palette: "lava" });
        const second = await mount({ "manager-slug": "palette-shared" });
        await first.updateComplete;

        expect(second.managerObject).toBe(first.managerObject);
        expect(first.palette).toBe("lava");
        expect(second.palette).toBe("lava");
        expect(first.managerObject.palette.value).toBe("lava");
    });

    it("honours an explicitly requested palette on a shared manager", async () => {
        const first = await mount({ "manager-slug": "palette-explicit", palette: "lava" });
        const second = await mount({ "manager-slug": "palette-explicit", palette: "iron" });
        await first.updateComplete;

        expect(first.palette).toBe("iron");
        expect(second.palette).toBe("iron");
        expect(first.managerObject.palette.value).toBe("iron");
    });

    it("honours a palette property set before connecting, including jet", async () => {
        const first = await mount({ "manager-slug": "palette-property", palette: "lava" });
        const second = await mount({ "manager-slug": "palette-property" }, manager => {
            manager.palette = "jet";
        });
        await first.updateComplete;

        expect(first.managerObject.palette.value).toBe("jet");
        expect(first.palette).toBe("jet");
        expect(second.palette).toBe("jet");
    });

    it("adopts the current shared palette after reconnecting", async () => {
        const first = await mount({ "manager-slug": "palette-reconnect", palette: "lava" });
        const second = await mount({ "manager-slug": "palette-reconnect" });
        second.autoclear = false;
        second.remove();

        first.managerController.setPalette("rainbow");
        await first.updateComplete;
        document.body.append(second);
        await second.updateComplete;

        expect(first.managerObject.palette.value).toBe("rainbow");
        expect(first.palette).toBe("rainbow");
        expect(second.palette).toBe("rainbow");
    });

    it("honours a palette changed while disconnected", async () => {
        const first = await mount({ "manager-slug": "palette-disconnected", palette: "lava" });
        const second = await mount({ "manager-slug": "palette-disconnected" });
        second.autoclear = false;
        second.remove();
        second.palette = "white_hot";

        document.body.append(second);
        await second.updateComplete;
        await first.updateComplete;

        expect(first.managerObject.palette.value).toBe("white_hot");
        expect(first.palette).toBe("white_hot");
    });

    it("notifies advanced palette changes from attributes, properties and the controller once", async () => {
        const changes = vi.fn();
        const manager = await mount({ "manager-slug": "palette-advanced" }, element => {
            element.managerController.onAdvancedPalettesChange.add("test", changes);
        });
        expect(changes).not.toHaveBeenCalled();

        manager.setAttribute("advanced-palettes", "");
        await manager.updateComplete;
        expect(changes.mock.calls).toEqual([[true]]);

        manager.advancedPalettes = false;
        await manager.updateComplete;
        expect(changes.mock.calls).toEqual([[true], [false]]);

        manager.managerController.setAdvancedPalettes(true);
        await manager.updateComplete;
        expect(changes.mock.calls).toEqual([[true], [false], [true]]);

        manager.managerController.setAdvancedPalettes(true);
        await manager.updateComplete;
        expect(changes).toHaveBeenCalledTimes(3);
    });
});
