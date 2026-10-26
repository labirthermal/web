import type { BreadcrumbItem, FolderInfo } from "@labirthermal/client";
import type { CSSResultGroup} from "lit";
import { css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { map } from "lit/directives/map.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import type { StyleInfo} from "lit/directives/style-map.js";
import { styleMap } from "lit/directives/style-map.js";
import type { ThermalDialogElement } from "../../../../../ui/Dialog";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";



export enum LocationSelectorMode {
    FOLDER = "folder",
    FILE = "file"
}

@customElement( "connected-location-selector" )
export class ConnectedLocationSelector extends AbstractControlledConsumer {

    private dialogRef: Ref<ThermalDialogElement> = createRef<ThermalDialogElement>();

    @property({ type: Boolean })
    public asDialogue: boolean = false;

    @property({ type: String })
    public dialogTitle?: string;

    @property({ type: String })
    public mode!: LocationSelectorMode;

    @property({type: Object })
    public onSelect?: ( selectedPath: string ) => void;

    @property({ type: String})
    public operationLabel: string = "Vybrat";


    @state()
    private _loading: boolean = false;

    @state()
    private _currentFolderInfo?: FolderInfo;

    @state()
    private _currentSubfolders?: FolderInfo[];

    @state()
    private _userFolders?: FolderInfo[];

    @state()
    private _breadcrumb?: BreadcrumbItem[];

    public get selectedFolderName(): string | undefined {
        return this._currentFolderInfo?.name;
    }

    public get selectedFolderPath(): string | undefined {
        return this._currentFolderInfo?.path;
    }

    public openDialogue(): void {

        if (  this.asDialogue && this.dialogRef.value ) {
            this.dialogRef.value.setOpen();
        }

    }

    public closeDialogue(): void {
        if (  this.asDialogue && this.dialogRef.value ) {
            this.dialogRef.value.setClose();
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.client.subscribeToIdentityChanges( this );

        if ( this.client.isLoggedIn ) {
            this._currentSubfolders = [ ...this.content.userFolders ];
        }

        // Sync user folders
        this.content.onUserFoldersUpdate.add(
            this.UUID,
            ( userFolders ) => {
                this._userFolders = [...userFolders ?? []];
            }
        );

    }

    private async _onPathChange(
        newPath: string
    ) {

        this._loading = true;

        const info = await this.client.api.routes.get.info( newPath ).execute();

        if ( info.data ) {
            this._currentFolderInfo = info.data.folder;
            this._currentSubfolders = Object.values( info.data.subfolders );
            this._breadcrumb = info.data.breadcrumb;
        }

        this._loading = false;

    }


    static styles?: CSSResultGroup | undefined = css`
    
        :host {
            font-size: var( --thermal-fs );
            display: block;
        }

        .list {
        
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        
        }

        .list-item {
        
            display: flex;
            align-items: center;
            gap: 0.5em;
            box-sizing: border-box;
            background: var( --thermal-background );
            border-radius: var( --thermal-radius );

            .folder-name {
                flex-grow: 1;
                cursor: pointer;
                padding: .25em .5em;
            }

            thermal-btn {
                opacity: 0;
                transition: opacity .3s ease-in-out;
            }

            thermal-icon {
                width: 1em;
                height: 1em;
                display: inline-block;
            }

            &.selectable {
                .folder-name {
                    cursor: pointer;
                }
            }

            &.disabled {
                text-decoration: strikethrough;
                color: var( --thermal-slate );
            }

            &:hover,
            &:focus {
            
                thermal-btn {
                    opacity: 1;
                }
            
            }

        }

        .breadcrumb {

            display: flex;
            flex-wrap: wrap;
            gap: 1em;

            thermal-btn {

                position: relative;
            
                &:not(:last-child)::after {
                    content: "/";
                    position: absolute;
                    display: block;
                    width: 1em;
                    height: 100%;
                    right: -1em;
                    top: 0;
                    color: var( --thermal-slate );
                    pointer-events: none;
                }
            
            }
        }

        .content {
        
            display: flex;
            flex-direction: column;
            gap: 1em;
            width: 100%;
        
        }

        .poster {
        
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: .5em;
            padding: 1em;

            width: 100%;
            min-height: 200px;
            box-sizing: border-box;

            border: 1px dashed var( --thermal-slate );
            border-radius: var( --thermal-radius );

        }
    
    `;

    private renderBreadcrumbItemInternal(
        label: string,
        onClick: () => void,
        isLast: boolean,
        tooltip?: string
    ): unknown {

        const style: StyleInfo = {
            "pointer-events": isLast ? "none" : "auto",
            "font-weight": isLast ? "bold" : "normal"
        }

        return html`<thermal-btn 
            variant="text"
            tooltip=${tooltip}  
            @click=${onClick}
            style=${styleMap( style )}
        >
        ${label}</thermal-btn>`;
    }

    private renderBreadcrumbItem(
        item: BreadcrumbItem,
        isLast: boolean = false
    ): unknown {

        if ( item.type !== "folder" ) {
            return nothing;
        }

        return this.renderBreadcrumbItemInternal(
            item.name,
            () => this._onPathChange( item.path ),
            isLast,
            `Zobrazit obsah složky ${item.name}`
        );

    }

    private renderBreadcrumb(): unknown {
        if ( ! this._breadcrumb && ! this.client.isLoggedIn) {
            return nothing;
        }

        const userItem = this.renderBreadcrumbItemInternal(
            this.client.identity?.meta.name ?? this.client.identity?.user ?? "User",
            () => {
                this._currentFolderInfo = undefined;
                this._currentSubfolders = this.content.userFolders;
                this._breadcrumb = undefined;
            },
            false,
            "Zobrazit všechny Vaše složky"
        );

        return html`<div class="breadcrumb">
            ${ userItem }
            ${ map( this._breadcrumb, (item, index) => this.renderBreadcrumbItem( item, index === this._breadcrumb!.length - 1 ) ) }
        </div>`;
    }

    private renderBackButton(): unknown {

        if (  this._currentSubfolders === undefined || this._currentFolderInfo === undefined ) {
            return nothing;
        }

        const parentSegments = this._currentFolderInfo.path.split("/").slice( 0, -1 );
        
        if ( parentSegments.length === 0) {
            return nothing;
        }
        
        const parent = parentSegments.join("/");

        return html`<thermal-btn 
            icon="back"
            iconStyle="micro"
            @click=${() => this._onPathChange(parent)}
        >${this.t("back")}</thermal-btn>`;

    }

    private renderFolderSelector(
        folderInfo: FolderInfo
    ): unknown {

        const classes: Record<string, boolean> = {
            "list-item": true
        };

        const disabled = this.mode === LocationSelectorMode.FOLDER && folderInfo.may_have_files === true;

        if ( disabled ) {
            classes.disabled = true;
        }

        let actionButton: unknown = nothing;

        const clickAction: () => void = () => {
            if ( disabled ) {
                return;
            }
            this._onPathChange(folderInfo.path)
        };

        const subselectButton: unknown = disabled 
        ? html`<thermal-btn 
            plain="true"
            disabled="true"
            variant="background"
            tooltip="Složka ''${folderInfo.name}'' je určena pro soubory"
        >Neplatné umístění</thermal-btn>`
        : html`<thermal-btn
            icon="right"
            iconStyle="micro"
            plain="true"
            variant="background"
            tooltip="Přejít do složky '${folderInfo.name}'"
            @click=${clickAction.bind(this)}
        ></thermal-btn>`;

        const name = this.getEllipsisName( folderInfo );

        if ( this.mode === LocationSelectorMode.FOLDER && !disabled) {

            actionButton = html`<thermal-btn
                variant="primary"
                @click=${() => {
                    this.onSelect?.( folderInfo.path );
                }}
            >${this.operationLabel} '${name}'</thermal-btn>`;

            classes.selectable = true;

        } else if ( this.mode === LocationSelectorMode.FILE && this.folderIsValidForFiles( folderInfo ) ) {
                
            actionButton = html`<thermal-btn
                variant="primary"
                @click=${() => {
                    this.onSelect?.( folderInfo.path );
                }}
            >${this.operationLabel} '${name}'</thermal-btn>`;

            classes.selectable = true;
        }

        return html`<div
            class=${classMap( classes )}
        >
            <span 
                @click=${clickAction.bind(this)}
                class="folder-name"
            >
                <thermal-icon icon="folder" variant="micro"></thermal-icon>
                ${ folderInfo.name }
            </span>
            ${ actionButton }
            ${ subselectButton }
        </div>`;

    }

    private folderIsValidForFiles(
        info?: FolderInfo
    ): boolean {

        if ( ! info ) return false;

        return info.may_have_files === true
            && info.may_manage_files_in === true;

    }

    private folderIsValidForFolders(
        info?: FolderInfo
    ): boolean {

        if ( ! info ) return false;

        return info.may_have_files === false
            && info.may_manage_folders_in === true;

    }



    private renderNoSubfolders(): unknown {

        const folderName = this._currentFolderInfo?.name;
        let label: unknown = nothing;

        if ( this.mode === LocationSelectorMode.FOLDER ) {

            label = this.folderIsValidForFolders( this._currentFolderInfo )
                ? nothing
                : "Sem nelze složky přesunout - toto umístění je určeno pouze pro soubory, nikoliv pro složky";

        } else if ( this.mode === LocationSelectorMode.FILE ) {

            label = this.folderIsValidForFiles( this._currentFolderInfo )
                ? nothing
                : "Sem nelze soubory přesunout - toto umístění je určeno pouze pro složky, nikoliv pro soubory"

        }

        const fileCount = this._currentFolderInfo?.lrc_count ?? 0;

        const fileCountHtml = fileCount > 0
            ? html`<div>${fileCount} soubor${ fileCount === 1 ? "" : "ů" }</div>`
            : nothing;


        return html`<div class="poster">
        
            <div>Cílová složka:</div>
            <div><strong>${folderName}</strong></div>
            ${fileCountHtml}
            <div>${label}</div>
        
        </div>`;

    }

    private renderFolderList(): unknown {

        const folders = this._currentSubfolders
            ? this._currentSubfolders
            : this._userFolders ?? [];

        if ( folders.length === 0 ) {
            return this.renderNoSubfolders();
        }

        folders.sort( ( a, b ) => a.name.localeCompare( b.name ) );

        const renderedFolders = map( folders, f => this.renderFolderSelector(f) );

        return html`<div class="list">
            ${ renderedFolders}
        </div>`;

    }

    private getEllipsisName(
        folderInfo: FolderInfo
    ): string {

        const maxLength = 20;

        if ( folderInfo.name.length <= maxLength ) {
            return folderInfo.name;
        }

        const first10chars = folderInfo.name.substring( 0, 10 );
        const ellipsis = " ... ";
        const lastChars = folderInfo.name.substring( folderInfo.name.length - ( maxLength - 10 - ellipsis.length ) );

        return first10chars + ellipsis + lastChars;

        return folderInfo.name.substring(0, maxLength - 3) + "...";

    }

    private wrapInDialogue( content: unknown ): unknown {

        let actionButton: unknown = nothing;

        const name = this._currentFolderInfo
         ? this.getEllipsisName( this._currentFolderInfo )
         : "kořenová úroveň";

        if ( this.mode === LocationSelectorMode.FOLDER && this.folderIsValidForFolders( this._currentFolderInfo ) ) {

            actionButton = html`<thermal-btn
                slot="button"
                variant="primary"
                @click=${()=> {
                    this.onSelect?.( this._currentFolderInfo!.path );
                }}
            >${this.operationLabel} '${name}'</thermal-btn>`;

        } else if ( this.mode === LocationSelectorMode.FILE && this.folderIsValidForFiles( this._currentFolderInfo ) ) {

            actionButton = html`<thermal-btn
                slot="button"
                variant="primary"
                @click=${()=> {
                    this.onSelect?.( this._currentFolderInfo!.path );
                }}
            >${this.operationLabel} '${name}'</thermal-btn>`;
        }

        return html`<thermal-dialog
            label=${this.dialogTitle ?? "Vyberte umístění"}
            ${ ref( this.dialogRef ) }
        >
            <slot name="invoker" slot="invoker"></slot>
            
            <div slot="content" class="content">${content}</div>

            ${ actionButton }
        
        </thermal-dialog>`;

    }

    protected render(): unknown {

        if ( this.client.isLoggedIn === false ) {
            return nothing;
        }

        const content = this._loading
            ? html`<thermal-spinner></thermal-spinner>`
            : [
                this.renderBreadcrumb(),
                this.renderBackButton(),
                this.renderFolderList(),
            ];

        if ( this.asDialogue ) {
            return this.wrapInDialogue(content);
        }

        return content;

    }



}