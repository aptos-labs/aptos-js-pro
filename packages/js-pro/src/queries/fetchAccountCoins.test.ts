// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { Network, AccountAddress } from "@aptos-labs/ts-sdk";

describe("fetchAccountCoins", () => {
  test("should fetch the account coins", async ({ testnet }) => {
    const coins = await testnet.fetchAccountCoins({
      address: AccountAddress.from("0x1").toStringLong(),
    });

    expect(coins.balances.length).toBeGreaterThan(0);
  });

  test("should throw error if indexer is not available for the network", async ({
    testnet,
  }) => {
    await expect(
      testnet.fetchAccountCoins({
        address: AccountAddress.from("0x1").toStringLong(),
        network: { network: Network.CUSTOM },
      }),
    ).rejects.toThrowError();
  });
});
