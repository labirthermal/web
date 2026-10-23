/// <reference types="vitest" />

import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    root: path.resolve("./src"),
    publicDir: path.resolve("../../public"),
    server: {
        open: true,
    },
})
