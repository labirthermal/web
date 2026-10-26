import { html, nothing } from "lit";
import type { AbstractConnectedApp } from "../../../abstraction/AbstractConnectedApp";
import { DirectiveHelpers } from "../DirectiveHelpers";
import { slotOrNothing } from "../SlotOrNothing";

import { directive } from "lit/directive.js";
import { AbstractFolderLayoutDirective } from "./AbstractFolderLayoutDirective";
import type { BreadcrumbItem, FileInfo } from "../../../../client/responseEntities";

class ConnectedFolderFilesDirective extends AbstractFolderLayoutDirective {


    protected renderDisplaySlot(
        app: AbstractConnectedApp
    ): unknown {

        const hasFiles = DirectiveHelpers.folderContainsFiles(
            app.content.folder!,
            app.content.files || []
        );

        if (!hasFiles) {
            return nothing;
        }

        const content: unknown[] = [
            html`<connected-config-file-display-mode></connected-config-file-display-mode>`,
            html`<connected-config-file-content-mode></connected-config-file-content-mode>`
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

        const hasFiles = DirectiveHelpers.folderContainsFiles(
            app.content.folder,
            app.content.files || []
        );

        const slots = [
            this.renderFolderContentStatsSlot(app),
            this.renderHeaderFolderSlot(app),
        ];

        if (hasFiles) {
            slots.push(this.renderThermalScaleSlot());
        }

        slots.push(this.renderDisplaySlot(app));

        if ( app.fileSelection.array.length > 0 ) {
            slots.push( slotOrNothing( "file", html`<connected-file-selection-actions></connected-file-selection-actions>` ) );
        }

        const content: unknown[] = [
            this.renderBreadcrumb(app),
            html`<connected-folder-header
                .onParentClick=${(folder: BreadcrumbItem) => {
                    app.display.navigateToFolderAndLoad(folder.path);
                }}
            >
                ${slots}
            </connected-folder-header>`
        ];

        if (hasFiles) {
            content.push(this.renderThermalScale());
        }

        return this.renderHeader(content);

    }


    private renderFileList(
        app: AbstractConnectedApp
    ): unknown {

        const hasFiles = DirectiveHelpers.folderContainsFiles(
            app.content.folder!,
            app.content.files || []
        );

        if (!hasFiles) {
            // return nothing;
        }

        const mayUpload = DirectiveHelpers.userMayEditFile(
            app.client,
            app.content.folder!
        );

        const content = [];

        if (hasFiles) {
            content.push(html`<connected-file-list
                compact=${app.display.fileDisplayCompact}
                display-mode=${app.display.fileDisplayMode}
                editable-tags=${app.display.editTags}
                show-discussion=${app.display.displayComments}
                
                .onFileClick=${(file: FileInfo) => app.display.navigateToFileAndLoad(file.path, file.fileName)}
            ></connected-file-list>` );
        }

        if (mayUpload) {
            content.push(html`<connected-upload-form
                .folder=${app.content.folder}
                .onSuccess=${() => app.display.reloadCurrentState()}
            ></connected-upload-form>` );
        }

        return this.renderContent(
            hasFiles,
            "100%",
            undefined,
            html`<div style="width: 100%; display: flex; flex-direction: column; gap: 1em;">${content}</div>`
        );

    }


    render(app: AbstractConnectedApp): unknown {

        if (app.client.isLoading) {
            return nothing;
        }

        return [
            this.renderFolderHeader(app),
            this.renderFileList(app)
        ]

    }

}

export const connectedFolderFiles = directive(ConnectedFolderFilesDirective);