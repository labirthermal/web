import { html, nothing } from "lit";
import { directive } from "lit/directive.js";
import type { AbstractConnectedApp } from "../../../abstraction/AbstractConnectedApp";
import { DirectiveHelpers } from "../DirectiveHelpers";
import { slotOrNothing } from "../SlotOrNothing";
import { AbstractFolderLayoutDirective } from "./AbstractFolderLayoutDirective";
import type { BreadcrumbItem, FileInfo, FolderInfo } from "../../../client/responseEntities";

class ConnectedFolderGridDirective extends AbstractFolderLayoutDirective {

    protected renderDisplaySlot(
            app: AbstractConnectedApp
        ): unknown {
    
            const hasFiles = DirectiveHelpers.folderContainsFiles(
                app.content.folder!,
                app.content.files || []
            );
    
            if (!hasFiles) {
                // return nothing;
            }
    
            const content: unknown[] = [
                html`<connected-config-file-display-mode></connected-config-file-display-mode>`,
            ];
    
            content.push(html`<registry-opacity-slider></registry-opacity-slider>`);
    
            return slotOrNothing(
                "display",
                content
            )
    
        }
    


    private renderFolderHeader(
        app: AbstractConnectedApp
    ): unknown {

        if (!app.content.folder) {
            return nothing;
        }

        const slots: unknown[] = [
            this.renderHeaderFolderSlot(app),
            slotOrNothing(
                "display",
                html`<connected-config-subfolder-mode></connected-config-subfolder-mode>
                <registry-opacity-slider></registry-opacity-slider>`
            ),
            this.renderThermalScaleSlot(),
        ];

        const content: unknown[] = [
            html`<connected-folder-header
                .onParentClick=${(folder: BreadcrumbItem) => {
                    app.display.navigateToFolderAndLoad(folder.path);
                }}
            >
            ${slots}
        </connected-folder-header>`,
            this.renderThermalScale()
        ];

        return this.renderHeader(content);

    }

    private renderGrid(
        app: AbstractConnectedApp
    ): unknown {

        const content = [
            html`<connected-subfolders-grid
            .onFolderClick=${(folder: BreadcrumbItem) => {
                    app.display.navigateToFolderAndLoad(folder.path);
                }}
            .onFileClick=${(  
                folder: FolderInfo,
                file: FileInfo
            ) => {
                app.display.navigateToFileAndLoad(
                    folder.path,
                    file.fileName
                )
            }}
            .onChange=${() => {
                app.display.reloadCurrentState();
            }}
            .folders=${app.content.grid || []}
        ></connected-subfolders-grid>`,
        ];

        return this.renderContent(
            true,
            "100%",
            undefined,
            content
        );

    }


    render(app: AbstractConnectedApp): unknown {

        const content = [
            
        ];

        if (app.content.grid === undefined) {
            content.push(this.renderLoading("Načítám mřížku..."));
            return content;
        }

        content.push(
            this.renderBreadcrumb(app),
            this.renderFolderHeader(app),
            this.renderGrid(app)
        );

        return content;

    }

}


export const connectedFolderGrid = directive(ConnectedFolderGridDirective);