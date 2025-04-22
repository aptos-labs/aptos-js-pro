// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { Network } from "@aptos-labs/ts-sdk";

describe("fetchAccountTransactions", () => {
  test("should fetch the account transactions", async ({ testnet }) => {
    const transactions = await testnet.fetchAccountTransactions({
      address: "0x1",
      orderBy: {},
    });

    expect(transactions.transactions.length).toBeGreaterThan(0);
  });

  test("should fetch account transactions with descending order", async ({
    testnet,
  }) => {
    const transactions = await testnet.fetchAccountTransactions({
      address: "0x1",
    });

    const sortedTransactions = transactions.transactions.sort(
      (a, b) => Number(b.transactionVersion) - Number(a.transactionVersion)
    );

    expect(transactions.transactions).toEqual(sortedTransactions);
  });

  test("should throw error if indexer is not available for the network", async ({
    testnet,
  }) => {
    await expect(
      testnet.fetchAccountTransactions({
        address: "0x1",
        network: { network: Network.CUSTOM },
      })
    ).rejects.toThrowError();
  });
});
