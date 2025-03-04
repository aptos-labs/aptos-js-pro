// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { WithNetwork } from "../types/parameters.js";
import {
  createPaginatedQuery,
  PaginationCursors,
} from "../utils/pagination.js";
import { AptosJSProClient } from "../client.js";
import {
  GetAccountTransactionsQueryVariables,
  Order_By,
} from "../operations/index.js";
import { IndexerNotInitializedError } from "../errors/clients.js";
import { AccountTransaction } from "../types/transactions.js";
import { normalizeAccountTransaction } from "../utils/normalize.js";

export type FetchAccountTransactionsParameters = WithNetwork<{
  address: AccountAddressInput;
  limit?: number;
  offset?: number;
  orderBy?: GetAccountTransactionsQueryVariables["order_by"];
  where?: GetAccountTransactionsQueryVariables["where"];
  fungibleAssetActivitiesWhere?: GetAccountTransactionsQueryVariables["fungible_asset_activities_where"];
  tokenActivitiesWhere?: GetAccountTransactionsQueryVariables["token_activities_v2_where"];
  fungibleAssetActivitiesOrderBy?: GetAccountTransactionsQueryVariables["fungible_asset_activities_order_by"];
  tokenActivitiesOrderBy?: GetAccountTransactionsQueryVariables["token_activities_v2_order_by"];
}>;

export type FetchAccountTransactionsResult = PaginationCursors & {
  transactions: AccountTransaction[];
};

export async function fetchAccountTransactions(
  this: AptosJSProClient,
  {
    network,
    address,
    limit = 100,
    offset = 0,
    orderBy = [],
    where = [],
    fungibleAssetActivitiesWhere = [],
    tokenActivitiesWhere = [],
    fungibleAssetActivitiesOrderBy = [],
    tokenActivitiesOrderBy = [],
  }: FetchAccountTransactionsParameters
): Promise<FetchAccountTransactionsResult> {
  const { indexer } = this.getClients({ network });
  if (!indexer) throw new IndexerNotInitializedError();

  return createPaginatedQuery({
    limit,
    offset,
    queryFn: async ({ limit, offset }) => {
      const response = await indexer.getAccountTransactions({
        address: AccountAddress.from(address).toString(),
        limit,
        offset,
        order_by: [
          {
            transaction_version: Order_By.Desc,
          },
          ...(Array.isArray(orderBy) ? orderBy : [orderBy]),
        ],
        where,
        fungible_asset_activities_where: fungibleAssetActivitiesWhere,
        token_activities_v2_where: tokenActivitiesWhere,
        fungible_asset_activities_order_by: fungibleAssetActivitiesOrderBy,
        token_activities_v2_order_by: tokenActivitiesOrderBy,
      });

      return {
        hasNextPage: response.account_transactions.length === limit,
        transactions: response.account_transactions.map(
          normalizeAccountTransaction
        ),
      };
    },
  });
}
