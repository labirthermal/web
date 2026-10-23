// @vitest-environment jsdom
import { ThermalFileFailure, ThermalFileReader, ThermalRegistry } from "@labirthermal/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FilesService } from "@labirthermal/core/src/loading/workers/FilesService";
import { FileErrors } from "@labirthermal/core/src/loading/workers/errors";
import { LrcParser } from "@labirthermal/core/src/loading/workers/parsers/lrc/LrcParser";
import { ThermalGroupAppElement } from "./ThermalGroupApp";

customElements.define("test-preloaded-group-app", ThermalGroupAppElement);

function readerFixture(service: FilesService, url: string) {
    const reader = new ThermalFileReader(service, new ArrayBuffer(0), LrcParser, url);
    vi.spyOn(reader, "baseInfo").mockResolvedValue({
        width: 1,
        height: 1,
        timestamp: 0,
        frameCount: 1,
        duration: 0,
        frameInterval: 0,
        fps: 1,
        timeline: [{ index: 0, absolute: 0, relative: 0, offset: 0 }],
        averageEmissivity: 1,
        averageReflectedKelvins: 293,
        bytesize: 0,
        min: 10,
        max: 30
    });
    vi.spyOn(reader, "frameData").mockResolvedValue({
        timestamp: 0,
        min: 10,
        max: 30,
        emissivity: 1,
        reflectedKelvins: 293,
        pixels: [20]
    });
    return reader;
}

async function settle(host: ThermalGroupAppElement) {
    await host.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 0));
    await host.updateComplete;
}

afterEach(() => {
    document.body.replaceChildren();
    vi.restoreAllMocks();
});

describe("ThermalGroupApp", () => {
    it.each([1, 2])("opens and closes a detail without changing a group of %i files", async count => {
        vi.spyOn(FilesService.prototype, "loadFile").mockImplementation(async function(this: FilesService, url) {
            return readerFixture(this, url);
        });
        const postprocess = vi.spyOn(ThermalRegistry.prototype, "postLoadedProcessing").mockResolvedValue(undefined);
        const host = new ThermalGroupAppElement();
        host.setAttribute("group-files", Array.from({ length: count }, (_, index) =>
            `thermal~file-${index}.lrc|label~File ${index}`
        ).join(";"));
        document.body.append(host);
        await settle(host);
        const files = host.groupObject.files.value;
        expect(files).toHaveLength(count);
        expect(files[0].label).toBe("File 0");
        expect(postprocess).toHaveBeenCalledOnce();
        const label = files[0].label;
        const destroy = vi.spyOn(files[0], "destroySelfAndBelow");
        const receiveInstance = vi.spyOn(host.fileController, "receiveInstance");
        const removeInstance = vi.spyOn(host.fileController, "removeInstance");
        const restoreBackup = vi.spyOn(host.groupListingController, "restoreTheEntireBackup");

        const root = host.shadowRoot!;
        expect(root.querySelectorAll("file-provider")).toHaveLength(count);
        expect(root.querySelector("group-dropin-input")).toBeNull();
        expect(root.querySelector("group-dropin-element")).toBeNull();
        expect(root.querySelector('[icon="trash"]')).toBeNull();
        expect(root.querySelector("manager-palette-dropdown")).not.toBeNull();

        files[0].timeline.playbackSpeed = 2;
        host.analysis1 = "Previous detail;point;color:blue;top:0;left:0";
        root.querySelector<HTMLElement>('[icon="eye"]')!.click();
        await settle(host);
        expect(receiveInstance).toHaveBeenCalledWith(files[0]);
        expect(files[0].timeline.playbackSpeed).toBe(2);
        expect(host.analysis1).toBeUndefined();
        expect(root.querySelector("file-analysis-complex")).not.toBeNull();
        expect(root.querySelector("file-provider")).toBeNull();
        expect(root.querySelector('[icon="trash"]')).toBeNull();
        expect(root.querySelector('[icon="back"]')?.parentElement?.getAttribute("slot")).toBe("bar-header");
        root.querySelector<HTMLElement>('[icon="back"]')!.click();
        await settle(host);

        expect(removeInstance).toHaveBeenCalledOnce();
        expect(root.querySelectorAll("file-provider")).toHaveLength(count);
        expect(host.groupObject.files.value).toBe(files);
        expect(files[0].label).toBe(label);
        expect(files[0].timeline.playbackSpeed).toBe(2);
        expect(restoreBackup).not.toHaveBeenCalled();
        expect(destroy).not.toHaveBeenCalled();
    });

    it("loads the initial attribute, displays failures and ignores later attribute changes", async () => {
        const failure = new ThermalFileFailure("broken.lrc", FileErrors.PARSING_ERROR, "Invalid thermal file");
        const loadFile = vi.spyOn(FilesService.prototype, "loadFile").mockResolvedValue(failure);
        const host = new ThermalGroupAppElement();
        host.setAttribute("group-files", "thermal~broken.lrc");
        const log = vi.spyOn(host, "log").mockImplementation(() => {});
        document.body.append(host);
        await settle(host);

        expect(loadFile).toHaveBeenCalledExactlyOnceWith("broken.lrc", undefined);
        expect(host.loading).toBe(false);
        expect(host.shadowRoot!.querySelector('[role="alert"]')?.textContent).toContain("Invalid thermal file");
        expect(log).toHaveBeenCalledWith("GroupLoadController", "File loading failed", failure);
        expect(host.shadowRoot!.querySelector("group-dropin-input")).toBeNull();

        host.setAttribute("group-files", "thermal~another.lrc");
        await settle(host);
        expect(loadFile).toHaveBeenCalledOnce();
    });

    it("removes its file-list listener on disconnect", () => {
        const host = new ThermalGroupAppElement();
        host.autoclearGroup = false;
        document.body.append(host);
        const group = host.groupObject;
        const removeListener = vi.spyOn(group.files, "removeListener");
        host.remove();
        expect(removeListener).toHaveBeenCalledWith(host.UUID);
    });
});
