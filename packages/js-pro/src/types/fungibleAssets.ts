// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

export interface FungibleAssetMetadata {
  assetType: string;
  creatorAddress: string;
  decimals: number;
  iconUri?: string | null;
  maximumV2?: number | null;
  name: string;
  projectUri?: string | null;
  supplyV2?: number | null;
  symbol: string;
  tokenStandard: string;
}

export interface FungibleAssetBalance {
  amount: number;
  amountV1?: number | null;
  amountV2?: number | null;
  assetType: string;
  assetTypeV1?: string | null;
  assetTypeV2?: string | null;
  isFrozen: boolean;
  isPrimary: boolean;
  lastTransactionTimestamp?: string | null;
  lastTransactionVersion?: string | null;
  metadata: FungibleAssetMetadata;
  ownerAddress: string;
  tokenStandard: string;
}
