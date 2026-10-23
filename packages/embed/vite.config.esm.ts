/// <reference types="vitest" />

import { defineConfig, normalizePath } from "vite"
import path from "path"
import fs from "fs"
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({

    root: path.resolve("./"),

    build: {

        outDir: path.resolve("./dist/esm"),
        emptyOutDir: true,
        copyPublicDir: false,
        minify: true,

        rollupOptions: {

            input: {
                embed: path.resolve("./src/index.export.ts"),
            },
            output: {
                entryFileNames: '[name].esm.js',
                assetFileNames: '[name].esm.[ext]',
                esModule: true,
            },
            plugins: [{
                name: "closeBundle",
                closeBundle() {
                    fs.copyFileSync(
                        path.resolve("./dist/lib/index.export.cjs"),
                        path.resolve("../thermal-display/assets/embed.esm.js")
                    );

                    console.log("@labirthermal/webcomponents build:esm copied into @labir/wordpress");
                }
            }]
        },


        // Export as library
        /*
        lib: {
            entry: path.resolve( "./src/index.ts" ),
            formats: [ "cjs", "es" ],
            fileName: (format) => `embed.${format}.js`,
            name: "labir_embed"
        }
        */
    },

    plugins: [
    ],
})