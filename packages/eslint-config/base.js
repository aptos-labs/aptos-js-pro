import js from "@eslint/js";
import turboPlugin from "eslint-plugin-turbo";
import headers from "eslint-plugin-headers";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { turbo: turboPlugin },
    rules: { "turbo/no-undeclared-env-vars": "warn" },
  },
  {
    name: "petra-custom-rules",
    plugins: { headers },
    ignores: ["**/dist/**"],
    rules: {
      "headers/header-format": [
        "error",
        {
          source: "string",
          style: "line",
          content: "Copyright © Aptos\nSPDX-License-Identifier: Apache-2.0",
        },
      ],
    },
  },
];
