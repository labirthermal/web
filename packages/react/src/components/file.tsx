import type * as Webcomponents from "@labirthermal/webcomponents";
import { useLabirWebComponent } from "./useLabirWebComponent";
import type { LabirWebComponentProps } from "./useLabirWebComponent";

/**
 * React wrapper for `<file-provider>` webcomponent from `@labirthermal/webcomponents`.
 * Creates a file context and loads its thermal recording. It must be rendered under
 * `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileProviderElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileProvider(props: LabirWebComponentProps<Webcomponents.FileProviderElement>) {
  const Component = useLabirWebComponent("file-provider");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-copy>` webcomponent from `@labirthermal/webcomponents`.
 * Copies file context state to a nested file context. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileCopyElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileCopy(props: LabirWebComponentProps<Webcomponents.FileCopyElement>) {
  const Component = useLabirWebComponent("file-copy");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-canvas>` webcomponent from `@labirthermal/webcomponents`.
 * Renders the thermal image and its analysis overlays. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileCanvasElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileCanvas(props: LabirWebComponentProps<Webcomponents.FileCanvasElement>) {
  const Component = useLabirWebComponent("file-canvas");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-download-dropdown>` webcomponent from `@labirthermal/webcomponents`.
 * Provides download actions for the current thermal file. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileDownloadButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileDownloadButton(props: LabirWebComponentProps<Webcomponents.FileDownloadButton>) {
  const Component = useLabirWebComponent("file-download-dropdown");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-info-button>` webcomponent from `@labirthermal/webcomponents`.
 * Opens information for the current thermal file. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileInfoButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileInfoButton(props: LabirWebComponentProps<Webcomponents.FileInfoButton>) {
  const Component = useLabirWebComponent("file-info-button");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-playback-speed-dropdown>` webcomponent from
 * `@labirthermal/webcomponents`.
 * Provides a control for selecting playback speed. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FilePlaybackSpeedDropdown}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FilePlaybackSpeedDropdown(props: LabirWebComponentProps<Webcomponents.FilePlaybackSpeedDropdown>) {
  const Component = useLabirWebComponent("file-playback-speed-dropdown");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-timeline>` webcomponent from `@labirthermal/webcomponents`.
 * Displays and controls the current file playback timeline. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileTimelineElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileTimeline(props: LabirWebComponentProps<Webcomponents.FileTimelineElement>) {
  const Component = useLabirWebComponent("file-timeline");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-video-export-button>` webcomponent from `@labirthermal/webcomponents`.
 * Starts video export for the current thermal file. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileVideoExportButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileVideoExportButton(props: LabirWebComponentProps<Webcomponents.FileVideoExportButton>) {
  const Component = useLabirWebComponent("file-video-export-button");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-video-export-panel>` webcomponent from `@labirthermal/webcomponents`.
 * Provides configuration controls for file video export. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileVideoExportPanel}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileVideoExportPanel(props: LabirWebComponentProps<Webcomponents.FileVideoExportPanel>) {
  const Component = useLabirWebComponent("file-video-export-panel");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-label>` webcomponent from `@labirthermal/webcomponents`.
 * Displays the current file label. It must be rendered under `<FileProvider>` nested within
 * `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileLabelElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileLabel(props: LabirWebComponentProps<Webcomponents.FileLabelElement>) {
  const Component = useLabirWebComponent("file-label");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-button>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a button connected to the current file context. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileButtonElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileButton(props: LabirWebComponentProps<Webcomponents.FileButtonElement>) {
  const Component = useLabirWebComponent("file-button");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-dropdown-elt>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a dropdown connected to the current file context. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileDropdown}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileDropdown(props: LabirWebComponentProps<Webcomponents.FileDropdown>) {
  const Component = useLabirWebComponent("file-dropdown-elt");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-download-lrc>` webcomponent from `@labirthermal/webcomponents`.
 * Downloads the current recording as an LRC file. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileLrcButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileLrcButton(props: LabirWebComponentProps<Webcomponents.FileLrcButton>) {
  const Component = useLabirWebComponent("file-download-lrc");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-download-png>` webcomponent from `@labirthermal/webcomponents`.
 * Downloads the current thermal image as a PNG file. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FilePngButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FilePngButton(props: LabirWebComponentProps<Webcomponents.FilePngButton>) {
  const Component = useLabirWebComponent("file-download-png");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-range-propagator>` webcomponent from `@labirthermal/webcomponents`.
 * Propagates the registry temperature range to the current file. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileRangePropagator}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileRangePropagator(props: LabirWebComponentProps<Webcomponents.FileRangePropagator>) {
  const Component = useLabirWebComponent("file-range-propagator");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-analysis-complex>` webcomponent from `@labirthermal/webcomponents`.
 * Displays detailed analysis data for the current file. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileAnalysisComplexElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileAnalysisComplex(props: LabirWebComponentProps<Webcomponents.FileAnalysisComplexElement>) {
  const Component = useLabirWebComponent("file-analysis-complex");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-analysis-display>` webcomponent from `@labirthermal/webcomponents`.
 * Displays analysis measurements for the current file. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileAnalysisDisplayElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileAnalysisDisplay(props: LabirWebComponentProps<Webcomponents.FileAnalysisDisplayElement>) {
  const Component = useLabirWebComponent("file-analysis-display");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-analysis-edit>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a dialog for editing file analyses. It must be rendered under `<FileProvider>` nested
 * within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileAnalisisEditDialog}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileAnalysisEditDialog(props: LabirWebComponentProps<Webcomponents.FileAnalisisEditDialog>) {
  const Component = useLabirWebComponent("file-analysis-edit");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-analysis-graph>` webcomponent from `@labirthermal/webcomponents`.
 * Plots analysis measurements for the current file. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileAnalysisGraphElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileAnalysisGraph(props: LabirWebComponentProps<Webcomponents.FileAnalysisGraphElement>) {
  const Component = useLabirWebComponent("file-analysis-graph");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-analysis-table-row>` webcomponent from `@labirthermal/webcomponents`.
 * Displays one analysis row in the file analysis table. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileAnalysisRowElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileAnalysisRow(props: LabirWebComponentProps<Webcomponents.FileAnalysisRowElement>) {
  const Component = useLabirWebComponent("file-analysis-table-row");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-analysis-table>` webcomponent from `@labirthermal/webcomponents`.
 * Displays the analysis table for the current file. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileAnalysisTableElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileAnalysisTable(props: LabirWebComponentProps<Webcomponents.FileAnalysisTableElement>) {
  const Component = useLabirWebComponent("file-analysis-table");
  return <Component {...props} />;
}

/**
 * React wrapper for `<analysis-color>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a control for changing an analysis color. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.AnalysisColorDropdown}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function AnalysisColorDropdown(props: LabirWebComponentProps<Webcomponents.AnalysisColorDropdown>) {
  const Component = useLabirWebComponent("analysis-color");
  return <Component {...props} />;
}

/**
 * React wrapper for `<analysis-name>` webcomponent from `@labirthermal/webcomponents`.
 * Provides an input for editing an analysis name. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.AnalysisNameInput}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function AnalysisNameInput(props: LabirWebComponentProps<Webcomponents.AnalysisNameInput>) {
  const Component = useLabirWebComponent("analysis-name");
  return <Component {...props} />;
}

/**
 * React wrapper for `<edit-area>` webcomponent from `@labirthermal/webcomponents`.
 * Provides controls for editing analysis areas. It must be rendered under `<FileProvider>` nested
 * within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.AreaEditTable}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function AreaEditTable(props: LabirWebComponentProps<Webcomponents.AreaEditTable>) {
  const Component = useLabirWebComponent("edit-area");
  return <Component {...props} />;
}

/**
 * React wrapper for `<edit-point>` webcomponent from `@labirthermal/webcomponents`.
 * Provides controls for editing analysis points. It must be rendered under `<FileProvider>`
 * nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.EditpointTable}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function EditpointTable(props: LabirWebComponentProps<Webcomponents.EditpointTable>) {
  const Component = useLabirWebComponent("edit-point");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-chart>` webcomponent from `@labirthermal/webcomponents`.
 * Renders a chart of thermal measurements. It must be rendered under `<FileProvider>` nested
 * within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalChartElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalChart(props: LabirWebComponentProps<Webcomponents.ThermalChartElement>) {
  const Component = useLabirWebComponent("thermal-chart");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-detail>` webcomponent from `@labirthermal/webcomponents`.
 * Displays detailed information about the current thermal file. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileDetailElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileDetail(props: LabirWebComponentProps<Webcomponents.FileDetailElement>) {
  const Component = useLabirWebComponent("file-detail");
  return <Component {...props} />;
}

/**
 * React wrapper for `<file-thumbnail>` webcomponent from `@labirthermal/webcomponents`.
 * Displays a thumbnail and summary for the current thermal file. It must be rendered under
 * `<FileProvider>` nested within `<GroupProvider>`, `<RegistryProvider>`, and `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.FileThumbnailElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function FileThumbnail(props: LabirWebComponentProps<Webcomponents.FileThumbnailElement>) {
  const Component = useLabirWebComponent("file-thumbnail");
  return <Component {...props} />;
}
