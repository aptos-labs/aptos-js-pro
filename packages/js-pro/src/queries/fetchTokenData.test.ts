import { describe, expect, vi } from "vitest";
import { test } from "../../tests/fixtures";
import { Network } from "@aptos-labs/ts-sdk";

describe("fetchTokenData", () => {
  test("should fetch token data", async ({ mainnet }) => {
    const result = await mainnet.fetchTokenData({
      address:
        "0xc7dfc262666b2d4f74c7e77a64fe21d3b24386628fb780f65522fc2c625819a2",
    });

    expect(result).toBeDefined();
  });

  test("should return null if token data is not found", async ({ mainnet }) => {
    const result = await mainnet.fetchTokenData({ address: "0x1" });

    expect(result).toBeNull();
  });

  test("should throw error if indexer is not available for the network", async ({
    mainnet,
  }) => {
    await expect(
      mainnet.fetchTokenData({
        address:
          "0xc7dfc262666b2d4f74c7e77a64fe21d3b24386628fb780f65522fc2c625819a2",
        network: { network: Network.CUSTOM },
      })
    ).rejects.toThrowError();
  });

  test("should return undefined created activity and acquired activity if they are not found", async ({
    mainnet,
  }) => {
    mainnet.getClients = vi.fn().mockReturnValue({
      ...mainnet.getClients(),
      indexer: {
        getTokenData: vi.fn().mockResolvedValue({
          current_token_datas_v2: [
            { token_uri: "https://example.com/token-image.png" },
          ],
          created_activity: [],
          acquired_activity: [],
        }),
      },
    });

    const result = await mainnet.fetchTokenData({ address: "0x1" });

    expect(result?.createdActivity).toBeUndefined();
    expect(result?.acquiredActivity).toBeUndefined();
  });
});
