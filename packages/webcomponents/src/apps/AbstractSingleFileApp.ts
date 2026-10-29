import type { AvailableThermalPalette, PlaybackSpeeds, ThermalFileFailure, ThermalFileInstance, ThermalGroup, ThermalManager, ThermalRangeOrUndefined, ThermalRegistry } from "@labirthermal/core";
import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import type { IElementWithFileController } from "../controllers/FileController";
import { FileController } from "../controllers/FileController";
import type { IElementWithFileLoadController } from "../controllers/FileLoadController";
import { FileLoadController } from "../controllers/FileLoadController";
import type { IElementWithGroupController } from "../controllers/GroupController";
import { GroupController } from "../controllers/GroupController";
import type { IElementWithManagerController } from "../controllers/ManagerController";
import { ManagerController, managerInteractiveAnalysesContext } from "../controllers/ManagerController";
import type { IElementWithRegistryController } from "../controllers/RegistryController";
import { RegistryController } from "../controllers/RegistryController";
import { AbstractApp } from "./AbstractApp";


/**
 * Common foundation for apps that handle a single thermal file loaded from the URL.
 */
export abstract class AbstractSingleFileAppElement 
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
        @property({ type: Boolean, reflect: true, attribute: "interactive-analysis"})
        interactiveAnalysis: boolean = true;
    
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


}