import type { AvailableThermalPalette, ThermalManager, ThermalRangeOrUndefined, ThermalRegistry, ThermalGroup, ThermalFileInstance, ThermalFileFailure, PlaybackSpeeds } from "@labirthermal/core";
import { provide } from "@lit/context";
import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { FileController } from "../controllers/FileController";
import { FileLoadController } from "../controllers/FileLoadController";
import type { IElementWithManagerController} from "../controllers/ManagerController";
import { ManagerController } from "../controllers/ManagerController";
import type { IElementWithRegistryController} from "../controllers/RegistryController";
import { RegistryController } from "../controllers/RegistryController";
import type { IElementWithGroupController} from "../controllers/GroupController";
import { GroupController } from "../controllers/GroupController";
import { managerInteractiveAnalysesContext } from "../controllers/ManagerController";
import { booleanConverter } from "../utils/converters/booleanConverter";
import { AbstractApp } from "./AbstractApp";
import type { IElementWithFileController } from "../controllers/FileController";
import type { IElementWithFileLoadController } from "../controllers/FileLoadController";
import { ifDefined } from "lit/directives/if-defined.js";

export class ThermalFileAppElement 
extends AbstractApp 
implements 
    IElementWithManagerController, 
    IElementWithRegistryController,
    IElementWithGroupController,
    IElementWithFileController,
    IElementWithFileLoadController
{
    

    static properties = {
        ...AbstractApp.properties,
        ...ManagerController.HOST_PROPERTIES,
        ...RegistryController.HOST_PROPERTIES,
        ...GroupController.HOST_PROPERTIES,
        ...FileController.HOST_PROPERTIES,
        ...FileLoadController.HOST_PROPERTIES
    };

    /** Enables selecting, editing and removing the analyses in the tables. Provided to all descendants. */
    @provide({ context: managerInteractiveAnalysesContext })
    @property({ type: String, reflect: true, converter: booleanConverter(true) })
    interactiveanalysis: boolean = true;

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

    // File load controller properties

    fileLoadController: FileLoadController = new FileLoadController(this);
    thermal: string | undefined;
    visible: string | undefined;

    /** Observes the interactive layout's content width; released on disconnect. */
    private layoutObserver?: ResizeObserver;

    connectedCallback(): void {
        super.connectedCallback();
        if (this.hasUpdated) {
            this.observeLayout();
        }
    }

    firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);
        this.observeLayout();
    }

    disconnectedCallback(): void {
        this.layoutObserver?.disconnect();
        this.layoutObserver = undefined;
        super.disconnectedCallback();
    }

    /** Applies responsive classes to the rendered layout without recreating its interactive children. */
    private observeLayout(): void {
        const layout = this.shadowRoot?.querySelector<HTMLDivElement>(".layout");
        if (!layout || this.layoutObserver) {
            return;
        }
        const observer = new ResizeObserver(entries => {
            if (!this.isConnected || this.layoutObserver !== observer) {
                return;
            }
            const entry = entries.find(entry => entry.target === layout);
            if (entry) {
                layout.classList.toggle("layout--stacked", entry.contentRect.width < 700);
                layout.classList.toggle("layout--compact", entry.contentRect.width < 500);
            }
        });
        this.layoutObserver = observer;
        observer.observe(layout);
    }

    static styles = css`
    
        .layout {
            display: grid;
            grid-template-columns: min-content minmax(0, 1fr) minmax(0, 1fr);
            grid-template-areas: "tools viewer analysis";
            gap: 1em;
            margin-top: 1em;
        }

        .layout > * {
            min-width: 0;
        }

        manager-tool-bar {
            grid-area: tools;
            align-self: start;
        }

        .viewer {
            grid-area: viewer;
        }

        file-analysis-complex {
            grid-area: analysis;
        }

        .layout--stacked {
            grid-template-columns: min-content minmax(0, 1fr);
            grid-template-areas:
                "tools viewer"
                "tools analysis";
        }

        .layout--compact {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas:
                "tools"
                "viewer"
                "analysis";
        }

        .layout--compact manager-tool-bar {
            flex-direction: row;
            flex-wrap: wrap;
        }
    
    `;

    
    render() {
        return html`<thermal-app 
            label="${ifDefined(this.label)}" 
            author="${ifDefined(this.author)}" 
            license="${ifDefined(this.license)}" 
            .showfullscreen=${this.showFullscreen}
        >

            <file-download-dropdown slot="bar-pre"></file-download-dropdown>
            <file-info-button slot="bar-pre"></file-info-button>

            <manager-palette-dropdown slot="bar-pre"></manager-palette-dropdown>
            <registry-range-form slot="bar-pre"></registry-range-form>
            <registry-opacity-slider slot="bar-pre"></registry-opacity-slider>

            <registry-histogram slot="pre" ?expandable=${true}></registry-histogram>
            <registry-range-slider slot="pre"></registry-range-slider>
            <registry-ticks-bar slot="pre"></registry-ticks-bar>

            
            <div class="layout">
                <manager-tool-bar></manager-tool-bar>
                <div class="viewer">
                    <file-canvas></file-canvas>
                    <file-timeline></file-timeline>
                </div>
                <file-analysis-complex></file-analysis-complex>
            </div>
            
        </thermal-app>`;
    }

}