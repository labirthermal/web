// Converters
export { numberRangeConverter } from "./utils/converters/numberRangeConverter";
export { booleanConverter } from "./utils/converters/booleanConverter";
export { paletteConverter } from "./utils/converters/paletteConverter";
export { stringOrUndefinedConverter } from "./utils/converters/stringOrUndefinedConverter";
export { durationConverter } from "./utils/converters/durationConverter";

// Utlility class and service for retrieving contrast colors
export { getContrastColor } from "./utils/getContrastColor";

// Export icons
import icons from "./utils/icons";
export { icons }

import i18nWebcomponents from "./translations/i18n";
export { i18nWebcomponents };

const t = i18nWebcomponents.t;
export { t };

import { addInlineStyles } from "./styles/defaultStyles";
export { addInlineStyles };


// The necessary abstractions utils required by the hierarchy elements

export { AbstractThermalElement } from "./hierarchy/AbstractThermalElement";
export { HierarchyUpdatesHub } from "./controllers/HierarchyUpdatesHub";

export { AbstractReactiveController } from "./controllers/AbstractReactiveController";

export { 
    AbstractHierarchyController,
    INTERNAL_STATE_DECLARATION
} from "./controllers/AbstractHierarchyController";

export type { 
    HostReactiveProperties 
} from "./controllers/AbstractHierarchyController";

// File internal contexts & other stuff

// File contexts and the controller
export {
    fileContext,
    fileControllerContext,
    fileCurrentFrameContext,
    fileMsContext,
    filePlayingContext,
    fileFailureContext,
    fileLoadingContext,
    fileTimeCursorContext,
    fileDurationContext,
    filePlaybackSpeedContext,
    fileRecordingContext,
    fileMayStopContext,
    fileAnalysisListContext,
    FileController
} from "./controllers/FileController";

// File context types
export type { 
    FileControllerCurrentFrameType, 
    FileControllerDurationContextType 
} from "./controllers/FileController";

// Flle load controller
export { 
    FileLoadController 
} from "./controllers/FileLoadController";

// Types from the FileLoadController
export type {
    IElementWithFileLoadController
} from "./controllers/FileLoadController";


// Group internal contexts & other stuff

// Basic group controller
export {
    GroupController,
    groupControllerContext,
    groupObjectContext
} from "./controllers/GroupController";

export type {
    IElementWithGroupController
} from "./controllers/GroupController";

// Automatic group load controller
export {
    GroupLoadController
} from "./controllers/GroupLoadController";

// Export the interfaces for the automatic group load controller
export type {
    IElementWithGroupLoadController
} from "./controllers/GroupLoadController";


// Export the group listing controller
export {
    GroupListingController,
    GroupOrderby,
    GroupOrdering
} from "./controllers/GroupListingController";

export type {
    IElementWithGroupListingController
} from "./controllers/GroupListingController"


// Group analysis sync is a @todo
export { 
    GroupAnalysisSyncController, 
    groupAnalysisSyncContext 
} from "./controllers/GroupAnalysisSyncController";
export type { 
    IElementWithGroupAnalysisSyncController 
} from "./controllers/GroupAnalysisSyncController";



// Registry contexts and its providers
export {
    RegistryController,
    registryControllerContext,
    registryObjectContext,
    registryOpacityContext,
    registryRangeFromContext,
    registryRangeToContext,
    registryLoadingContext,
    registryMaxContext,
    registryMinContext,
    registryHighlightContext,

} from "./controllers/RegistryController";

export type {
    IElementWithRegistryController
} from "./controllers/RegistryController";



// Manager contexts and other related tools

export {
    managerControllerContext,
    managerContext,
    managerPaletteContext,
    managerAdvancedPalettesContext,
    managerSmoothContext,
    managerGraphFunctionContext,
    managerToolContext,
    managerInteractiveAnalysesContext,
    ManagerController
} from "./controllers/ManagerController";

export type {
    IElementWithManagerController,
    ManagerPaletteContextType,
} from "./controllers/ManagerController";


// Config contexts and other tools

export {
    configContext,
    ConfigController
} from "./controllers/ConfigController";

export type { 
    ConfigSettings, 
    GroupExportSettings, 
    PngExportSettings
} from "./controllers/ConfigController";




export { AbstractApp } from "./apps/AbstractApp";

// The UI

export { ThermalAppElement } from "./ui/App";
export { ThermalBarElement } from "./ui/Bar";
export { ThermalBtnElement } from "./ui/Btn";
export type { BtnSizes, BtnVariants } from "./ui/Btn";
export { ThermalDialogElement } from "./ui/Dialog";
export { ThermalDropdownElement } from "./ui/Dropdown";
export { ThermalDropinElement } from "./ui/Dropin";
export { ThermalExpandableElement } from "./ui/Expandable";
export { ThermalFieldElement } from "./ui/Field";
export { ThermalIconElement } from "./ui/Icon";
export { ThermalPosterElement } from "./ui/Loading";
export { ThermalRadioElement } from "./ui/Radio";
export { ThermalSlotElement } from "./ui/Slot";
export { ThermalSpinnerElement } from "./ui/Spinner";
export { ThermalTipElement } from "./ui/Tip";

// The providers abstractions

export { AbstractFileProvider } from "./hierarchy/abstraction/AbstractFileProvider";
export { AbstractGroupProvider } from "./hierarchy/abstraction/AbstractGroupProvider";
export { AbstractManagerProvider } from "./hierarchy/abstraction/AbstractManagerProvider";
export { AbstractRegistryProvider } from "./hierarchy/abstraction/AbstractRegistryProvider";

// The consumers abstraction

export { AbstractFileConsumer } from "./hierarchy/consumers/AbstractFileConsumer";
export { AbstractGroupConsumer } from "./hierarchy/consumers/AbstractGroupConsumer";
export { AbstractManagerConsumer } from "./hierarchy/consumers/AbstractManagerConsumer";
export { AbstractRegistryConsumer } from "./hierarchy/consumers/AbstractRegistryConsumer";




// Independent controls

export { AppInfoButton } from "./controls/independent/AppInfoButton";
export { DisplayPanel } from "./controls/independent/DisplayPanel";
export { ConfigDialog } from "./controls/independent/ConfigDialog";

// The providers elements

export { FileCopyElement } from "./hierarchy/providers/FileCopy";
export { FileProviderElement } from "./hierarchy/providers/FileProvider";
export { GroupProviderElement } from "./hierarchy/providers/GroupProvider";
export { ManagerProviderElement } from "./hierarchy/providers/ManagerProvider";
export { RegistryProviderElement } from "./hierarchy/providers/RegistryProvider";

// Manager controls

export { ManagerExportPanel } from "./controls/manager/ManagerExportPanel";
export { ManagerGraphSmoothSwitch } from "./controls/manager/ManagerGraphSmoothSwitch";
export { ManagerImageSmoothSwitch } from "./controls/manager/ManagerImageSmoothSwitch";
export { ManagerPaletteButtons } from "./controls/manager/ManagerPaletteButtons";
export { ManagerPaletteDropdown } from "./controls/manager/ManagerPaletteDropdown";
export { ManagerToolBar } from "./controls/manager/ManagerToolsBar";

// Registry controls

export { RegistryRangeForm } from "./controls/registry/RegistryRangeForm";
export { RegistryTicksBar } from "./controls/registry/RegistryTicksBar";
export { RegistryRangeSlider } from "./controls/registry/RegistryRangeSlider";
export { RegistryHistogram } from "./controls/registry/RegistryHistogram";
export { RegistryRangeFullButton } from "./controls/registry/RegistryRangeFullButton";
export { RegistryRangeAutoButton } from "./controls/registry/RegistryRangeAutoButton";
export { RegistryRangeDisplay } from "./controls/registry/RegistryRangeDisplay";
export { RegistryOpacitySlider } from "./controls/registry/RegistryOpacitySlider";

// Group controls

export { GroupChartElement } from "./controls/group/GroupChartElement";
export { GroupAnalysisSyncButton } from "./controls/group/GroupAnalysisSyncButton";
export { GroupDownloadDropdown } from "./controls/group/GroupDownloadDropdown";
export { GroupDownloadButtons } from "./controls/group/GroupDownloadButtons";
export { GroupDropinElement } from "./controls/group/GroupDropinElement";
export { GroupDropinInputElement } from "./controls/group/GroupDropinInput";
export { GroupRangePropagatorElement } from "./controls/group/GroupRangePropagator";
export { GroupTimelineElement } from "./controls/group/GroupTimeline";

// File controls

export { FileCanvasElement } from "./controls/file/FileCanvas";
export { FileVideoExportButton } from "./controls/file/FileVideoExportButton";
export { FilePlaybackSpeedDropdown } from "./controls/file/FilePlaybackSpeedDropdown";
export { FileDownloadButton } from "./controls/file/FileDownloadDropdown";
export { FileButtonElement } from "./controls/file/buttons/FileButton";
export { FileDropdown } from "./controls/file/buttons/FileDropdown";
export { FileLrcButton } from "./controls/file/buttons/FileLrcButton";
export { FilePngButton } from "./controls/file/buttons/FilePngButton";
export { FileRangePropagator } from "./controls/file/buttons/FileRangePropagator";

export { FileAnalysisComplexElement } from "./controls/file/analysis/FileAnalysisComplex";
export { FileAnalysisDisplayElement } from "./controls/file/analysis/FileAnalysisDisplay";
export { FileAnalisisEditDialog } from "./controls/file/analysis/FileAnalysisEdit";
export { FileAnalysisGraphElement } from "./controls/file/analysis/FileAnalysisGraph";
export { FileAnalysisRowElement } from "./controls/file/analysis/FileAnalysisRow";
export { FileAnalysisTableElement } from "./controls/file/analysis/FileAnalysisTable";
export { AnalysisColorDropdown } from "./controls/file/analysis/edit/analysisColorDropdown";
export { AnalysisNameInput } from "./controls/file/analysis/edit/analysisNameInput";
export { AreaEditTable } from "./controls/file/analysis/edit/editAreaTable";
export { EditpointTable } from "./controls/file/analysis/edit/editPointTable";

// Export the internal chart element for the purpose of reuse
export { ThermalChartElement } from "./controls/file/analysis/chart/chart";

// Finally, expor the IIFE-related functionality

export {
    defineAllWebcomponents,
    defineWebcomponent
} from "./utils/iife";

export {
    independentElements,
    elementsProviders,
    elementsAll,
    isLabirthermalWebcomponent,
    defineBaseWebcomponents,
} from "./iifeCatalog";