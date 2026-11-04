import type * as Webcomponents from "@labirthermal/webcomponents";

export type LabirRuntime = typeof Webcomponents;

let initialization: Promise<LabirRuntime> | undefined;

async function initialize(): Promise<LabirRuntime> {
  const [runtime, { ContextRoot }] = await Promise.all([
    import("@labirthermal/webcomponents"),
    import("@lit/context"),
  ]);

  const i18n = runtime.i18nWebcomponents;
  if (!i18n.isInitialized) {
    await new Promise<void>((resolve) => {
      const initialized = () => {
        i18n.off("initialized", initialized);
        resolve();
      };
      i18n.on("initialized", initialized);
    });
  }

  for (const [tag, constructor] of Object.entries(runtime.elementsAll)) {
    const existing = customElements.get(tag);
    if (existing && existing !== constructor) {
      throw new Error(`The custom element "${tag}" is already registered by another runtime.`);
    }
  }

  runtime.addInlineStyles();
  const contextRoot = new ContextRoot();
  contextRoot.attach(document.body);

  try {
    for (const [tag, constructor] of Object.entries(runtime.elementsAll)) {
      if (!customElements.get(tag)) {
        customElements.define(tag, constructor);
      }
    }
  } catch (error) {
    contextRoot.detach(document.body);
    throw error;
  }

  // The document-level context stays attached across provider remounts.
  return runtime;
}

export function loadLabirRuntime(): Promise<LabirRuntime> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("LabIR initialization requires a browser."));
  }

  initialization ??= initialize().catch((cause: unknown) => {
    initialization = undefined;
    throw new Error("Failed to initialize LabIR webcomponents.", { cause });
  });

  return initialization;
}
