// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import type { WriteSetChange } from "@aptos-labs/ts-sdk";
import { isWriteResourceChange, normalizeAddress } from "../shared";
import { WritesetParser } from "../../../types/parsers";

/**
 * Parse changes in fungible stores and populate a map of the store addresses to the contained asset's metadata address.
 * Useful linking fungible store deposits and withdrawals to the contained asset.
 */
export class FungibleAssetStoreWritesetParser extends WritesetParser<
  object,
  { fungibleAssetStoreMetadata: { [storeAddress: string]: string } }
> {
  override parse(
    context: object & {
      fungibleAssetStoreMetadata: { [storeAddress: string]: string };
    },
    change: WriteSetChange,
  ) {
    if (
      !isWriteResourceChange(change) ||
      change.data.type !== "0x1::fungible_asset::FungibleStore"
    ) {
      return false;
    }

    const resource = change.data;

    const storeAddress = normalizeAddress(change.address);
    const { metadata } = resource.data as { metadata: { inner: string } };
    context.fungibleAssetStoreMetadata[storeAddress] = normalizeAddress(
      metadata.inner,
    );

    return true;
  }
}
