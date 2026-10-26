import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";
import type { FileInfo } from "../../client/responseEntities";
import type { ConnectedLocationSelector } from "../selection/move/ConnectedLocationSelector";
import { LocationSelectorMode } from "../selection/move/ConnectedLocationSelector";

export class ConnectedFileMoveDialog extends AbstractControlledConsumer {

    @property({ type: Object })
    public file?: FileInfo;

    private dialogRef: Ref<ConnectedLocationSelector> = createRef();

    connectedCallback(): void {
        super.connectedCallback();

        this.content.subscribeToFileUpdates(this);

    }

    protected render(): unknown {

        return html`<connected-location-selector
            .asDialogue=${true}
            ${ref(this.dialogRef)}
            .mode=${LocationSelectorMode.FILE}
            dialogTitle="Přesunout soubor"
            operationLabel="Přesunout do"
            .onSelect=${async (path: string) => {

                if (!this.file) {
                    return nothing;
                }

                await this.client.api.routes.post.moveFile(
                    this.file.path,
                    this.file.fileName,
                    path
                ).execute();

                this.dialogRef.value?.closeDialogue();

                this.display.navigateToFolderAndLoad(path);

            }}
        >
            <thermal-btn
                slot="invoker"
                icon="move"
                iconStyle="mini"
                tooltip="Přesunout"
            ></thermal-btn>
        </connected-location-selector>`;

    }


}

declare global {
    interface HTMLElementTagNameMap {
        "connected-file-move-dialog": ConnectedFileMoveDialog;
    }
}