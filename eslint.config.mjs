import js from "@eslint/js";
import stylisticTs from '@stylistic/eslint-plugin-ts';
import { defineConfig, } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: [ "**/*.{js,mjs,cjs,ts,tsx,css}", ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
    },
    plugins: {
      js,
      import: importPlugin,
      "@typescript-eslint": tseslint.plugin,
      tailwindcss,
      "react-hooks": reactHooks,
      react,
      "jsx-a11y": jsxA11y,
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      "tailwindcss/no-custom-classname": "off",
      eqeqeq: "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [ "error", {
        vars: "all", args: "after-used", "argsIgnorePattern": "^_",
      }, ],
      "no-undef": "error",
      semi: "error",
      "prefer-const": "error",
      "no-multiple-empty-lines": [ "error", {
        max: 1, maxEOF: 0,
      }, ],
      // '@stylistic/ts/indent': [ 'error', 2, ],
      "@stylistic/ts/type-annotation-spacing": "error",
      "no-empty": "error",
      "@typescript-eslint/no-empty-function": [ "error", {
        allow: [],
      }, ],
      "no-restricted-syntax": [
        "error",
        {
          "selector": "ObjectExpression[properties.length=0]",
          "message": "Empty objects are not allowed.",
        },
      ],
      "object-curly-newline": [ "error", {
        ObjectExpression: {
          minProperties: 1, consistent: true,
        },
      }, ],
      "no-whitespace-before-property": "error",
      "indent": [ "error", 2, {
        SwitchCase: 1,
      }, ],
      "brace-style": [ "error", "1tbs", {
        allowSingleLine: true,
      }, ],
      "arrow-parens": [ "error", "always", ],
      "no-trailing-spaces": "error",
      "newline-per-chained-call": [ "error", {
        "ignoreChainWithDepth": 2,
      }, ],
      "no-console": [ "warn", {
        "allow": [ "warn", "error", ],
      }, ],
      "guard-for-in": "error",
      "no-unused-expressions": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-definitions": [ "error", "interface", ],
      "react-hooks/exhaustive-deps": "error",
      "react/no-danger": "error",
      "react/jsx-curly-spacing": [ "error", {
        "when": "always", "children": true,
      }, ],
      "jsx-a11y/anchor-is-valid": "error",
      "no-shadow": "error",
      "no-cond-assign": [ "error", "always", ],
      "no-param-reassign": [ "error", {
        "props": true,
      }, ],
      "yoda": [ "error", "never", ],
      "key-spacing": [ "error", {
        "beforeColon": false, "afterColon": true,
      }, ],
      "comma-dangle": [ "error", {
        "arrays": "always",
        "objects": "always",
        "imports": "always",
        "exports": "always",
        "functions": "never",
      }, ],
      "import/order": [
        "error",
        {
          groups: [ "builtin", "external", "internal", [ "parent", "sibling", ], "index", ],
          pathGroups: [
            {
              pattern: "app/**", group: "internal",
            },
            {
              pattern: "apollo/**", group: "internal",
            },
            {
              pattern: "components/**", group: "internal",
            },
            {
              pattern: "lib/**", group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: {
            order: "asc", caseInsensitive: true,
          },
        },
      ],
      "react/jsx-tag-spacing": [
        "error",
        {
          beforeSelfClosing: "never", // Ensures <div > → <div>
          afterOpening: "never", // No space after opening <div>
          beforeClosing: "never", // No space before closing </>
        },
      ],
      "object-curly-spacing": [ "error", "always", ],
      "array-bracket-spacing": [ "error", "always", ],
      "comma-spacing": [ "error", {
        "before": false, "after": true,
      }, ],
      // "@typescript-eslint/no-floating-promises": "error",
      // "@typescript-eslint/explicit-function-return-type": ["error", {
      //   "allowExpressions": true
      // }],
      // "@typescript-eslint/no-unnecessary-type-assertion": "error",
    },
  },
]);
