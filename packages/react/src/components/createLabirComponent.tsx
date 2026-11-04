import React, { useContext, useMemo } from "react";
import { createComponent } from "@lit/react";
import type { ReactWebComponent } from "@lit/react";
import type { LabirRuntime } from "../provider/runtime";
import { LabirContext } from "../provider/LabirProvider";

type Catalog = LabirRuntime["elementsAll"];

type Constructors = {
  [Tag in keyof Catalog]: new () => InstanceType<Catalog[Tag]>;
};

export type LabirComponent<Tag extends keyof Catalog> = (
  props: React.ComponentProps<ReactWebComponent<InstanceType<Catalog[Tag]>>>,
) => React.ReactNode;

export function createLabirComponent<Tag extends keyof Catalog>(
  tagName: Tag,
): LabirComponent<Tag> {
  type Element = InstanceType<Catalog[Tag]>;
  type Props = React.ComponentProps<ReactWebComponent<Element>>;

  function LabirComponent(props: Props) {
    const runtime = useContext(LabirContext);

    const Wrapped = useMemo(() => {
      if (!runtime) {
        return null;
      }

      const catalog: Constructors = runtime.elementsAll;
      const elementClass = catalog[tagName];

      return createComponent({
        tagName,
        elementClass,
        react: React,
      });
    }, [runtime]);

    if (!Wrapped) {
      throw new Error(`<${tagName}> must be rendered inside LabirProvider.`);
    }

    return <Wrapped {...props} />;
  }

  LabirComponent.displayName = `Labir(${tagName})`;

  return LabirComponent;
}
