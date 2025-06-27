// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  DelegatedStakingActivity,
  FungibleAssetActivity,
  TokenActivity,
} from "./activities.js";

export interface UserTransaction {
  sequenceNumber?: string | null;
  sender: string;
  entryFunction: string;
  expirationTimestampSecs: string;
  gasUnitPrice: number;
  maxGasAmount: number;
  parentSignatureType: string;
  version: string;
  timestamp: string;
}

export interface AccountTransaction {
  accountAddress: string;
  transactionVersion: string;
  fungibleAssetActivities: FungibleAssetActivity[];
  tokenActivities: TokenActivity[];
  delegatedStakingActivities: DelegatedStakingActivity[];
  userTransaction?: {
    sequenceNumber?: string | null;
    sender: string;
    entryFunction: string;
  } | null;
}
