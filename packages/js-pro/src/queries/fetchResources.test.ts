// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { expect } from "vitest";
import { test } from "../../tests/fixtures";

test("fetchResources", async ({ devnet }) => {
  const resources = await devnet.fetchResources({
    accountAddress: "0x1",
  });

  expect(resources.length).toBeGreaterThan(0);
});
