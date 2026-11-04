// @vitest-environment jsdom

import { act, Component, StrictMode } from "react";
import type { ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LabirProvider } from "./LabirProvider";

const { load } = vi.hoisted(() => ({
  load: vi.fn<() => Promise<unknown>>(),
}));

vi.mock("./runtime", () => ({ loadLabirRuntime: load }));

let container: HTMLDivElement;
let root: Root | undefined;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  load.mockReset();
  container = document.createElement("div");
  document.body.append(container);
});

afterEach(async () => {
  await act(async () => root?.unmount());
  root = undefined;
  container.remove();
  vi.unstubAllGlobals();
});

it("keeps the fallback until initialization finishes in Strict Mode", async () => {
  let resolve!: (runtime: unknown) => void;
  load.mockReturnValue(new Promise((done) => { resolve = done; }));
  root = createRoot(container);

  await act(async () => {
    root?.render(
      <StrictMode>
        <LabirProvider fallback="Loading">Ready</LabirProvider>
      </StrictMode>,
    );
  });
  expect(container.textContent).toBe("Loading");

  await act(async () => resolve({}));
  expect(container.textContent).toBe("Ready");
});

it("hydrates the server fallback without a recoverable hydration error", async () => {
  let resolve!: (runtime: unknown) => void;
  load.mockReturnValue(new Promise((done) => { resolve = done; }));
  const content = <LabirProvider fallback={<p>Loading</p>}>Ready</LabirProvider>;
  container.innerHTML = renderToString(content);
  expect(load).not.toHaveBeenCalled();
  const onRecoverableError = vi.fn();

  await act(async () => {
    root = hydrateRoot(container, content, { onRecoverableError });
  });
  expect(container.textContent).toBe("Loading");

  await act(async () => resolve({}));
  expect(container.textContent).toBe("Ready");
  expect(onRecoverableError).not.toHaveBeenCalled();
});

it("renders an explicit local error fallback", async () => {
  const error = new Error("Cannot load LabIR");
  load.mockRejectedValue(error);
  const errorFallback = vi.fn((cause: Error) => <p role="alert">{cause.message}</p>);
  root = createRoot(container);

  await act(async () => {
    root?.render(
      <LabirProvider errorFallback={errorFallback}>Ready</LabirProvider>,
    );
  });

  expect(errorFallback).toHaveBeenCalledWith(error);
  expect(container.querySelector('[role="alert"]')?.textContent).toBe(error.message);
});

it("propagates initialization errors to an error boundary by default", async () => {
  class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() {
      return { failed: true };
    }
    render() {
      return this.state.failed ? "Boundary error" : this.props.children;
    }
  }

  load.mockRejectedValue(new Error("Cannot initialize"));
  const onCaughtError = vi.fn();
  root = createRoot(container, { onCaughtError });
  await act(async () => {
    root?.render(<Boundary><LabirProvider>Ready</LabirProvider></Boundary>);
  });

  expect(container.textContent).toBe("Boundary error");
  expect(onCaughtError).toHaveBeenCalled();
});

it("ignores initialization completion after unmounting", async () => {
  let resolve!: (runtime: unknown) => void;
  load.mockReturnValue(new Promise((done) => { resolve = done; }));
  root = createRoot(container);
  await act(async () => root?.render(<LabirProvider>Ready</LabirProvider>));
  await act(async () => root?.unmount());
  root = undefined;
  await act(async () => resolve({}));
  expect(container.textContent).toBe("");
});
