import { t } from "i18next";
import type { CSSResultGroup} from "lit";
import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { T } from "../../translations/Languages";
import { AbstractFolderDialog } from "./folder/crud/AbstractFolderDialog";
import type { FolderInfo } from "../../client/responseEntities";

@customElement("folder-edit-dialog-new")
export class FolderEditDialog extends AbstractFolderDialog {

    protected closeLabel: string = T.savechanges;

    protected dialogLabel: string = T.editfolder;

    @state()
    private folderName: string = "";

    @state()
    private folderDescription: string = "";

    @state()
    private errorMessage: string = "";

    @property({ type: Function})
    public onSuccess?: (folder: FolderInfo) => void;

    public static styles?: CSSResultGroup = css`

        :host {
            align-self: stretch;
        }

        input,
        label,
        textarea,
        .form-group,
        .content,        
        .error {
            box-sizing: border-box;
        }

        .form-group {
            margin-bottom: var(--thermal-gap);
        }

        label {
            display: block;
            margin-bottom: calc(var(--thermal-gap) * 0.5);
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
        }

        textarea {
            width: 100%;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
            font-family: inherit;
            resize: vertical;
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }
    `;

    connectedCallback(): void {
        super.connectedCallback();
        this.client.subscribeToIdentityChanges(this);
        this.content.subscribeToFolderUpdates(this);
    }

    protected firstUpdated() {
        this.folderName = this.folder.name || this.folder.slug;
        this.folderDescription = this.folder.description || "";
    }

    protected async beforeClose(): Promise<boolean> {

        if (!this.folderName.trim()) {
            this.errorMessage = "Název složky je povinný";
            return false;
        }

        if ( !this.client ) {
            this.errorMessage = "Klient není dostupný";
            return false;
        }

        // Clear previous error
        this.errorMessage = "";

        const result = await this
            .client
            .api
            .routes
            .post
            .updateFolder(this.folder.path)
            .setName(this.folderName.trim())
            .setDescription(this.folderDescription.trim())
            .execute()!;

        if (result.success) {
            if ( result.data.result.info ) {
                this.content.updateFolderState(result.data!.result.info);
            }
        
            if (this.onSuccess) {
                this.onSuccess(result.data!.result.info);
            }
        } else {
            this.errorMessage = result.message || "Nepodařilo se upravit složku";
        }

        return result?.success;

    }

    private handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.folderName = target.value;
    }

    private handleDescriptionChange(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        this.folderDescription = target.value;
    }


    protected renderContent(): unknown {
        return html`<div class="form-group">
    <label for="folder-name">${t(T.name)}:</label>
    <input 
        type="text" 
        id="folder-name"
        .value=${this.folderName}
        @input=${this.handleInputChange}
        placeholder="Zadejte název složky"
        required
    />
</div>
<div class="form-group">
    <label for="folder-description">${t(T.description)}:</label>
    <textarea 
        id="folder-description"
        .value=${this.folderDescription}
        @input=${this.handleDescriptionChange}
        placeholder="Zadejte popis složky (volitelné)"
        rows="3"
    ></textarea>
</div>
${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}`;
    }

    protected override renderButtons(): unknown {
        return html`<thermal-btn
    @click=${() => this.close()}
    slot="button"    
>${t(T.back)}</thermal-btn>`;
    }

    protected shouldRenderDialog(): boolean {

        // Do not display until connected and logged in
        if ( 
            ! this.client.identity 
            || ! this.client.isLoggedIn
            || ! this.folder
        ) {
            return false;
        }

        // For root, display allways
        if ( this.client.isRoot ) {
            return true;
        }

        // For other users, show only if they may manage folders in this folder
        return this.folder.may_manage_folders_in || this.folder.may_manage_files_in;

    }

}
