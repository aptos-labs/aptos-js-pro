// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { FungibleAssetMetadata } from "../types/fungibleAssets.js";
import { WithNetwork } from "../types/parameters.js";
import { normalizeFungibleAssetMetadata } from "../utils/normalize.js";

export type FetchFungibleAssetMetadataParameters = WithNetwork<{
  asset: string;
}>;

export type FetchFungibleAssetMetadataResult = FungibleAssetMetadata | null;

export async function fetchFungibleAssetMetadata(
  this: AptosJSProClient,
  { network, ...params }: FetchFungibleAssetMetadataParameters,
): Promise<FetchFungibleAssetMetadataResult> {
  const { aptos } = this.getClients({ network });

  const result = await aptos.getFungibleAssetMetadata({
    options: {
      where: {
        asset_type: {
          _eq: params.asset.includes("::")
            ? params.asset
            : AccountAddress.from(params.asset).toStringLong(),
        },
      },
    },
  });

  return result.at(0) ? normalizeFungibleAssetMetadata(result[0]) : null;
}
