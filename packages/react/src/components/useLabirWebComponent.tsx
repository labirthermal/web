import React, { useContext, useMemo } from "react";
import { createComponent } from "@lit/react";
import type { ReactWebComponent } from "@lit/react";
import type { LabirRuntime } from "../provider/runtime";
import { LabirContext } from "../provider/LabirthermalProvider";

type Catalog = LabirRuntime["elementsAll"];
type TagName = Extract<keyof Catalog, string>;
type ElementConstructor<Tag extends TagName> = new () => InstanceType<Catalog[Tag]>;

export type LabirWebComponentProps<Element extends HTMLElement> =
  React.ComponentProps<ReactWebComponent<Element>>;

/**
 * Returns the Lit-to-React wrapper for an element in the initialized runtime.
 * The constructor is resolved from provider context to keep module imports SSR-safe.
 */
export function useLabirWebComponent<Tag extends TagName>(
  tagName: Tag,
): React.ComponentType<LabirWebComponentProps<InstanceType<Catalog[Tag]>>> {
  const runtime = useContext(LabirContext);

  const Wrapped = useMemo(() => {
    if (!runtime) {
      return null;
    }

    // TypeScript widens a generic indexed lookup to the union of catalog constructors.
    const elementClass = runtime.elementsAll[tagName] as unknown as ElementConstructor<Tag>;
    return createComponent({ tagName, elementClass, react: React });
  }, [runtime, tagName]);

  if (!Wrapped) {
    throw new Error(`<${tagName}> must be rendered inside LabirthermalProvider.`);
  }

  return Wrapped;
}
