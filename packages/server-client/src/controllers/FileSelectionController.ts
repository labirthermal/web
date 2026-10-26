import { CallbacksManager } from "@labirthermal/core";
import type { ReactiveController } from "lit";
import type { AbstractThermalElement } from "@labirthermal/webcomponents";
import type { AppWithDisplayController, DisplayController } from "./DisplayController";
import type { FileInfo } from "../client/responseEntities";


export interface AppWithFileSelectionController extends AppWithDisplayController {

    display: DisplayController;

    fileSelection: FileSelectionController;

}

export type FileSelectionChangedCallback = ( selectedFiles: FileInfo[] ) => void;


/** Controls the selection inside the current app*/
export class FileSelectionController implements ReactiveController {

    host: AppWithFileSelectionController;

    /** Unique identifier for the listeners */
    private UUID: string;

    /** Internal container for selection */
    private _selectedFiles: FileInfo[] = [];

    /** Dynamically converted upon every call - created from the _selectedFiles Set */
    public get array(): FileInfo[] {
        return Array.from(this._selectedFiles);
    }

    /** Callback called when the selection changes */
    private _onSelectionChange: CallbacksManager<FileSelectionChangedCallback> = new CallbacksManager();

    constructor(
        host: AppWithFileSelectionController
    ) {
        this.host = host;
        this.UUID = host.UUID + "__file_selection_controller";
        this.host.addController(this);
    }

    hostConnected(): void {

        
        // Clear the selection whenever the user navigates to another page
        this.host.display.onNavigate.add(
            this.UUID,
            () => {
                this.clearSelection();
            }
        )

    }

    hostDisconnected(): void {}

    hostUpdate(): void {}

    hostUpdated(): void {}


    /**
     * Iterate over every selected file synchronously
     */
    public forEverySelectedSync(
        callback: ( file: FileInfo ) => void
    ): void {
        this._selectedFiles.forEach( file => {
            callback( file );
        } );
    }


    /**
     * Iterate over every selected file asynchronously using `Promise.all()s`
     */
    public async forEverySelectedAsync(
        callback: ( file: FileInfo ) => Promise<void>
    ): Promise<void> {
        const promises = this._selectedFiles.map( file => {
            return callback( file );
        } );
        await Promise.all( promises );
    }



    /**
     * Clear the current selection
     */
    public clearSelection(): void {
        if ( this._selectedFiles.length === 0 ) {
            return;
        }
        this._selectedFiles = [];
        this._onSelectionChange.call( this._selectedFiles );
        this.host.requestUpdate();
    }


    /** 
     * Add a file to the current selection 
     * @return boolean Whether the file was added
     */
    public addToSelection(
        file: FileInfo
    ): boolean {
        if ( ! this._selectedFiles.includes( file ) ) {
            this._selectedFiles.push( file );
            this._onSelectionChange.call( this._selectedFiles );
            this.host.requestUpdate();
            return true;
        }
        return false;
    }

    public addMultipleToSelection(
        files: FileInfo[]
    ): void {

        let hasChanged = false;

        files.forEach( file => {
            if ( ! this._selectedFiles.includes( file ) ) {
                this._selectedFiles.push( file );
                hasChanged = true;
            }
        } );

        if ( hasChanged ) {
            this._onSelectionChange.call( this._selectedFiles );
            this.host.requestUpdate();
        }

    }


    /**
     * Remove the file from the current selection
     * @return boolean Whether the file was removed
     */
    public removeFromSelection(
        file: FileInfo
    ): boolean {
        if ( this._selectedFiles.includes( file ) ) {
            this._selectedFiles = this._selectedFiles.filter( f => f !== file );
            this._onSelectionChange.call( this._selectedFiles );
            this.host.requestUpdate();
            return true;
        }
        return false;
    }


    /** 
     * Rerender the provided element whenever the selection changes 
     */
    public subscribeToSelectionChange(
        element: AbstractThermalElement
    ): void {

        this._onSelectionChange.add(
            element.UUID, 
            () => {
                element.requestUpdate();
            }
        );

    }

    public fileIsSelected(
        file: FileInfo
    ): boolean {
        return this._selectedFiles.includes( file );
    }

    public getSelectedFiles(): FileInfo[] {
        return this._selectedFiles;
    }


}