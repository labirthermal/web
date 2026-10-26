import { booleanConverter, icons } from "@labirthermal/webcomponents";
import type { CSSResultGroup, TemplateResult } from "lit";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { FileInfo } from "../../../client/responseEntities";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";
import type { FileListDisplayMode } from "../../../controllers/DisplayController";

export class ConnectedFileList extends AbstractControlledConsumer {

    @property({
        type: Function
    })
    public onFileClick: (file: FileInfo) => void = () => { };

    @property({
        type: Function
    })
    public onChange?: (file: FileInfo) => void = () => { };

    @property({
        type: Function
    })
    public onFileDelete?: (file: FileInfo) => void = () => { };

    protected icon = icons.image.outline("icon");

    @property({
        type: String,
        reflect: true,
        converter: booleanConverter(false)
    })
    public compact: boolean = false;

    @property({
        type: String,
        reflect: true,
        attribute: "display-mode"
    })
    public displayMode!: FileListDisplayMode;


    @property({
        type: String,
        reflect: true,
        converter: booleanConverter(false),
        attribute: "show-discussion"
    })
    public showDiscussion: boolean = false;

    @property({
        type: Boolean,
        reflect: true,
        converter: booleanConverter(false),
        attribute: "editable-tags"
    })
    public editableTags: boolean = false;



    public static styles?: CSSResultGroup | undefined = css`
        :host {
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs);
            gap: 2em;
            position: relative;
            width: 100%;
        }
        :host([display-mode="asGrid"]) {
            grid-column: 2;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1em;
        
        }
        :host([display-mode="asTable"]) {
            grid-column: 2;
            display: table;
            border-spacing: 1em;
            margin: -1em;
        }
        `;




    connectedCallback(): void {
        super.connectedCallback();
        this.content.subscribeToFolderUpdates(this);
        this.content.subscribeToFilesUpdates(this);
        this.display.subscribeToDisplayCompact(this);
        this.display.subscribeToEditTags(this);
        this.display.subscribeToDisplayComments(this);
    }


    protected renderFile(file: FileInfo): TemplateResult {

        const callback = this.onFileClick !== undefined
            ? () => this.onFileClick(file)
            : undefined;

        return html`<connected-file-thumbnail
    .file=${file}
    .folder=${this.content.folder}
    .onFileDelete=${this.onFileDelete}
    .onFileClick=${callback}
    display-mode=${this.displayMode}
    compact=${this.compact ? "true" : "false"}
    show-discussion=${this.showDiscussion ? "true" : "false"}
    editable-tags=${this.editableTags ? "true" : "false"}
></connected-file-thumbnail>`;

    }

    protected render(): unknown {

        if (this.content.files === undefined || this.content.files.length === 0) {
            return nothing;
        }

        return html`${this.content.files?.map(subfolder => this.renderFile(subfolder))}`;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "connected-file-list": ConnectedFileList;
    }
}