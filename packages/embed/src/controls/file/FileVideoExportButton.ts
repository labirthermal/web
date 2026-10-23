import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { when } from 'lit/directives/when.js';
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../../translations/Languages";
import type { BtnSizes, BtnVariants } from "../../ui/Btn";
import type { ThermalDialogElement } from "../../ui/Dialog";
import type { FileVideoExportPanel } from "./video/FileVideoExportPanel";

export class FileVideoExportButton extends AbstractFileConsumer {

    @property({ type: String, reflect: true })
    public variant?: BtnVariants;

    @property({ type: String, reflect: true })
    public size?: BtnSizes = "md";

    @property({ type: String })
    public icon?: string;

    @property({ type: String })
    public iconStyle?: string;

    @property({ type: Boolean })
    public plain?: boolean;

    @property({ type: String, reflect: true })
    public tooltip?: string;

    @property({ type: String, reflect: true })
    public label: string = "Exportovat video";

    @property({ type: String, reflect: true })
    public pre?: string;

    private dialogRef: Ref<ThermalDialogElement> = createRef();
    private panelRef?: Ref<FileVideoExportPanel> = createRef();

    protected slug: string = this.UUID + "__file-export";

    @state()
    protected isOpen: boolean = false;



    public onInstanceCreated(): void {}
    public onFailure(): void {}


    public renderDialog(): unknown {

        const cnt = when(
            this.isOpen,
            () => html`<file-video-export-panel ${ref(this.panelRef)}></file-video-export-panel>`,
            () => nothing
        );

        return html`<thermal-dialog
            ${ref(this.dialogRef)}
            label="${this.t("export")}"
            is-fullscreen="true"
            .onCloseEveryTime=${() => {
                this.isOpen = false;
                return true;
            }}
        >

            <div slot="content" style="height: 100%;">
                ${cnt}
            </div>

            ${this.renderCurrentFrameExportButton()}

            ${this.renderVideoExportButton()}
        
        </thermal-dialog>`;

    }

    private renderVideoExportButton(): unknown {

        if (
            !this.file
            || (
                this.file
                && this.file.timeline.isSequence === false
            )
        ) {
            return nothing;
        }

        return html`<thermal-btn
                variant="primary"
                slot="button"
                icon="download"
                iconStyle="micro"
                @click=${() => {
                if (this.panelRef?.value) {
                    (this.panelRef?.value as FileVideoExportPanel).record();
                }
            }}
            >${this.t(T.exportvideo)} (MP4)</thermal-btn>`;

    }

    private renderCurrentFrameExportButton(): unknown {

        if (
            !this.file
        ) {
            return nothing;
        }

        const label = this.file.timeline.isSequence
            ? "Současný snímek"
            : this.t(T.exportpng);

        return html`<thermal-btn
                variant="primary"
                slot="button"
                icon="download"
                iconStyle="micro"
                @click=${() => {
                if (this.panelRef?.value) {
                    (this.panelRef?.value as FileVideoExportPanel).currentFrame();
                }
            }}
            >${label} (PNG)</thermal-btn>`;


    }

    public renderTriggerButton(): unknown {
        return html`<thermal-btn
            @click=${() => {
                this.dialogRef.value?.setOpen();
                this.isOpen = true;
            }}
            variant=${this.variant || "default"}
            size=${this.size || "md"}
            plain="${this.plain || false}"
            icon=${ifDefined(this.icon)}
            iconStyle=${ifDefined(this.iconStyle)}
            tooltip=${ifDefined(this.tooltip)}
            pre=${ifDefined(this.pre)}
            style="width: 100%; justify-content: flex-start;"
        >
            ${this.label}
        </thermal-btn>`;
    }

    protected render(): unknown {
        return html`
            ${this.renderDialog()}
            ${this.renderTriggerButton()}
        `
    }



}

declare global {
    interface HTMLElementTagNameMap {
        "file-video-export-button": FileVideoExportButton;
    }
}
