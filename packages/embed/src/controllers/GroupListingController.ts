import type { AbstractFileResult, ThermalFileInstance, ThermalGroup } from "@labirthermal/core";
import { ThermalFileReader, TimeFormat } from "@labirthermal/core";
import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import type { StyleInfo } from "lit/directives/style-map.js";
import { styleMap } from "lit/directives/style-map.js";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController } from "./AbstractHierarchyController";
import type { FileController } from "./FileController";
import type { GroupController } from "./GroupController";

/**
 * Indicates how to order the files in a group. Used by {@link GroupListingController}
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export enum GroupOrderby {
    DATE = "date",
    LABEL = "label",
    MANUAL = "manual"
}

/**
 * Indicates how to order the files in a group. Used by {@link GroupListingController}
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export enum GroupOrdering {
    ASC = "asc",
    DESC = "desc"
}

/** @internal */
interface GroupListingRenderOptions {
    allowFileChanges?: boolean;
    onOpenDetail?: (instance: ThermalFileInstance) => void;
    onCloseDetail?: () => void;
}

type IHostProperties = {
    orderby: GroupOrderby;
    ordering: GroupOrdering;
}

export interface IElementWithGroupListingController extends AbstractThermalElement, IHostProperties {
    groupController: GroupController;
    fileController: FileController;
    groupListingController: GroupListingController;
}

export class GroupListingController extends AbstractHierarchyController<IElementWithGroupListingController> {

    private _UUID: string;

    public get UUID(): string {
        return this._UUID;
    }

    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        orderby: {type: String, reflect: true, attribute: "group-order-by"},
        ordering: {type: String, reflect: true, attribute: "group-ordering"}
    };

    private get group(): ThermalGroup {
        return this.host.groupController.groupObject;
    }

    private backup: Set<ThermalFileReader> = new Set();

    public get hasBackup(): boolean {
        return this.backup.size > 0;
    }

    public constructor(host: IElementWithGroupListingController) {
        super(host);
        this._UUID = host.UUID + "_group-display-controller";
    }

    public clearBackup(): void {
        this.backup.clear();
    }

    public backupReadersFromInstances(
        instances: ThermalFileInstance[]
    ): void {
        this.backup.clear();
        instances.forEach(instance => this.backup.add(instance.reader));
    }

    public backupReaders(
        readers: ThermalFileReader[]
    ): void {
        this.backup.clear();
        readers.forEach(reader => this.backup.add(reader));

        this.log( "backup", this.backup );
    }



    public async restoreTheEntireBackup(): Promise<void> {

        // this.host.fileController.removeInstance();

        return this.group.files.batchCreateInstances(Array.from(this.backup), true);

    }

    public async showOneAndBackup(
        instance: ThermalFileInstance
    ): Promise<void> {
        const reader = instance.reader;
        this.backup.clear();
        this.backupReadersFromInstances(this.group.files.value);
        this.host.fileController.host.registryController.setHighlight(undefined);
        this.host.fileController.removeInstance();
        this.group.files.removeAllInstances();
        await reader.createInstance(this.group);
    }

    public static CLASS_TABLE: string = "group-listing-table";
    public static CLASS_COLUMNS: string = "group-listing-columns";

    public static readonly styles = css`
        .group-listing {
            display: grid;
            width: 100%;
            min-width: 0;
            gap: 1em;
            align-items: start;
            grid-template-columns: repeat(var(--group-listing-columns, 3), minmax(0, 1fr));
        }

        .group-listing[data-layout="table"] {
            grid-template-columns: minmax(0, 1fr);
            overflow-x: auto;
        }

        .group-listing .file-card {
            display: grid;
            min-width: 0;
            box-sizing: border-box;
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: "header" "canvas" "analysis" "timeline";
            background: var(--thermal-background);
            border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
        }

        .group-listing[data-layout="grid"] .file-media,
        .group-listing[data-layout="grid"] .file-details,
        .group-listing[data-layout="grid"] .file-details-content {
            display: contents;
        }

        .file-card .file-header {
            grid-area: header;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            gap: .5em;
            padding: .5em;
            min-width: 0;
            box-sizing: border-box;
        }

        .file-card .file-label {
            cursor: pointer;
            min-width: 0;
            overflow-wrap: anywhere;
        }

        .file-card file-canvas {
            grid-area: canvas;
            min-width: 0;
        }

        .file-card file-timeline {
            grid-area: timeline;
            display: block;
            min-width: 0;
        }

        .file-card .file-analysis {
            grid-area: analysis;
            min-width: 0;
            box-sizing: border-box;
        }

        .group-listing[data-layout="table"] .file-card {
            grid-template-columns: var(--thermal-list-preview-width, 50%) minmax(0, 1fr);
            grid-template-areas: "media details";
            align-items: stretch;
            background: transparent;
        }

        .group-listing[data-layout="table"] .file-media {
            grid-area: media;
            min-width: 0;
            padding: 0;
        }

        .group-listing[data-layout="table"] .file-details {
            grid-area: details;
            position: relative;
            min-width: 0;
            min-height: 0;
            background: var(--thermal-background);
            border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
        }

        /* Only the media determines the row height; longer details scroll inside it. */
        .group-listing[data-layout="table"] .file-details-content {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            overflow: auto;
        }

        .group-listing[data-layout="table"] .file-details-content > * {
            flex: none;
        }
    `;

    private _numColumns: number = 3;
    private _asTable: boolean = false;
    private _previewWidth: number = 50;

    public setPreviewWidth(width: number): void {
        if (!Number.isInteger(width) || width < 20 || width > 80) {
            throw new RangeError("Preview width must be an integer from 20 to 80 percent.");
        }
        this._previewWidth = width;
        this.host.requestUpdate();
    }

    public setNumColumns(numColumns: number): void {
        this._numColumns = numColumns;
        this.host.requestUpdate();
    }

    public setAsTable(asTable: boolean): void {
        this._asTable = asTable;
        this.host.requestUpdate();
    }

    public renderListContainer(
        children: unknown
    ): unknown {

        return html`
            <div
                class="group-listing"
                data-layout=${this._asTable ? "table" : "grid"}
                style=${styleMap({
                    "--group-listing-columns": String(this._numColumns),
                    "--thermal-list-preview-width": `${this._previewWidth}%`
                })}
            >
                ${children}
            </div>
        `;

    }

    private _renderButton(
        icon: string,
        iconStyle: string,
        tooltip: string,
        active: boolean,
        onClick: () => void,
        slot?: string
    ): unknown {
        return html`
            <thermal-btn
                icon="${icon}"
                iconStyle="${iconStyle}"
                tooltip=${ifDefined( active ? undefined : tooltip )}
                variant=${active ? "background" : "default"}
                @click=${onClick}
                slot=${ifDefined(slot)}
            >
            </thermal-btn>
        `;
    }

    public renderLayoutSwitch(
        slot?: string
    ): unknown {

        return html`<thermal-btn-group>
            ${this._renderButton(
                "list",
                "micro",
                "Switch to table view",
                this._asTable,
                () => this.setAsTable(true),
                slot
            )}
            ${this._renderButton(
                "grid",
                "micro",
                "Switch to grid view",
                !this._asTable,
                () => this.setAsTable(false),
                slot
            )}
        </thermal-btn-group>`;

    }

    public renderColumnsSlider(
        slot?: string
    ): unknown {

        const min = this._asTable ? 20 : 1;
        const max = this._asTable ? 80 : Math.min(3, this.group.files.value.length);
        const value = this._asTable ? this._previewWidth : this._numColumns;
        const label = this._asTable ? "Šířka náhledu" : "Počet sloupců";

        const divStyles: StyleInfo = {
            display: "flex",
            flexDirection: "column",
            fontSize: "small"
        };

        return html`<div slot=${ifDefined(slot)} style=${styleMap(divStyles)}>
        <input type="range" aria-label=${label} min=${min} max=${max} step="1" .value=${String(value)} @input=${(e: Event) => {
                const target = e.target as HTMLInputElement;
                const next = parseInt(target.value, 10);
                if (this._asTable) {
                    this.setPreviewWidth(next);
                } else {
                    this.setNumColumns(next);
                }
            }}>
        <div style=${styleMap({ textAlign: "center", fontSize: ".7em",opacity: ".7", marginTop: "-0.2rem" })}>${label}: ${value}${this._asTable ? " %" : ""}</div>
        </div>`;

    }




    hostConnected(): void {
        // throw new Error("Method not implemented.");
    }

    hostDisconnected(): void {
        // throw new Error("Method not implemented.");
    }

    hostWillUpdateWatcher(): void {
        // Do nothing
    }

    hostUpdatedWatcher(): void {
        // Do nothing
    }

    private _orderFiles(): ThermalFileInstance[] {
        const files = Array.from(this.group.files.value);

        switch (this.host.orderby) {
            case GroupOrderby.LABEL:
                if (this.host.ordering === GroupOrdering.ASC) {
                    files.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));
                } else {
                    files.sort((a, b) => (b.label ?? "").localeCompare(a.label ?? ""));
                }
                break;
            case GroupOrderby.DATE:
                if (this.host.ordering === GroupOrdering.ASC) {
                    files.sort((a, b) => a.timestamp - b.timestamp);
                } else {
                    files.sort((a, b) => b.timestamp - a.timestamp);
                }
                break;
        }

        return files;

    }

    public renderList(
        fileRendererFn: (file: ThermalFileInstance) => unknown,
        emptyRendererFn?: () => unknown,
    ): unknown {

        if (this.group.files.value.length === 0) {
            return emptyRendererFn?.();
        }

        return repeat(this._orderFiles(), file => file.id, fileRendererFn);

    }

    private async handleFileDropAdd(
        results: AbstractFileResult[]
    ) {

        const fileReaders: ThermalFileReader[] = [];

        for ( const result of results ) {
            if ( result instanceof ThermalFileReader) {
                fileReaders.push(result);
                this.backup.add(result);
            }
        }

        await this.group.files.batchCreateInstances(fileReaders, false);
        

    }

    public renderListHeader(
        slot?: string,
        options: GroupListingRenderOptions = {}
    ): unknown {

        const divStyles: StyleInfo = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            boxSizing: "border-box",
            gap: "0.5em"
        };

        return html`<div slot="${ifDefined( slot )}" style=${styleMap(divStyles)}>

            <thermal-btn 
                variant="default" 
                style="cursor: default; font-size: .9em;"
                icon="folder"
                iconStyle="micro"
            >${options.allowFileChanges === false
                ? `Počet souborů: ${this.group.files.value.length}`
                : `${this.group.files.value.length} nahraných souborů`}</thermal-btn>

            ${options.allowFileChanges === false ? undefined : html`<thermal-btn
                tooltip="Smazat všechny soubory a nahrát nové"
                icon="trash"
                iconStyle="micro"
                variant="background"
                @click=${() => {
                    this.host.fileController.host.registryController.setHighlight(undefined);
                    this.clearBackup();
                    this.group.files.removeAllInstances();
                }}
            ></thermal-btn>
            <group-dropin-input 
                slot="bar-pre"
                variant="background"
                icon="upload"
                iconStyle="micro"
                tooltip="Nahrát další soubory"
                .onDrop=${async (results: AbstractFileResult[]) => {
                    await this.handleFileDropAdd(results);
                }}
            ></group-dropin-input>`}
            <group-download-dropdown 
                variant="background"
                icon="download"
                iconStyle="micro"
            >
                <span slot="invoker">Stáhnout skupinu</span>
            </group-download-dropdown>
            <div style="flex-grow: 1;"></div>
            ${this.renderLayoutSwitch()}
            ${this.renderColumnsSlider()}
        </div>`;

    }

    public renderThumbnail(
        instance: ThermalFileInstance,
        options: GroupListingRenderOptions = {}
    ) {

        const showDetail = () => {
            if (options.onOpenDetail) {
                options.onOpenDetail(instance);
            } else {
                this.showOneAndBackup(instance);
            }
        }

        return html`<file-provider
            class="file-card"
            .file=${instance}
            @mouseenter=${() => {
                this.host.groupController.registryController.setHighlight({
                    from: instance.min,
                    to: instance.max
                })
            }}
            @mouseleave=${() => {
                this.host.groupController.registryController.setHighlight(undefined);
            }}
        >
            <div class="file-media">
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>
            <div class="file-details">
                <div class="file-details-content">
                    <header class="file-header">
                        <div class="file-label" @click=${showDetail}>
                            <div>${TimeFormat.human(instance.timestamp)}</div>
                            <div style="font-size: small; opacity: .5;">${instance.fileName}</div>
                        </div>

                        <div style="flex-grow: 1;"></div>
                        ${options.allowFileChanges === false ? undefined : html`<thermal-btn
                            tooltip="Smazat soubor"
                            icon="trash"
                            iconStyle="micro"
                            @click=${async () => {

                                this.backup.delete(instance.reader);

                                this.group.files.removeAllInstances();

                                await this.restoreTheEntireBackup();

                                this.host.requestUpdate();

                            }}
                        ></thermal-btn>`}
                        <file-download-dropdown>
                            <thermal-icon
                                icon="download"
                                variant="micro"
                                slot="invoker"
                                style="width: 1.1em;"
                            ></thermal-icon>
                        </file-download-dropdown>
                        <thermal-btn
                            icon="range"
                            iconStyle="outline"
                            @click=${() => {
                                this.host.groupController.registryController.registryObject.range.imposeRange({
                                    from: instance.min,
                                    to: instance.max
                                });
                            }}
                        ></thermal-btn>
                        <thermal-btn
                            tooltip="Zobrazit detail"
                            icon="eye"
                            iconStyle="solid"
                            @click=${showDetail}
                        ></thermal-btn>
                    </header>
                    <div class="file-analysis">
                        <file-analysis-table
                            table-mode="compact"
                            ?forceinteractiveanalysis=${true}
                            ?graph-activation-enabled=${true}
                        ></file-analysis-table>
                        <file-analysis-graph ?standalone=${true}></file-analysis-graph>
                    </div>
                </div>
            </div>
        </file-provider>`;

    }

    public renderDetailHeader(
        instance: ThermalFileInstance,
        slot?: string,
        options: GroupListingRenderOptions = {}
    ): unknown {

        const divStyles: StyleInfo = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            boxSizing: "border-box",
            // background: "var(--thermal-background)",
            // borderRadius: "var(--thermal-radius)",
            // padding: "0.5em",
            gap: "0.5em"
        };

        const isSingular = !options.onCloseDetail && this.backup.size <= 1;
        const fileCount = options.onCloseDetail ? this.group.files.value.length : this.backup.size;

        const backLabel = isSingular ? "Zavřít" : "Zpět";
        const backTooltip = options.allowFileChanges === false
            ? "Zpět na seznam souborů"
            : isSingular ? "Zavřít soubor a nahrát nový/é" : `Zpět na Vašich ${ fileCount } souborů`;
        const backIcon = isSingular ? "close" : "back";
        const backIconStyle = isSingular ? "micro" : "micro";

        return html`<div style=${styleMap(divStyles)} slot=${ifDefined(slot)}>

            <thermal-btn 
                variant="foreground" 
                tooltip="Název souboru" 
                style="cursor: default; font-size: .9em;"
                icon="image"
                iconStyle="micro"
            >${instance.fileName}</thermal-btn>

            <thermal-btn 
                variant="foreground" 
                tooltip="Čas pořízení snímku" 
                style="cursor: default; font-size: .9em;"
                icon="clock"
                iconStyle="outline"
            >${TimeFormat.human( instance.timestamp )}</thermal-btn>

            <thermal-btn
                icon=${backIcon}
                iconStyle=${backIconStyle}
                tooltip="${backTooltip}"
                variant="foreground"
                @click=${() => {
                    if (options.onCloseDetail) {
                        options.onCloseDetail();
                    } else if ( this.backup.size <= 1 ) {
                        this.group.files.removeAllInstances();
                        this.host.fileController.removeInstance();
                        this.host.requestUpdate();
                    } else {
                        this.restoreTheEntireBackup();
                    }
                }}
            >${backLabel}</thermal-btn>
            <file-info-button>
                <thermal-btn 
                    slot="invoker" 
                    icon="info" 
                    iconStyle="solid"
                    variant="background"
                >Informace o souboru</thermal-btn>
            </file-info-button>

            <file-download-dropdown
                icon="download"
                iconStyle="micro"
                variant="background"
            ></file-download-dropdown>

        </div>`;
    }

    /** Assumes the contexts to be provided by the host element */
    public renderDetailBody(): unknown {

        const containerStyles: StyleInfo = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1em",
            width: "100%"
        };


        return html`<div style=${styleMap(containerStyles)}>
            <div>
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>
            <file-analysis-complex
                table-mode="full"
                ?forceinteractiveanalysis=${true}
                ?graph-activation-enabled=${true}
            ></file-analysis-complex>
        </div>`;
    }




}