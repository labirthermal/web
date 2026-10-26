import { FolderListDisplayMode } from "../../controllers/DisplayController";
import { AbstractConfigElement } from "./AbstractConfigElement";

export class ConnectedConfigSubfolderMode extends AbstractConfigElement {

    connectedCallback(): void {
        super.connectedCallback();

        this.content.subscribeToSubfoldersUpdates(this);
        this.display.subscribeToFolderDisplayMode(this);
        
    }


    protected render(): unknown {

        const items = [
            this.renderToggleButton(
                this.display.folderListDisplayMode === FolderListDisplayMode.LIST,
                () => this.display.setFolderListDisplayMode(FolderListDisplayMode.LIST),
                "folder",
                "micro",
                "Seznam složek"
            ),
            this.renderToggleButton(
                this.display.folderListDisplayMode === FolderListDisplayMode.TABLE,
                () => this.display.setFolderListDisplayMode(FolderListDisplayMode.TABLE),
                "list",
                "solid",
                "Tabulka složek"
            )
        ];


        if ( this.display.canHaveGrid( this.content.subfolders ) ) {
            items.push(
                this.renderToggleButton(
                    this.display.folderListDisplayMode === FolderListDisplayMode.GRID,
                    () => this.display.setFolderListDisplayMode(FolderListDisplayMode.GRID),
                    "grid",
                    "solid",
                    "Mřížka složek"
                )
            );
        }


        return items;


    }

}