import type { AbstractFileResult, AvailableThermalPalette, PlaybackSpeeds, ThermalFileFailure, ThermalFileInstance, ThermalGroup, ThermalManager, ThermalRangeOrUndefined, ThermalRegistry } from "@labirthermal/core";
import { ThermalFileReader } from "@labirthermal/core";
import { provide } from "@lit/context";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { publicIpv4 } from "public-ip";
import type { IElementWithFileController } from "../controllers/FileController";
import { FileController } from "../controllers/FileController";
import type { IElementWithGroupController } from "../controllers/GroupController";
import { GroupController } from "../controllers/GroupController";
import type { IElementWithGroupListingController } from "../controllers/GroupListingController";
import { GroupListingController, GroupOrderby, GroupOrdering } from "../controllers/GroupListingController";
import type { IElementWithManagerController } from "../controllers/ManagerController";
import { ManagerController } from "../controllers/ManagerController";
import type { IElementWithRegistryController } from "../controllers/RegistryController";
import { RegistryController } from "../controllers/RegistryController";
import { T } from "../translations/Languages";
import type { IWithlocale, Locales } from "../translations/localeContext";
import { localeContext, localeConverter } from "../translations/localeContext";
import { AbstractApp } from "./AbstractApp";

enum Mode {
    INPUT = "input",
    LIST = "list",
    DETAIL = "detail"
}

export class DropinAppElement
    extends AbstractApp
    implements
    IWithlocale,
    IElementWithManagerController,
    IElementWithRegistryController,
    IElementWithGroupController,
    IElementWithFileController,
    IElementWithGroupListingController {

    public static properties = {
        ...ManagerController.HOST_PROPERTIES,
        ...RegistryController.HOST_PROPERTIES,
        ...GroupController.HOST_PROPERTIES,
        ...FileController.HOST_PROPERTIES,
        ...GroupListingController.HOST_PROPERTIES
    }



    managerSlug!: string;
    managerObject!: ThermalManager;
    palette: AvailableThermalPalette = "jet";
    advancedPalettes: boolean = false;
    smoothThermograms: boolean = false;
    smoothGraph: boolean = false;
    tool: string = "inspect";
    managerController: ManagerController = new ManagerController(this);

    registrySlug!: string;
    registryObject!: ThermalRegistry;
    opacity: number = 1;
    min?: number | undefined;
    max?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    highlight?: ThermalRangeOrUndefined;
    loading: boolean = false;
    registryController: RegistryController = new RegistryController(this);

    groupSlug!: string;
    groupObject!: ThermalGroup;
    autoclearGroup: boolean = false;
    groupController: GroupController = new GroupController(this);


    file?: ThermalFileInstance | undefined;
    failure?: ThermalFileFailure | undefined;
    ms: number = 0;
    playbackSpeed: PlaybackSpeeds = 1;
    analysis1?: string | undefined;
    analysis2?: string | undefined;
    analysis3?: string | undefined;
    analysis4?: string | undefined;
    analysis5?: string | undefined;
    analysis6?: string | undefined;
    analysis7?: string | undefined;
    autoHighlight: boolean = false;
    fileController: FileController = new FileController(this);

    orderby: GroupOrderby = GroupOrderby.DATE;
    ordering: GroupOrdering = GroupOrdering.ASC;
    groupListingController: GroupListingController = new GroupListingController(this);

    @property({ type: String, reflect: true })
    displayMode: Mode = Mode.INPUT;

    public get manager(): ThermalManager {
        return this.managerObject;
    }

    @state()
    protected ip?: string;

    @state()
    public toDisplay: ThermalFileInstance[] = [];

    @provide({ context: localeContext })
    @property({ reflect: true, converter: localeConverter })
    public locale!: Locales;

    connectedCallback(): void {
        super.connectedCallback();
        try {
            publicIpv4().then(ip => this.ip = ip);
        } catch (error) {
            console.error("Failed to get public IPv4 address:", error);
        }

        const listener = async (
            files: ThermalFileInstance[]
        ) => {

            this.log("Files received in listener:", files);

            // Clear the timeout if exists
            if (this.onValueChangeTimeout !== undefined) {
                clearTimeout(this.onValueChangeTimeout);
            }

            // Set the new timeout to handle the value change
            this.onValueChangeTimeout = setTimeout(async () => {
                // Set the to display array of instances
                this.toDisplay = files;

            }, 0);

        }

        // Add the listener directly
        this.groupObject?.files.addListener(
            this.UUID,
            listener.bind(this)
        );

        // Enqueue the listener for later usage
        this.groupController.onInternalObject.set(
            this.UUID,
            group => {

                group.files.addListener(
                    this.UUID,
                    listener.bind(this)
                );

            }
        );
    }

    willUpdate(_changedProperties: PropertyValues<DropinAppElement>) {
        super.willUpdate(_changedProperties);

        // Side effect: update the display mode based on the number of instances to display
        if (_changedProperties.has("toDisplay")) {

            if (this.toDisplay.length === 0) {
                this.displayMode = Mode.INPUT;
            } else if (this.toDisplay.length === 1) {
                this.displayMode = Mode.DETAIL;
                this.fileController.receiveInstance(this.toDisplay[0]);
                this.postLoadedProcessingAndApplyMinmax();
            } else if (this.toDisplay.length > 1) {
                this.displayMode = Mode.LIST;
                this.postLoadedProcessingAndApplyMinmax();
            }
        }
    }

    /**
     * Postprocess the registry and reset its range to apply min and max values.
     */
    private async postLoadedProcessingAndApplyMinmax() {
        await this.registryObject.postLoadedProcessing();
        this.registryObject.range.applyMinmax();
    }

    private onValueChangeTimeout: ReturnType<typeof setTimeout> | undefined;

    protected handleClear() {

        if (this.groupObject !== undefined) {
            this.fileController.removeInstance();
            this.groupObject.files.removeAllInstances();
            this.file = undefined;
            this.requestUpdate();
            this.analysis1 = undefined;
            this.analysis2 = undefined;
            this.analysis3 = undefined;
            this.analysis4 = undefined;
            this.analysis5 = undefined;
            this.analysis6 = undefined;
            this.analysis7 = undefined;
        }

    }


    public static styles = css`
        ${GroupListingController.styles}
    
        .layout {
        
            width: 100%;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1em;
        
        }

        .layout-content {
            min-width: 0;
        }

        manager-tool-bar {
            height: 2em;
        }

    `;







    public async handleDropAndClear(
        results: AbstractFileResult[]
    ) {

        this.log(results);

        // this.fileController.removeInstance();

        // this.groupListingController.clearBackup();


        const readers = results.filter(result => result instanceof ThermalFileReader);

        this.groupListingController.backupReaders(readers);

        this.groupListingController.restoreTheEntireBackup();
    }


    protected renderIntroScene() {

        return html`
            <group-dropin-element .onDrop=${this.handleDropAndClear.bind(this)}></group-dropin-element>
        `;

    }

    protected renderLayout(
        children: unknown
    ) {
        return html`
        <div class="layout">
            <div style="width: 2em;"></div>
            <div class="layout-content">${children}</div>
        </div>
        `;
    }

    protected renderHeader(): unknown[] {

        const elements: unknown[] = [];

        if (this.displayMode === Mode.INPUT) {

            elements.push(html`<group-dropin-input 
                slot="bar-pre"
                variant="background"
                icon="upload"
                iconStyle="micro"
                tooltip="Vyberte soubory z disku"
                .onDrop=${this.handleDropAndClear.bind(this)}
            ></group-dropin-input>` );

        }


        // Palette and thermal range is available whenever it is anything else than the input
        if (this.displayMode !== Mode.INPUT) {

            elements.push(html`
            <manager-tool-bar slot="pre-bar"></manager-tool-bar>
            <manager-palette-dropdown slot="pre-bar"></manager-palette-dropdown>
            <registry-range-form slot="pre-bar"></registry-range-form>
            
            ` );
        }

        if (this.displayMode === Mode.LIST) {
            elements.push(html`${this.groupListingController.renderListHeader("bar-header")}`);
        }

        if (this.displayMode === Mode.DETAIL) {
            elements.push(html`${this.groupListingController.renderDetailHeader(this.groupObject.files.value[0], "bar-pre")}`);
        }

        if (this.displayMode !== Mode.INPUT) {

            elements.push(html`<thermal-dialog label="${t(T.config)}" slot="bar-pre">
                <thermal-btn slot="invoker" tooltip="${t(T.config)}" icon="settings" iconStyle="solid"></thermal-btn>
                <div slot="content">
                    <table>
                        <manager-export-panel></manager-export-panel>
                        <display-panel></display-panel>
                    </table>
                </div>
            </thermal-dialog>`);


            elements.push(html`
                <div slot="pre-bar" style="flex-grow: 1; padding-left: 1em;">
            <registry-histogram height="15px" .expandable=${true}></registry-histogram>
            <registry-range-slider height="10px"></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
                </div>
            ` );
        }

        return elements;

    }

    protected renderContent() {

    }

    protected renderDetail() {

        return this.renderLayout(this.groupListingController.renderDetailBody());

    }

    public renderList() {

        const map = repeat(
            this.toDisplay,
            instance => instance.id,
            instance => this.groupListingController.renderThumbnail(instance)
        );

        return this.renderLayout(
            this.groupListingController.renderListContainer(map));
    }


    protected renderAuto() {

        switch (this.displayMode) {

            case Mode.INPUT:
                return this.renderIntroScene();
            case Mode.LIST:
                return this.renderList();
            case Mode.DETAIL:
                return this.renderDetail();

        }


    }


    protected render(): unknown {

        try {

            const label = this.label ?? "LabIR Web Analyser";

            return html`<thermal-app 
                label="${label}"
                ?show-fullscreen=${true}
            >

                ${this.renderHeader()}

                <slot name="bar-pre" slot="bar-pre"></slot>

                ${this.renderAuto()}

            </thermal-app>

        `;

        } catch (error) {

            console.error(error);

            return html`Stala se chyba`;

        }

    }

}