import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { Network } from "@aptos-labs/ts-sdk";

describe("fetchUserTransactions", () => {
  test("should fetch user transactions", async ({ testnet }) => {
    const result = await testnet.fetchUserTransactions();

    expect(result.transactions.length).toBeGreaterThan(0);
  });

  test("should throw error if indexer is not available for the network", async ({
    testnet,
  }) => {
    await expect(
      testnet.fetchUserTransactions({ network: { network: Network.CUSTOM } })
    ).rejects.toThrowError();
  });
});
