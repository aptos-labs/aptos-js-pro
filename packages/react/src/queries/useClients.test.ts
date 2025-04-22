// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook } from "../../tests/utils";
import { useClients } from "./useClients";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useClients", async ({ testnet }) => {
  const { result } = renderHook(testnet, () => useClients());

  expect(result.current).toBeDefined();
});
