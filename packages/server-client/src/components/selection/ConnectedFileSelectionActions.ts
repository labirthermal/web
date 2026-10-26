import type { ThermalGroup } from "@labirthermal/core";
import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { state } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";
import type { ConnectedLocationSelector } from "./move/ConnectedLocationSelector";
// import { zip } from "@labirthermal/core";
import type { ThermalDialogElement } from "@labirthermal/webcomponents";
import { groupObjectContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";

export class ConnectedFileSelectionActions extends AbstractControlledConsumer {

    @state()
    private progress: number = 0;

    @state()
    private total: number = 0;

    private dialogDeleteRef: Ref<ThermalDialogElement> = createRef();
    private dialogSaveAnalysesRef: Ref<ThermalDialogElement> = createRef();
    private dialogClearAnalysesRef: Ref<ThermalDialogElement> = createRef();
    private dialogMoveRef: Ref<ConnectedLocationSelector> = createRef();

    @consume( { context: groupObjectContext, subscribe: true } )
    private group?: ThermalGroup;


    connectedCallback(): void {
        super.connectedCallback();
        this.selectionFile.subscribeToSelectionChange(this);
        this.content.subscribeToFilesUpdates(this);
    }

    private getCount(): number {
        return this.selectionFile.array.length;
    }

    private renderTrigger(): unknown {

        return html`<span slot="invoker">${this.getCount()} vybraných</span>`;

    }

    private renderOptionClear(): unknown {

        return html`<thermal-btn 
            @click=${() => {
                this.selectionFile.clearSelection();
            }}
            slot="option"
            icon="close"
            iconStyle="micro"
            align="left"
        >Zrušit výběr</thermal-btn>`;

    }

    private renderOptionAll(): unknown {

        const allSelected = this.selectionFile.array.length === this.content.files?.length;

        const callback = allSelected
            ? undefined
            : () => {
                if (this.content.files) {
                    this.selectionFile.addMultipleToSelection(this.content.files);
                }
            }

        return html`<thermal-btn
            @click=${callback}
            slot="option"
            disabled=${allSelected ? "true" : "false"}
            icon="bigger"
            iconStyle="mini"
            align="left"
        >Vybrat všechny</thermal-btn>`;


    }

    

    private renderOptionDelete(): unknown {

        return html`<thermal-btn
            slot="option"
            @click=${ () => {
                this.dialogDeleteRef.value?.setOpen();
            } }
            icon="trash"
            iconStyle="micro"
            align="left"
        >Trvale smazat ze serveru</thermal-btn>`;

    }

    private renderDialogDelete(): unknown {

        const callback = async () => {

            this.progress = 0;
            this.total = this.selectionFile.array.length;

            await this.selectionFile.forEverySelectedAsync(async file => {

                await this.client.api.routes.post.deleteFile(file.path, file.fileName).execute();

                this.progress++;

            });

            this.progress = 0;
            this.total = 0;

            this.dialogDeleteRef.value?.setClose();
            this.selectionFile.clearSelection();
            this.display.reloadCurrentState();

            return true;

        }

        let progress: unknown = nothing;

        if (this.progress > 0) {
            progress = html`<div>
                <div slot="option">Mažu ${this.progress} z ${this.total} souborů...</div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${(this.progress / this.total) * 100}%"></div>
                </div>
            </div>`;
        }

        return html`<thermal-dialog
            label="Smazat vybrané soubory"
            ${ref(this.dialogDeleteRef)}
        >
            

            <div slot="content">
            
                <p>Opravdu chcete trvale smazat ${this.selectionFile.array.length} souborů?</p>

                <ul>
                    ${this.selectionFile.array.map(file => html`<li>${file.fileName}</li>`)}
                </ul>

                ${progress}
            
            </div>

            <thermal-btn @click=${callback} slot="button" variant="primary">Proveď</thermal-btn>

        </thermal-dialog>`;

    }

    private renderOptionClearAnalyses(): unknown {

        return html`<thermal-btn
            slot="option"
            @click=${ () => {
                this.dialogClearAnalysesRef.value?.setOpen();
            } }
            icon="trash"
            iconStyle="micro"
            align="left"
        >Odstranit analýzy uložené na serveru</thermal-btn>`;

    }

    private renderDialogClearAnalyses(): unknown {

        const callback = async () => {

            this.progress = 0;
            this.total = this.selectionFile.array.length;

            await this.selectionFile.forEverySelectedAsync(async file => {

                await this.client.api.routes.post.updateFile(
                    file.path,
                    file.fileName
                ).clearAnalyses().execute();

                this.progress++;

            });

            this.progress = 0;
            this.total = 0;

            this.dialogClearAnalysesRef.value?.setClose();
            this.selectionFile.clearSelection();
            this.display.reloadCurrentState();

            return true;

        }

        let progress: unknown = nothing;

        if (this.progress > 0) {
            progress = html`<div>
                <div slot="option">Mažu analýzy ${this.progress}. z ${this.total} souborů...</div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${(this.progress / this.total) * 100}%"></div>
                </div>
            </div>`;
        }

        return html`<thermal-dialog
            label="Smazat analýzy u vybraných souborů"
            ${ref(this.dialogClearAnalysesRef)}
        >

            <div slot="content">
            
                <p>Opravdu chcete trvale smazat analýzy u ${this.selectionFile.array.length} souborů?</p>

                <ul>
                    ${this.selectionFile.array.map(file => html`<li>${file.fileName}</li>`)}
                </ul>

                ${progress}
            
            </div>

            <thermal-btn @click=${callback} slot="button" variant="primary">Proveď</thermal-btn>

        </thermal-dialog>`;

    }

    private renderOptionMove(): unknown {

        return html`<thermal-btn
            slot="option"
            @click=${() => {
                this.log( this.dialogMoveRef.value );
                this.dialogMoveRef.value?.openDialogue();
            }}
            icon="move"
            iconStyle="mini"
            align="left"
        >Přesunout</thermal-btn>`;

    }


    private renderDialogMove(): unknown {
        return html`<connected-location-selector
            .asDialogue=${true}
            ${ ref( this.dialogMoveRef )}
            mode="file"
            dialogTitle="Přesunout vybrané soubory"
            operationLabel="Přesunout do"
            .onSelect=${async ( path: string ) => {
                

                await this.selectionFile.forEverySelectedAsync( async( file ) => {

                    const result = await this.client.api.routes.post.moveFile(
                        file.path,
                        file.fileName,
                        path
                    ).execute();

                    this.log( result );

                    this.log( `Přesouvám ${file.fileName} z ${file.path} do ${path}. Výsledek: ${result.success}` );

                } );

                this.dialogMoveRef.value?.closeDialogue();

                this.display.navigateToFolderAndLoad( path );

            }}
        >
        </connected-location-selector>`;
    }

    private renderOptionDownload(): unknown {

        

        const handler = async () => {

            const instances = this.group?.getInstances();

            if ( instances ) {

                const files: File[] = [];

                this.selectionFile.forEverySelectedSync( info => {

                    const instance = instances.find( i => i.thermalUrl === info.url );

                    if ( instance ) {

                        const blob = new Blob( [ instance.reader.buffer ], { type: "application/octet-stream" } );

                        const file = new File(
                            [ blob ],
                            info.fileName,
                            { type: "application/octet-stream" }
                        );
                        files.push( file );
                    }

                } );

                // const archive = await zip.zip( files, true );

                const folderName = this.content.folder?.name || "files";

                const selectionName = [
                    "selected",
                    this.selectionFile.array.length,
                    "files"
                ].join("-");

                const fileName = `${folderName}_${selectionName}.zip`;

                const link = document.createElement( "a" );
                // link.href = URL.createObjectURL( archive );
                link.download = fileName;
                document.body.appendChild( link );
                link.click();
                document.body.removeChild( link );
                link.remove();


            } else {
                this.log( "No files were found!" );
            }



        }

        return html`<thermal-btn
            slot="option"
            @click=${handler.bind(this)}
            icon="download"
            iconStyle="micro"
            align="left"
        >Stáhnout jako ZIP</thermal-btn>`;

    }


    static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: flex;
            align-items: center;
            gap: .5em;
        }

        thermal-icon {
            width: 1em;
        }

        .progress {
            position: relative;
            width: 100%;
            height: 1em;
            background-color: var( --thermal-slate-dark );
            border-radius: var( --thermal-radius );
            overflow: hidden;
            border: 1px solid var( --thermal-slate-dark );
        }

        .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: var( --thermal-primary );
        }
    
    `;


    private renderDropdownSelection(): unknown {

        return html`<thermal-dropdown
            variant="primary"
        >
            ${this.renderTrigger()}
            ${this.renderOptionClear()}
            ${this.renderOptionAll()}
        </thermal-dropdown>`;

    }

    private renderArrow(): unknown {

        return html`<thermal-icon icon="right" variant="micro"></thermal-icon>`;

    }

    private renderDropdownActions(): unknown {

        return html`<thermal-dropdown
            variant="foreground"
        >
            <span slot="invoker">Zvolte akci</span>
            ${this.renderOptionDownload()}
            ${this.renderOptionMove()}
            ${this.renderOptionDelete()}
            ${this.renderOptionClearAnalyses()}
        </thermal-dropdown>`;

    }

    private renderDalogs(): unknown {
        return [
            this.renderDialogDelete(),
            this.renderDialogClearAnalyses(),
            this.renderDialogMove()
        ];
    }

    protected render(): unknown {

        if (this.selectionFile.getSelectedFiles().length === 0) {
            return nothing;
        }

        return [
            this.renderDropdownSelection(),
            this.renderArrow(),
            this.renderDropdownActions(),
            this.renderDalogs()
        ];

    }


}