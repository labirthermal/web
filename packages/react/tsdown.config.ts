import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.export.ts"],
  format: ["esm", "cjs"],
  outExtensions: ({ format }) => ({
    js: format === "es" ? ".mjs" : ".cjs",
    dts: format === "es" ? ".d.mts" : ".d.cts",
  }),
  outDir: "dist/lib",
  banner: "'use client';",
  tsconfig: "./tsconfig.lib.json",
  dts: true,
  clean: true,
  target: "es2022",
  platform: "neutral",
  sourcemap: true,
  deps: {
    neverBundle: [
      /^react(?:\/|$)/,
      /^react-dom(?:\/|$)/,
      /^@lit\/react(?:\/|$)/,
      /^@labirthermal\/(?:core|webcomponents)(?:\/|$)/,
    ],
    onlyBundle: false,
  },
});
