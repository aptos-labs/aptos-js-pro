// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  test: {
    environment: "happy-dom",
    coverage: {
      include: ["src/**/**.ts"],
      exclude: ["src/index.ts", "src/operations", "src/types"],
    },
    testTimeout: 10_000,
    setupFiles: "./tests/setup.ts",
  },
  ssr: {
    // Workaround for `@aptos-labs/aptos-client`'s exports resolution:
    // https://github.com/vitest-dev/vitest/discussions/4233#discussioncomment-12882054
    noExternal: ["@aptos-labs/ts-sdk"],
  },
  resolve: {
    // Workaround for `@aptos-labs/aptos-client`'s browser/node exports:
    // https://github.com/vitest-dev/vitest/issues/2603
    conditions: ["browser"],
  },
});
