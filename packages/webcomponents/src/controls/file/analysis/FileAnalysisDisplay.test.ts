// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { nothing } from "lit";
import type { AbstractAnalysis } from "@labirthermal/core";
import { FileAnalysisDisplayElement } from "./FileAnalysisDisplay";

vi.mock("../../../hierarchy/consumers/AbstractFileConsumer", async () => {
    const { LitElement } = await import("lit");
    class AbstractFileConsumer extends LitElement {
        static properties = { file: { attribute: false } };
        declare public file?: unknown;

        public readonly UUID = "display-test";
    }
    return { AbstractFileConsumer };
});

class TestDisplay extends FileAnalysisDisplayElement {
    public get displayedAnalysis() {
        return this.analysis;
    }

    protected render() {
        return nothing;
    }
}

customElements.define("test-analysis-display", TestDisplay);

function fixture() {
    const listeners = new Map<string, (value: AbstractAnalysis[]) => void>();
    const frames = new Map<string, () => void>();
    return {
        analysis: {
            value: [] as AbstractAnalysis[],
            addListener: vi.fn((id: string, listener: (value: AbstractAnalysis[]) => void) => {
                listeners.set(id, listener);
            }),
            removeListener: vi.fn((id: string) => listeners.delete(id)),
        },
        timeline: {
            onFrame: {
                add: vi.fn((id: string, listener: () => void) => frames.set(id, listener)),
                delete: vi.fn((id: string) => frames.delete(id)),
            },
        },
        listeners,
        frames,
    };
}

function analysisFixture() {
    const listeners = new Map<string, () => void>();
    return {
        analysis: {
            onValues: {
                set: vi.fn((id: string, listener: () => void) => listeners.set(id, listener)),
                delete: vi.fn((id: string) => listeners.delete(id)),
            },
        } as unknown as AbstractAnalysis,
        listeners,
    };
}

afterEach(() => {
    document.body.replaceChildren();
});

describe("FileAnalysisDisplay lifecycle", () => {
    it("initializes in one update and switches both subscriptions when the file changes", async () => {
        const display = new TestDisplay();
        const first = fixture();
        Object.assign(display, { file: first });
        document.body.append(display);
        expect(await display.updateComplete).toBe(true);
        expect(display.displayedAnalysis).toBe(first.analysis.value);
        expect(first.analysis.addListener).toHaveBeenCalledTimes(1);

        const second = fixture();
        Object.assign(display, { file: second });
        expect(await display.updateComplete).toBe(true);
        expect(display.displayedAnalysis).toBe(second.analysis.value);
        expect(first.listeners.size).toBe(0);
        expect(first.frames.size).toBe(0);
        expect(second.listeners.size).toBe(1);
        expect(second.frames.size).toBe(1);

        const analyses: AbstractAnalysis[] = [];
        second.listeners.get(display.UUID)!(analyses);
        await display.updateComplete;
        expect(display.displayedAnalysis).toBe(analyses);
        const requestUpdate = vi.spyOn(display, "requestUpdate");
        second.frames.get(display.UUID)!();
        expect(requestUpdate).toHaveBeenCalledTimes(1);
        await display.updateComplete;

        Object.assign(display, { file: undefined });
        expect(await display.updateComplete).toBe(true);
        expect(display.displayedAnalysis).toEqual([]);
        expect(second.listeners.size).toBe(0);
        expect(second.frames.size).toBe(0);
    });

    it("cleans up on disconnect and refreshes the snapshot on reconnect", async () => {
        const display = new TestDisplay();
        const file = fixture();
        Object.assign(display, { file });
        document.body.append(display);
        await display.updateComplete;

        display.remove();
        expect(file.listeners.size).toBe(0);
        expect(file.frames.size).toBe(0);

        file.analysis.value = [];
        document.body.append(display);
        expect(await display.updateComplete).toBe(true);
        expect(display.displayedAnalysis).toBe(file.analysis.value);
        expect(file.listeners.size).toBe(1);
        expect(file.frames.size).toBe(1);
        expect(file.analysis.addListener).toHaveBeenCalledTimes(2);
    });

    it("rerenders on current analysis value changes and replaces stale value listeners", async () => {
        const display = new TestDisplay();
        const file = fixture();
        const first = analysisFixture();
        const second = analysisFixture();
        file.analysis.value = [first.analysis, second.analysis];
        Object.assign(display, { file });
        document.body.append(display);
        await display.updateComplete;

        expect(first.listeners.has(display.UUID)).toBe(true);
        expect(second.listeners.has(display.UUID)).toBe(true);

        const requestUpdate = vi.spyOn(display, "requestUpdate");
        first.listeners.get(display.UUID)!();
        expect(requestUpdate).toHaveBeenCalledTimes(1);
        await display.updateComplete;

        const replacement = analysisFixture();
        file.analysis.value = [second.analysis, replacement.analysis];
        file.listeners.get(display.UUID)!(file.analysis.value);
        await display.updateComplete;

        expect(first.listeners.has(display.UUID)).toBe(false);
        expect(second.listeners.has(display.UUID)).toBe(true);
        expect(replacement.listeners.has(display.UUID)).toBe(true);

        requestUpdate.mockClear();
        second.listeners.get(display.UUID)!();
        expect(requestUpdate).toHaveBeenCalledTimes(1);

        display.remove();
        expect(second.listeners.has(display.UUID)).toBe(false);
        expect(replacement.listeners.has(display.UUID)).toBe(false);
    });
});
