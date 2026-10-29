import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IParserObject} from "@labirthermal/core";
import { ThermalFileInstance, ThermalFileReader } from "@labirthermal/core";
import type { PropertyValues } from "lit";
import { GroupProviderElement } from "../hierarchy/providers/GroupProvider";
import { ManagerProviderElement } from "../hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "../hierarchy/providers/RegistryProvider";
import { GroupAnalysisSyncController } from "./GroupAnalysisSyncController";

vi.mock("../../index.export", async () => ({
    ...await import("../utils/converters/booleanConverter"),
    ...await import("./GroupController"),
}));

vi.mock("../../../../core/src/file/render/CpuRenderer", () => ({
    CpuRenderer: class {
        init() {}
        render() {}
        destroy() {}
    }
}));

class SyncGroup extends GroupProviderElement {
    static properties = {
        ...GroupProviderElement.properties,
        ...GroupAnalysisSyncController.HOST_PROPERTIES
    };
    groupAnalysisSyncOn = false;
    analysis1: string | undefined;
    analysis2: string | undefined;
    analysis3: string | undefined;
    analysis4: string | undefined;
    analysis5: string | undefined;
    analysis6: string | undefined;
    analysis7: string | undefined;
    sync: GroupAnalysisSyncController = new GroupAnalysisSyncController(this);

    updated(changed: PropertyValues<SyncGroup>): void {
        super.updated(changed);
        this.sync.hostUpdatedWatcher(changed);
    }
}

customElements.define("test-sync-manager", ManagerProviderElement);
customElements.define("test-sync-registry", RegistryProviderElement);
customElements.define("test-sync-group", SyncGroup);

const POINT = "A;point;color:red;top:1;left:1";
const OTHER_POINT = "B;point;color:blue;top:2;left:2";

describe("GroupAnalysisSyncController", () => {
    let manager: ManagerProviderElement;
    let registry: RegistryProviderElement;
    let host: SyncGroup;
    const files: ThermalFileInstance[] = [];

    async function settle() {
        for (let i = 0; i < 4; i++) {
            await Promise.all([manager.updateComplete, registry.updateComplete, host.updateComplete]);
            await new Promise(resolve => setTimeout(resolve, 5));
        }
    }

    function fixture(mount = true): ThermalFileInstance {
        const timestamp = 1700000000000;
        const timeline = [{ index: 0, relative: 0, absolute: timestamp, offset: 0 }];
        const frame = {
            timestamp, min: 10, max: 25, emissivity: .95, reflectedKelvins: 293,
            pixels: Array.from({ length: 16 }, (_, i) => 10 + i),
        };
        const info = {
            ...frame, width: 4, height: 4, frameCount: 1, duration: 0,
            frameInterval: 100, fps: 10, timeline,
            averageEmissivity: .95, averageReflectedKelvins: 293, bytesize: 16,
        };
        const data = { 0: { min: 10, max: 25, avg: 17.5 } };
        const parser: IParserObject = {
            name: "fixture", description: "fixture", devices: [], extensions: [],
            is: () => true, baseInfo: async () => info,
            getFrameSubset: buffer => ({ array: buffer, dataType: 0 }),
            frameData: async () => frame, histogramPixels: async () => new Float32Array(frame.pixels),
            pointAnalysisData: async () => ({ 0: 10 }),
            rectAnalysisData: async () => data, ellipsisAnalysisData: async () => data,
        };
        const reader = new ThermalFileReader(
            manager.managerObject.service, new ArrayBuffer(16), parser, `${crypto.randomUUID()}.lrc`
        );
        const file = ThermalFileInstance.fromService(host.groupObject, reader, info, frame);
        file.setPreferWebGl(false);
        files.push(file);
        if (mount) file.mountToDom(document.createElement("div"));
        host.groupObject.files.addFile(file);
        return file;
    }

    beforeEach(async () => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        manager = new ManagerProviderElement();
        registry = new RegistryProviderElement();
        host = new SyncGroup();
        host.autoclearGroup = false;
        registry.append(host);
        manager.append(registry);
        document.body.append(manager);
        await settle();
    });

    afterEach(async () => {
        host.sync.turnOff();
        host.remove();
        for (const file of files) file.unmountFromDom();
        files.length = 0;
        manager.remove();
        await new Promise(resolve => setTimeout(resolve, 10));
        vi.restoreAllMocks();
    });

    it("applies attributes to every file including the pointer, updates and deletes only the changed slot", async () => {
        const first = fixture();
        const second = fixture();
        const unslotted = first.slots.createAnalysisFromSerialized("unslotted;point;color:blue;top:2;left:2", false);
        host.analysis1 = POINT;
        host.analysis2 = OTHER_POINT;
        host.groupAnalysisSyncOn = true;
        await settle();
        expect(host.sync.on).toBe(true);
        expect(host.groupObject.analysisSync.value).toBe(true);
        for (const file of [first, second]) expect(file.slots.getSlot(1)?.analysis.name).toBe("A");
        host.setAttribute("analysis1", OTHER_POINT);
        await settle();
        for (const file of [first, second]) expect(file.slots.getSlot(1)?.analysis.name).toBe("B");
        host.removeAttribute("analysis1");
        await settle();
        for (const file of [first, second]) {
            expect(file.slots.hasSlot(1)).toBe(false);
            expect(file.slots.hasSlot(2)).toBe(true);
        }
        expect(first.analysis.layers.all).toContain(unslotted);
    });

    it("reflects creation, editing and deletion in a single-file group without feedback", async () => {
        const file = fixture();
        host.groupAnalysisSyncOn = true;
        await settle();
        const analysis = file.slots.createAnalysisFromSerialized(POINT, 1)!;
        await settle();
        expect(host.getAttribute("analysis1")).toBe(analysis.toSerialized());
        const receive = vi.spyOn(file.slots.getSlot(1)!, "recieveSerialized");
        analysis.setName("edited");
        await settle();
        expect(host.analysis1).toBe(analysis.toSerialized());
        expect(receive).not.toHaveBeenCalled();
        file.slots.removeSlotAndAnalysis(1);
        await settle();
        expect(host.analysis1).toBeUndefined();
        expect(host.hasAttribute("analysis1")).toBe(false);
    });

    it.each([1, 2, 3, 4, 5, 6, 7] as const)("binds both directions for slot %s", async slot => {
        const file = fixture();
        const property = `analysis${slot}` as const;
        host[property] = POINT;
        host.groupAnalysisSyncOn = true;
        await settle();
        expect(file.slots.getSlot(slot)?.analysis.name).toBe("A");
        file.slots.getSlot(slot)!.analysis.setName(`slot${slot}`);
        await settle();
        expect(host.getAttribute(property)).toContain(`slot${slot};`);
        host.setAttribute(property, "   ");
        await settle();
        expect(file.slots.hasSlot(slot)).toBe(false);
    });

    it("adopts existing slots, clears stale host values, and follows a new pointer", async () => {
        const first = fixture();
        const second = fixture();
        first.slots.createAnalysisFromSerialized(POINT, 1);
        host.sync.turnOn(first);
        await settle();
        expect(second.slots.getSlot(1)?.analysis.name).toBe("A");
        host.groupObject.analysisSync.setCurrentPointer(second);
        second.slots.getSlot(1)!.analysis.setName("second");
        await settle();
        expect(host.analysis1).toContain("second;");
        expect(first.slots.getSlot(1)?.analysis.name).toBe("second");
        second.slots.removeSlotAndAnalysis(1);
        await settle();
        expect(host.analysis1).toBeUndefined();
        expect(first.slots.hasSlot(1)).toBe(false);
    });

    it("retains pending attributes and applies the latest values when a new file mounts", async () => {
        host.analysis1 = POINT;
        host.groupAnalysisSyncOn = true;
        await settle();
        const first = fixture();
        const pending = fixture(false);
        host.analysis1 = OTHER_POINT;
        await settle();
        expect(first.slots.getSlot(1)?.analysis.name).toBe("B");
        expect(pending.slots.hasSlot(1)).toBe(false);
        first.slots.getSlot(1)!.analysis.setName("latest");
        await settle();
        pending.mountToDom(document.createElement("div"));
        await settle();
        expect(pending.slots.getSlot(1)?.analysis.name).toBe("latest");
    });

    it("follows external core toggles and leaves attributes and analyses untouched while disabled", async () => {
        const file = fixture();
        file.slots.createAnalysisFromSerialized(POINT, 1);
        host.groupObject.analysisSync.turnOn(file);
        await settle();
        expect(host.groupAnalysisSyncOn).toBe(true);
        expect(host.analysis1).toContain("A;");
        host.groupObject.analysisSync.turnOff();
        await settle();
        expect(host.sync.on).toBe(false);
        expect(file.slots.onSlot1Serialize.has("__analysis__sync")).toBe(false);
        file.slots.getSlot(1)!.analysis.setName("local");
        host.analysis2 = OTHER_POINT;
        await settle();
        expect(host.analysis1).toContain("A;");
        expect(file.slots.hasSlot(2)).toBe(false);
    });

    it("replaces analysis types and preserves the host snapshot when coordinates are clamped", async () => {
        const file = fixture();
        host.analysis1 = POINT;
        host.groupAnalysisSyncOn = true;
        await settle();
        host.analysis1 = "area;rectangle;color:red;top:1;left:1;width:2;height:2";
        await settle();
        expect(file.slots.getSlot(1)?.analysis.toSerialized()).toContain(";rectangle;");
        const outside = "outside;point;color:red;top:100;left:100";
        host.analysis1 = outside;
        await settle();
        expect(host.analysis1).toBe(outside);
        expect(file.slots.getSlot(1)?.analysis.top).toBe(3);
    });

    it("reattaches existing slot DOM and applies pending changes after remount", async () => {
        const file = fixture();
        host.analysis1 = POINT;
        host.groupAnalysisSyncOn = true;
        await settle();
        const analysis = file.slots.getSlot(1)!.analysis;
        file.unmountFromDom();
        host.analysis1 = OTHER_POINT;
        await settle();
        file.mountToDom(document.createElement("div"));
        await settle();
        expect(file.slots.getSlot(1)!.analysis).toBe(analysis);
        expect(analysis.name).toBe("B");
        expect(file.dom?.canvasLayer?.getLayerRoot().contains(analysis.layerRoot)).toBe(true);
    });

    it("toggles the core from the host flag and logs invalid input without deleting valid slots", async () => {
        const file = fixture();
        host.analysis1 = POINT;
        host.groupAnalysisSyncOn = true;
        await settle();
        const log = vi.spyOn(host, "log");
        const analysis = file.slots.getSlot(1)!.analysis;
        host.analysis1 = "invalid";
        await settle();
        expect(log).toHaveBeenCalled();
        expect(file.slots.getSlot(1)!.analysis).toBe(analysis);
        host.groupAnalysisSyncOn = false;
        await settle();
        expect(host.groupObject.analysisSync.value).toBe(false);
        expect(host.sync.on).toBe(false);
        host.analysis1 = OTHER_POINT;
        await settle();
        expect(analysis.name).toBe("A");
        host.groupAnalysisSyncOn = true;
        await settle();
        expect(host.groupObject.analysisSync.value).toBe(true);
        expect(analysis.name).toBe("B");
    });

    it("cleans up removed files and reconnects without duplicate listeners", async () => {
        const first = fixture();
        const removed = fixture();
        host.analysis1 = POINT;
        host.groupAnalysisSyncOn = true;
        await settle();
        host.groupObject.files.removeFile(removed);
        expect(removed.slots.onSlot1Serialize.has(host.sync.UUID)).toBe(false);
        host.remove();
        expect(first.slots.onSlot1Serialize.has(host.sync.UUID)).toBe(false);
        expect(first.onMount.has(host.sync.UUID)).toBe(false);
        expect(host.groupObject.analysisSync.value).toBe(true);
        registry.append(host);
        await settle();
        first.slots.getSlot(1)!.analysis.setName("reconnected");
        await settle();
        expect(host.analysis1).toContain("reconnected;");
        expect([...first.slots.onSlot1Serialize.keys()].filter(key => key === host.sync.UUID)).toHaveLength(1);
    });
});
