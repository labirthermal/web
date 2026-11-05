import type * as Webcomponents from "@labirthermal/webcomponents";
import { useLabirWebComponent } from "./useLabirWebComponent";
import type { LabirWebComponentProps } from "./useLabirWebComponent";

/**
 * React wrapper for `<thermal-app>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a structural container for a thermal application interface. It must be rendered inside
 * `<LabirthermalProvider>`; no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalAppElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalApp(props: LabirWebComponentProps<Webcomponents.ThermalAppElement>) {
  const Component = useLabirWebComponent("thermal-app");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-bar>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a toolbar container for application controls. It must be rendered inside
 * `<LabirthermalProvider>`; no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalBarElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalBar(props: LabirWebComponentProps<Webcomponents.ThermalBarElement>) {
  const Component = useLabirWebComponent("thermal-bar");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-btn>` webcomponent from `@labirthermal/webcomponents`.
 * Renders a configurable button. It must be rendered inside `<LabirthermalProvider>`; no thermal
 * context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalBtnElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalBtn(props: LabirWebComponentProps<Webcomponents.ThermalBtnElement>) {
  const Component = useLabirWebComponent("thermal-btn");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-btn-group>` webcomponent from `@labirthermal/webcomponents`.
 * Groups related buttons into one control. It must be rendered inside `<LabirthermalProvider>`;
 * no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalBtnGroupElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalBtnGroup(props: LabirWebComponentProps<Webcomponents.ThermalBtnGroupElement>) {
  const Component = useLabirWebComponent("thermal-btn-group");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-dialog>` webcomponent from `@labirthermal/webcomponents`.
 * Renders dialog content opened by a slotted invoker. It must be rendered inside
 * `<LabirthermalProvider>`; no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalDialogElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalDialog(props: LabirWebComponentProps<Webcomponents.ThermalDialogElement>) {
  const Component = useLabirWebComponent("thermal-dialog");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-dropdown>` webcomponent from `@labirthermal/webcomponents`.
 * Renders a dropdown for slotted options. It must be rendered inside `<LabirthermalProvider>`; no
 * thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalDropdownElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalDropdown(props: LabirWebComponentProps<Webcomponents.ThermalDropdownElement>) {
  const Component = useLabirWebComponent("thermal-dropdown");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-dropin>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a file drop and selection control. It must be rendered inside
 * `<LabirthermalProvider>`; no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalDropinElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalDropin(props: LabirWebComponentProps<Webcomponents.ThermalDropinElement>) {
  const Component = useLabirWebComponent("thermal-dropin");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-expandable>` webcomponent from `@labirthermal/webcomponents`.
 * Provides an expandable content container. It must be rendered inside `<LabirthermalProvider>`;
 * no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalExpandableElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalExpandable(props: LabirWebComponentProps<Webcomponents.ThermalExpandableElement>) {
  const Component = useLabirWebComponent("thermal-expandable");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-field>` webcomponent from `@labirthermal/webcomponents`.
 * Renders a labeled form field. It must be rendered inside `<LabirthermalProvider>`; no thermal
 * context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalFieldElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalField(props: LabirWebComponentProps<Webcomponents.ThermalFieldElement>) {
  const Component = useLabirWebComponent("thermal-field");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-icon>` webcomponent from `@labirthermal/webcomponents`.
 * Renders a library icon. It must be rendered inside `<LabirthermalProvider>`; no thermal context
 * provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalIconElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalIcon(props: LabirWebComponentProps<Webcomponents.ThermalIconElement>) {
  const Component = useLabirWebComponent("thermal-icon");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-loading>` webcomponent from `@labirthermal/webcomponents`.
 * Renders the library loading indicator. It must be rendered inside `<LabirthermalProvider>`; no
 * thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalPosterElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalLoading(props: LabirWebComponentProps<Webcomponents.ThermalPosterElement>) {
  const Component = useLabirWebComponent("thermal-loading");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-radio>` webcomponent from `@labirthermal/webcomponents`.
 * Renders a radio-style selection control. It must be rendered inside `<LabirthermalProvider>`;
 * no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalRadioElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalRadio(props: LabirWebComponentProps<Webcomponents.ThermalRadioElement>) {
  const Component = useLabirWebComponent("thermal-radio");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-slot>` webcomponent from `@labirthermal/webcomponents`.
 * Provides a library slot container. It must be rendered inside `<LabirthermalProvider>`; no
 * thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalSlotElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalSlot(props: LabirWebComponentProps<Webcomponents.ThermalSlotElement>) {
  const Component = useLabirWebComponent("thermal-slot");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-spinner>` webcomponent from `@labirthermal/webcomponents`.
 * Renders an animated loading spinner. It must be rendered inside `<LabirthermalProvider>`; no
 * thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalSpinnerElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalSpinner(props: LabirWebComponentProps<Webcomponents.ThermalSpinnerElement>) {
  const Component = useLabirWebComponent("thermal-spinner");
  return <Component {...props} />;
}

/**
 * React wrapper for `<thermal-tip>` webcomponent from `@labirthermal/webcomponents`.
 * Renders tooltip content for a slotted trigger. It must be rendered inside
 * `<LabirthermalProvider>`; no thermal context provider is required.
 * @module @labirthermal/react
 * @author Jan Jáchim
 * @see {@link Webcomponents.ThermalTipElement}
 * @see {@link https://github.com/labirthermal/web/blob/main/packages/webcomponents/README.md}
 */
export function ThermalTip(props: LabirWebComponentProps<Webcomponents.ThermalTipElement>) {
  const Component = useLabirWebComponent("thermal-tip");
  return <Component {...props} />;
}
