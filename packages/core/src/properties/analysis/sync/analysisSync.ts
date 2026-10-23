import { ThermalFileInstance } from "../../../file/ThermalFileInstance";
import { ThermalGroup } from "../../../hierarchy/ThermalGroup";
import { AbstractProperty } from "../../abstractProperty";
import { CallbacksManager } from "../../callbacksManager";
import { AnalysisSlot } from "../slots/AnalysisSlot";
import { GroupExportCSV } from "./utils/GroupExportCSV";
import { GroupExportPNG } from "./utils/GroupExportPNG";

export class AnalysisSyncDrive extends AbstractProperty<boolean, ThermalGroup> {


    public static readonly LISTENER_KEY = "__analysis__sync";


    /** Event that is triggered every time a slot is synchronised & serialised */
    public readonly onSlotSync = new CallbacksManager<(serialized: string | undefined, slot: number) => void>;


    protected _currentPointer?: ThermalFileInstance;
    /** The synchronisation happens every time on the basis of one instance that projects its analyses to other instances in the group. The currentPointer should be set often times - by user events such as hover, click etc.. */
    public get currentPointer() { return this._currentPointer; }


    protected _csv?: GroupExportCSV;
    /** Lazy loaded CSV export object. */
    public get csv() {
        if (!this._csv) {
            this._csv = new GroupExportCSV(this);
        }
        return this._csv;
    }


    protected _png?: GroupExportPNG;
    /** Lazy loaded PNG export object. */
    public get png() {
        if (!this._png) {
            this._png = new GroupExportPNG(this);
        }
        return this._png;
    }


    protected validate(value: boolean): boolean {
        return value;
    }

    protected afterSetEffect(): void {
    }

    /**
     * Enable analysis synchronisation for the group
     */
    public turnOn(
        instance: ThermalFileInstance
    ) {
        this.value = true;
        this.setCurrentPointer(instance);
    }

    /**
     * Disable the synchronisation analysis for the group
     */
    public turnOff() {
        this.value = false;
        this.setCurrentPointer(undefined);
    }

    /**
     * Iterate  over all exsting slot in the current pointer instance
     */
    public forEveryExistingSlot(fn: (slot: AnalysisSlot, num: number) => void) {
        if (this._currentPointer === undefined) {
            return;
        }

        this._currentPointer.slots.forEveryExistingSlot(fn);

    }

    /**
     * Set a given instance as the current ponter for synchronisation
     */
    public setCurrentPointer(
        instance?: ThermalFileInstance
    ) {

        if (instance === undefined && this._currentPointer) {
            this.endSyncingSlot(this._currentPointer, 1);
            this.endSyncingSlot(this._currentPointer, 2);
            this.endSyncingSlot(this._currentPointer, 3);
            this.endSyncingSlot(this._currentPointer, 4);
            this.endSyncingSlot(this._currentPointer, 5);
            this.endSyncingSlot(this._currentPointer, 6);
            this.endSyncingSlot(this._currentPointer, 7);
        }


        if (instance !== this._currentPointer) {

            // Remove existing listeners
            if (this._currentPointer !== undefined) {

                this.endSyncingSlot(this._currentPointer, 1);
                this.endSyncingSlot(this._currentPointer, 2);
                this.endSyncingSlot(this._currentPointer, 3);
                this.endSyncingSlot(this._currentPointer, 4);
                this.endSyncingSlot(this._currentPointer, 5);
                this.endSyncingSlot(this._currentPointer, 6);
                this.endSyncingSlot(this._currentPointer, 7);

            }

            this._currentPointer = instance;

            // Apply new listeners
            if (this._currentPointer !== undefined) {

                this.startSyncingSlot(this._currentPointer, 1);
                this.startSyncingSlot(this._currentPointer, 2);
                this.startSyncingSlot(this._currentPointer, 3);
                this.startSyncingSlot(this._currentPointer, 4);
                this.startSyncingSlot(this._currentPointer, 5);
                this.startSyncingSlot(this._currentPointer, 6);
                this.startSyncingSlot(this._currentPointer, 7);

            }



        }


    }

    private getSlotListeners(instance: ThermalFileInstance, slotNumber: number) {


        const slot = instance.slots.getSlot(slotNumber);

        if (slotNumber === 1) {
            return {
                slot,
                serialise: instance.slots.onSlot1Serialize,
                assign: instance.slots.onSlot1Assignement
            }
        } else if (slotNumber === 2) {
            return {
                slot,
                serialise: instance.slots.onSlot2Serialize,
                assign: instance.slots.onSlot2Assignement
            }
        } else if (slotNumber === 3) {
            return {
                slot,
                serialise: instance.slots.onSlot3Serialize,
                assign: instance.slots.onSlot3Assignement
            }
        } else if (slotNumber === 4) {
            return {
                slot,
                serialise: instance.slots.onSlot4Serialize,
                assign: instance.slots.onSlot4Assignement
            }
        } else if (slotNumber === 5) {
            return {
                slot,
                serialise: instance.slots.onSlot5Serialize,
                assign: instance.slots.onSlot5Assignement
            }
        } else if (slotNumber === 6) {
            return {
                slot,
                serialise: instance.slots.onSlot6Serialize,
                assign: instance.slots.onSlot6Assignement
            }
        } else if (slotNumber === 7) {
            return {
                slot,
                serialise: instance.slots.onSlot7Serialize,
                assign: instance.slots.onSlot7Assignement
            }
        }
    }




    /**
     * Interrnal method to start synchronisation of a given slot number on the given instance
     */
    private startSyncingSlot(instance: ThermalFileInstance, slotNumber: number) {

        const { serialise } = this.getSlotListeners(instance, slotNumber)!;

        serialise.set(AnalysisSyncDrive.LISTENER_KEY, value => {

            this.forEveryOtherSlot(instance, slotNumber, (sl, f) => {

                // Abort when synchronisation is off
                if (f.group.analysisSync.value === false) {
                    return;
                }

                if (!f.dom?.built) {
                    return;
                }

                this.onSlotSync.call(value, slotNumber);

                // Create new slots if not yet existing
                if (sl === undefined && value) {
                    const analysis = f.slots.createAnalysisFromSerialized(value, slotNumber);
                    analysis?.setSelected();
                }
                // Update existing slots
                else if (sl !== undefined && value) {
                    sl.recieveSerialized(value);
                    this.onSlotSync.call(sl ? sl.serialized : undefined, slotNumber);
                }
                // Remove slots that are no more
                else if (sl !== undefined && value === undefined) {
                    sl.analysis.file.slots.removeSlotAndAnalysis(slotNumber);
                }
            });
        });

    }


    /**
     * Internal method to end synchronisation of a given slot number on the given instance
     */
    private endSyncingSlot(instance: ThermalFileInstance, slotNumber: number) {

        const { assign, serialise } = this.getSlotListeners(instance, slotNumber)!;

        assign.delete(AnalysisSyncDrive.LISTENER_KEY);
        serialise.delete(AnalysisSyncDrive.LISTENER_KEY);

    }

    /**
     * Deletes a slot and analysis from all instances in the group except the provided one
     */
    public deleteSlot(instance: ThermalFileInstance, slotNumber: number) {
        this.forEveryOtherSlot(instance, slotNumber, slot => {
            slot?.analysis.file.slots.removeSlotAndAnalysis(slotNumber);
        });
    }

    /**
     * A method for synchronising selection state across all instances of the group 
     */
    public setSlotSelected(instance: ThermalFileInstance, slotNumber: number) {
        this.forEveryOtherSlot(instance, slotNumber, slot => {
            slot?.analysis.setSelected(false);
        });
    }


    /**
     * A method for synchronising selection state across all instances of the group 
     */
    public setSlotDeselected(instance: ThermalFileInstance, slotNumber: number) {
        this.forEveryOtherSlot(instance, slotNumber, slot => {
            slot?.analysis.setDeselected();
        });
    }


    /** 
     * Execute a given function on all files slot 
     */
    private forEveryOtherSlot(
        instance: ThermalFileInstance,
        slotNumber: number,
        fn: (slot: AnalysisSlot | undefined, file: ThermalFileInstance) => void
    ) {

        this.parent.files.forEveryInstance( file => {
            
            // Do nothing with the provided instance
            if ( file === instance ) {
                return;
            }

            // Get the slot from the other instance
            const slot = file.slots.getSlot( slotNumber );

            // Call the callback on the slot
            fn( slot, file );

        } );

    }


    /**
     * Recieve a serialised value from somewhere and propagate it to all instances in the group except the current pointer
     * @deprecated Used only by old webcomponents and perhaps unnecessary
     */
    public recieveSlotSerialized(
        serialized: string | undefined,
        slot: number
    ): void {

        this.parent.files.forEveryInstance(
            instance => {

                if (
                    instance === this.currentPointer
                    || instance.group.analysisSync.value === false
                ) {
                    return;
                }

                if (serialized) {
                    const sl = instance.slots.getSlot(slot);
                    if (sl) {
                        sl.recieveSerialized(serialized);
                    } else {
                        instance.slots.createAnalysisFromSerialized(serialized, slot);
                    }
                } else {
                    instance.slots.removeSlotAndAnalysis(slot);
                }

            }
        );
    }


    /**
     * Take an instance and copy its value in one slot to all other instances in the group 
     * 
     * - this action deletes any existing slots in the affected instances and creates new ones from the serialised data
     */
    public copyOneSlotToAllInstances(
        instance: ThermalFileInstance,
        slotNumber: number
    ): void {

        // Nastavit pointer
        this.setCurrentPointer(instance);

        // Get serialised data from the source that should be promoted to other instances
        const slot = instance.slots.getSlot(slotNumber);
        const serialized = slot?.serialized ?? slot?.analysis.toSerialized();

        // Iterate all instances of the group
        this.parent.files.forEveryInstance(otherInstance => {

            // Skip the source instance
            if (otherInstance === instance) {
                return;
            }

            // If there is something in the slot, remove it first
            if (otherInstance.slots.hasSlot(slotNumber)) {
                otherInstance.slots.removeSlotAndAnalysis(slotNumber);
            }

            // If there is no serialised data in the source instance slot, skip
            if (!serialized) {
                return;
            }

            // Create a new analysis from the serialised data
            const analysis = otherInstance.slots.createAnalysisFromSerialized(serialized, slotNumber);

            // Mark this as selected
            analysis?.setSelected();

        });

    }


    /** 
     * Copy the entire analysis state from one instance to all other instances in the group 
     * 
     * - this action deletes any existing slots in the affected instances and creates new ones from the serialised data
     */
    public copyAllSlotsToAllInstances(
        instance: ThermalFileInstance
    ): void {

        [1, 2, 3, 4, 5, 6, 7].forEach(slotNumber => {
            this.copyOneSlotToAllInstances(instance, slotNumber);
        });

    }

}