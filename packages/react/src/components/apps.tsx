import type * as Webcomponents from "@labirthermal/webcomponents";
import { useLabirWebComponent } from "./useLabirWebComponent";
import type { LabirWebComponentProps } from "./useLabirWebComponent";

/**
 * React wrapper for `<thermal-dropin-app>` webcomponent from `@labirthermal/webcomponents`.
 * Provides an application for selecting and analyzing local thermal files. It must be rendered
 * inside `<LabirthermalProvider>`; the app supplies its own manager, registry, group, and file
 * providers.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalDropinAppElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalDropinApp(props: LabirWebComponentProps<Webcomponents.ThermalDropinAppElement>) {
  const Component = useLabirWebComponent("thermal-dropin-app");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-file-app>` webcomponent from `@labirthermal/webcomponents`.
 * Displays and analyzes one thermal file in a self-contained application. It must be rendered
 * inside `<LabirthermalProvider>`; the app supplies its own manager, registry, group, and file
 * providers.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalFileAppElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalFileApp(props: LabirWebComponentProps<Webcomponents.ThermalFileAppElement>) {
  const Component = useLabirWebComponent("thermal-file-app");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-group-app>` webcomponent from `@labirthermal/webcomponents`.
 * Displays and analyzes multiple thermal files in a self-contained group application. It must be
 * rendered inside `<LabirthermalProvider>`; the app supplies its own manager, registry, group,
 * and file providers.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalGroupAppElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalGroupApp(props: LabirWebComponentProps<Webcomponents.ThermalGroupAppElement>) {
  const Component = useLabirWebComponent("thermal-group-app");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-simple-app>` webcomponent from `@labirthermal/webcomponents`.
 * Displays one thermal file in a self-contained app with slots for a custom layout. It must be
 * rendered inside `<LabirthermalProvider>`; the app supplies its own manager, registry, group,
 * and file providers.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalSlottedAppElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalSlottedApp(props: LabirWebComponentProps<Webcomponents.ThermalSlottedAppElement>) {
  const Component = useLabirWebComponent("thermal-simple-app");
  return <Component {...props} />;
}

/**
 * React wrapper for `<apparent-temperature-aat>` webcomponent from `@labirthermal/webcomponents`.
 * Calculates apparent temperature from air temperature, wind speed, and humidity. It must be
 * rendered inside `<LabirthermalProvider>`; the app supplies its own manager, registry, group,
 * and file providers.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.AatAppElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function AatApp(props: LabirWebComponentProps<Webcomponents.AatAppElement>) {
  const Component = useLabirWebComponent("apparent-temperature-aat");
  return <Component {...props} />;
}
