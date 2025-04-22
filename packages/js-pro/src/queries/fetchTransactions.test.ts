// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";

describe("fetchTransactions", () => {
  test("should fetch transaction by ledger version", async ({ testnet }) => {
    const result = await testnet.fetchTransaction({
      ledgerVersion: 6690814066,
    });

    expect(result).toBeDefined();
  });

  test("should fetch transaction by hash", async ({ testnet }) => {
    const result = await testnet.fetchTransaction({
      transactionHash:
        "0xfbc9efcfa5600c806631bd5e60e57a58f5d9ad3c5d1fb4c2bf99a3ff5af766ff",
    });

    expect(result).toBeDefined();
  });
});
