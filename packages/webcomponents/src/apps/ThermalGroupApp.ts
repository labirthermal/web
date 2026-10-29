import type { AvailableThermalPalette, PlaybackSpeeds, ThermalFileFailure, ThermalFileInstance, ThermalGroup, ThermalManager, ThermalRangeOrUndefined, ThermalRegistry } from "@labirthermal/core";
import { css, html } from "lit";
import type { IElementWithFileController } from "../controllers/FileController";
import { FileController } from "../controllers/FileController";
import type { IElementWithGroupController } from "../controllers/GroupController";
import { GroupController } from "../controllers/GroupController";
import type { IElementWithGroupListingController } from "../controllers/GroupListingController";
import { GroupListingController, GroupOrderby, GroupOrdering } from "../controllers/GroupListingController";
import type { IElementWithGroupLoadController } from "../controllers/GroupLoadController";
import { GroupLoadController } from "../controllers/GroupLoadController";
import type { IElementWithManagerController } from "../controllers/ManagerController";
import { ManagerController } from "../controllers/ManagerController";
import type { IElementWithRegistryController } from "../controllers/RegistryController";
import { RegistryController } from "../controllers/RegistryController";
import { AbstractApp } from "./AbstractApp";
import { ifDefined } from "lit/directives/if-defined.js";


export class ThermalGroupAppElement
    extends AbstractApp
    implements
    IElementWithManagerController,
    IElementWithRegistryController,
    IElementWithGroupController,
    IElementWithFileController,
    IElementWithGroupListingController,
    IElementWithGroupLoadController {
    
    

    static properties = {
        ...AbstractApp.properties,
        ...ManagerController.HOST_PROPERTIES,
        ...RegistryController.HOST_PROPERTIES,
        ...GroupController.HOST_PROPERTIES,
        ...FileController.HOST_PROPERTIES,
        ...GroupLoadController.HOST_PROPERTIES
    };


    // Manager controller properties

    managerSlug!: string;
    managerObject!: ThermalManager;
    managerController: ManagerController = new ManagerController(this);
    palette: AvailableThermalPalette = "jet";
    advancedPalettes: boolean = false;
    smoothThermograms: boolean = false;
    smoothGraph: boolean = false;
    tool: string = "inspect";

    // Registry controller properties

    registrySlug!: string;
    registryObject!: ThermalRegistry;
    registryController: RegistryController = new RegistryController(this);
    opacity: number = 1;
    min?: number | undefined;
    max?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    highlight?: ThermalRangeOrUndefined;
    loading: boolean = false;

    // Group controller properties

    groupSlug!: string;
    groupObject!: ThermalGroup;
    groupController: GroupController = new GroupController(this);
    autoclearGroup: boolean = true;


    // File controller properties

    fileController: FileController = new FileController(this);
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

    groupListingController: GroupListingController = new GroupListingController(this);
    orderby: GroupOrderby = GroupOrderby.DATE;
    ordering: GroupOrdering = GroupOrdering.ASC;

    groupLoadController: GroupLoadController = new GroupLoadController(this);
    filesString?: string | undefined;

    private subscribedGroup?: ThermalGroup;

    connectedCallback(): void {
        super.connectedCallback();
        this.subscribedGroup = this.groupObject;
        this.subscribedGroup.files.addListener(this.UUID, () => {
            if (this.file && !this.groupObject.files.value.includes(this.file)) {
                this.fileController.removeInstance();
            }
            this.requestUpdate();
        });
    }

    disconnectedCallback(): void {
        this.subscribedGroup?.files.removeListener(this.UUID);
        this.subscribedGroup = undefined;
        super.disconnectedCallback();
    }

    private openDetail(instance: ThermalFileInstance): void {
        this.registryController.setHighlight(undefined);
        this.ms = instance.timeline.currentMs;
        this.playbackSpeed = instance.timeline.playbackSpeed;
        const analysisAttributes = ["analysis1", "analysis2", "analysis3", "analysis4", "analysis5", "analysis6", "analysis7"] as const;
        analysisAttributes.forEach((attribute, index) => {
            this[attribute] = instance.slots.getSlot(index + 1)?.serialized;
        });
        this.fileController.receiveInstance(instance);
    }

    private closeDetail(): void {
        this.registryController.setHighlight(undefined);
        this.fileController.removeInstance();
    }

    public static styles = css`
        ${GroupListingController.styles}

        .layout {
            width: 100%;
            display: grid;
            grid-template-columns: 2em minmax(0, 1fr);
            gap: 1em;
        }

        .layout-content {
            min-width: 0;
        }

        manager-tool-bar {
            height: 2em;
        }
    `;

    protected render(): unknown {
        const listingOptions = {
            allowFileChanges: false,
            onOpenDetail: (instance: ThermalFileInstance) => this.openDetail(instance),
            onCloseDetail: () => this.closeDetail()
        };
        const hasFiles = this.groupObject?.files.value.length > 0;

        return html`<thermal-app
            label=${this.label ?? "LabIR Web Analyser"}
            author=${ifDefined(this.author)}
            license=${ifDefined(this.license)}
            ?show-fullscreen=${this.showFullscreen}
        >
            ${hasFiles ? html`
                <manager-tool-bar slot="pre-bar"></manager-tool-bar>
                <manager-palette-dropdown slot="pre-bar"></manager-palette-dropdown>
                <registry-range-form slot="pre-bar"></registry-range-form>
                ${this.file
                    ? this.groupListingController.renderDetailHeader(this.file, "bar-header", listingOptions)
                    : this.groupListingController.renderListHeader("bar-header", listingOptions)}
                <thermal-dialog label=${this.t("config")} slot="bar-pre">
                    <thermal-btn slot="invoker" tooltip=${this.t("config")} icon="settings" iconStyle="solid"></thermal-btn>
                    <div slot="content">
                        <table>
                            <manager-export-panel></manager-export-panel>
                            <display-panel></display-panel>
                        </table>
                    </div>
                </thermal-dialog>
                ${this.groupListingController.renderTemperatureScale()}
            ` : undefined}
            <slot name="bar-pre" slot="bar-pre"></slot>
            ${this.groupLoadController.errors.map(message => html`<p role="alert">${message}</p>`)}
            <div class="layout">
                <div></div>
                <div class="layout-content">
                    ${this.loading ? html`<p role="status">${this.t("loading")}</p>` : undefined}
                    ${hasFiles
                        ? this.file
                            ? this.groupListingController.renderDetailBody()
                            : this.groupListingController.renderListContainer(
                                this.groupListingController.renderList(
                                    instance => this.groupListingController.renderThumbnail(instance, listingOptions)
                                )
                            )
                        : this.loading ? undefined : html`<p>Ve skupině nejsou žádné soubory.</p>`}
                </div>
            </div>
        </thermal-app>`;
    }
}