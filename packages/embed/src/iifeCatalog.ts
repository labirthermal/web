import {name, version} from "../package.json";

import { AatAppElement } from "./apps/AustralianApparentTemperature";
import { DropinAppElement } from "./apps/ThermalDropinApp";
import { ThermalFileAppElement } from "./apps/ThermalFileApp";
import { ThermalGroupAppElement } from "./apps/ThermalGroupApp";
import { ThermalChartElement } from "./controls/file/analysis/chart/chart";
import { AnalysisColorDropdown } from "./controls/file/analysis/edit/analysisColorDropdown";
import { AnalysisNameInput } from "./controls/file/analysis/edit/analysisNameInput";
import { AreaEditTable } from "./controls/file/analysis/edit/editAreaTable";
import { EditpointTable } from "./controls/file/analysis/edit/editPointTable";
import { FileAnalysisComplexElement } from "./controls/file/analysis/FileAnalysisComplex";
import { FileAnalysisDisplayElement } from "./controls/file/analysis/FileAnalysisDisplay";
import { FileAnalisisEditDialog } from "./controls/file/analysis/FileAnalysisEdit";
import { FileAnalysisGraphElement } from "./controls/file/analysis/FileAnalysisGraph";
import { FileAnalysisRowElement } from "./controls/file/analysis/FileAnalysisRow";
import { FileAnalysisTableElement } from "./controls/file/analysis/FileAnalysisTable";
import { FileButtonElement } from "./controls/file/buttons/FileButton";
import { FileDropdown } from "./controls/file/buttons/FileDropdown";
import { FileLrcButton } from "./controls/file/buttons/FileLrcButton";
import { FilePngButton } from "./controls/file/buttons/FilePngButton";
import { FileRangePropagator } from "./controls/file/buttons/FileRangePropagator";
import { FileCanvasElement } from "./controls/file/FileCanvas";
import { FileDownloadButton } from "./controls/file/FileDownloadDropdown";
import { FileInfoButton } from "./controls/file/FileInfoButton";
import { FileLabelElement } from "./controls/file/fileLabel";
import { FilePlaybackSpeedDropdown } from "./controls/file/FilePlaybackSpeedDropdown";
import { FileTimelineElement } from "./controls/file/FileTimelineElement";
import { FileVideoExportButton } from "./controls/file/FileVideoExportButton";
import { FileVideoExportPanel } from "./controls/file/video/FileVideoExportPanel";
import { GroupAnalysisSyncButton } from "./controls/group/GroupAnalysisSyncButton";
import { GroupChartElement } from "./controls/group/GroupChartElement";
import { GroupDownloadButtons } from "./controls/group/GroupDownloadButtons";
import { GroupDownloadDropdown } from "./controls/group/GroupDownloadDropdown";
import { GroupDropinElement } from "./controls/group/GroupDropinElement";
import { GroupDropinInputElement } from "./controls/group/GroupDropinInput";
import { GroupRangePropagatorElement } from "./controls/group/GroupRangePropagator";
import { GroupTimelineElement } from "./controls/group/GroupTimeline";
import { ManagerAdvancedPaletteSwitch } from "./controls/manager/ManagerAdvancedPaletteSwitch";
import { ManagerExportPanel } from "./controls/manager/ManagerExportPanel";
import { ManagerGraphSmoothSwitch } from "./controls/manager/ManagerGraphSmoothSwitch";
import { ManagerImageSmoothSwitch } from "./controls/manager/ManagerImageSmoothSwitch";
import { ManagerPaletteButtons } from "./controls/manager/ManagerPaletteButtons";
import { ManagerPaletteDropdown } from "./controls/manager/ManagerPaletteDropdown";
import { ManagerToolBar } from "./controls/manager/ManagerToolsBar";
import { RegistryHistogram } from "./controls/registry/RegistryHistogram";
import { RegistryOpacitySlider } from "./controls/registry/RegistryOpacitySlider";
import { RegistryRangeAutoButton } from "./controls/registry/RegistryRangeAutoButton";
import { RegistryRangeDisplay } from "./controls/registry/RegistryRangeDisplay";
import { RegistryRangeForm } from "./controls/registry/RegistryRangeForm";
import { RegistryRangeFullButton } from "./controls/registry/RegistryRangeFullButton";
import { RegistryRangeSlider } from "./controls/registry/RegistryRangeSlider";
import { RegistryTicksBar } from "./controls/registry/RegistryTicksBar";
import { FileCopyElement } from "./hierarchy/providers/FileCopy";
import { FileProviderElement } from "./hierarchy/providers/FileProvider";
import { GroupProviderElement } from "./hierarchy/providers/GroupProvider";
import { ManagerProviderElement } from "./hierarchy/providers/ManagerProvider";
import { RegistryProviderElement } from "./hierarchy/providers/RegistryProvider";
import { FileDetailElement } from "./renderers/FileDetail";
import { FileThumbnailElement } from "./renderers/FileThumbnail";
import { ThermalAppElement } from "./ui/App";
import { ThermalBarElement } from "./ui/Bar";
import { ThermalBtnElement } from "./ui/Btn";
import { BtnGroupElement } from "./ui/BtnGroup";
import { ThermalDialogElement } from "./ui/Dialog";
import { ThermalDropdownElement } from "./ui/Dropdown";
import { ThermalDropinElement } from "./ui/Dropin";
import { ThermalExpandableElement } from "./ui/Expandable";
import { ThermalFieldElement } from "./ui/Field";
import { ThermalIconElement } from "./ui/Icon";
import { ThermalPosterElement } from "./ui/Loading";
import { ThermalRadioElement } from "./ui/Radio";
import { ThermalSlotElement } from "./ui/Slot";
import { ThermalSpinnerElement } from "./ui/Spinner";
import { ThermalTipElement } from "./ui/Tip";
import { defineAllWebcomponents } from "./utils/iife";

/**
 * List of the UI components
 */
export const elementsUi = {
    "thermal-app": ThermalAppElement,
    "thermal-bar": ThermalBarElement,
    "thermal-btn": ThermalBtnElement,
    "thermal-btn-group": BtnGroupElement,
    "thermal-dialog": ThermalDialogElement,
    "thermal-dropdown": ThermalDropdownElement,
    "thermal-dropin": ThermalDropinElement,
    "thermal-expandable": ThermalExpandableElement,
    "thermal-field": ThermalFieldElement,
    "thermal-icon": ThermalIconElement,
    "thermal-loading": ThermalPosterElement,
    "thermal-radio": ThermalRadioElement,
    "thermal-slot": ThermalSlotElement,
    "thermal-spinner": ThermalSpinnerElement,
    "thermal-tip": ThermalTipElement
} as const;

export const independentElements = {

} as const;

/**
 * List of provider components
 */
export const elementsProviders = {
    // This needs to go first
    "manager-provider": ManagerProviderElement,
    // This needs to go second
    "registry-provider": RegistryProviderElement,
    // This needs to go third
    "group-provider": GroupProviderElement,
    // This needs to go last
    "file-provider": FileProviderElement,
    "file-copy": FileCopyElement,

} as const;


const elementsManagerControls = {
    "manager-image-smooth-switch": ManagerImageSmoothSwitch,
    "manager-graph-smooth-switch": ManagerGraphSmoothSwitch,
    "manager-advanced-palette-switch": ManagerAdvancedPaletteSwitch,
    "manager-palette-dropdown": ManagerPaletteDropdown,
    "manager-palette-buttons": ManagerPaletteButtons,
    "manager-tool-bar": ManagerToolBar,
    /** @deprecated This sort of export should never be used. Please, do export thermal images only through the LIT components instead of the `@labirthermal/core` export. */
    "manager-export-panel": ManagerExportPanel
} as const;

const elementsRegistryControls = {
    "registry-histogram": RegistryHistogram,
    "registry-opacity-slider": RegistryOpacitySlider,
    "registry-range-auto-button": RegistryRangeAutoButton,
    "registry-range-full-button": RegistryRangeFullButton,
    "registry-range-display": RegistryRangeDisplay,
    "registry-range-form": RegistryRangeForm,
    "registry-range-slider": RegistryRangeSlider,
    "registry-ticks-bar": RegistryTicksBar
} as const;

const elementsGroupControls = {
    "group-analysis-sync-button": GroupAnalysisSyncButton,
    "group-chart": GroupChartElement,
    "group-download-buttons": GroupDownloadButtons,
    "group-download-dropdown": GroupDownloadDropdown,
    "group-dropin-element": GroupDropinElement,
    "group-dropin-input": GroupDropinInputElement,
    "group-range-propagator": GroupRangePropagatorElement,
    "group-timeline": GroupTimelineElement
} as const;

const elementsFileControls = {
    "file-canvas": FileCanvasElement,
    "file-download-dropdown": FileDownloadButton,
    "file-info-button": FileInfoButton,
    "file-playback-speed-dropdown": FilePlaybackSpeedDropdown,
    "file-timeline": FileTimelineElement,
    "file-video-export-button": FileVideoExportButton,
    "file-video-export-panel": FileVideoExportPanel,
    "file-label": FileLabelElement,
    "file-button": FileButtonElement,
    "file-dropdown-elt": FileDropdown,
    "file-download-lrc": FileLrcButton,
    "file-download-png": FilePngButton,
    "file-range-propagator": FileRangePropagator,
    "file-analysis-complex": FileAnalysisComplexElement,
    "file-analysis-display": FileAnalysisDisplayElement,
    "file-analysis-edit": FileAnalisisEditDialog,
    "file-analysis-graph": FileAnalysisGraphElement,
    "file-analysis-table-row": FileAnalysisRowElement,
    "file-analysis-table": FileAnalysisTableElement,
    "analysis-color": AnalysisColorDropdown,
    "analysis-name": AnalysisNameInput,
    "edit-area": AreaEditTable,
    "edit-point": EditpointTable,
    "thermal-chart": ThermalChartElement,
    "file-detail": FileDetailElement,
    "file-thumbnail": FileThumbnailElement
    

} as const;



const elementsApplications = {
    "apparent-temperature-aat": AatAppElement,
    "thermal-dropin-app": DropinAppElement,
    "thermal-file-app": ThermalFileAppElement,
    "thermal-group-app": ThermalGroupAppElement
} as const;

/** 
 * All the webcomponents from the @labirthermal/webcomponents package in a list for the purpose of its registration in `defineAllWebcomponents`.
 * @see {@link defineBaseWebcomponents}
 */
export const elementsAll = {
    ...elementsUi,
    ...elementsProviders,
    ...elementsManagerControls,
    ...elementsRegistryControls,
    ...elementsGroupControls,
    ...elementsFileControls,
    ...elementsApplications
} as const;

export const isLabirthermalWebcomponent = (tag: string): boolean => {
    return tag in elementsAll;
};

/** Define all webcomponents from the @labirthermal/webcomponents package */
export const defineBaseWebcomponents = () => {
    defineAllWebcomponents(name, version, elementsAll)
}