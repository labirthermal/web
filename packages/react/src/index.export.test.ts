import { expect, it } from "vitest";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

it("can import the library entry without a browser environment", async () => {
  expect(typeof window).toBe("undefined");
  expect(typeof document).toBe("undefined");

  await expect(import("./index.export")).resolves.toBeDefined();
});

it("renders only the fallback on the server", async () => {
  const { LabirthermalProvider } = await import("./index.export");
  const html = renderToString(createElement(LabirthermalProvider, {
    fallback: createElement("p", null, "Loading"),
    children: createElement("p", null, "Browser content"),
  }));

  expect(html).toBe("<p>Loading</p>");
});
