import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: [
            // Deep imports of core sources must not be rewritten to the package entry
            { find: /^@labirthermal\/core\/src\//, replacement: `${path.resolve(import.meta.dirname, "..", "core", "src")}/` },
            { find: /^@labirthermal\/core$/, replacement: path.resolve(import.meta.dirname, "..", "core", "src", "index.ts") },
        ],
    },
    test: {
        name: "@labirthermal/webcomponents",
        environment: "jsdom",
        include: ["src/**/*.test.ts"],
    },
});
