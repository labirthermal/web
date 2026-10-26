import type { AvailableThermalPalette } from "@labirthermal/core";
import { provide } from "@lit/context";
import type { CSSResultGroup} from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { cache } from "lit/directives/cache.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AbstractLayoutDirective } from "../apps/directives/layout/AbstractLayoutDirective";
import type { AppWithClientController} from "../ClientController";
import { ClientController } from "../ClientController";
import type { AppWithContentController} from "../ContentController";
import { ContentController } from "../ContentController";
import { ControlledClientContext, ControlledContentContext, DisplayControllerContext, FileSelectionControllerContext, FolderSelectionControllerContext } from "../controllersContexts";
import type { AppWithDisplayController} from "../DisplayController";
import { DisplayController, DisplayState, FileListDisplayMode, FolderListDisplayMode } from "../DisplayController";
import type { AppWithFileSelectionController} from "../FileSelectionController";
import { FileSelectionController } from "../FileSelectionController";
import type { AppWithFolderSelectionController} from "../FolderSelectionController";
import { FolderSelectionController } from "../FolderSelectionController";
import { AbstractApp, booleanConverter } from "@labirthermal/webcomponents";
import { ApiClient } from "../../client/ApiClient";

export abstract class AbstractConnectedApp extends AbstractApp
    implements
    AppWithClientController,
    AppWithContentController,
    AppWithDisplayController,
    AppWithFileSelectionController,
    AppWithFolderSelectionController {

    /** Name of the listener event called upon initialisation of the connected app */
    public static readonly INITIALISATION_LISTENER = "connected-app-initialisation";

    @state()
    apiClient!: ApiClient;

    /** The reactive reactive controller for the client connection */
    @provide({ context: ControlledClientContext })
    public readonly client = new ClientController(this);

    /** The reactive controller for contents */
    @provide({ context: ControlledContentContext })
    public readonly content = new ContentController(this);

    /** The settings controller for display parameters */
    @provide({ context: DisplayControllerContext })
    public readonly display = new DisplayController(this);

    @provide({ context: FileSelectionControllerContext })
    public readonly fileSelection: FileSelectionController = new FileSelectionController(this);

    @provide({ context: FolderSelectionControllerContext })
    public readonly folderSelection: FolderSelectionController = new FolderSelectionController(this);

    @property({
        type: String,
        reflect: true,
        attribute: "selected-files"
    })
    public readonly selectedFiles?: string | undefined;

    @property({
        type: String,
        reflect: true,
        attribute: "server-url"
    })
    serverUrl!: string;

    @property({
        type: String,
        attribute: "server-api-root"
    })
    serverApiRoot!: string;

    @property({
        type: String,
        attribute: "auth-url",
    })
    authUrl?: string | undefined;

    @property({
        type: String,
        attribute: "auth-token",
    })
    authToken?: string | undefined;

    @property({
        type: String,
        reflect: true,
        attribute: "folder-path"
    })
    public folderPath?: string | undefined;

    @property({
        type: String,
        attribute: "file-name",
        reflect: true
    })
    public fileName?: string | undefined;


    @property({
        type: String,
        attribute: "palette",
        reflect: true
    })
    public palette?: AvailableThermalPalette;

    @property({
        type: Number,
        attribute: "from",
        reflect: true
    })
    public from?: number;

    @property({
        type: Number,
        attribute: "to",
        reflect: true
    })
    public to?: number;

    @property({
        type: String,
        attribute: "folder-display",
        reflect: true
    })
    public folderListDisplayMode: FolderListDisplayMode = FolderListDisplayMode.LIST;

    @property({
        type: String,
        attribute: "files-display",
        reflect: true
    })
    public fileDisplayMode: FileListDisplayMode = FileListDisplayMode.GRID;

    @property({
        type: Boolean,
        attribute: "files-compact",
        reflect: true,
        converter: booleanConverter(false)
    })
    public fileDisplayCompact: boolean = false;

    @property({
        type: Boolean,
        attribute: "edit-tags",
        converter: booleanConverter(false),
        reflect: true
    })
    public editTags: boolean = false;

    @property({
        type: Boolean,
        attribute: "display-comments",
        converter: booleanConverter(true),
        reflect: true
    })
    public displayComments: boolean = false;

    /** The crucial variable for routing the display */
    @state()
    public appState: DisplayState = DisplayState.LOADING;


    @property({
        type: String,
        attribute: "label",
        reflect: true
    })
    public label?: string;


    @property({
        type: String,
        attribute: "label-tooltip",
        reflect: true
    })
    public labelTooltip?: string;

    @property({
        type: String,
        attribute: "label-icon",
        reflect: true
    })
    public labelIcon?: string;

    @property({
        type: String,
        attribute: "label-icon-style",
        reflect: true

    })
    public labelIconStyle?: string;

    @property({
        type: String,
        attribute: "label-variant",
        reflect: true
    })
    public labelVariant?: string;


    /** States that have the registry around */
    private static readonly STATES_WITH_REGISTRY = [
        DisplayState.FOLDER,
        DisplayState.FILE
    ];

    /**
     * Should we render the Registry provider around the content?
     */
    private get hasRegistryProvider(): boolean {
        return AbstractConnectedApp.STATES_WITH_REGISTRY.includes(this.appState);
    }

    /**
     * Should we render the Group provider around the content?
     */
    private get hasGroupProvider(): boolean {

        if (
            this.appState === DisplayState.FILE
            || (
                this.appState === DisplayState.FOLDER
                && this.folderListDisplayMode !== FolderListDisplayMode.GRID
            )
        ) {
            return true;
        }

        return false;

    }

    public static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: block;
            width: 100%;
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs);
        }

        ${AbstractLayoutDirective.styles}

        .inspector {
            display: grid;
            grid-template-columns: 2em 1fr;
            grid-template-rows: auto;
            gap: var(--thermal-gap);
            width: 100%;
        }

        .inspector__tools {

            manager-tool-bar {
                position: sticky;
                top: 0px;
                z-index: 99;
            }

        }

        :host(.fullscreen) {
        
            thermal-app {
                display: block;
                height: 100vh;
                overflow: auto;
                
            
            }

        }
    
    `;





    /** Handle fullscreen changes from the browser (e.g. Escape key) to keep CSS class in sync */
    private _handleFullscreenChange = (): void => {
        if (!document.fullscreenElement && this.classList.contains("fullscreen")) {
            this.classList.remove("fullscreen");
        }
    };

    connectedCallback(): void {

        if (this.serverUrl === undefined || this.serverUrl.length === 0) {
            throw new Error("The 'server-url' attribute is required but was not provided.");
        }

        this.apiClient = new ApiClient(
            this.serverUrl,
            this.serverApiRoot
        );

        super.connectedCallback();

        document.addEventListener("fullscreenchange", this._handleFullscreenChange);

        /** This is very important - call this before the client is ready */
        this.setupInitialStateBeforeClientIsRead();

        this.client.onReadyForContentRequests.add(AbstractConnectedApp.INITIALISATION_LISTENER, async () => {


            this.log("Client is ready for content requests, now initialise the app content");

            await this.initialiseContentAfterClientReady();

            this.log("The content is now ready", this.apiClient);

        });

    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        document.removeEventListener("fullscreenchange", this._handleFullscreenChange);
    }




    protected toggleFullscreen(): void {
        if (this.classList.contains("fullscreen")) {
            this.classList.remove("fullscreen");
            document.exitFullscreen();
        } else {
            this.requestFullscreen();
            this.classList.add("fullscreen");
        }
    }



    /**
     * Renders the app wrapped in all necessary providers of internal context
     */
    protected renderAppWithInternals(
        innerContent: unknown
    ): unknown {

        const shareDialog = html`<connected-share-dialog slot="close"></connected-share-dialog>`;

        const userLoginButton = this.display.appState !== DisplayState.LOGIN
            ? html`<connected-user-button slot="close"></connected-user-button>`
            : nothing;

        const settingsButton = [
            DisplayState.FOLDER,
            DisplayState.FILE
        ].includes(this.display.appState)
            ? html`<thermal-dialog
                label="Nastavení aplikace"
                slot="close"
            >
                <thermal-btn 
                    slot="invoker"
                    icon="settings"
                    iconStyle="solid"
                    tooltip=${this.t("config")}
                ></thermal-btn>

                <div slot="content">
                    <manager-export-panel></manager-export-panel>
                    <display-panel></display-panel>
                </div>
            </thermal-dialog>`
            : nothing;

        const thermalApp = html`<thermal-app
            label=${ifDefined(this.label)}
            labelTooltip=${ifDefined(this.labelTooltip)}
            labelIcon=${ifDefined(this.labelIcon)}
            labelIconStyle=${ifDefined(this.labelIconStyle)}
            labelVariant=${ifDefined(this.labelVariant)}
        >

            ${shareDialog}

            <thermal-btn 
                slot="close" 
                icon="reload"
                iconStyle="micro"
                tooltip="Reload the current view"
                @click=${() => {
                this.display.reloadCurrentState();
            }}
            ></thermal-btn>

            ${userLoginButton}

            ${settingsButton}

            ${cache(html`<thermal-btn
                slot="close"
                icon="bigger"
                iconStyle="mini"
                @click=${() => {

                    this.toggleFullscreen();

                }}
            ></thermal-btn>` )}

            <slot name="pre" slot="pre"></slot>

            <slot name="before-content"></slot>

            ${innerContent}
            
            <slot name="after-content"></slot>

        </thermal-app>`;

        const fileBlock = this.content.file !== undefined && this.content.file.url !== undefined
            ? html`
                <file-provider
                    thermal=${this.content.file.url}
                    visual=${ifDefined(this.content.file.visual)}
                    batch="true"
                    autoclear="true"
                    analysis1=${ifDefined(this.content.file.analyses[0])}
                    analysis2=${ifDefined(this.content.file.analyses[1])}
                    analysis3=${ifDefined(this.content.file.analyses[2])}
                    analysis4=${ifDefined(this.content.file.analyses[3])}
                    analysis5=${ifDefined(this.content.file.analyses[4])}
                    analysis6=${ifDefined(this.content.file.analyses[5])}
                    analysis7=${ifDefined(this.content.file.analyses[6])}
                    style="display: contents;"
                >
                    ${thermalApp}
                </file-provider>
            `
            : thermalApp;


        const groupBlock = this.hasGroupProvider
            ? html`
                <group-provider
                    slug=${this.display.slug}
                    batch="true"
                    autoclear="true"
                    style="display: contents;"
                >
                    ${fileBlock}
                </group-provider>
            `
            : fileBlock;


        const registryBlock = this.hasRegistryProvider
            ? html`
                <registry-provider
                    slug=${this.display.slug}
                    from=${ifDefined(this.from)}
                    to=${ifDefined(this.to)}
                    style="display: contents;"
                >
                    ${groupBlock}
                </registry-provider>
            `
            : groupBlock;



        return html`
        <manager-provider
            slug=${this.UUID}
            palette=${ifDefined(this.palette)}
            style="display: contents;"
        >
            ${registryBlock}
        </manager-provider>`;
    }


    /**
     * Renders the inspector layout with header, content and tools 
     * @returns 
     */
    protected renderBrowserLayout(
        header: unknown,
        content: unknown
    ): unknown {


        return html`

        <!-- Draw the header content into the various slots -->
        ${header}

        <div slot="pre">
            <registry-histogram ?expandable=${true}></registry-histogram>
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
        </div>
        
        <!-- The inspector goes to the content slot of the thermal-app -->
        <main class="inspector">

            <section class="inspector__tools">
                <manager-tool-bar></manager-tool-bar>
            </section>
            
            <section class="inspector__content">
                ${content}
            </section>
        </main>`;

    }


    /** This method is used to setup the absolutely initial state of the application before any initialisation of the client takes place. */
    protected abstract setupInitialStateBeforeClientIsRead(): void;

    /** 
     * This method is used for the initial content requests after the client is ready & logged in. It is called only once, in the same time as `this.client.onReadyForContentRequests`
     */
    protected abstract initialiseContentAfterClientReady(): Promise<void>;


    /** Checks whether a given template output is not empty */
    protected unknownIsNotEmpty(
        value: unknown
    ): boolean {

        if (
            value === nothing
            || value === undefined
            || value === null
        ) {
            return false;
        }

        if (typeof value === "string" && (value as string).trim().length === 0) {
            return false;
        }

        if (Array.isArray(value) && value.length > 0) {
            return !value.some((item) => this.unknownIsNotEmpty(item));
        }

        return true;

    }

    protected wrapContentIfNotEmpty(
        content: unknown,
        classes: string
    ): unknown {

        if (!this.unknownIsNotEmpty(content)) {
            return nothing;
        }

        return html`<div class=${classes}>
            ${content}
        </div>`;

    }


}