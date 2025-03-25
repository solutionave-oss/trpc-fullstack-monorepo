import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "error",
      "no-undef": "error",
      semi: "error",
      "prefer-const": "error",

      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    },
  },
]);
