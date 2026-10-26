import { TimeFormat } from "@labirthermal/core";
import type { Comment, FileInfo, FolderInfo } from "@labirthermal/client";
import type { CSSResultGroup} from "lit";
import { css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";

@customElement("connected-file-comment")
export class FileComment extends AbstractControlledConsumer {

    @property({ type: Object })
    public comment!: Comment;

    @property({ type: Object })
    public file!: FileInfo;

    @property({ type: Object })
    public folder!: FolderInfo;

    @property({ type: Function })
    public onChange?: (file: FileInfo) => void = () => { };

    @state()
    protected error?: string;

    @state()
    protected isEditing: boolean = false;


    public static styles?: CSSResultGroup | undefined = css`
    
        :host {

            padding: .5em;
            display: block;

            font-size: var( --thermal-fs );

            background: var(--thermal-background);

            opacity: 0.7;

            border-radius: var(--thermal-radius);
            width: calc( 100% - 1em );
            max-width: calc( 100% - 1em );
            align-self: flex-end;

            box-sizing: border-box;
        }

        :host(.my-comment) {
            opacity: 1;
            align-self: flex-start;
        }

        header {
            display: flex;
            gap: calc(var(--thermal-gap) * 0.5);
            justify-content: space-between;


            margin-bottom: .3em;
            width: 100%;
            
            font-size: calc(var(--thermal-fs) * 0.7);
            color: var( --thermal-slate );
            

            > div {
                flex-grow: 1;

                span {
                    display: block;
                }

                div {

                }

            }


            aside {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                gap: .2em;
            }

        }

        main {

            font-size: calc(var(--thermal-fs) * 0.8);
        
            p {
                margin: 0;
                padding: 0;
            }
        
        }
    
    `;


    connectedCallback(): void {
        super.connectedCallback();

        this.client.subscribeToIdentityChanges(this);
        this.content.subscribeToFileUpdates(this);
        this.content.subscribeToFilesUpdates(this);
        this.content.subscribeToFolderUpdates(this);

    }





    protected async handleDelete(): Promise<void> {

        if (this.client) {

            const request = this.client
                .api
                .routes
                .post
                .fileDeleteComment(
                    this.folder.path,
                    this.file.fileName,
                    this.comment.timestamp
                );

            const result = await request.execute();

            if (result.success) {

                this.content.updateFileState(
                    result.data.file
                );

            } else {
                this.error = result.message;
            }

        }

    }


    protected mayManage(): boolean {

        // Pookud uživatel smí spravovat soubory či složky v dané složce a pokud je zároveň autorem komentáře, může jej spravovat
        if (
            this.folder
            && (
                this.folder.may_manage_files_in
                || this.folder.may_manage_folders_in
            )
            && this.comment
            && this.client
            && this.client.api.auth.getIdentity()?.meta.login === this.comment.by.login
        ) {
            return true;
        }

        return false;

    }


    protected render(): unknown {

        // Pokud klient není připojen, pokud soubor, komentář či složka neexistují, nic nevykresluj
        if (!this.file || !this.comment || !this.folder) {
            return nothing;
        }

        const time = TimeFormat.human(this.comment.timestamp);
        const isMyComment = this.client?.identity?.meta.login === this.comment.by.login;

        // Set CSS class for own comments
        if (isMyComment) {
            this.classList.add('my-comment');
        } else {
            this.classList.remove('my-comment');
        }

        return html`
            <header>

                <div>
                    <span>${time}</span>
                    <div>${this.comment.by.name}</div>
                </div>

            ${this.mayManage() ? html`
                
                <aside>
                    <thermal-btn 
                        @click=${() => {
                    this.isEditing = !this.isEditing;
                    this.requestUpdate();
                }}
                        size="sm"
                        variant="${this.isEditing ? "foreground" : "default"}"
                        icon="${this.isEditing ? "close" : "edit"}"
                        iconStyle="micro"
                        plain="true"
                    ></thermal-btn>

                    <thermal-btn 
                        @click=${() => this.handleDelete()} 
                        icon="trash" iconStyle="micro"
                        size="sm"
                        variant="default"
                        plain="true"
                    ></thermal-btn>

                </aside>
            ` : nothing}
            </header>

            <main>
            ${this.isEditing
                ? html`
                <file-comment-form
                    .comment=${this.comment}
                    .file=${this.file}
                    .folder=${this.folder}
                    .onChange=${(file: FileInfo) => {
                        this.isEditing = false;
                        this.onChange?.(file);
                    }}
                ></file-comment-form>
                `
                : html`<p>${this.comment.message}</p>`
            }
            </main>
        `;

    }


}