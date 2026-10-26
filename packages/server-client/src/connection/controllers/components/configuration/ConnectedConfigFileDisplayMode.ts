import { css, CSSResultGroup, html } from "lit";
import { customElement } from "lit/decorators.js";
import { FileListDisplayMode } from "../../DisplayController";
import { AbstractConfigElement } from "./AbstractConfigElement";

@customElement("connected-config-file-display-mode")
export class ConnectedConfigFileMode extends AbstractConfigElement {

    connectedCallback(): void {

        super.connectedCallback();

        this.content.subscribeToFilesUpdates(this);
        this.display.subscribeToFileDisplayMode(this);
        
    }


    protected render(): unknown {

        const items = [
            this.renderToggleButton(
                this.display.fileDisplayMode === FileListDisplayMode.TABLE,
                () => this.display.setFileListDisplayMode(FileListDisplayMode.TABLE),
                "list",
                "solid",
                "Tabulka souborů"
            ),
            this.renderToggleButton(
                this.display.fileDisplayMode === FileListDisplayMode.GRID,
                () => this.display.setFileListDisplayMode(FileListDisplayMode.GRID),
                "grid",
                "solid",
                "Mřížka souborů"
            )
        ];

        if ( this.display.fileDisplayMode === FileListDisplayMode.GRID ) {

            const compact = this.renderToggle(
                "Kompaktní zobrazení",
                this.display.fileDisplayCompact,
                ( value: boolean ) => this.display.setFilesCompact( value )
            );

            items.push( compact );

        }

        return items;


    }

}