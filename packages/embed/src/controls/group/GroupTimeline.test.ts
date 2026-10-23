// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThermalFileInstance } from "@labirthermal/core";
import { GroupTimelineElement } from "./GroupTimeline";

vi.mock("../../hierarchy/consumers/AbstractGroupConsumer", async () => {
    const { LitElement } = await import("lit");
    class AbstractGroupConsumer extends LitElement {
        public readonly groupObject = { id: "timeline-group" };
    }
    return { AbstractGroupConsumer };
});

class TestGroupTimeline extends GroupTimelineElement {
    public refreshFiles(files: ThermalFileInstance[]): void {
        this.onRegistryBatchEnded(files);
    }
}

customElements.define("test-group-timeline-mount", TestGroupTimeline);

function fileFixture(duration: number, groupId = "timeline-group"): ThermalFileInstance {
    const file: ThermalFileInstance = Object.create(ThermalFileInstance.prototype);
    Object.assign(file, {
        group: { id: groupId },
        timeline: { duration },
        unmountFromDom: vi.fn(),
    });
    return file;
}

afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
});

describe("GroupTimeline file updates", () => {
    it("keeps canvas mounts intact across repeated batch and file-list notifications", () => {
        vi.useFakeTimers();
        const timeline = new TestGroupTimeline();
        const first = fileFixture(1000);
        const second = fileFixture(2000);
        const unrelated = fileFixture(5000, "other-group");

        timeline.refreshFiles([first]);
        timeline.refreshFiles([first, second, unrelated]);
        timeline.refreshFiles([first, second, unrelated]);

        expect(timeline.instances).toEqual([first, second]);
        expect(timeline.longestDurationInMs).toBe(2000);
        expect(first.unmountFromDom).not.toHaveBeenCalled();
        expect(second.unmountFromDom).not.toHaveBeenCalled();
        expect(unrelated.unmountFromDom).not.toHaveBeenCalled();
    });

    it("clears the timeline without unmounting files owned by canvas components", () => {
        vi.useFakeTimers();
        const timeline = new TestGroupTimeline();
        const file = fileFixture(1000);

        timeline.refreshFiles([file]);
        timeline.refreshFiles([]);

        expect(timeline.instances).toEqual([]);
        expect(timeline.longestDurationInMs).toBe(0);
        expect(file.unmountFromDom).not.toHaveBeenCalled();
    });
});
