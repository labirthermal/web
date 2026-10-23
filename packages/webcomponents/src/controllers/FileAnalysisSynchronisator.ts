import type { ThermalFileInstance } from "@labirthermal/core";
import type { PropertyValues } from "lit";
import type { FileController, IElementWithFileController } from "./FileController";

export class FileAnalysisSynchronisator {

    /** Lit.js is using null for removed attributes - we need normalize the value to either string or undefined. */
    private static normalize(
        value: string | null | undefined
    ): string | undefined {
        return value?.trim() || undefined;
    }

    private readonly _attribute: keyof IElementWithFileController;

    private get _attributeValue(): string | undefined {
        return this._controller.host[this._attribute] as string | undefined;
    }

    private set _attributeValue(value: string | undefined) {
        if (value !== this._controller.host[this._attribute]) {
            (this._controller.host[this._attribute] as string | undefined) = value;
        }
    }

    private get _mountKey(): string {
        return `${this._controller.UUID}_slot_${this._slotNumber}`;
    }

    private get _internalSerialized(): string | undefined {
        return this._slotObject?.serialized as string | undefined;
    }

    private _fileObject?: ThermalFileInstance;

    private get _slotObject() {
        return this._fileObject?.slots.getSlot(this._slotNumber);
    }

    constructor(
        private readonly _controller: FileController,
        private readonly _slotNumber: number
    ) {

        this._attribute = `analysis${this._slotNumber}` as keyof IElementWithFileController;

    }

    /** Enables the listeners and internal objects necessary for synchronisation of the file analysis slot */
    public fileAssigned(
        instance: ThermalFileInstance,
        coreWins: boolean = false
    ): void {

        this._fileObject = instance;

        // Listener pro propagaci změn z jádra zpět do host atributu
        instance.slots
            .getOnSerializeManager(this._slotNumber)
            ?.set(
                this._controller.UUID,
                value => {
                    if (value !== this._attributeValue) {
                        this._attributeValue = value;
                    }
                }
            );

        const syncAction = () => {
            const attribute = FileAnalysisSynchronisator.normalize(this._attributeValue);

            if (coreWins || attribute === undefined) {
                this._attributeValue = this._slotObject?.serialized;
            } else {
                this._applyToCore(attribute);
            }
        };

        // Pokud už soubor náhodou mounted je, aplikujeme hned:
        if (instance.dom?.built) {
            syncAction();
        } else {
            // Jinak počkáme na onMount z instance:
            instance.onMount.set(this._mountKey, () => {
                syncAction();
            });
        }

    }

    /** Deactivates the listeners and internal objects - stopping the synchronisation of analyses */
    public fileUnassigned(): void {

        this._fileObject?.slots
            .getOnSerializeManager(this._slotNumber)
            ?.delete(this._controller.UUID);

        // Úklid listeneru z instance
        this._fileObject?.onMount.delete(this._mountKey);

        this._fileObject = undefined;

    }

    /** Looks for the changed attributes of the host and propagates them to internal state if necessary */
    public handleHostUpdate(
        changedValues: PropertyValues<typeof this._controller.host>
    ): void {

        if (changedValues.has(this._attribute)) {

            const value = FileAnalysisSynchronisator.normalize(this._attributeValue);

            if (this._internalSerialized !== value) {
                // Pokud je soubor v DOMu, aplikujeme hned; pokud ne, onMount se o to postará
                if (this._fileObject?.dom?.built) {
                    this._applyToCore(value);
                }
            }

        }
    }

    /** Very carrefully propagate the host attribute value to the analysis slot - this method manipulates the internal state of @labirthermal/core */
    private _applyToCore(
        value: string | undefined
    ): void {

        const file = this._fileObject;
        if (!file) return;

        const slot = this._slotObject;

        if (value === undefined) {
            if (slot) file.slots.removeSlotAndAnalysis(this._slotNumber);
        } else if (slot) {
            slot.recieveSerialized(value);

            // Pokud slot už existoval (např. po remountu), zajistíme, že jeho DOM je v novém canvasLayer:
            const canvasRoot = file.dom?.canvasLayer?.getLayerRoot();
            if (canvasRoot && !canvasRoot.contains(slot.analysis.layerRoot)) {
                canvasRoot.appendChild(slot.analysis.layerRoot);
            }
        } else {
            file.slots.createAnalysisFromSerialized(value, this._slotNumber)?.setSelected();
        }

    }

}