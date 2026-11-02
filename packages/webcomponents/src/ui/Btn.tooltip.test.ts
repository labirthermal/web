// @vitest-environment jsdom
import type * as FloatingUI from "@floating-ui/dom";
import { autoUpdate, computePosition } from "@floating-ui/dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThermalBtnElement } from "./Btn";

vi.mock("@floating-ui/dom", async importOriginal => ({
    ...await importOriginal<typeof FloatingUI>(),
    autoUpdate: vi.fn(),
    computePosition: vi.fn(),
}));

customElements.define("thermal-btn-tooltip-test", ThermalBtnElement);

type Position = Awaited<ReturnType<typeof computePosition>>;

function position(x: number): Position {
    return {
        x,
        y: 20,
        placement: "top",
        strategy: "fixed",
        middlewareData: { arrow: { x: 4, y: 5, centerOffset: 0 } },
    };
}

function deferredPosition() {
    let resolve!: (value: Position) => void;
    const promise = new Promise<Position>(done => { resolve = done; });
    return { promise, resolve };
}

async function createButton(tooltip = "Tooltip") {
    const button = new ThermalBtnElement();
    button.tooltip = tooltip;
    document.body.append(button);
    await button.updateComplete;
    return button;
}

function tooltipOf(button: ThermalBtnElement): HTMLElement {
    const tooltip = button.shadowRoot?.querySelector<HTMLElement>(".thermal-tooltip");
    if (!tooltip) throw new Error("Missing tooltip");
    return tooltip;
}

describe("thermal-btn tooltip lifecycle", () => {
    let updates: Array<() => void>;
    let cleanups: Array<ReturnType<typeof vi.fn>>;

    beforeEach(() => {
        vi.resetAllMocks();
        updates = [];
        cleanups = [];
        vi.mocked(computePosition).mockResolvedValue(position(42));
        vi.mocked(autoUpdate).mockImplementation((_reference, _floating, update) => {
            const cleanup = vi.fn();
            updates.push(update);
            cleanups.push(cleanup);
            update();
            return cleanup;
        });
    });

    afterEach(() => {
        document.body.replaceChildren();
        vi.restoreAllMocks();
    });

    it("positions the visible tooltip and arrow", async () => {
        const button = await createButton();
        const tooltip = tooltipOf(button);
        const arrow = tooltip.querySelector<HTMLElement>(".thermal-tooltip-arrow")!;
        button.dispatchEvent(new MouseEvent("mouseenter"));
        await Promise.resolve();

        expect(computePosition).toHaveBeenCalledOnce();
        expect(tooltip.style.left).toBe("42px");
        expect(tooltip.style.top).toBe("20px");
        expect(arrow.style.left).toBe("4px");
        expect(arrow.style.top).toBe("5px");
        expect(arrow.style.bottom).toBe("-4px");
    });

    it("ignores a position that resolves after disconnecting the button", async () => {
        const pending = deferredPosition();
        vi.mocked(computePosition).mockReturnValue(pending.promise);
        const button = await createButton();
        const tooltip = tooltipOf(button);
        button.dispatchEvent(new MouseEvent("mouseenter"));
        button.remove();

        pending.resolve(position(20));
        await Promise.resolve();
        expect(cleanups[0]).toHaveBeenCalledOnce();
        expect(tooltip.style.display).toBe("none");
        expect(tooltip.style.left).toBe("0px");
    });

    it("ignores a position that resolves after the tooltip is hidden", async () => {
        const pending = deferredPosition();
        vi.mocked(computePosition).mockReturnValue(pending.promise);
        const button = await createButton();
        const tooltip = tooltipOf(button);
        button.dispatchEvent(new MouseEvent("mouseenter"));
        button.dispatchEvent(new MouseEvent("mouseleave"));

        pending.resolve(position(20));
        await Promise.resolve();
        expect(cleanups[0]).toHaveBeenCalledOnce();
        expect(tooltip.style.display).toBe("none");
        expect(tooltip.style.left).toBe("0px");
    });

    it("ignores callbacks delivered after positioning has been stopped", async () => {
        const button = await createButton();
        button.dispatchEvent(new MouseEvent("mouseenter"));
        button.dispatchEvent(new MouseEvent("mouseleave"));
        const calls = vi.mocked(computePosition).mock.calls.length;
        updates[0]();
        expect(computePosition).toHaveBeenCalledTimes(calls);
    });

    it("does not overwrite a newer position with an older result", async () => {
        const first = deferredPosition();
        const second = deferredPosition();
        vi.mocked(computePosition)
            .mockReturnValueOnce(first.promise)
            .mockReturnValueOnce(second.promise);
        const button = await createButton();
        const tooltip = tooltipOf(button);
        button.dispatchEvent(new MouseEvent("mouseenter"));
        updates[0]();

        second.resolve(position(80));
        await Promise.resolve();
        expect(tooltip.style.left).toBe("80px");
        first.resolve(position(10));
        await Promise.resolve();
        expect(tooltip.style.left).toBe("80px");
    });

    it("stops positioning when the tooltip is removed", async () => {
        const pending = deferredPosition();
        vi.mocked(computePosition).mockReturnValue(pending.promise);
        const button = await createButton();
        button.dispatchEvent(new MouseEvent("mouseenter"));
        button.tooltip = undefined;
        await button.updateComplete;

        pending.resolve(position(20));
        await Promise.resolve();
        expect(cleanups[0]).toHaveBeenCalledOnce();
        expect(button.shadowRoot?.querySelector(".thermal-tooltip")).toBeNull();
    });

    it("cleans up previous observers when the tooltip is shown repeatedly", async () => {
        const button = await createButton();
        button.dispatchEvent(new MouseEvent("mouseenter"));
        button.dispatchEvent(new MouseEvent("mouseenter"));
        expect(cleanups.filter(cleanup => cleanup.mock.calls.length === 0)).toHaveLength(1);

        button.dispatchEvent(new MouseEvent("mouseleave"));
        expect(cleanups.every(cleanup => cleanup.mock.calls.length === 1)).toBe(true);
    });

    it("shows and hides the tooltip after reconnect", async () => {
        const button = await createButton();
        button.remove();
        document.body.append(button);
        await button.updateComplete;
        const tooltip = tooltipOf(button);

        button.dispatchEvent(new MouseEvent("mouseenter"));
        expect(tooltip.style.display).toBe("block");
        button.dispatchEvent(new MouseEvent("mouseleave"));
        expect(tooltip.style.display).toBe("none");
    });

    it("does not apply an old position after reconnecting and showing the tooltip again", async () => {
        const first = deferredPosition();
        const second = deferredPosition();
        vi.mocked(computePosition)
            .mockReturnValueOnce(first.promise)
            .mockReturnValueOnce(second.promise);
        const button = await createButton();
        button.dispatchEvent(new MouseEvent("mouseenter"));
        button.remove();
        document.body.append(button);
        await button.updateComplete;
        const tooltip = tooltipOf(button);
        button.dispatchEvent(new MouseEvent("mouseenter"));

        second.resolve(position(80));
        await Promise.resolve();
        expect(tooltip.style.left).toBe("80px");
        first.resolve(position(10));
        await Promise.resolve();
        expect(tooltip.style.left).toBe("80px");
    });

    it("supports a tooltip added after the initial update", async () => {
        const button = await createButton("");
        button.tooltip = "Added later";
        await button.updateComplete;
        const tooltip = tooltipOf(button);

        button.dispatchEvent(new FocusEvent("focus"));
        expect(tooltip.style.display).toBe("block");
        button.dispatchEvent(new FocusEvent("blur"));
        expect(tooltip.style.display).toBe("none");
    });
});
