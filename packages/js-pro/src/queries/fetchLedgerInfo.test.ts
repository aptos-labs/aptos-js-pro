// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { expect } from "vitest";
import { test } from "../../tests/fixtures";

test("fetchLedgerInfo", async ({ devnet }) => {
  const ledgerInfo = await devnet.fetchLedgerInfo();

  expect(ledgerInfo).toBeDefined();
});
