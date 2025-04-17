import { describe, expect, vi } from "vitest";
import { test } from "../../tests/fixtures";
import { Network } from "@aptos-labs/ts-sdk";

describe("fetchAccountTokens", () => {
  test("should fetch the account tokens", async ({ testnet }) => {
    const tokens = await testnet.fetchAccountTokens({
      address: "0x1",
      where: {},
    });

    expect(tokens.tokens.length).toBeGreaterThan(0);
  });

  test("should fetch the account tokens with a collection id", async ({
    testnet,
  }) => {
    const tokens = await testnet.fetchAccountTokens({
      address: "0x1",
      collectionId:
        "0x63d26a4e3a8aeececf9b878e46bad78997fb38e50936efeabb2c4453f4d7f746",
    });

    expect(
      tokens.tokens.filter(
        (token) =>
          token.collectionId ===
          "0x63d26a4e3a8aeececf9b878e46bad78997fb38e50936efeabb2c4453f4d7f746"
      ).length
    ).toEqual(tokens.tokens.length);
  });

  test("should filter out ownerships without joined token data or collection", async ({
    testnet,
  }) => {
    testnet.getClients = vi.fn().mockReturnValue({
      ...testnet.getClients(),
      indexer: {
        getAccountTokenOwnerships: vi.fn().mockResolvedValue({
          current_token_ownerships_v2: [{ current_token_data: null }],
        }),
      },
    });

    const tokens = await testnet.fetchAccountTokens({ address: "0x1" });

    expect(tokens.tokens.length).toEqual(0);
  });

  test("should default to false for non-defined soulbound tokens", async ({
    testnet,
  }) => {
    testnet.getClients = vi.fn().mockReturnValue({
      ...testnet.getClients(),
      indexer: {
        getAccountTokenOwnerships: vi.fn().mockResolvedValue({
          current_token_ownerships_v2: [
            {
              current_token_data: { token_uri: "", current_collection: {} },
              is_soulbound_v2: undefined,
              current_collection: {},
            },
          ],
        }),
      },
    });

    const tokens = await testnet.fetchAccountTokens({ address: "0x1" });

    expect(tokens.tokens.every((token) => token.isSoulbound === false)).toBe(
      true
    );
  });

  test("should throw error if indexer is not available for the network", async ({
    testnet,
  }) => {
    await expect(
      testnet.fetchAccountTokens({
        address: "0x1",
        network: { network: Network.CUSTOM },
      })
    ).rejects.toThrowError();
  });
});
