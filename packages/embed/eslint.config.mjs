// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
import { defineConfig, globalIgnores } from "eslint/config";


export default defineConfig({
  ...eslint.configs.recommended,
  ...tseslint.configs.recommended,
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports"
      }
    ],
  },
  // ignores: ["./connection/**"],

},
// globalIgnores(["./connection/**"])

);

 */


export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports"
        }
      ],
    },
    // ignorePatterns: ["./connection/**"]
  }
);