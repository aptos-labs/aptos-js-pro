// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/**.ts"],
      exclude: ["src/index.ts", "src/operations", "src/types"],
    },
    testTimeout: 10_000,
  },
});
