import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      js,
      import: importPlugin,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "error",
      "no-undef": "error",
      semi: "error",
      "prefer-const": "error",

      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
          ],
          pathGroups: [
            { pattern: "app/**", group: "internal" },
            { pattern: "apollo/**", group: "internal" },
            { pattern: "components/**", group: "internal" },
            { pattern: "lib/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);