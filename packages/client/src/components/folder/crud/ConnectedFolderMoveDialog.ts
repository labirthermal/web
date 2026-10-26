import { html } from "lit";
import { property } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";
import type { FolderInfo } from "../../../client/responseEntities";
import type { ConnectedLocationSelector } from "../../selection/move/ConnectedLocationSelector";
import { LocationSelectorMode } from "../../selection/move/ConnectedLocationSelector";

export class ConnectedFolderMoveDialog extends AbstractControlledConsumer {

    @property({ type: Object })
    public folder!: FolderInfo;

    private selectionRef: Ref<ConnectedLocationSelector> = createRef();

    private renderTrigger(): unknown {

        return html`<thermal-btn
            tooltip="Přesunout složku"
            slot="invoker"
            icon="move"
            iconStyle="mini"
        ></thermal-btn>`;

    }

    private renderDialog(): unknown {


        const onSelect = async (path: string) => {


            if (this.folder || !this.selectionRef.value) {

                const result = await this.client.api.routes.post.moveFolder(
                    this.folder.path,
                    path
                ).execute();

                if (result.success) {
                    this.selectionRef.value?.closeDialogue();

                    await this.display.navigateToFolderAndLoad(path);
                }

            }

        }

        return html`<connected-location-selector
            mode=${LocationSelectorMode.FOLDER}
            .asDialogue=${true}
            operationLabel="Přesunout do"
            .onSelect=${onSelect}
            ${ref(this.selectionRef)}
        >
            ${this.renderTrigger()}
        </connected-location-selector>`;
    }

    protected render(): unknown {
        return this.renderDialog();
    }


}