// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, vi } from "vitest";
import { test } from "../../tests/fixtures";
import { Network } from "@aptos-labs/ts-sdk";
import { Order_By } from "../operations";

describe("fetchAccountCollections", () => {
  test("should fetch the account collections", async ({ testnet }) => {
    const collections = await testnet.fetchAccountCollections({
      address: "0x1",
      orderBy: { collection_id: Order_By.Desc },
    });

    expect(collections.collections.length).toBeGreaterThan(0);
  });

  test("should filter out ownerships without joined collections", async ({
    testnet,
  }) => {
    testnet.getClients = vi.fn().mockReturnValue({
      ...testnet.getClients(),
      indexer: {
        getAccountCollections: vi.fn().mockResolvedValue({
          current_collection_ownership_v2_view: [{ current_collection: null }],
        }),
      },
    });

    const collections = await testnet.fetchAccountCollections({
      address: "0x1",
    });

    expect(collections.collections.length).toBe(0);
  });

  test("should throw error if indexer is not available for the network", async ({
    testnet,
  }) => {
    await expect(
      testnet.fetchAccountCollections({
        address: "0x1",
        network: { network: Network.CUSTOM },
      }),
    ).rejects.toThrowError();
  });
});
