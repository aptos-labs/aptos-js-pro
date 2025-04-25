// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { WithNetwork } from "../types/parameters.js";
import {
  createPaginatedQuery,
  PaginationCursors,
  WithPagination,
} from "../utils/pagination.js";
import { AptosJSProClient } from "../client.js";
import { GetUserTransactionsQueryVariables } from "../operations/index.js";
import { IndexerNotInitializedError } from "../errors/clients.js";
import { UserTransaction } from "../types/transactions.js";
import { normalizeUserTransaction } from "../utils/normalize.js";

export type FetchUserTransactionsParameters = WithNetwork<
  WithPagination<{
    orderBy?: GetUserTransactionsQueryVariables["order_by"];
    where?: GetUserTransactionsQueryVariables["where"];
  }>
>;

export type FetchUserTransactionsResult = PaginationCursors & {
  transactions: UserTransaction[];
};

export async function fetchUserTransactions(
  this: AptosJSProClient,
  {
    network,
    limit = 100,
    offset = 0,
    orderBy = [],
    where = {},
  }: FetchUserTransactionsParameters = {}
): Promise<FetchUserTransactionsResult> {
  const { indexer } = this.getClients({ network });
  if (!indexer) throw new IndexerNotInitializedError();

  return createPaginatedQuery({
    limit,
    offset,
    queryFn: async ({ limit, offset }) => {
      const response = await indexer.getUserTransactions({
        limit,
        offset,
        order_by: orderBy,
        where,
      });

      return {
        hasNextPage: response.user_transactions.length === limit,
        transactions: response.user_transactions.map(normalizeUserTransaction),
      };
    },
  });
}
