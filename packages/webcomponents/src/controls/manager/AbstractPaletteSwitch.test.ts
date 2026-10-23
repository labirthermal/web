// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { nothing } from "lit";
import { ThermalPalettes } from "@labirthermal/core";
import type { AvailableThermalPalette } from "@labirthermal/core";
import { AbstractPaletteSwitch } from "./AbstractPaletteSwitch";

vi.mock("../../hierarchy/consumers/AbstractManagerConsumer", async () => {
    const { LitElement } = await import("lit");
    class AbstractManagerConsumer extends LitElement {}
    return { AbstractManagerConsumer };
});

class TestPaletteSwitch extends AbstractPaletteSwitch {
    public readonly selections = vi.fn((key: AvailableThermalPalette) => {
        this.value = { key, data: ThermalPalettes[key] };
    });

    public supplyPalette(key: AvailableThermalPalette): void {
        this.value = { key, data: ThermalPalettes[key] };
    }

    public supplyAdvanced(value: boolean): void {
        this.advancedPalettesContext = value;
    }

    public get availablePalettes() {
        return this.palettes;
    }

    protected onSelect(key: AvailableThermalPalette): void {
        this.selections(key);
    }

    protected render() {
        return nothing;
    }
}

customElements.define("test-palette-switch-lifecycle", TestPaletteSwitch);

afterEach(() => {
    document.body.replaceChildren();
});

describe("AbstractPaletteSwitch lifecycle", () => {
    it("initializes basic options before rendering even before palette context arrives", async () => {
        const component = new TestPaletteSwitch();
        document.body.append(component);
        expect(await component.updateComplete).toBe(true);
        expect(component.availablePalettes).toHaveLength(4);
        expect(component.selections).not.toHaveBeenCalled();
        component.supplyPalette("jet");
        expect(await component.updateComplete).toBe(true);
        expect(component.selections).not.toHaveBeenCalled();
    });

    it("respects explicit overrides and corrects an excluded palette once in the current update", async () => {
        const component = new TestPaletteSwitch();
        const advanced = Object.keys(ThermalPalettes).find(key =>
            !["iron", "jet", "white_hot", "black_hot"].includes(key)
        ) as AvailableThermalPalette | undefined;
        if (!advanced) throw new Error("No advanced palette available for the fixture");
        component.supplyAdvanced(true);
        component.supplyPalette(advanced);
        document.body.append(component);
        expect(await component.updateComplete).toBe(true);
        expect(component.availablePalettes).toHaveLength(Object.keys(ThermalPalettes).length);
        expect(component.selections).not.toHaveBeenCalled();

        component.advancedPalettesProperty = false;
        expect(await component.updateComplete).toBe(true);
        expect(component.availablePalettes).toHaveLength(4);
        expect(component.selections).toHaveBeenCalledExactlyOnceWith("iron");

        component.supplyPalette(advanced);
        expect(await component.updateComplete).toBe(true);
        expect(component.selections).toHaveBeenCalledTimes(2);

        component.advancedPalettesProperty = undefined;
        expect(await component.updateComplete).toBe(true);
        expect(component.availablePalettes).toHaveLength(Object.keys(ThermalPalettes).length);
        expect(component.selections).toHaveBeenCalledTimes(2);
    });
});
