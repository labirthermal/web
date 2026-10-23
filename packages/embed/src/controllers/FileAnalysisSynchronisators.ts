import type { PropertyValues } from "lit";
import { FileAnalysisSynchronisator } from "./FileAnalysisSynchronisator";
import type { FileController } from "./FileController";
import type { ThermalFileInstance } from "@labirthermal/core";

export class FileAnalysisSynchronisators {

    private _synchronisators: FileAnalysisSynchronisator[] = [];

    constructor(
        private _controller: FileController
    ) {

        for ( let i = 1; i <= 7; i++ ) {
            this._synchronisators.push(new FileAnalysisSynchronisator(this._controller, i));
        }

    }

    private _forEach(
        callback: (synchronisator: FileAnalysisSynchronisator) => void
    ): void {

        for ( const synchronisator of this._synchronisators ) {
            callback(synchronisator);
        }
    }

    /** Every synchronisator object will look into the changed properties and update its internal state accordingly */
    public handleHostUpdate(
        changedValues: PropertyValues<typeof this._controller.host>
    ): void {
        this._forEach(synchronisator => synchronisator.handleHostUpdate(changedValues));
    }

    /** Every synchronisator will be notified that a file has been assigned */
    public handleFileAssigned(
        instance: ThermalFileInstance,
        coreWins: boolean = false
    ): void {
        this._forEach(synchronisator => synchronisator.fileAssigned( instance, coreWins ));
    }

    /** Every synchronisator will be notified that a file has been removed */
    public handleFileUnassigned(): void {
        this._forEach(synchronisator => synchronisator.fileUnassigned());
    }

}