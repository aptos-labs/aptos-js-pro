// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosName } from "../utils/names.js";
import { FungibleAssetMetadata } from "./fungibleAssets.js";
import { TokenData } from "./tokens.js";

export interface FungibleAssetActivity {
  ownerPrimaryAptosName?: AptosName;
  ownerAddress?: string | null;
  type: string;
  amount?: number | null;
  blockHeight: string;
  assetType: string;
  metadata: FungibleAssetMetadata;
  entryFunctionIdStr?: string | null;
  eventIndex: string;
  isGasFee: boolean;
  gasFeePayerAddress?: string | null;
  isTransactionSuccess: boolean;
  transactionTimestamp: string;
  transactionVersion: string;
}

export interface BaseTokenActivity {
  fromAddress?: string | null;
  toAddress?: string | null;
  transactionTimestamp: string;
  transactionVersion: string;
  type: string;
  eventAccountAddress: string;
  eventIndex: string;
}

export interface TokenActivity extends BaseTokenActivity {
  primaryAptosNameFrom?: AptosName;
  primaryAptosNameTo?: AptosName;
  tokenAmount?: number | null;
  currentTokenData: TokenData;
  propertyVersionV1: number;
  tokenDataId: string;
}

export interface DelegatedStakingActivity {
  amount: number;
  delegatorAddress: string;
  eventIndex: string;
  eventType: string;
  poolAddress: string;
  transactionVersion: string;
}
