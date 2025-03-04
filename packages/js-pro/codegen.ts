// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { typesScalars, operationsScalars } from "./src/operations/scalars";
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://api.mainnet.aptoslabs.com/v1/graphql",
  overwrite: true,
  documents: "src/operations/schemas/*.gql",
  config: {
    gqlImport: "graphql-tag#gql",
  },
  generates: {
    "src/operations/generated/types.ts": {
      plugins: [
        {
          add: {
            content:
              "export type JSONValue = null | string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;",
          },
        },
        "typescript",
      ],
      config: { scalars: typesScalars },
    },
    "src/operations/generated/operations.ts": {
      preset: "import-types-preset",
      presetConfig: { typesPath: "./types.js" },
      plugins: ["typescript-operations"],
      config: { scalars: operationsScalars },
    },
    "src/operations/generated/sdk.ts": {
      preset: "import-types-preset",
      presetConfig: { typesPath: "./operations.js" },
      plugins: ["typescript-graphql-request"],
    },
  },
};

export default config;
