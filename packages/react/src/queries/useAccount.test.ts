// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook } from "../../tests/utils";
import { useAccount } from "./useAccount";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useAccount", async ({ devnet }) => {
  const { result } = renderHook(devnet, () => useAccount());

  expect(result.current).toBeDefined();
});
