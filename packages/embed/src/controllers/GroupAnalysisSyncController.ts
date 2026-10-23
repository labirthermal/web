import type { ThermalFileInstance, ThermalGroup } from "@labirthermal/core";
import { ContextProvider, createContext } from "@lit/context";
import type { PropertyDeclaration, PropertyValueMap } from "lit";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import { booleanConverter } from "../utils/converters/booleanConverter";
import { stringOrUndefinedConverter } from "../utils/converters/stringOrUndefinedConverter";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController } from "./AbstractHierarchyController";
import type { GroupController } from "./GroupController";

const SLOT_NUMBERS = [1, 2, 3, 4, 5, 6, 7] as const;
type SlotNumber = typeof SLOT_NUMBERS[number];
type AnalysisProperty = `analysis${SlotNumber}`;

type IHostProperties = {
    groupAnalysisSyncOn: boolean;
} & Record<AnalysisProperty, string | undefined>;

export interface IElementWithGroupAnalysisSyncController extends AbstractThermalElement, IHostProperties {
    groupController: GroupController;
}

export const groupAnalysisSyncContext = createContext<boolean>("group-analysis-sync-context");

/**
 * Binds analysis1-analysis7 to group slots while groupAnalysisSyncOn is true.
 * Initial nonempty host values win; otherwise existing file slots are adopted.
 * Later empty values delete slots. Analyses without slots are left untouched.
 */
export class GroupAnalysisSyncController extends AbstractHierarchyController<IElementWithGroupAnalysisSyncController> {

    public get UUID(): string {
        return this.host.UUID + "_group-analysis-sync-controller";
    }

    private static readonly ANALYSIS_PROPERTY_DECLARATION: PropertyDeclaration = {
        type: String,
        reflect: true,
        converter: stringOrUndefinedConverter
    };

    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        groupAnalysisSyncOn: { type: Boolean, reflect: true, converter: booleanConverter(false), attribute: "group-analysis-sync-on" },
        analysis1: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
        analysis2: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
        analysis3: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
        analysis4: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
        analysis5: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
        analysis6: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
        analysis7: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
    };

    private readonly _onContextProvider: ContextProvider<typeof groupAnalysisSyncContext, IElementWithGroupAnalysisSyncController>;
    private _group?: ThermalGroup;
    private readonly _files = new Set<ThermalFileInstance>();
    private readonly _values = new Map<SlotNumber, string | undefined>();
    private readonly _fileValues = new Map<ThermalFileInstance, Map<SlotNumber, string | undefined>>();
    private _applying = false;
    private _changingCore = false;
    private _initialized = false;

    public get on(): boolean {
        return this._onContextProvider.value;
    }

    constructor(host: IElementWithGroupAnalysisSyncController) {
        super(host);
        this._onContextProvider = new ContextProvider(this.host, {
            context: groupAnalysisSyncContext,
            initialValue: false
        });
    }

    private _property(slot: SlotNumber): AnalysisProperty {
        return `analysis${slot}`;
    }

    private _hostValue(slot: SlotNumber): string | undefined {
        return this.host[this._property(slot)]?.trim() || undefined;
    }

    private _setOn(value: boolean): void {
        this.host.groupAnalysisSyncOn = value;
        this._onContextProvider.setValue(value);
    }

    hostConnected(): void {
        this._group = this.host.groupController.groupObject;
        const group = this._group;
        group.analysisSync.addListener(this.UUID, value => {
            if (this._changingCore) return;
            this._setOn(value);
            if (!value) {
                this._initialized = false;
                return;
            }
            // The core publishes "on" before assigning currentPointer.
            queueMicrotask(() => {
                if (this._group === group && this.on && group.analysisSync.value) {
                    this._initialize();
                }
            });
        });
        group.files.addListener(this.UUID, () => this._syncFiles());
        group.registry.onProcessingEnd.set(this.UUID, () => this.onLoaded());
        this._setOn(this.host.groupAnalysisSyncOn || group.analysisSync.value);
        this._syncFiles();
        if (this.on) this._initialize();
    }

    hostDisconnected(): void {
        this._group?.analysisSync.removeListener(this.UUID);
        this._group?.files.removeListener(this.UUID);
        this._group?.registry.onProcessingEnd.delete(this.UUID);
        for (const file of this._files) this._unbindFile(file);
        this._files.clear();
        this._fileValues.clear();
        this._group = undefined;
        this._initialized = false;
    }

    hostWillUpdateWatcher(changed: PropertyValueMap<IElementWithGroupAnalysisSyncController>): void {
        if (!this._group) return;
        if (changed.has("groupAnalysisSyncOn")) {
            if (!this.host.groupAnalysisSyncOn) {
                this.turnOff();
                return;
            }
            if (!this.on || !this._initialized) this._initialize();
        }
    }

    hostUpdatedWatcher(changed: PropertyValueMap<IElementWithGroupAnalysisSyncController>): void {
        if (!this._group) return;
        if (!this.on) return;
        const slots = SLOT_NUMBERS.filter(slot =>
            changed.has(this._property(slot)) && this._hostValue(slot) !== this._values.get(slot)
        );
        if (slots.length) this._applyHostValues(slots);
    }

    private _syncFiles(): void {
        const group = this._group;
        if (!group) return;
        for (const file of this._files) {
            if (!group.files.value.includes(file)) {
                this._unbindFile(file);
                this._files.delete(file);
            }
        }
        for (const file of group.files.value) {
            if (this._files.has(file)) continue;
            this._files.add(file);
            const values = new Map<SlotNumber, string | undefined>();
            this._fileValues.set(file, values);
            for (const slot of SLOT_NUMBERS) {
                file.slots.getOnSerializeManager(slot)?.set(this.UUID, value => {
                    const unchanged = values.has(slot) && values.get(slot) === value;
                    values.set(slot, value);
                    if (unchanged) return;
                    if (!this.on || this._applying || file !== group.analysisSync.currentPointer) return;
                    this._values.set(slot, value);
                    this.host[this._property(slot)] = value;
                });
            }
            file.onMount.set(this.UUID, () => this.onLoaded());
        }
        if (this.on) this.onLoaded();
    }

    private _unbindFile(file: ThermalFileInstance): void {
        for (const slot of SLOT_NUMBERS) {
            file.slots.getOnSerializeManager(slot)?.delete(this.UUID);
        }
        file.onMount.delete(this.UUID);
        this._fileValues.delete(file);
    }

    private _getFirstInstanceWithAnalyses(): ThermalFileInstance | undefined {
        return this._group?.files.value.find(file =>
            SLOT_NUMBERS.some(slot => file.slots.hasSlot(slot))
        );
    }

    private _initialize(): void {
        const group = this._group;
        if (!group) return;
        this._setOn(true);
        if (!this._initialized) {
            const hasAttributes = SLOT_NUMBERS.some(slot => this._hostValue(slot) !== undefined);
            const pointer = group.analysisSync.currentPointer;
            const source = pointer && group.files.value.includes(pointer)
                ? pointer
                : this._getFirstInstanceWithAnalyses() ?? group.files.value[0];
            if (!hasAttributes && source) this._analysesFromInstanceToGroup(source);
            // Keep waiting if the group is empty and no host snapshot exists yet.
            this._initialized = hasAttributes || source !== undefined;
        }
        this._enableCore();
        if (this._initialized) this._applyHostValues(SLOT_NUMBERS);
    }

    private _enableCore(): void {
        const group = this._group;
        if (!group) return;
        const pointer = group.analysisSync.currentPointer;
        const source = pointer && group.files.value.includes(pointer)
            ? pointer
            : group.files.value.find(file => file.dom?.built) ?? group.files.value[0];
        if (!source) {
            group.analysisSync.setCurrentPointer(undefined);
            return;
        }
        this._changingCore = true;
        try {
            if (!group.analysisSync.value) group.analysisSync.turnOn(source);
            else if (source !== pointer) group.analysisSync.setCurrentPointer(source);
        } finally {
            this._changingCore = false;
        }
    }

    private _applyHostValues(slots: readonly SlotNumber[]): void {
        const group = this._group;
        if (!group) return;
        for (const slot of slots) this._values.set(slot, this._hostValue(slot));
        this._applying = true;
        const pointer = group.analysisSync.currentPointer;
        // Apply once per mounted file, without core fan-out to unmounted files.
        group.analysisSync.setCurrentPointer(undefined);
        try {
            for (const file of this._files) {
                if (!file.dom?.built) continue;
                for (const slot of slots) {
                    this._applySlot(file, slot, this._values.get(slot));
                    // Ignore delayed serialization echoes, including per-file coordinate clamping.
                    this._fileValues.get(file)?.set(slot, file.slots.getSlot(slot)?.analysis.toSerialized());
                }
            }
        } finally {
            if (pointer && group.files.value.includes(pointer)) group.analysisSync.setCurrentPointer(pointer);
            this._applying = false;
        }
    }

    private _applySlot(file: ThermalFileInstance, slotNumber: SlotNumber, value: string | undefined): void {
        const slot = file.slots.getSlot(slotNumber);
        if (value === undefined) {
            if (slot) file.slots.removeSlotAndAnalysis(slotNumber);
            return;
        }
        const sameType = slot?.analysis.toSerialized().split(";")[1]?.trim() === value.split(";")[1]?.trim();
        if (slot && sameType) {
            if (!slot.analysis.serializedIsValid(value)) {
                this.log("Invalid group analysis slot value", slotNumber, file.id);
                return;
            }
            if (slot.analysis.toSerialized() !== value) slot.recieveSerialized(value);
            const root = file.dom?.canvasLayer?.getLayerRoot();
            if (root && !root.contains(slot.analysis.layerRoot)) root.appendChild(slot.analysis.layerRoot);
        } else if (!file.slots.createAnalysisFromSerialized(value, slotNumber)) {
            this.log("Unable to create group analysis slot", slotNumber, file.id);
        }
    }

    public onLoaded(): void {
        if (!this.on || this._applying) return;
        if (!this._initialized) this._initialize();
        else {
            this._enableCore();
            this._applyHostValues(SLOT_NUMBERS);
        }
    }

    public _analysesFromInstanceToGroup(instance: ThermalFileInstance): void {
        for (const slot of SLOT_NUMBERS) {
            const value = instance.slots.getSlot(slot)?.analysis.toSerialized();
            this._values.set(slot, value);
            this.host[this._property(slot)] = value;
        }
    }

    public turnOnOnFirstInstanceWithAnalyses(): void {
        const instance = this._getFirstInstanceWithAnalyses();
        if (instance) this.turnOn(instance);
    }

    public turnOnWithAttributeAnalyses(): void {
        this._setOn(true);
        this._initialized = true;
        this._enableCore();
        this._applyHostValues(SLOT_NUMBERS);
    }

    public turnOn(instance: ThermalFileInstance): void {
        if (!this._group?.files.value.includes(instance)) {
            this.log("Cannot synchronize analyses from a file outside the group", instance.id);
            return;
        }
        this._analysesFromInstanceToGroup(instance);
        this._setOn(true);
        this._initialized = true;
        this._changingCore = true;
        try {
            this._group.analysisSync.turnOn(instance);
        } finally {
            this._changingCore = false;
        }
        this._applyHostValues(SLOT_NUMBERS);
    }

    public turnOff(): void {
        this._setOn(false);
        this._initialized = false;
        this._changingCore = true;
        try {
            if (this._group?.analysisSync.value) this._group.analysisSync.turnOff();
        } finally {
            this._changingCore = false;
        }
    }
}
