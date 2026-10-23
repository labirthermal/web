/// <reference types="vitest" />

import { defineConfig } from "vite"
import path from "path"
import fs from "fs"

export default defineConfig({
    root: "./devserver/www",
    publicDir: path.resolve("../../public"),
    build: {
        sourcemap: false,

        rollupOptions: {

            plugins: [

                {
                    name: "closeBundle",
                    closeBundle() {

                        fs.copyFileSync(
                            path.resolve("./dist/index.cjs"),
                            path.resolve("../docs/public/lib/core.esm.cjs")
                        );

                        console.log("@labirthermal/core build copied into @labir/docs");

                    }
                }

            ]

        }
    },
})