import type { ThermalFileInstance } from "@labirthermal/core";
import { fileContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { FileInfo } from "../../../client/responseEntities";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";
import { slotOrNothing } from "../../../apps/directives/SlotOrNothing";

export class ConnectedFileAnalysisButtons extends AbstractControlledConsumer {

    public label = "";

    tooltip = "Uložit analýzy na server.";

    public icon = "save";
    public iconStyle = "micro";

    @property({ type: Object })
    public info!: FileInfo;

    @property({ type: Boolean })
    public enableCopyToAll: boolean = false;


    @state()
    protected analyses: string[] = [];

    @state()
    protected hasChanged: boolean = false;

    @state()
    @consume({ context: fileContext, subscribe: true })
    private file?: ThermalFileInstance;

    connectedCallback(): void {
        super.connectedCallback();
        if (this.file) {
            this.onInstanceCreated(this.file);
        }
    }

    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);

        if (_changedProperties.has("file") && this.file) {
            this.onInstanceCreated(this.file);
        }

    }


    public onInstanceCreated(instance: ThermalFileInstance): void {

        if (instance) {

            // Try using the analysis object directly
            if (instance.analysis) {

                this.getCurrentAnalysisState(instance);

                const listener = () => {
                    this.hasChanged = true;
                    this.getCurrentAnalysisState(instance);
                }

                instance.analysis.layers.onAnySerializableChange.set(this.UUID, listener.bind(this));

                // instance.analysis.addListener( this.UUID, listener.bind(this) );
                instance.analysis.layers.onAdd.set(this.UUID, listener.bind(this));
                instance.analysis.layers.onRemove.set(this.UUID, listener.bind(this));

                instance.slots.onAnySlotChanged.set(this.UUID, listener.bind(this));

            }


        } else {
            this.log("Soubor neexistuje!");
        }
    }

    protected getCurrentAnalysisState(instance: ThermalFileInstance): string[] {

        const analyses: string[] = [];

        instance.analysis.value.forEach(analysis => {
            analyses.push(analysis.toSerialized());
        });

        this.analyses = analyses;
        this.requestUpdate();

        return analyses;

    }




    protected renderCopyToAllButton(): unknown {

        if (
            !this.file
            || (
                this.content.files
                && this.content.files.length <= 1
            )
        ) {
            return nothing;
        }

        return html`<thermal-btn
            tooltip="Zkopírovat analýzy do všech souborů ve složce"
            @click=${() => {

                if (!this.file) {
                    return;
                }

                this.file.group.analysisSync.copyAllSlotsToAllInstances(this.file);

            }}
            icon="link"
            iconStyle="micro"
        ></thermal-btn>`;
    }

    private renderDeleteButton(): unknown {

        const disabled = this.analyses.length === 0
            ? "true"
            : "false";

        return html`<thermal-btn
            tooltip="Odstranit všechny analýzy ze všech souborů ve složce"
            disabled=${disabled}
            @click=${() => {
                if (!this.file) {
                    return;
                }
                this.file.analysis.layers.removeAllAnalyses();
            }}
            icon="trash"
            iconStyle="micro"
        ></thermal-btn>`;
    }

    private renderServerSaveButton(): unknown {

        let callback: undefined | (() => Promise<void>) = undefined;
        let disabled: string = "true";

        if (this.hasChanged) {
            disabled = "false";
            callback = async () => {

                const request = this.client.api.routes.post.updateFile(
                    this.info.path,
                    this.info.fileName
                );

                request.clearAnalyses();

                for (const analysis of this.analyses) {

                    request.addAnalysis(analysis);

                }

                const result = await request.execute();

                if (result.success && result.data) {

                    this.content.updateFileState(result.data.file);
                    this.analyses = this.getCurrentAnalysisState(this.file!);
                    this.hasChanged = false;
                }

            };
        }

        return html`<thermal-btn
            tooltip="Uložit současný stav analýz na server"
            disabled=${disabled}
            @click=${callback}
            icon="save"
            iconStyle="micro"
        ></thermal-btn>`;
    }

    private renderServerRestoreButton(): unknown {

        let callback: undefined | (() => Promise<void>) = undefined;
        let disabled: string = "true";

        if (this.hasChanged && this.info.analyses.length > 0) {
            disabled = "false";
            callback = async () => {

                this.file?.analysis.layers.removeAllAnalyses();

                for (const analysis of this.info.analyses) {
                    this.log(analysis);
                    const a = this.file?.slots.createAnalysisFromSerialized(analysis);
                    a?.setSelected(false, true);
                    this.analyses = this.getCurrentAnalysisState(this.file!);
                    this.hasChanged = false;
                }

            };
        }

        return html`<thermal-btn
            tooltip="Obnovit analýzy ze serveru"
            disabled=${disabled}
            @click=${callback}
            icon="restore"
            iconStyle="micro"
        ></thermal-btn>`;

    }

    private renderServerDeleteButton(): unknown {


        let callback: undefined | (() => Promise<void>) = undefined;
        let disabled: string = "true";

        if (this.analyses.length > 0 && this.info.analyses.length > 0) {
            disabled = "false";
            callback = async () => {
                const request = this.client.api.routes.post.updateFile(
                    this.info.path,
                    this.info.fileName
                );
                request.clearAnalyses();

                const result = await request.execute();
                if (result.success && result.data) {
                    this.content.updateFileState(result.data.file);
                    this.analyses = this.getCurrentAnalysisState(this.file!);
                    this.hasChanged = true;
                }
            };
        }

        return html`<thermal-btn
            tooltip="Smazat všechny analýzy uložené na serveru"
            disabled=${disabled}
            @click=${callback}
            icon="trash"
            iconStyle="micro"
        ></thermal-btn>`;

    }

    private renderDisplaySlot(): unknown {

        const items: unknown[] = [];

        if (this.enableCopyToAll) {
            items.push(this.renderCopyToAllButton());
        }

        items.push(this.renderDeleteButton());

        return slotOrNothing(
            "display",
            items
        );

    }

    private renderServerSlot(): unknown {

        return slotOrNothing(
            "server",
            [
                this.renderServerSaveButton(),
                this.renderServerRestoreButton(),
                this.renderServerDeleteButton()
            ]
        )
    }


    static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: flex;
            gap: 1em;
        }

    `;

    protected render(): unknown {
        return [
            this.renderDisplaySlot(),
            this.renderServerSlot()
        ]
    }





}