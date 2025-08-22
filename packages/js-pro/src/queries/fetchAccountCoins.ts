// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";
import {
  createPaginatedQuery,
  PaginationCursors,
  WithPagination,
} from "../utils/pagination.js";
import {
  FungibleAssetBalanceFieldsFragment,
  FungibleAssetMetadataFieldsFragment,
  GetFungibleAssetBalancesQueryVariables,
} from "../operations/index.js";
import { FungibleAssetBalance } from "../types/fungibleAssets.js";
import { IndexerNotInitializedError } from "../errors/clients.js";
import { normalizeFungibleAssetBalances } from "../utils/normalize.js";

export type FetchAccountCoinsParameters = WithPagination<
  WithNetwork<{
    /**
     * The address of the account to fetch the coin balances for.
     */
    address: AccountAddressInput;
    /**
     * Conditions for ordering the coin balance results.
     */
    orderBy?: GetFungibleAssetBalancesQueryVariables["order_by"];
    /**
     * Filters for the coin balance results.
     */
    where?: GetFungibleAssetBalancesQueryVariables["where"];
  }>
>;

export type FetchAccountCoinsResult = PaginationCursors & {
  balances: FungibleAssetBalance[];
};

export async function fetchAccountCoins(
  this: AptosJSProClient,
  {
    address,
    network,
    limit = 100,
    offset = 0,
    orderBy,
    where,
  }: FetchAccountCoinsParameters,
): Promise<FetchAccountCoinsResult> {
  const { indexer } = this.getClients({ network });

  if (!indexer) throw new IndexerNotInitializedError();

  return createPaginatedQuery({
    limit,
    offset,
    queryFn: async ({ limit, offset }) => {
      const response = await indexer.getFungibleAssetBalances({
        limit,
        offset,
        order_by: orderBy,
        where: {
          _and: [
            {
              metadata: { asset_type: { _is_null: false } },
              owner_address: {
                _eq: AccountAddress.from(address).toStringLong(),
              },
            },
            where ?? {},
          ],
        },
      });

      const balances = response.current_fungible_asset_balances.filter(
        (e) => e.metadata !== undefined && e.metadata !== null,
      ) as (FungibleAssetBalanceFieldsFragment & {
        metadata: FungibleAssetMetadataFieldsFragment;
      })[];

      return {
        balances: normalizeFungibleAssetBalances(balances),
        hasNextPage: response.current_fungible_asset_balances.length === limit,
      };
    },
  });
}
