import type { ThermalRegistry } from "@labirthermal/core";
import { TimeFormat } from "@labirthermal/core";
import type { RegistryController } from "@labirthermal/webcomponents";
import { registryControllerContext, registryObjectContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { FileInfo, FolderInfo } from "../../../client/responseEntities";
import type { GetGridDataType } from "../../../client/routes/get/GetGrid";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";


export class ConnectedSubfoldersGrid extends AbstractControlledConsumer {

    @property({ type: String })
    public slug: string = "default_group";

    @property({ type: Function })
    public onFolderClick?: (folder: FolderInfo) => void;

    @property({ type: Function })
    public onFileClick?: (folder: FolderInfo, file: FileInfo) => void;

    @property({ type: Function })
    public onFileEdit?: (file: FileInfo) => void;

    @consume({ context: registryControllerContext, subscribe: true })
    protected registryController!: RegistryController;

    @state()
    private columnCount: number = 0;

    @property({ type: Object })
    public selectedFolders: string[] = [];

    @property({ type: Function })
    public onSelectionChange: (selected: string[]) => void = () => { };

    @state()
    @consume({ context: registryObjectContext, subscribe: true })
    protected registry!: ThermalRegistry;

    firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        this.columnCount = Object.keys(
            this.content.grid?.header ?? {}
        ).length;


        // Add listener for processing end to refresh the component
        this.registry.onProcessingEnd.set(this.UUID, () => {
            this.requestUpdate();
        });
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        // Remove listener for processing end
        this.registry.onProcessingEnd.delete(this.UUID);
    }

    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);
        this.columnCount = Object.keys(this.content.grid?.header ?? {}).length;
    }

    private renderHeader(
        header: GetGridDataType["header"]
    ): unknown {

        const items = Object.values(header);

        if (items.length === 0) {
            return nothing;
        }

        return html`<thead>
            ${items.map(this.renderHeaderCell.bind(this))}
        </thead>`;

    }

    private renderHeaderCell(
        folder: FolderInfo,
    ): unknown {
        return html`<th class="folder-header cell cell_header">
            <div
                class="cell-inner"
            >

                <thermal-icon icon="folder" variant="outline"></thermal-icon>

                <div>

                    <h2>${folder.name}</h2>
                    
                    ${folder.description ? html`<p class="description small">${folder.description}</p>` : nothing}

                </div>

                <div class="folder-header-buttons">

                    <connected-upload-dialog
                        .folder=${folder}
                        label=""
                        variant="default"
                        plain="true"
                        tooltip="Nahrát do složky '${folder.name}'"
                        .onSuccess=${() => {
                this.display.reloadCurrentState();
            }}
                    ></connected-upload-dialog>

                    <thermal-btn
                        tooltip="Zobrazit všech ${folder.lrc_count} souborů ve složce '${folder.name}'."
                        @click=${() => this.onFolderClick?.(folder)}
                        ?plain=${true}
                        icon="zoom"
                        iconStyle="micro"
                    ></thermal-btn>

                </div>
            </div>
        </th>`;
    }


    private renderBody(
        body: GetGridDataType["groups"]
    ): unknown {

        const items = Object.values(body);
        if (items.length === 0) {
            return nothing;
        }

        return html`<tbody>
            ${items.map(this.renderBodyRow.bind(this))}
        </tbody>`;
    }

    private renderBodyRow(item: GetGridDataType["groups"][number]): unknown {

        const folders = Object.values(item.folders);

        // this.log(item.label, folders);

        return html`

        <group-provider
            slug="${this.slug + item.label}"
            batch="true"
            autoclear="true"
            style="display: contents;"
        >

            ${this.renderBodyRowCellHeader(item.label)}

            <tr class="group-row__body">
                ${folders.map(folder => this.renderBodyRowCellBody(folder))}
            </tr>

        </group-provider>
        `;
    }

    private renderBodyRowCellHeader(label: string): unknown {

        const groupSlug = this.slug + label;

        const group = this.registry.groups.value.find(g => g.id === groupSlug);

        const minmax = group?.minmax.value;

        const tooltip = minmax ? [
            minmax.min.toFixed(2),
            minmax.max.toFixed(2)
        ].join(" - ") + "  °C" : ";"


        const click = () => {
            if (minmax) {

                this.registry.range.imposeRange({
                    from: minmax.min,
                    to: minmax.max
                });

            }
        }

        const mouseenter = () => {

            if (this.registryController && minmax) {
                this.registryController.setHighlight({
                    from: minmax.min,
                    to: minmax.max
                });
            }

        }

        const mouseleave = () => {
            if (this.registryController) {
                this.registryController.setHighlight(undefined);
            }
        }


        return html`<tr class="group-row__header">
    <td class="group-header cell" colspan="${this.columnCount}">
        <div class="group-separator"></div>
        <div class="cell-inner">

            <thermal-btn
                class="cell-button"
                tooltip=${tooltip}
                @click=${click.bind(this)}
                @mouseleave=${mouseleave.bind(this)}
                @mouseenter=${mouseenter.bind(this)}
            >${label}</thermal-btn>

            <div style="display: inline-block; text-align: left;">
                <group-download-dropdown></group-download-dropdown>
            </div>

        </div>
    </td>
</tr>`;
    }

    private renderBodyRowCellBody(
        files: FileInfo[]
    ): unknown {

        if (!this.content.grid || files.length === 0) return html`<td></td>`;

        const folder = this.content.grid!.header[files[0].folder]!;

        return html`<td class="folder-content cell">
    <div class="cell-inner">
        ${files.map(file => this.renderBodyRowCellBodyFile(folder, file))}
    </div>
</td>`;

    }

    private renderBodyRowCellBodyFile(
        folder: FolderInfo,
        file: FileInfo
    ): unknown {
        return html`
            <file-provider
                batch="true"
                autoclear="true"
                thermal="${file.url}"
                class="file-entry"
            >

                <header>

                    <div class="file-entry-info">
                        <h4>${TimeFormat.human(file.timestamp)}</h4>
                        <p class="small">${file.label}</p>
                    </div>

                    <div class="file-entry-buttons">

                        <connected-file-tags
                            .inline=${true}
                            .file=${file}
                            .folder=${folder}
                            .editable=${this.display.editTags}
                            .onChange=${(file: FileInfo) => {
                this.log("tags changed");
                this.onFileEdit?.(file);
            }}
                            size="sm"
                        ></connected-file-tags>

                        <file-range-propagator
                            ?plain=${true}
                            icon="range"
                            iconStyle="outline"
                            size="md"
                            ?hide-label=${true}
                        ></file-range-propagator>

                        <connected-file-delete-dialog
                            .file=${file}
                            .folder=${folder}
                            size="md"
                            ?plain=${true}
                            .onDelete=${() => {
                this.display.reloadCurrentState();
            }}
                        ></connected-file-delete-dialog>
                        
                        <thermal-btn
                            ?plain=${true}
                            icon="zoom"
                            iconStyle="micro"
                            tooltip="Zobrazit detail tohoto souboru."
                            @click=${() => {
                this.onFileClick?.(folder, file);
            }}
                        >
    
                        </thermal-btn>

                    </div>
                </header>
                
                <file-canvas style="display: block;"></file-canvas>

                ${this.display.displayComments ? html`<div class="comments">
                    <file-comments
                    .file=${file}
                    .folder=${folder}
                    .onChange=${(file: FileInfo) => {
                    this.log("comments changed");
                    this.onFileEdit?.(file);
                }}
                    ></file-comments>
                </div>` : nothing}


            </file-provider>
        
        `;
    }

    static styles?: CSSResultGroup | undefined = css`

        :root {
            --cell-indent: .5em;
        }
    
        :host {

            --cell-indent: .5em;

            width: 100%;

            position: relative;

            font-size: var( --thermal-fs );
            color: var(--thermal-foreground);

            box-sizing: border-box;

            display: table;
            table-layout: fixed;

            

            & > thermal-poster {
                display: table-row;
                width: 100%;
            }

        }

        group-provider {
            display: contents;
        }

        tr, td, th {
            margin: 0;
            padding: 0;
            border: none;
            border-collapse: collapse;
            text-align: left;
            width: auto;
            box-sizing: border-box;
        }

        thead {
            position: sticky;
            top: 0px;
            z-index: 100;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        th,
        p {
            font-family: var(--thermal-font-family, sans-serif);
            font-size: var(--thermal-fs);    
            font-weight: normal;
            line-height: 1em;
            margin: 0;
            padding: 0;
            border: 0;
            text-align: left;
            box-sizing: border-box;
        }

        .cell-button {
        }

        .small {
            font-size: 0.8em;
            opacity: .5;
        }

        .cell,
        .cell-inner {
            box-sizing: border-box;
        }

        .cell {
        
        }

        .cell-inner {
            height: 100%;
        }

        
        .cell-indent {
            padding: var(--cell-indent);
        }

        .folder-header {
            padding: 0 var(--cell-indent);
        }

        .cell_header {

            > .cell-inner {
                display: grid;
                gap: .5em;
                grid-template-columns: 1.5em 1fr auto;
                grid-template-rows: auto;
                position: relative;
                padding: 1em;
                background: var(--thermal-background);
                border-radius: var(--thermal-radius);

                thermal-icon {
                    opacity: .5;
                }

                h2 {
                    font-weight: bold;
                }

                .description {
                    margin-top: .25em;
                }

                &::after {
                    content: "";
                    position: absolute;
                    width: 1em;
                    height: 1em;
                    background: var(--thermal-background);
                    bottom: -.5em;
                    transform: rotate(45deg);
                    left: 1.15em;
                }
            }

        }

        .group-header {

            text-align: center;
            position: relative;

            padding-top: 1em;
            padding-bottom: .5em;

            .cell-inner {

                position: relative;
                
                thermal-btn {
                    display: inline-block;
                }
                
            }

            

            .group-separator {
                position: absolute;
                height: 1.5em;
                width: 100%;
                left: 0px;
                bottom: 0px;

                border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;

                border-top: var(--thermal-border-width) var(--thermal-border-style)var(--thermal-slate);
                
                z-index: 0;
                
            }
        }

        .folder-header-buttons {
            display: flex;
            align-items: flex-start;
            gap: .25em;
        }

        .folder-content {

            .cell-inner {
                padding: 0 .5em;
            }
            
        }

        .file-entry {

            padding-bottom: 1em;
            display: block;

            &:last-child {
                padding-bottom: 0;
            }
        
            & > header {

                padding: .5em;
                box-sizing: border-box;

                width: 100%;

                border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
                background: var(--thermal-background);

                display: grid;
                grid-template-columns: 1fr auto;


                .file-entry-info {
                    display: flex;
                    gap: .5em;
                    align-items: center;
                    & > * {
                        display: inline-flex;
                    }
                }

                .file-entry-buttons {
                    display: flex;
                    align-items: center;
                    gap: .23em;
                }

            }

            .comments {
                background: var(--thermal-background);
                padding: .5em;
                box-sizing: border-box;
                border-radius: 0 0 var(--thermal-radius) var(--thermal-radius);
            }

            file-comments {
                background: var(--thermal-slate-light);

                padding: 1em;
                box-sizing: border-box;

                border-radius: var(--thermal-radius);

                height: 300px;
                
            }
        
        }
    
    `;

    protected render(): unknown {


        if (this.content.grid === undefined) {
            return html`<thermal-poster message="Načítám mřížku"></thermal-poster>`;
        }

        return [
            this.renderHeader(this.content.grid?.header ?? {}),
            this.renderBody(this.content.grid?.groups ?? [])
        ];

    }

}

declare global {
    interface HTMLElementTagNameMap {
        "connected-subfolders-grid": ConnectedSubfoldersGrid;
    }
}