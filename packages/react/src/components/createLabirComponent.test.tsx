// @vitest-environment jsdom

import React, { act, createRef } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LabirthermalProvider, ThermalBtn, FileProvider, RegistryRangeSlider } from "../index.export";

const mocks = vi.hoisted(() => ({ load: vi.fn<() => Promise<unknown>>() }));
vi.mock("../provider/runtime", () => ({ loadLabirRuntime: mocks.load }));

let root: Root | undefined;
let container: HTMLDivElement;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  mocks.load.mockReset();
});

afterEach(async () => {
  await act(async () => root?.unmount());
  root = undefined;
  container.remove();
  vi.unstubAllGlobals();
});

it("forwards properties, refs, native events and slotted children through Lit's wrapper", async () => {
  class ButtonElement extends HTMLElement {
    variant = "default";
    disabled = false;
  }
  if (!customElements.get("thermal-btn")) {
    customElements.define("thermal-btn", ButtonElement);
  }
  mocks.load.mockResolvedValue({ elementsAll: { "thermal-btn": ButtonElement } });
  const ref = createRef<React.ComponentRef<typeof ThermalBtn>>();
  const onClick = vi.fn();
  root = createRoot(container);

  await act(async () => {
    root?.render(
      <LabirthermalProvider>
        <ThermalBtn ref={ref} variant="primary" disabled onClick={onClick}>
          <span slot="label">Hello</span>
        </ThermalBtn>
      </LabirthermalProvider>,
    );
  });

  const button = container.querySelector("thermal-btn");
  expect(button).toBeInstanceOf(ButtonElement);
  expect(ref.current).toBe(button);
  expect(button?.variant).toBe("primary");
  expect(button?.disabled).toBe(true);
  expect(button?.querySelector('[slot="label"]')?.textContent).toBe("Hello");
  await act(async () => button?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  expect(onClick).toHaveBeenCalledTimes(1);

  await act(async () => {
    root?.render(<LabirthermalProvider><ThermalBtn ref={ref} variant="background" disabled={false} /></LabirthermalProvider>);
  });
  expect(ref.current).toBe(button);
  expect(button?.variant).toBe("background");
  expect(button?.disabled).toBe(false);
});

it("reports use outside the provider", () => {
  expect(() => renderToString(<RegistryRangeSlider />)).toThrow(
    "<registry-range-slider> must be rendered inside LabirthermalProvider.",
  );
});

it("accepts typed file properties and rejects invalid ones", () => {
  expect(React.isValidElement(<FileProvider thermal="/lrc/sample.lrc" playing={false} />)).toBe(true);
  // @ts-expect-error Thermal file URLs must be strings.
  const invalid = <FileProvider thermal={42} />;
  expect(React.isValidElement(invalid)).toBe(true);
});
