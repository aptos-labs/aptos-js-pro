// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { config } from "@aptos-labs/eslint-config-petra/base";

/** @type {import("eslint").Linter.Config} */
export default [{ ignores: ["src/operations/generated/**"] }, ...config];
