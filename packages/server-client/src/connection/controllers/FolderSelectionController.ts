import { CallbacksManager } from "@labirthermal/core";
import type { FolderInfo } from "@labirthermal/client";
import type { ReactiveController } from "lit";
import type { AppWithDisplayController, DisplayController } from "./DisplayController";
import type { AbstractThermalElement } from "@labirthermal/webcomponents";


export interface AppWithFolderSelectionController extends AppWithDisplayController {

    display: DisplayController;

    folderSelection: FolderSelectionController;

}

export type FolderSelectionChangedCallback = ( selectedFiles: FolderInfo[] ) => void;


/** Controls the selection inside the current app */
export class FolderSelectionController implements ReactiveController {

    host: AppWithFolderSelectionController;

    /** Unique identifier for the listeners */
    private UUID: string;

    /** Internal container for selection */
    private _selectedFolders: FolderInfo[] = [];

    /** Dynamically converted upon every call - created from the _selectedFiles Set */
    public get array(): FolderInfo[] {
        return Array.from(this._selectedFolders);
    }

    /** Callback called when the selection changes */
    private _onSelectionChange: CallbacksManager<FolderSelectionChangedCallback> = new CallbacksManager();

    constructor(
        host: AppWithFolderSelectionController
    ) {
        this.host = host;
        this.UUID = host.UUID + "__folder_selection_controller";
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
        callback: ( folder: FolderInfo ) => void
    ): void {
        this._selectedFolders.forEach( folder => {
            callback( folder );
        } );
    }


    /**
     * Iterate over every selected file asynchronously using `Promise.all()s`
     */
    public async forEverySelectedAsync(
        callback: ( folder: FolderInfo ) => Promise<void>
    ): Promise<void> {
        const promises = this._selectedFolders.map( folder => {
            return callback( folder );
        } );
        await Promise.all( promises );
    }



    /**
     * Clear the current selection
     */
    public clearSelection(): void {
        if ( this._selectedFolders.length === 0 ) {
            return;
        }
        this._selectedFolders = [];
        this._onSelectionChange.call( this._selectedFolders );
        this.host.requestUpdate();
    }


    /** 
     * Add a file to the current selection 
     * @return boolean Whether the file was added
     */
    public addToSelection(
        folder: FolderInfo
    ): boolean {
        if ( ! this._selectedFolders.includes( folder ) ) {
            this._selectedFolders.push( folder );
            this._onSelectionChange.call( this._selectedFolders );
            this.host.requestUpdate();
            return true;
        }
        return false;
    }

    public addMultipleToSelection(
        folders: FolderInfo[]
    ): void {

        let hasChanged = false;

        folders.forEach( folder => {
            if ( ! this._selectedFolders.includes( folder ) ) {
                this._selectedFolders.push( folder );
                hasChanged = true;
            }
        } );

        if ( hasChanged ) {
            this._onSelectionChange.call( this._selectedFolders );
            this.host.requestUpdate();
        }

    }


    /**
     * Remove the folder from the current selection
     * @return boolean Whether the folder was removed
     */
    public removeFromSelection(
        folder: FolderInfo
    ): boolean {
        if ( this._selectedFolders.includes( folder ) ) {
            this._selectedFolders = this._selectedFolders.filter( f => f !== folder );
            this._onSelectionChange.call( this._selectedFolders );
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

    public folderIsSelected(
        folder: FolderInfo
    ): boolean {
        return this._selectedFolders.includes( folder );
    }

    public getSelectedFiles(): FolderInfo[] {
        return this._selectedFolders;
    }


}