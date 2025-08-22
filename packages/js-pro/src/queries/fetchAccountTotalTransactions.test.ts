// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";

describe("fetchAccountTotalTransactions", () => {
  test("should fetch the account total transactions", async ({ testnet }) => {
    const totalTransactions = await testnet.fetchAccountTotalTransactions({
      address:
        "0x405054a82fd220ad5dad611c8b604528a68abbc0cbf563421a3ed5e87541bd1c",
    });

    expect(totalTransactions).toBeGreaterThan(0);
  });
});
