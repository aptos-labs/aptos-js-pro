// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosJSProClient } from "../client.js";
import { IndexerNotInitializedError } from "../errors/clients.js";
import { WithNetwork } from "../types/parameters.js";
import { TokenData } from "../types/tokens.js";
import {
  normalizeBaseTokenActivity,
  normalizeTokenData,
} from "../utils/normalize.js";

export type FetchTokenDataParameters = WithNetwork<{
  /**
   * The token address (NFT) to fetch the token data for.
   */
  address: string;
}>;

export type FetchTokenDataResult = TokenData | null;

export async function fetchTokenData(
  this: AptosJSProClient,
  params: FetchTokenDataParameters,
): Promise<FetchTokenDataResult> {
  const { indexer } = this.getClients({ network: params.network });

  if (!indexer) throw new IndexerNotInitializedError();

  const result = await indexer.getTokenData({ address: params.address });

  if (result.current_token_datas_v2.length === 0) return null;

  return {
    ...normalizeTokenData(result.current_token_datas_v2[0]),
    createdActivity: result.created_activity.at(0)
      ? normalizeBaseTokenActivity(result.created_activity[0])
      : undefined,
    acquiredActivity: result.acquired_activity.at(0)
      ? normalizeBaseTokenActivity(result.acquired_activity[0])
      : undefined,
  };
}
