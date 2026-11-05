import type * as Webcomponents from "@labirthermal/webcomponents";
import { useLabirWebComponent } from "./useLabirWebComponent";
import type { LabirWebComponentProps } from "./useLabirWebComponent";

/**
 * React wrapper for `<group-provider>` webcomponent from `@labirthermal/webcomponents`.
 * Creates a group context for related files and synchronized state. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupProviderElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupProvider(props: LabirWebComponentProps<Webcomponents.GroupProviderElement>) {
  const Component = useLabirWebComponent("group-provider");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-analysis-sync-button>` webcomponent from
 * `@labirthermal/webcomponents`.
 * Provides a control for synchronizing analysis areas across the group. It must be rendered under
 * `<GroupProvider>` nested within `<RegistryProvider>` and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupAnalysisSyncButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupAnalysisSyncButton(props: LabirWebComponentProps<Webcomponents.GroupAnalysisSyncButton>) {
  const Component = useLabirWebComponent("group-analysis-sync-button");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-chart>` webcomponent from `@labirthermal/webcomponents`.
 * Displays a chart of thermal data for the group. It must be rendered under `<GroupProvider>`
 * nested within `<RegistryProvider>` and `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupChartElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupChart(props: LabirWebComponentProps<Webcomponents.GroupChartElement>) {
  const Component = useLabirWebComponent("group-chart");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-download-buttons>` webcomponent from `@labirthermal/webcomponents`.
 * Provides download actions for files in the group. It must be rendered under `<GroupProvider>`
 * nested within `<RegistryProvider>` and `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupDownloadButtons}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupDownloadButtons(props: LabirWebComponentProps<Webcomponents.GroupDownloadButtons>) {
  const Component = useLabirWebComponent("group-download-buttons");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-download-dropdown>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a dropdown of group download actions. It must be rendered under `<GroupProvider>`
 * nested within `<RegistryProvider>` and `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupDownloadDropdown}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupDownloadDropdown(props: LabirWebComponentProps<Webcomponents.GroupDownloadDropdown>) {
  const Component = useLabirWebComponent("group-download-dropdown");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-dropin-element>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a drop area for adding files to the group. It must be rendered under `<GroupProvider>`
 * nested within `<RegistryProvider>` and `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupDropinElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupDropin(props: LabirWebComponentProps<Webcomponents.GroupDropinElement>) {
  const Component = useLabirWebComponent("group-dropin-element");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-dropin-input>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a file input for adding files to the group. It must be rendered under
 * `<GroupProvider>` nested within `<RegistryProvider>` and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupDropinInputElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupDropinInput(props: LabirWebComponentProps<Webcomponents.GroupDropinInputElement>) {
  const Component = useLabirWebComponent("group-dropin-input");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-range-propagator>` webcomponent from `@labirthermal/webcomponents`.
 * Propagates the group temperature range to its files. It must be rendered under
 * `<GroupProvider>` nested within `<RegistryProvider>` and `<ManagerProvider>` inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupRangePropagatorElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupRangePropagator(props: LabirWebComponentProps<Webcomponents.GroupRangePropagatorElement>) {
  const Component = useLabirWebComponent("group-range-propagator");
  return <Component {...props} />;
}

/**
 * React wrapper for `<group-timeline>` webcomponent from `@labirthermal/webcomponents`.
 * Displays a shared timeline for files in the group. It must be rendered under `<GroupProvider>`
 * nested within `<RegistryProvider>` and `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.GroupTimelineElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function GroupTimeline(props: LabirWebComponentProps<Webcomponents.GroupTimelineElement>) {
  const Component = useLabirWebComponent("group-timeline");
  return <Component {...props} />;
}
