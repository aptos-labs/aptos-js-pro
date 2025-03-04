// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { JSONValue } from "../operations/index.js";
import { BaseTokenActivity } from "./activities.js";

export interface CollectionData {
  cdnImageUri?: string | null;
  collectionId: string;
  collectionName: string;
  creatorAddress: string;
  description: string;
  distinctTokens?: string | null;
  fallbackUri?: string | null;
  floorPrice?: number;
  metadataUri: string;
  name: string;
  supply?: number | null;
}

export type TokenStandard = "v1" | "v2";

export interface TokenData {
  amount?: number;
  cdnImageUri?: string | null;
  collection: string;
  collectionData?: CollectionData;
  collectionId: string;
  creator: string;
  description: string;
  isFungibleV2: boolean;
  isSoulbound: boolean;
  lastTransactionTimestamp: string;
  lastTransactionVersion: string;
  metadataUri: string;
  name: string;
  tokenId: string;
  tokenProperties?: JSONValue;
  tokenStandard: TokenStandard;
  acquiredActivity?: BaseTokenActivity;
  createdActivity?: BaseTokenActivity;
}

export type TokenOwnership = TokenData & {
  amount: number;
  isSoulbound: boolean;
  ownerAddress: string;
};
