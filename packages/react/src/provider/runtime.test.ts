// @vitest-environment jsdom

import { beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  styles: vi.fn(),
  attach: vi.fn(),
  detach: vi.fn(),
  i18n: {
    isInitialized: true,
    on: vi.fn<(event: string, callback: () => void) => void>(),
    off: vi.fn<(event: string, callback: () => void) => void>(),
  },
}));

vi.mock("@labirthermal/webcomponents", () => ({
  addInlineStyles: mocks.styles,
  i18nWebcomponents: mocks.i18n,
  elementsAll: { "labir-provider-test": class extends HTMLElement {} },
}));

vi.mock("@lit/context", () => ({
  ContextRoot: class {
    attach = mocks.attach;
    detach = mocks.detach;
  },
}));

beforeEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
  vi.clearAllMocks();
  mocks.styles.mockReset();
  mocks.i18n.isInitialized = true;
});

it("shares initialization across concurrent calls and remounts", async () => {
  const { loadLabirRuntime } = await import("./runtime");
  const first = loadLabirRuntime();
  expect(loadLabirRuntime()).toBe(first);
  const runtime = await first;
  expect(await loadLabirRuntime()).toBe(runtime);
  expect(customElements.get("labir-provider-test")).toBe(Object.values(runtime.elementsAll)[0]);
  expect(mocks.styles).toHaveBeenCalledTimes(1);
  expect(mocks.attach).toHaveBeenCalledExactlyOnceWith(document.body);
});

it("waits for the existing translation initialization", async () => {
  mocks.i18n.isInitialized = false;
  const { loadLabirRuntime } = await import("./runtime");
  const result = loadLabirRuntime();
  await vi.waitFor(() => expect(mocks.i18n.on).toHaveBeenCalled());
  expect(mocks.styles).not.toHaveBeenCalled();
  const initialized = mocks.i18n.on.mock.calls[0]?.[1];
  if (!initialized) {
    throw new Error("Missing i18n initialization listener.");
  }
  initialized();
  await result;
  expect(mocks.i18n.off).toHaveBeenCalledWith("initialized", initialized);
});

it("surfaces initialization failures and allows a later attempt", async () => {
  const cause = new Error("Styles unavailable");
  mocks.styles.mockImplementationOnce(() => { throw cause; });
  const { loadLabirRuntime } = await import("./runtime");
  await expect(loadLabirRuntime()).rejects.toMatchObject({
    message: "Failed to initialize LabIR webcomponents.",
    cause,
  });
  await expect(loadLabirRuntime()).resolves.toBeDefined();
  expect(mocks.styles).toHaveBeenCalledTimes(2);
});

it("rejects conflicting registrations before changing the document", async () => {
  vi.spyOn(customElements, "get").mockReturnValue(class extends HTMLElement {});
  const { loadLabirRuntime } = await import("./runtime");

  await expect(loadLabirRuntime()).rejects.toMatchObject({
    cause: { message: 'The custom element "labir-provider-test" is already registered by another runtime.' },
  });
  expect(mocks.styles).not.toHaveBeenCalled();
  expect(mocks.attach).not.toHaveBeenCalled();
});

it("detaches the context root if registration fails", async () => {
  vi.spyOn(customElements, "get").mockReturnValue(undefined);
  vi.spyOn(customElements, "define").mockImplementation(() => {
    throw new Error("Cannot register element");
  });
  const { loadLabirRuntime } = await import("./runtime");

  await expect(loadLabirRuntime()).rejects.toMatchObject({
    cause: { message: "Cannot register element" },
  });
  expect(mocks.detach).toHaveBeenCalledExactlyOnceWith(document.body);
});
