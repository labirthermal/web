import type * as Webcomponents from "@labirthermal/webcomponents";
import { useLabirWebComponent } from "./useLabirWebComponent";
import type { LabirWebComponentProps } from "./useLabirWebComponent";

/**
 * React wrapper for `<registry-provider>` webcomponent from `@labirthermal/webcomponents`.
 * Creates the registry context for shared range, opacity, and histogram state. It must be
 * rendered under `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryProviderElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryProvider(props: LabirWebComponentProps<Webcomponents.RegistryProviderElement>) {
  const Component = useLabirWebComponent("registry-provider");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-histogram>` webcomponent from `@labirthermal/webcomponents`.
 * Displays a histogram for the registry temperature range. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryHistogram}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryHistogram(props: LabirWebComponentProps<Webcomponents.RegistryHistogram>) {
  const Component = useLabirWebComponent("registry-histogram");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-opacity-slider>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a control for changing registry opacity. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryOpacitySlider}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryOpacitySlider(props: LabirWebComponentProps<Webcomponents.RegistryOpacitySlider>) {
  const Component = useLabirWebComponent("registry-opacity-slider");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-range-auto-button>` webcomponent from
 * `@labirthermal/webcomponents`.
 * Provides a button for automatically setting the temperature range. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryRangeAutoButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryRangeAutoButton(props: LabirWebComponentProps<Webcomponents.RegistryRangeAutoButton>) {
  const Component = useLabirWebComponent("registry-range-auto-button");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-range-full-button>` webcomponent from
 * `@labirthermal/webcomponents`.
 * Provides a button for using the full temperature range. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryRangeFullButton}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryRangeFullButton(props: LabirWebComponentProps<Webcomponents.RegistryRangeFullButton>) {
  const Component = useLabirWebComponent("registry-range-full-button");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-range-display>` webcomponent from `@labirthermal/webcomponents`.
 * Displays the current registry temperature range. It must be rendered under `<RegistryProvider>`
 * nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryRangeDisplay}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryRangeDisplay(props: LabirWebComponentProps<Webcomponents.RegistryRangeDisplay>) {
  const Component = useLabirWebComponent("registry-range-display");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-range-form>` webcomponent from `@labirthermal/webcomponents`.
 * Provides form controls for editing the temperature range. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryRangeForm}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryRangeForm(props: LabirWebComponentProps<Webcomponents.RegistryRangeForm>) {
  const Component = useLabirWebComponent("registry-range-form");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-range-slider>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a slider for adjusting the temperature range. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryRangeSlider}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryRangeSlider(props: LabirWebComponentProps<Webcomponents.RegistryRangeSlider>) {
  const Component = useLabirWebComponent("registry-range-slider");
  return <Component {...props} />;
}

/**
 * React wrapper for `<registry-ticks-bar>` webcomponent from `@labirthermal/webcomponents`.
 * Displays temperature ticks for the registry range. It must be rendered under
 * `<RegistryProvider>` nested within `<ManagerProvider>` inside `<LabirthermalProvider>`.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.RegistryTicksBar}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function RegistryTicksBar(props: LabirWebComponentProps<Webcomponents.RegistryTicksBar>) {
  const Component = useLabirWebComponent("registry-ticks-bar");
  return <Component {...props} />;
}
