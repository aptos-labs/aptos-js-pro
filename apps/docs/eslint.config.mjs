// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { config } from "@aptos-labs/eslint-config-petra/next";

/** @type {import("eslint").Linter.Config} */
export default [{ ignores: ["components/ui/**"] }, ...config];
