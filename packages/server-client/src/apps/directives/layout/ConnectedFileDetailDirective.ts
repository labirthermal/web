import { html, nothing } from "lit";
import { directive } from "lit/directive.js";
import type { AbstractConnectedApp } from "../../../abstraction/AbstractConnectedApp";
import { AbstractLayoutDirective } from "./AbstractLayoutDirective";
import { slotOrNothing } from "../SlotOrNothing";
import { DirectiveHelpers } from "../DirectiveHelpers";
import type { FolderInfo } from "../../../client/responseEntities";

class ConnectedFileDetail extends AbstractLayoutDirective {


    private renderFileHeaderFileSlot(
        app: AbstractConnectedApp
    ): unknown {

        if (app.content.folder === undefined) {
            return nothing;
        }

        const fileOperations = [];

        if (app.content.folder.may_manage_files_in) {
            fileOperations.push(html`<connected-file-edit-dialog
                .file=${app.content.file}
                variant="primary"
                size="md"
                .label=${undefined}
            ></connected-file-edit-dialog>` );

            fileOperations.push( html`<connected-file-move-dialog .file=${app.content.file}></connected-file-move-dialog>` );

            fileOperations.push(html`<connected-file-delete-dialog
                .file=${app.content.file}
                .folder=${app.content.folder}
                size="md"
                .label=${undefined}
                ></connected-file-delete-dialog>` );
        }

        fileOperations.push(html`<file-info-button></file-info-button>`);

        fileOperations.push(html`<file-download-dropdown></file-download-dropdown>`);

        return slotOrNothing(
            "file",
            fileOperations
        );

    }


    private renderFileHeader(
        app: AbstractConnectedApp
    ): unknown {

        const slots = [

            this.renderFileHeaderFileSlot(app),

            slotOrNothing(
                "thermalscale",
                html`<manager-palette-dropdown></manager-palette-dropdown>
                <registry-range-form></registry-range-form>`
            )

        ];

        const display: unknown[] = [];

        if (app.content.folder && DirectiveHelpers.userMayEditFile(app.client, app.content.folder)) {
            display.push(html`<connected-config-file-content-mode></connected-config-file-content-mode>`);
        }

        display.push(html`<registry-opacity-slider></registry-opacity-slider>`);

        slots.push(
            slotOrNothing(
                "display",
                display
            )
        );

        slots.push(
            html`<connected-file-analysis-buttons .info=${app.content.file}></connected-file-analysis-buttons>`
        );

        if (
            true
            || (
                app.content.file !== undefined
                && app.content.file!.tags.length > 0
            )
        ) {

            const tags = slotOrNothing(
                "edit",
                html`<connected-file-tags
                .file=${app.content.file}
                .folder=${app.content.folder}
                editable=${app.display.editTags ? "true" : "false"}
                inline=${true}
                size="sm"
            ></connected-file-tags>`
            );

            slots.push(tags);

        }

        return this.renderHeader([
            this.renderBreadcrumb(app),

            html`<connected-folder-header
                .onParentClick=${(folder: FolderInfo) => app.display.navigateToFolderAndLoad(folder.path)}
            ></connected-folder-header>`,

            html`<connected-file-header>
                ${slots}
            </connected-file-header>`
        ]);

    }




    private renderFileDetailContent(
        app: AbstractConnectedApp
    ): unknown {

        const content: unknown[] = [

            html`<div>
                <registry-histogram expandable="true"></registry-histogram>
                <registry-range-slider></registry-range-slider>
                <registry-ticks-bar></registry-ticks-bar>
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>`,

            html`<div>
                <file-analysis-complex></file-analysis-complex>
            </div>`

        ];

        let gridTemplateColumns = "1fr 1fr";

        if (app.display.displayComments) {
            gridTemplateColumns = "1fr 1fr 200px";
            content.push(html`<div>
                <connected-file-comments
                    .file=${app.content.file}
                    .folder=${app.content.folder}
                ></connected-file-comments>
            </div>` );
        }

        return this.renderContent(
            true,
            gridTemplateColumns,
            undefined,
            content
        );

    }





    render(app: AbstractConnectedApp): unknown {

        if (
            app.content.folder === undefined
            || app.content.file === undefined
        ) {
            return this.renderLoading("Loading file details...");
        }

        const h = this.renderFileHeader(app);
        const c = this.renderFileDetailContent(app);

        return [h, c];

    }

}

export const connectedFileDetail = directive(ConnectedFileDetail);