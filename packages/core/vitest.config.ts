import { defineConfig } from "vitest/config";

export default defineConfig( {
    test: {
        name: "@labirthermal/core",
        root: ".",
        include: [ "src/**/*.test.ts" ],
        environment: "jsdom",
        setupFiles: [ "./vitest.setup.ts", "./devserver/node/setup.ts" ],
    },
} );
