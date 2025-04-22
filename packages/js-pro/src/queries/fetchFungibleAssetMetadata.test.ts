// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";

describe("fetchFungibleAssetMetadata", () => {
  test("should fetch the metadata for 0x1::aptos_coin::AptosCoin", async ({
    devnet,
  }) => {
    const metadata = await devnet.fetchFungibleAssetMetadata({
      asset: "0x1::aptos_coin::AptosCoin",
    });

    expect(metadata).toMatchInlineSnapshot(`
      {
        "assetType": "0x1::aptos_coin::AptosCoin",
        "creatorAddress": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "decimals": 8,
        "iconUri": null,
        "name": "Aptos Coin",
        "projectUri": null,
        "symbol": "APT",
        "tokenStandard": "v1",
      }
    `);
  });

  test("should fetch the metadata for 0xa", async ({ devnet }) => {
    const metadata = await devnet.fetchFungibleAssetMetadata({
      asset: "0xa",
    });

    expect(metadata).toMatchInlineSnapshot(`
      {
        "assetType": "0x000000000000000000000000000000000000000000000000000000000000000a",
        "creatorAddress": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "decimals": 8,
        "iconUri": "",
        "name": "Aptos Coin",
        "projectUri": "",
        "symbol": "APT",
        "tokenStandard": "v2",
      }
    `);
  });

  test("should return null if the asset is not found", async ({ devnet }) => {
    const metadata = await devnet.fetchFungibleAssetMetadata({
      asset: "0x1::account::Account",
    });

    expect(metadata).toBeNull();
  });
});
