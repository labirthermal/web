import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL("./playground", import.meta.url)),
  publicDir: fileURLToPath(new URL("../../public", import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: {
      "@labirthermal/react": fileURLToPath(
        new URL("./src/index.export.ts", import.meta.url),
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "../dist/playground",
    emptyOutDir: true,
  },
});
