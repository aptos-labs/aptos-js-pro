// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**.ts"],
      exclude: ["src/internal.ts", "src/types.ts", "src/index.ts"],
    },
  },
});
