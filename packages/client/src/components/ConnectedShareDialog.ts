import type { AvailableThermalPalette } from "@labirthermal/core";
import { managerPaletteContext, registryRangeFromContext, registryRangeToContext, t } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import type { FileInfo, FolderInfo } from "../client/responseEntities";
import { AbstractControlledConsumer } from "../abstraction/AbstractControlledConsumer";
import type { FileListDisplayMode, FolderListDisplayMode } from "../controllers/DisplayController";
import { DisplayState } from "../controllers/DisplayController";
import { T } from "../translations/Languages";

export class ConnectedShareDialog extends AbstractControlledConsumer {

    @consume({
        context: managerPaletteContext,
        subscribe: true
    })
    private palette: AvailableThermalPalette | undefined;

    @consume({
        context: registryRangeFromContext,
        subscribe: true
    })
    private from?: number;

    @consume({
        context: registryRangeToContext,
        subscribe: true
    })
    private to?: number;

    private get _path(): string | undefined {
        switch (this._appState) {
            case DisplayState.FOLDER:
            case DisplayState.FILE:
                return this.content.file?.path;
            default:
                return undefined;
        }
    }

    private get _folder(): FolderInfo | undefined {
        return this.content.folder;
    }

    private get _file(): FileInfo | undefined {
        return this.content.file;
    }

    private get _appState(): DisplayState {
        return this.display.appState;
    }

    private get _folderListDisplayMode(): FolderListDisplayMode {
        return this.display.folderListDisplayMode;
    }

    private get _fileListDisplayMode(): FileListDisplayMode {
        return this.display.fileDisplayMode;
    }

    private get _fileListDisplayCompact(): boolean {
        return this.display.fileDisplayCompact;
    }

    private renderEntity(
        label: string,
        icon: string,
        prependArrow: boolean = false
    ): unknown {
        return html`
        ${prependArrow ? html`<thermal-icon icon="right" variant="micro" style="display: block; width: 1em;"></thermal-icon>` : nothing}
        <div class="entity" title="${label}">
            <thermal-icon icon="${icon}" variant="micro"></thermal-icon>
            <span>${label}</span>
        </div>`;
    }

    private renderLink(): unknown {

        const url = this.assambleUrl();

        return html`<div class="server-link">

            <div class="server-link-content">
                ${url}
            </div>
            <thermal-btn
                icon="copy"
                iconStyle="mini"
                variant="foreground"
                ?plain=${true}
                @click=${() => {
                navigator.clipboard.writeText(url);
            }}
                tooltip="Zkopírovat odkaz do schránky"
            ></thermal-btn>

            <thermal-btn
                icon="link"
                iconStyle="micro"
                variant="primary"
                ?plain=${true}
                @click=${() => {
                window.open(url, "_blank");
            }}
                tooltip="Otevřít odkaz v novém okně"
            ></thermal-btn>

        </div>`;

    }

    public static styles?: CSSResultGroup | undefined = css`
        :host {
            font-size: var( --thermal-fs );
            color: var( --thermal-foreground );
        }

        .entity-list {
            display: flex;
            align-items: center;
            gap: .5em;
            width: 100%;
        }

        .entity {
            display: flex;
            align-items: center;
            gap: 0.5em;
            padding: .5em;
            border-radius: var( --thermal-radius );

            background: var( --thermal-background );

            thermal-icon {
                display: inline-block;
                width: 1em;
            }
        }

        section {

            box-sizing: border-box;
            width: 100%;

            padding: 1.5em .5em .5em .5em;
            margin-top: 2em;

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );

            position: relative;


            & > h3 {
            
               position: absolute;
               top: -1em;
               left: .5em;
               box-sizing: border-box;
               
               padding: .4em .5em;
               margin: 0;

               border-radius: var( --thermal-radius );
               border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );

               background: var( --thermal-slate-light );

               font-size: 1em;
               line-height: 1em;

            }

            .description {
                font-size: .8em;
                opacity: .5;
                margin-top: .5em;
            }

        }

        .server-link {

            display: flex;

            .server-link-content {
                flex-grow: 1;
                box-sizing: border-box;
                padding: .5em;

                background: var( --thermal-background );
                border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            }

            > thermal-btn {
                border-radius: 0;
                &:last-child {
                    border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
                }
            }
        
        }
    
    `;

    private assambleUrl(): string {

        const link = this.client.api.getPublicUrl();

        const segments: Record<string, string> = {};

        if (this.palette) {
            segments["palette"] = this.palette;
        }

        if (this.from !== undefined) {
            segments["from"] = this.from.toString();
        }

        if (this.to !== undefined) {
            segments["to"] = this.to.toString();
        }

        if (this._path) {
            segments["folder-path"] = this._path;


            if (
                this._appState === DisplayState.FOLDER
                && this._folderListDisplayMode
                && this._fileListDisplayMode
                && this._fileListDisplayCompact !== undefined
            ) {
                segments["files-display"] = this._fileListDisplayMode;
                segments["folder-display"] = this._folderListDisplayMode;
                segments["files-compact"] = this._fileListDisplayCompact ? "true" : "false";
            }

            if (this._appState === DisplayState.FILE && this._file) {
                segments["file-name"] = this._file.fileName;
            }

        }

        const query = new URLSearchParams(segments).toString();

        return `${link}/?${query}`;

    }

    protected render(): unknown {

        if (
            !this.client
            || !this.client.api.isConnected()
            || !this._path
            || !this._appState
            || ![DisplayState.FOLDER, DisplayState.FILE]
                .includes(this._appState)
        ) {
            return nothing;
        }


        return html`<thermal-dialog label="${t(T.share)}">

            <thermal-btn slot="invoker" icon="share" iconStyle="mini" tooltip="Sdílet odkaz na tento obsah"></thermal-btn>

            <div slot="content">

                <section>

                    <h3>Co sdílíte</h3>

                    <div class="entity-list">
                        ${this._folder ? this.renderEntity(
            this._folder.name,
            "folder"
        ) : nothing}
                        ${this._file ? this.renderEntity(
            this._file.fileName,
            "image",
            true
        ) : nothing}
                    </div>

                </section>

                <section>
                    <h3>Odkaz na server</h3>
                    ${this.renderLink()}
                    <div class="description">Odkaz vede na <strong>${this.client.serverInfo?.name}</strong>, kde tento obsah <strong>${this._folder?.protected ? "uvidí pouze uživatelé s přístupem" : "uvidí kdokoliv"
            }</strong>.</div>
                </section>

            </div>

        </thermal-dialog>`;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "connected-share-dialog": ConnectedShareDialog;
    }
}