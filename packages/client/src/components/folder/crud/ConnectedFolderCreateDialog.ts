import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { FolderInfo } from "../../../client/responseEntities";
import { AbstractFolderDialog } from "./AbstractFolderDialog";

export class ConnectedFolderCreateDialog extends AbstractFolderDialog {


    protected closeLabel: string = "create";

    protected dialogLabel: string = "createfolder";

    @property({ type: String })
    private folderName: string = "";

    @property({ type: String })
    private folderDescription: string = "";

    @property({ type: String })
    private errorMessage: string = "";

    @property({ type: Function})
    public onSuccess?: (folder: FolderInfo) => void;

    @state()
    private mayHaveFiles: boolean = true;

    public static styles?: CSSResultGroup = css`

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

    protected async beforeClose(): Promise<boolean> {

        if (!this.folderName.trim()) {
            this.errorMessage = "Název složky je povinný";
            return false;
        }

        // Clear previous error
        this.errorMessage = "";

        const path = this.folder.path;

        const result = await this
            .client
            .api
            .routes
            .post
            .createFolder( path, this.folderName.trim() )
            .setDescription(this.folderDescription.trim())
            .setMayHaveFiles(
                this.mayHaveFiles
            )
            .execute()!;

        if (result?.success) {
            this.folderName = "";
            this.folderDescription = "";

            if (this.onSuccess) {
                this.onSuccess(result.data!.result.info);
            }
        } else {
            this.errorMessage = result?.message || "Nepodařilo se vytvořit složku";
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

    private renderToggleButton(
        value: boolean,
        onClick: () => void,
        label: string,
        tooltip: string,
        icon: string,
        iconStyle: string
    ): unknown {

        return html`<thermal-btn
    .tooltip=${tooltip}
    icon=${icon}
    iconStyle=${iconStyle}
    variant=${value ? "foreground" : "default"}
    @click=${onClick}
>${label}</thermal-btn>`;

    }

    protected renderContentMode(): unknown {

        if ( 
            this.client.isLoggedIn === false
            || this.content.folder?.may_manage_folders_in === false
        ) {
            return nothing;
        }

        return html`<div class="form-group">
    <label for="folder-may-have-files">Určeno pro:</label>
    <div>
        ${this.renderToggleButton(
            !this.mayHaveFiles,
            () => this.mayHaveFiles = false,
            "Podsložky",
            "Tato složka bude moci obsahovat další podsložky",
            "folder",
            "micro"
        )}
        ${this.renderToggleButton(
            this.mayHaveFiles,
            () => this.mayHaveFiles = true,
            "Soubory",
            "Tato složka bude moci obsahovat soubory",
            "image",
            "micro"
        )}
    </div>
<div>`;





    }


    protected renderContent(): unknown {
        return html`<div class="form-group">
    <label for="folder-name">Název složky:</label>
    <input 
        type="text" 
        id="folder-name"
        .value=${this.folderName}
        @input=${this.handleInputChange}
        placeholder="Zadejte název nové složky"
        required
    />
</div>
<div class="form-group">
    <label for="folder-description">Popis:</label>
    <textarea 
        id="folder-description"
        .value=${this.folderDescription}
        @input=${this.handleDescriptionChange}
        placeholder="Zadejte popis složky (volitelné)"
        rows="3"
    ></textarea>
</div>
${this.renderContentMode()}
${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}`;

    }

    protected override renderButtons(): unknown {
            return html`<thermal-btn
        @click=${() => this.close()}
        slot="button"    
    >${this.t("back")}</thermal-btn>`;
        }

    protected shouldRenderDialog(): boolean {

        // Do not display until connected and logged in
        if (
            ! this.client.isClientConnected
            || ! this.client.identity
            || ! this.client.isLoggedIn
            || ! this.folder
        ) {
            return false;
        }

        // For the root user, display whenever the folder cannot accept folders
        if (
            this.client.identity.meta.is_root
            && ! this.folder.may_have_files === false
        ) {
            return true;
        }

        // For all other users, show only if they have permission to manage folders in this folder

        return this.folder.may_manage_folders_in;

    }


}