import type { CSSResultGroup } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import type { FolderInfo } from "../../../../client/responseEntities";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";
import { FolderListDisplayMode } from "../../../DisplayController";

export class ConnectedFolderFileList extends AbstractControlledConsumer {


    @property({ type: Function })
    public onFolderClick?: (folder: FolderInfo) => void;

    @property({ type: String, attribute: "folder-mode" })
    public folderMode: FolderListDisplayMode = FolderListDisplayMode.GRID;

    public static styles?: CSSResultGroup | undefined = css`
        :host {
            color: var(--thermal-foreground);
            display: block;
            width: 100%;
        }

        :host( [folder-mode="asList"] ) {
            section {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1em;
                justify-content: start;
            }
        }

        :host( [folder-mode="asTable"] ) {
            section {
                display: table;
                width: 100%;
                border-collapse: collapse;
                height: 1px;
                border: 0;
            }
        }

        

        .list-label {

            font-size: calc( var(--thermal-fs) * .8);
            color: var(--thermal-slate);
            line-height: 1;
            margin: 0;
            padding: 0;
            font-weight: normal;
            padding-bottom: calc(var(--thermal-gap) * 0.5);
        
        }
    `;

    connectedCallback(): void {
        super.connectedCallback();
        this.content.subscribeToFolderUpdates(this);
        this.content.subscribeToSubfoldersUpdates(this);
    }

    protected renderSubfolder(info: FolderInfo): unknown {

        if (this.folderMode === FolderListDisplayMode.TABLE) {
            return html`<connected-folder-row
                .folder=${info}
                @click=${() => this.onFolderClick && this.onFolderClick(info)}
            ></connected-folder-row>`;
        }

        return html`<connected-folder-thumbnail
            .folder=${info}
            .onClick=${() => this.onFolderClick && this.onFolderClick(info)}
        >
        </connected-folder-thumbnail>`;

    }

    protected render(): unknown {
        return html`

        <h2 class="list-label">
            <span><strong>${this.content.subfolders?.length} složky</strong> ve složce <i>${this.content.folder?.name}</i>:</span>
        </h2>


        <section>
            ${this.content.subfolders?.map(subfolder => this.renderSubfolder(subfolder))}
        </section>`;
    }


}