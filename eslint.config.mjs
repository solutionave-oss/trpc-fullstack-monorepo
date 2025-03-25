import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,css}"],
    languageOptions: {
      globals: {
        ...globals.browser, ...globals.node 
      },
    },
    plugins: {
      js,
      import: importPlugin,
      "@typescript-eslint": tseslint.plugin,
      tailwindcss
    },
    rules: {

      "tailwindcss/no-custom-classname": "off",

      eqeqeq: "error",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "vars": "all", "args": "after-used", "argsIgnorePattern": "^_" 
        }
      ],

      "no-undef": "error",
      semi: "error",
      "prefer-const": "error",

      "no-multiple-empty-lines": ["error", {
        max: 1, maxEOF: 0 
      }],
      
      "no-empty": "error",
      "@typescript-eslint/no-empty-function": ["error", {
        "allow": [] 
      }],
      "no-restricted-syntax": [
        "error",
        {
          "selector": "ObjectExpression[properties.length=0]",
          "message": "Empty objects are not allowed."
        }
      ],
      "object-curly-spacing": ["error", "always"],
      "object-curly-newline": ["error", {
        "ObjectExpression": {
          "minProperties": 1, "consistent": true 
        } 
      }],
      "no-whitespace-before-property": "error",

      "indent": ["error", 2, {
        "SwitchCase": 1 
      }],
      "object-curly-newline": ["error", {
        "ObjectExpression": {
          "minProperties": 1, "consistent": true 
        } 
      }],
      "no-whitespace-before-property": "error",
      "brace-style": ["error", "1tbs", {
        "allowSingleLine": true 
      }],

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
            {
              pattern: "app/**", group: "internal" 
            },
            {
              pattern: "apollo/**", group: "internal" 
            },
            {
              pattern: "components/**", group: "internal" 
            },
            {
              pattern: "lib/**", group: "internal" 
            },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: {
            order: "asc", caseInsensitive: true 
          },
        },
      ],
    },
  },
]);