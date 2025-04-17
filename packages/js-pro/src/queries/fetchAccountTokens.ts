// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { TokenOwnership } from "../types/index.js";
import { WithNetwork } from "../types/parameters.js";
import {
  createPaginatedQuery,
  PaginationCursors,
} from "../utils/pagination.js";
import { AptosJSProClient } from "../client.js";
import { GetAccountTokenOwnershipsQueryVariables } from "../operations/index.js";
import { IndexerNotInitializedError } from "../errors/index.js";
import { normalizeTokenData } from "../utils/normalize.js";

export type FetchAccountTokensParameters = WithNetwork<{
  address: AccountAddressInput;
  collectionId?: string;
  limit?: number;
  offset?: number;
  orderBy?: GetAccountTokenOwnershipsQueryVariables["order_by"];
  where?: GetAccountTokenOwnershipsQueryVariables["where"];
}>;

export type FetchAccountTokensResult = PaginationCursors & {
  tokens: TokenOwnership[];
};

export async function fetchAccountTokens(
  this: AptosJSProClient,
  {
    network,
    address,
    collectionId,
    limit = 100,
    offset = 0,
    orderBy = [],
    where = [],
  }: FetchAccountTokensParameters
): Promise<FetchAccountTokensResult> {
  const { indexer } = this.getClients({ network });
  if (!indexer) throw new IndexerNotInitializedError();

  return createPaginatedQuery({
    limit,
    offset,
    queryFn: async ({ limit, offset }) => {
      const response = await indexer.getAccountTokenOwnerships({
        address: AccountAddress.from(address).toStringLong(),
        limit,
        offset,
        order_by: orderBy,
        where: [
          ...(collectionId
            ? [
                {
                  current_token_data: {
                    current_collection: {
                      collection_id: { _eq: collectionId },
                    },
                  },
                },
              ]
            : []),
          ...(Array.isArray(where) ? where : [where]),
        ],
      });

      const tokens: TokenOwnership[] = [];

      response.current_token_ownerships_v2.forEach((token) => {
        if (
          !token.current_token_data ||
          !token.current_token_data.current_collection
        ) {
          return;
        }

        tokens.push({
          ...normalizeTokenData(token.current_token_data),
          amount: token.amount,
          isSoulbound: token.is_soulbound_v2 ?? false,
          ownerAddress: token.owner_address,
        });
      });

      return {
        hasNextPage: response.current_token_ownerships_v2.length === limit,
        tokens,
      };
    },
  });
}
