import { t } from "@labirthermal/webcomponents";
import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { FileInfo, FolderInfo } from "../../../client/responseEntities";
import { T } from "../../../translations/Languages";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";

export class ConnectedFileComments extends AbstractControlledConsumer {

    @property({ type: Object })
    public file!: FileInfo;

    @property({ type: Object })
    public folder!: FolderInfo;

    public static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            font-size: var(--thermal-fs);
        }

        .list {
            display: flex;
            flex-direction: column;
            gap: .25em;
            flex: 1;
            min-height: 100px;
            overflow-y: auto;
            padding: .25em 0;
        }

        .form-container {
            flex-shrink: 0;
            margin-top: .25em;
        }

        .placeholder {

            height: 100%;
            padding: .5em;

            display: flex;
            justify-content: center;
            align-items: center;

            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);

            font-size: .8em;
            color: var(--thermal-slate);

            &.tiny {
            
                height: 40px;
                text-align: center;

            
            }


        }
    
    `;

    connectedCallback(): void {
        super.connectedCallback();
        this.client.subscribeToIdentityChanges( this );
        this.content.subscribeToFileUpdates( this );
        this.content.subscribeToFilesUpdates( this );
    }

    firstUpdated(): void {
        // Use timeout to ensure DOM is fully rendered before scrolling
        setTimeout(() => this.scrollToBottom(), 0);
    }

    updated(): void {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        const listElement = this.shadowRoot?.querySelector('.list') as HTMLElement;
        if (listElement) {
            listElement.scrollTo({
                top: listElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    protected render(): unknown {

        return html`

            <div class="list">
                ${this.file.comments && this.file.comments.length > 0
                ? this.file.comments.map((comment) => html`
                        <file-comment
                            .comment=${comment}
                            .file=${this.file}
                            .folder=${this.folder}
                        ></file-comment>
                    `)
                : html`<div class="placeholder">
                    <span>${t(T.nocomments)}</span>
                </div>`
            }
            </div>
            
            ${this.folder && this.folder.may_manage_files_in
                ? html`
                    <div class="form-container">
                        <controlled-file-comment-form 
                            .file=${this.file} 
                            .folder=${this.folder} 
                            .onChange=${() => {

                                this.requestUpdate();

                                // this.content.updateFileState(file);
                                setTimeout( () => this.scrollToBottom(), 0 );
                            }}>
                        </controlled-file-comment-form>
                    </div>
                    `
                : nothing
            }

            ${this.folder && !this.folder.may_manage_files_in
                ? html`<div class="placeholder  tiny"><span>Nemáte oprávnění komentovat tento soubor</span></div>`
                : nothing
            }
        `;
    }

}