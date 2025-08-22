// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  AccountTransactionFragment,
  BaseTokenActivityFragment,
  CollectionDataFieldsFragment,
  CollectionOwnershipFragment,
  DelegatedStakingActivityFragment,
  FungibleAssetActivityFragment,
  FungibleAssetBalanceFieldsFragment,
  FungibleAssetMetadataFieldsFragment,
  PrimaryAptosNameFragment,
  TokenActivityFragment,
  TokenDataFieldsFragment,
  UserTransactionFragment,
} from "../operations/generated/operations.js";
import {
  BaseTokenActivity,
  DelegatedStakingActivity,
  FungibleAssetActivity,
  TokenActivity,
} from "../types/activities.js";
import {
  FungibleAssetBalance,
  FungibleAssetMetadata,
} from "../types/fungibleAssets.js";
import { CollectionData, TokenData } from "../types/tokens.js";
import { AccountTransaction, UserTransaction } from "../types/transactions.js";
import { AptosName } from "./names.js";
import { fixBadAptosUri } from "./tokens.js";

// normalizePrimaryAptosName

export const normalizePrimaryAptosName = (
  aptosName: PrimaryAptosNameFragment,
): AptosName | undefined =>
  aptosName.domain
    ? new AptosName(aptosName.domain, aptosName.subdomain)
    : undefined;

// normalizeFungibleAssetMetadata

export const normalizeFungibleAssetMetadata = (
  metadata: FungibleAssetMetadataFieldsFragment,
): FungibleAssetMetadata => ({
  assetType: metadata.asset_type,
  creatorAddress: metadata.creator_address,
  decimals: metadata.decimals,
  iconUri: metadata.icon_uri,
  name: metadata.name,
  projectUri: metadata.project_uri,
  symbol: metadata.symbol,
  tokenStandard: metadata.token_standard,
});

// normalizeFungibleAssetBalances

export const normalizeFungibleAssetBalances = (
  balances: (FungibleAssetBalanceFieldsFragment & {
    metadata: FungibleAssetMetadataFieldsFragment;
  })[],
): FungibleAssetBalance[] =>
  balances.map(
    (balance) =>
      ({
        amount: balance.amount,
        amountV1: balance.amount_v1,
        amountV2: balance.amount_v2,
        assetType: balance.asset_type,
        assetTypeV1: balance.asset_type_v1,
        assetTypeV2: balance.asset_type_v2,
        isFrozen: balance.is_frozen,
        isPrimary: balance.is_primary,
        lastTransactionTimestamp: balance.last_transaction_timestamp,
        lastTransactionVersion: balance.last_transaction_version,
        metadata: normalizeFungibleAssetMetadata(balance.metadata),
        ownerAddress: balance.owner_address,
        tokenStandard: balance.token_standard,
      }) satisfies FungibleAssetBalance,
  );

// normalizeCollectionData

export const normalizeCollectionData = (
  collectionData: CollectionDataFieldsFragment,
): CollectionData => ({
  cdnImageUri: collectionData.cdn_asset_uris?.cdn_image_uri,
  collectionId: collectionData.collection_id,
  collectionName: collectionData.collection_name,
  creatorAddress: collectionData.creator_address,
  description: collectionData.description,
  metadataUri: collectionData.uri,
  name: collectionData.collection_name,
  supply: collectionData.max_supply,
});

// normalizeCollectionOwnership

export const normalizeCollectionOwnership = (
  collectionOwnership: CollectionOwnershipFragment & {
    current_collection: CollectionDataFieldsFragment;
  },
): CollectionData => ({
  ...normalizeCollectionData(collectionOwnership.current_collection),
  distinctTokens: collectionOwnership.distinct_tokens,
  fallbackUri: collectionOwnership.single_token_uri,
});

// normalizeTokenData

export const normalizeTokenData = (
  tokenData: TokenDataFieldsFragment,
): TokenData => {
  const fixedUri = fixBadAptosUri(tokenData.token_uri);
  return {
    cdnImageUri: tokenData.cdn_asset_uris?.cdn_image_uri,
    collection: tokenData.current_collection?.collection_name ?? "",
    collectionData: tokenData.current_collection
      ? normalizeCollectionData(tokenData.current_collection)
      : undefined,
    collectionId: tokenData.current_collection?.collection_id ?? "",
    creator: tokenData.current_collection?.creator_address ?? "",
    description: tokenData.description,
    isFungibleV2: tokenData.is_fungible_v2 ?? false,
    isSoulbound: false,
    lastTransactionTimestamp: tokenData.last_transaction_timestamp,
    lastTransactionVersion: tokenData.last_transaction_version,
    metadataUri: fixedUri,
    name: tokenData.token_name,
    tokenId: tokenData.token_data_id,
    tokenProperties: tokenData.token_properties,
    tokenStandard: tokenData.token_standard as "v1" | "v2",
  };
};

// normalizeBaseTokenActivity

export const normalizeBaseTokenActivity = (
  activity: BaseTokenActivityFragment,
): BaseTokenActivity => ({
  fromAddress: activity.from_address,
  toAddress: activity.to_address,
  transactionTimestamp: activity.transaction_timestamp,
  transactionVersion: activity.transaction_version,
  type: activity.type,
  eventAccountAddress: activity.event_account_address,
  eventIndex: activity.event_index,
});

// normalizeAccountTransaction

export const normalizeAccountTransaction = (
  transaction: AccountTransactionFragment,
): AccountTransaction => {
  const fungibleAssetActivities: FungibleAssetActivity[] = [];
  const tokenActivities: TokenActivity[] = [];
  const delegatedStakingActivities: DelegatedStakingActivity[] = [];

  transaction.fungible_asset_activities.forEach((e) => {
    if (!e.asset_type || !e.metadata) return;
    fungibleAssetActivities.push(
      normalizeFungibleAssetActivity({
        ...e,
        asset_type: e.asset_type,
        metadata: e.metadata,
      }),
    );
  });

  transaction.token_activities_v2.forEach((e) => {
    if (!e.current_token_data) return;
    tokenActivities.push(
      normalizeTokenActivity({
        ...e,
        current_token_data: e.current_token_data,
      }),
    );
  });

  transaction.delegated_staking_activities.forEach((e) =>
    delegatedStakingActivities.push(normalizeDelegatedStakingActivity(e)),
  );

  return {
    accountAddress: transaction.account_address,
    transactionVersion: transaction.transaction_version,
    fungibleAssetActivities,
    tokenActivities,
    delegatedStakingActivities,
    userTransaction: transaction.user_transaction
      ? {
          sequenceNumber: transaction.user_transaction.sequence_number,
          sender: transaction.user_transaction.sender,
          entryFunction: transaction.user_transaction.entry_function_id_str,
        }
      : undefined,
  };
};

// normalizeFungibleAssetActivity

export const normalizeFungibleAssetActivity = (
  activity: FungibleAssetActivityFragment & {
    asset_type: string;
    metadata: FungibleAssetMetadataFieldsFragment;
  },
): FungibleAssetActivity => ({
  ownerAddress: activity.owner_address,
  ownerPrimaryAptosName: activity.owner_primary_aptos_name.at(0)
    ? normalizePrimaryAptosName(activity.owner_primary_aptos_name[0])
    : undefined,
  amount: activity.amount,
  type: activity.type,
  blockHeight: activity.block_height,
  assetType: activity.asset_type,
  metadata: normalizeFungibleAssetMetadata(activity.metadata),
  entryFunctionIdStr: activity.entry_function_id_str,
  eventIndex: activity.event_index,
  isGasFee: activity.is_gas_fee,
  gasFeePayerAddress: activity.gas_fee_payer_address,
  isTransactionSuccess: activity.is_transaction_success,
  transactionTimestamp: activity.transaction_timestamp,
  transactionVersion: activity.transaction_version,
});

// normalizeTokenActivity

export const normalizeTokenActivity = (
  activity: TokenActivityFragment & {
    current_token_data: TokenDataFieldsFragment;
  },
): TokenActivity => ({
  ...normalizeBaseTokenActivity(activity),
  primaryAptosNameFrom: activity.primary_aptos_name_from.at(0)
    ? normalizePrimaryAptosName(activity.primary_aptos_name_from[0])
    : undefined,
  primaryAptosNameTo: activity.primary_aptos_name_to.at(0)
    ? normalizePrimaryAptosName(activity.primary_aptos_name_to[0])
    : undefined,
  currentTokenData: normalizeTokenData(activity.current_token_data),
  propertyVersionV1: activity.property_version_v1,
  tokenAmount: activity.token_amount,
  tokenDataId: activity.token_data_id,
});

// normalizeDelegatedStakingActivity

export const normalizeDelegatedStakingActivity = (
  activity: DelegatedStakingActivityFragment,
): DelegatedStakingActivity => ({
  delegatorAddress: activity.delegator_address,
  eventIndex: activity.event_index,
  eventType: activity.event_type,
  poolAddress: activity.pool_address,
  transactionVersion: activity.transaction_version,
  amount: activity.amount,
});

// normalizeUserTransaction

export const normalizeUserTransaction = (
  transaction: UserTransactionFragment,
): UserTransaction => ({
  entryFunction: transaction.entry_function_id_str,
  expirationTimestampSecs: transaction.expiration_timestamp_secs,
  gasUnitPrice: transaction.gas_unit_price,
  maxGasAmount: transaction.max_gas_amount,
  parentSignatureType: transaction.parent_signature_type,
  version: transaction.version,
  timestamp: transaction.timestamp,
  sequenceNumber: transaction.sequence_number,
  sender: transaction.sender,
});
