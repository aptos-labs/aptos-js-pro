// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook } from "../../tests/utils";
import { useNetwork } from "./useNetwork";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useNetwork", async ({ testnet }) => {
  const { result } = renderHook(testnet, () => useNetwork());

  expect(result.current).toMatchInlineSnapshot(`
    {
      "network": "testnet",
    }
  `);
});
