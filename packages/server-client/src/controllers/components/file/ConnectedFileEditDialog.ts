import { customElement, property, state } from "lit/decorators.js";
import type { CSSResultGroup } from "lit";
import { html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { T } from "../../../translations/Languages";
import { t } from "i18next";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";
import type { BtnSizes, BtnVariants } from "@labirthermal/webcomponents";
import type { FileInfo } from "../../../client/responseEntities";

@customElement("connected-file-edit-dialog")
export class FileEditDialog extends AbstractControlledConsumer {

    @property({ type: String })
    public label: string = "Upravit soubor";

    @property({ type: String, reflect: false })
    public variant?: BtnVariants;

    @property({ type: String, reflect: true })
    public size?: BtnSizes = "sm";

    @property({ type: String })
    public plain?: boolean;

    @property({ type: Object })
    public file!: FileInfo;

    @state()
    private fileLabel: string = "";

    @state()
    private fileDescription: string = "";

    @state()
    private errorMessage: string = "";

    public static styles?: CSSResultGroup = css`
        .content {
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
            box-sizing: border-box;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
        }

        textarea {
            width: 100%;
            box-sizing: border-box;
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

    protected firstUpdated() {
        this.fileLabel = this.file.label || "";
        this.fileDescription = this.file.description || "";
    }

    protected async handleSubmit(): Promise<boolean> {

        // Clear previous error
        this.errorMessage = "";

        const result = await this
            .client
            .api
            .routes
            .post
            .updateFile(this.file.path, this.file.fileName.trim())
            .setLabel(this.fileLabel.trim())
            .setDescription(this.fileDescription.trim())
            .execute();

        if (result.success) {

            this.content.updateFileState( result.data.file )

        } else {

            this.errorMessage = result.message || "Nepodařilo se upravit soubor";

        }

        return result.success;
    }

    private handleLabelChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.fileLabel = target.value;
    }

    private handleDescriptionChange(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        this.fileDescription = target.value;
    }

    protected render(): unknown {


        const label = t(T.editfile);

        return html`
            <thermal-dialog
                label=${label}
                .beforeClose=${() => this.handleSubmit()}
                button="Uložit změny"
            >
                <slot name="invoker" slot="invoker">
                    <thermal-btn 
                        variant=${ifDefined( this.variant ) }
                        size=${ifDefined( this.size ) }
                        plain=${ifDefined( this.plain ) }
                        icon="edit" iconStyle="micro"
                        tooltip=${label}
                    >${this.label}</thermal-btn>
                </slot>

                <div class="content" slot="content">
                    <div class="form-group">
                        <label for="file-label">Label:</label>
                        <input 
                            type="text" 
                            id="file-label"
                            .value=${this.fileLabel}
                            @input=${this.handleLabelChange}
                            placeholder="Zadejte label souboru (volitelné)"
                        />
                    </div>
                    <div class="form-group">
                        <label for="file-description">Popis:</label>
                        <textarea 
                            id="file-description"
                            .value=${this.fileDescription}
                            @input=${this.handleDescriptionChange}
                            placeholder="Zadejte popis souboru (volitelné)"
                            rows="3"
                        ></textarea>
                    </div>
                    ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}
                </div>

            </thermal-dialog>
        `;

    }
}
