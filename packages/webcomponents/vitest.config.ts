import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@labirthermal/core": path.resolve(import.meta.dirname, "..", "core", "src", "index.ts"),
        },
    },
    test: {
        name: "@labirthermal/webcomponents",
        environment: "jsdom",
        include: ["src/**/*.test.ts"],
    },
});
