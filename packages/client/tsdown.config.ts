import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.export.ts'],
  format: ['cjs', 'esm'],
  outDir: 'dist/lib',
  tsconfig: './tsconfig.lib.json',
  dts: true,
  clean: true,
  target: false,
  sourcemap: true,
  deps: {
    onlyBundle: false
  }
});
