import { defineConfig } from 'tsdown'
import fs from "fs"
import path from "path"

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  target: false,
  sourcemap: true,
  clean: true,
  plugins: [
    {
      name: "closeBundle",
      closeBundle() {

        fs.copyFileSync(
          path.resolve("./dist/index.cjs"),
          path.resolve("../docs/public/lib/core.esm.cjs")
        );

        console.log("@labirthermal/core build copied into @labir/docs");


        // Custom logic to run after the bundle is closed
        console.log("@labirthermal/core build closed");
      }
    }
  ]
})
