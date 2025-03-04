// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  DelegatedStakingActivity,
  FungibleAssetActivity,
  TokenActivity,
} from "./activities.js";

export interface AccountTransaction {
  accountAddress: string;
  transactionVersion: string;
  fungibleAssetActivities: FungibleAssetActivity[];
  tokenActivities: TokenActivity[];
  delegatedStakingActivities: DelegatedStakingActivity[];
  userTransaction?: {
    sequenceNumber: string;
    sender: string;
  } | null;
}
