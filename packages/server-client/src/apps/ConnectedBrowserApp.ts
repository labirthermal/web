import type { ThermalManager } from "@labirthermal/core";
import { html, nothing } from "lit";
import { createRef } from "lit/directives/ref.js";
import { AbstractConnectedApp } from "../abstraction/AbstractConnectedApp";
import { DisplayState, FolderListDisplayMode } from "../controllers/DisplayController";
import { connectedFileDetail } from "./directives/layout/ConnectedFileDetailDirective";
import { connectedFolderFiles } from "./directives/layout/ConnectedFolderFilesDirective";
import { connectedFolderGrid } from "./directives/layout/ConnectedFolderGridDirective";
import { connectedFolderSubfolders } from "./directives/layout/ConnectedFolderSubfoldersDirective";
import { userFolders } from "./directives/layout/UserFoldersDirective";
import type { ManagerProviderElement } from "@labirthermal/webcomponents";
import type { Identity } from "../client/responseEntities";

export class ConnectedBrowserApp extends AbstractConnectedApp {

    private managerProviderRef = createRef<ManagerProviderElement>();



    public get manager(): ThermalManager {
        if (!this.managerProviderRef.value) {
            throw new Error("Method not implemented.");
        }
        return this.managerProviderRef.value.managerObject;
    }


    protected renderStateLogin(): unknown {
        return this.renderAppWithInternals(html`<connected-login-form
            style="max-width: 400px; margin: 2em auto; display: block;"
            .onLoginSuccess=${(identity: Identity) => {
                this.log("Tohle je login", identity);
                this.display.reloadCurrentState();
            }}
        ></connected-login-form>` );
    }

    protected renderStateLoading(): unknown {
        return this.renderAppWithInternals(html`<thermal-poster
                .message=${this.display.arbitraryContent}
            ></thermal-poster>` );
    }


    // Folder displays

    /** Main router for the folder state display. Particular content depends on existence of files, subfolders and display mode setting. */
    protected renderStateFolder(): unknown {

        let content: unknown = nothing;

        // If no folder is defined, just render the breadcrumb
        if (this.content.folder === undefined) {
            content = html`<p>Folder not found</p>`;
        }

        // Return files view if the folder may nave files
        else if (this.content.folder.may_have_files) {
            content = this.renderStateFolderFiles();
        }

        // Return grid view if set
        else if (this.display.folderListDisplayMode === FolderListDisplayMode.GRID) {
            content = this.renderStateFolderGrid();
        }

        // Return subfolders in all other cases
        else {
            content = this.renderStateFolderSubfolders();
        }

        return this.renderAppWithInternals(
            content
        );

    }

    /** Render a folder's files */
    protected renderStateFolderFiles(): unknown {
        return connectedFolderFiles(this);
    }



    /** Render a folder's subfolders */
    protected renderStateFolderSubfolders(): unknown {
        return connectedFolderSubfolders(this);
    }

    /** Render a folder's grid of files */
    protected renderStateFolderGrid(): unknown {
        return connectedFolderGrid(this);
    }

    // File displays

    protected renderStateFile(): unknown {
        const dir = connectedFileDetail(this);
        return this.renderAppWithInternals(dir);
    }

    // User displays

    protected renderStateUser(): unknown {
        return this.renderAppWithInternals(userFolders(this));
    }


    protected setupInitialStateBeforeClientIsRead(): void {

        this.display.setArbitraryContent(
            "Připojuju se k arbitrárnímu stavu"
        );

    }

    protected async initialiseContentAfterClientReady(): Promise<void> {

        this.display.navigateToLoadingState(
            "Načítám obsah"
        );

        await this.display.reloadCurrentState();


    }

    private renderErrorState(): unknown {

        let content: unknown = nothing;

        if (this.client.isLoggedIn) {
            content = html`<thermal-btn
                @click=${() => this.display.navigateToUserFoldersAndLoad()}
                icon="right"
                iconStyle="outline"
                variant="primary"
            >Složky uživatele '${this.client.identity?.meta.name}'</thermal-btn>`;
        }

        return this.renderAppWithInternals(html`<thermal-poster
            .message=${this.display.arbitraryContent}
            .loading=${false}
            icon="warning"
            iconStyle="outline"
        >
            ${content}
        </thermal-poster>`);

    }



    protected render(): unknown {

        const stateContent = (() => {

            switch (this.display.appState) {
                case DisplayState.LOADING: return this.renderStateLoading();
                case DisplayState.LOGIN: return this.renderStateLogin();
                case DisplayState.FOLDER: return this.renderStateFolder();
                case DisplayState.FILE: return this.renderStateFile();
                case DisplayState.USER: return this.renderStateUser();
                case DisplayState.ARBITRARY: return this.renderAppWithInternals(html`<thermal-poster
                    .message=${this.display.arbitraryContent}
                ></thermal-poster>`);
                case DisplayState.ERROR: return this.renderErrorState();
                default: return this.renderAppWithInternals(html`<thermal-poster
                    .message=${this.display.arbitraryContent}
                ></thermal-poster>`);;
            }

        })();

        const cachedStateContent = stateContent;

        return cachedStateContent;

    }

}