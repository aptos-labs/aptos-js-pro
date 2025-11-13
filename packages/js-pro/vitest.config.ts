// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "vitest/config";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/**.ts"],
      exclude: ["src/index.ts", "src/operations", "src/types"],
    },
    testTimeout: 10_000,
  },
});
