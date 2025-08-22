// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useTokenData } from "./useTokenData";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useTokenData", async ({ mainnet }) => {
  const { result } = renderHook(mainnet, () =>
    useTokenData({
      address:
        "0xc7dfc262666b2d4f74c7e77a64fe21d3b24386628fb780f65522fc2c625819a2",
    }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toMatchInlineSnapshot(`
    {
      "acquiredActivity": {
        "eventAccountAddress": "0xc7dfc262666b2d4f74c7e77a64fe21d3b24386628fb780f65522fc2c625819a2",
        "eventIndex": 338,
        "fromAddress": "0x14464c04472a91941854ba9ffc48691e071874a1bcb51b89ff15afa5f80b76df",
        "toAddress": "0xb27f7d329f6d2c8867e5472958c3cfabc781300ca9649f244e267e1d6b966c94",
        "transactionTimestamp": "2023-10-13T23:38:33.726286",
        "transactionVersion": 295298202,
        "type": "0x1::object::TransferEvent",
      },
      "cdnImageUri": null,
      "collection": "Aptos Domain Names V2",
      "collectionData": {
        "cdnImageUri": null,
        "collectionId": "0x63d26a4e3a8aeececf9b878e46bad78997fb38e50936efeabb2c4453f4d7f746",
        "collectionName": "Aptos Domain Names V2",
        "creatorAddress": "0x14464c04472a91941854ba9ffc48691e071874a1bcb51b89ff15afa5f80b76df",
        "description": ".apt names from Aptos Labs",
        "metadataUri": "https://aptosnames.com",
        "name": "Aptos Domain Names V2",
        "supply": null,
      },
      "collectionId": "0x63d26a4e3a8aeececf9b878e46bad78997fb38e50936efeabb2c4453f4d7f746",
      "createdActivity": {
        "eventAccountAddress": "0x63d26a4e3a8aeececf9b878e46bad78997fb38e50936efeabb2c4453f4d7f746",
        "eventIndex": 337,
        "fromAddress": "0xb27f7d329f6d2c8867e5472958c3cfabc781300ca9649f244e267e1d6b966c94",
        "toAddress": null,
        "transactionTimestamp": "2023-10-13T23:38:33.726286",
        "transactionVersion": 295298202,
        "type": "0x4::collection::MintEvent",
      },
      "creator": "0x14464c04472a91941854ba9ffc48691e071874a1bcb51b89ff15afa5f80b76df",
      "description": "This is an official Aptos Labs Name Service Name",
      "isFungibleV2": false,
      "isSoulbound": false,
      "lastTransactionTimestamp": "2023-10-13T23:38:33.726286",
      "lastTransactionVersion": 295298202,
      "metadataUri": "https://www.aptosnames.com/api/mainnet/v2/metadata/ans.apt",
      "name": "ans.apt",
      "tokenId": "0xc7dfc262666b2d4f74c7e77a64fe21d3b24386628fb780f65522fc2c625819a2",
      "tokenProperties": null,
      "tokenStandard": "v2",
    }
  `);
});
