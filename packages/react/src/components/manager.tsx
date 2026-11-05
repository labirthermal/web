import type * as Webcomponents from "@labirthermal/webcomponents";
import { useLabirWebComponent } from "./useLabirWebComponent";
import type { LabirWebComponentProps } from "./useLabirWebComponent";

/**
 * React wrapper for `<manager-provider>` webcomponent from `@labirthermal/webcomponents`.
 * Creates the manager context for shared thermal state and settings. It must be rendered inside
 * `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerProviderElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerProvider(props: LabirWebComponentProps<Webcomponents.ManagerProviderElement>) {
  const Component = useLabirWebComponent("manager-provider");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-graph-smooth-switch>` webcomponent from
 * `@labirthermal/webcomponents`.
 * Provides a switch for smoothing plotted graphs. It must be rendered under `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerGraphSmoothSwitch}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerGraphSmoothSwitch(props: LabirWebComponentProps<Webcomponents.ManagerGraphSmoothSwitch>) {
  const Component = useLabirWebComponent("manager-graph-smooth-switch");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-image-smooth-switch>` webcomponent from
 * `@labirthermal/webcomponents`.
 * Provides a switch for smoothing thermal images. It must be rendered under `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerImageSmoothSwitch}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerImageSmoothSwitch(props: LabirWebComponentProps<Webcomponents.ManagerImageSmoothSwitch>) {
  const Component = useLabirWebComponent("manager-image-smooth-switch");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-palette-buttons>` webcomponent from `@labirthermal/webcomponents`.
 * Provides buttons for selecting a thermal palette. It must be rendered under `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerPaletteButtons}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerPaletteButtons(props: LabirWebComponentProps<Webcomponents.ManagerPaletteButtons>) {
  const Component = useLabirWebComponent("manager-palette-buttons");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-palette-dropdown>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a dropdown for selecting a thermal palette. It must be rendered under
 * `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerPaletteDropdown}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerPaletteDropdown(props: LabirWebComponentProps<Webcomponents.ManagerPaletteDropdown>) {
  const Component = useLabirWebComponent("manager-palette-dropdown");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-tool-bar>` webcomponent from `@labirthermal/webcomponents`.
 * Provides controls for selecting the active analysis tool. It must be rendered under
 * `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerToolBar}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerToolBar(props: LabirWebComponentProps<Webcomponents.ManagerToolBar>) {
  const Component = useLabirWebComponent("manager-tool-bar");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-advanced-palette-switch>` webcomponent from
 * `@labirthermal/webcomponents`.
 * Provides a switch for enabling advanced palettes. It must be rendered under `<ManagerProvider>`
 * inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerAdvancedPaletteSwitch}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerAdvancedPaletteSwitch(props: LabirWebComponentProps<Webcomponents.ManagerAdvancedPaletteSwitch>) {
  const Component = useLabirWebComponent("manager-advanced-palette-switch");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-unit-switch>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a control for selecting the temperature unit. It must be rendered under
 * `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ManagerUnitSwitch}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerUnitSwitch(props: LabirWebComponentProps<Webcomponents.ManagerUnitSwitch>) {
  const Component = useLabirWebComponent("manager-unit-switch");
  return <Component {...props} />;
}

/**
 * React wrapper for `<manager-export-panel>` webcomponent from `@labirthermal/webcomponents`.
 * Provides the deprecated manager-level export controls. It must be rendered under
 * `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @deprecated Prefer file download and video export controls.
 * @see {@link Webcomponents.ManagerExportPanel}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ManagerExportPanel(props: LabirWebComponentProps<Webcomponents.ManagerExportPanel>) {
  const Component = useLabirWebComponent("manager-export-panel");
  return <Component {...props} />;
}
