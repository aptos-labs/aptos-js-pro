// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useFungibleAssetMetadata } from "./useFungibleAssetMetadata";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useFungibleAssetMetadata", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useFungibleAssetMetadata({ asset: "0x1::aptos_coin::AptosCoin" })
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toMatchInlineSnapshot(`
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
