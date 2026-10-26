import { html, nothing } from "lit";
import type { AbstractConnectedApp } from "../../../abstraction/AbstractConnectedApp";
import type { ConnectedUploadForm } from "../../../components/folder/upload/ConnectedUploadForm";
import { DirectiveHelpers } from "../DirectiveHelpers";
import { slotOrNothing } from "../SlotOrNothing";
import { AbstractLayoutDirective } from "./AbstractLayoutDirective";
import type { FolderInfo } from "../../../client/responseEntities";

export abstract class AbstractFolderLayoutDirective extends AbstractLayoutDirective {

    protected renderFolderContentStatsSlot(
        app: AbstractConnectedApp
    ): unknown {
        return slotOrNothing(
            "content",
            html`<connected-folder-content-mode-switch></connected-folder-content-mode-switch>`
        );
    }

    protected renderDisplaySlot(
        app: AbstractConnectedApp
    ): unknown {

        return slotOrNothing(
            "display",
            html`<connected-config-subfolder-mode></connected-config-subfolder-mode>`
        )

    }


    protected renderHeaderFolderSlot(
        app: AbstractConnectedApp
    ): unknown {

        if (!app.content.folder) {
            return nothing;
        }

        const actions: unknown[] = [];

        const mayEdit = DirectiveHelpers.userMayEditFolder(
            app.client,
            app.content.folder
        );

        const mayDelete = DirectiveHelpers.userMayDeleteFolder(
            app.client,
            app.content.folder,
            app.content.subfolders,
            app.content.files
        );

        const deleteLabel = mayDelete
            ? this.t("deletefolder")
            : "Složku je možno smazat jen, když je prázdná"

        if (mayEdit) {

            if (!app.content.folder.may_have_files) {
                actions.push(html`<connected-folder-create-dialog
                    .folder=${app.content.folder}
                    icon="addfolder"
                    iconStyle="micro"
                    variant="primary"
                    tooltip="Vytvořit podsložku"
                    label="Vytvořit podsložku"
                    .onSuccess=${() => app.display.reloadCurrentState()}
                ></connected-folder-create-dialog>` );
            } else {

                actions.push( html`<thermal-btn
                    variant="primary"
                    icon="upload"
                    iconStyle="micro"
                    @click=${() => this.scrollToUploadForm(app)}
                >Nahrát soubor</thermal-btn>` );

            }

            actions.push(html`<connected-folder-edit-dialog
                .folder=${app.content.folder}
                icon="edit"
                iconStyle="micro"
                .onSuccess=${(folder: FolderInfo) => app.content.updateFolderState(folder)}
                .tooltip=${this.t("editfolder")}
            ></connected-folder-edit-dialog>` );

            actions.push(html`<connected-folder-move-dialog
                .folder=${app.content.folder}
            ></connected-folder-move-dialog>` );

            actions.push(html`<connected-folder-delete-dialog
                .folder=${app.content.folder}
                icon="trash"
                iconStyle="micro"
                .onSuccess=${() => app.display.navigateToFolderParentAndLoad( app.content.folder!.path )}
                .disabled=${!mayDelete}
                .tooltip=${deleteLabel}
            ></connected-folder-delete-dialog>` );

        }

        if ( app.content.files && app.content.files.length > 0 ) {
            actions.push(html`<group-download-dropdown></group-download-dropdown>` );
        }


        return slotOrNothing(
            "folder",
            actions
        )

    }

    /**
     * Scrolls the first upload form into view using a smooth animation.
     * The form is positioned in the middle of the viewport so that a
     * sticky header doesn't cover it.
     */
    private scrollToUploadForm(app: AbstractConnectedApp): void {
        // try to find the form inside the app's render root first
        let form = app.renderRoot?.querySelector('connected-upload-form') as ConnectedUploadForm | null;
        if (!form) {
            // fallback to document-wide search
            form = document.querySelector('connected-upload-form') as ConnectedUploadForm;
        }
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            form.highlight(3000);
        } else {
            // nothing to scroll to
            console.warn('scrollToUploadForm: no upload form found');
        }
    }


}