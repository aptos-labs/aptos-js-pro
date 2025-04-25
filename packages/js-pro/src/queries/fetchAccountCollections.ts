// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { CollectionData } from "../types/tokens.js";
import { WithNetwork } from "../types/parameters.js";
import {
  createPaginatedQuery,
  PaginationCursors,
  WithPagination,
} from "../utils/pagination.js";
import { AptosJSProClient } from "../client.js";
import { IndexerNotInitializedError } from "../errors/index.js";
import {
  GetAccountCollectionsQueryVariables,
  Order_By,
} from "../operations/index.js";
import { normalizeCollectionData } from "../utils/normalize.js";

export type FetchAccountCollectionsParameters = WithPagination<
  WithNetwork<{
    /**
     * The address of the account to fetch the collections for.
     */
    address: AccountAddressInput;
    /**
     * Filters for the collection results.
     */
    where?: GetAccountCollectionsQueryVariables["where"];
    /**
     * Conditions for ordering the collection results.
     */
    orderBy?: GetAccountCollectionsQueryVariables["order_by"];
  }>
>;

export type FetchAccountCollectionsResult = PaginationCursors & {
  collections: CollectionData[];
};

export async function fetchAccountCollections(
  this: AptosJSProClient,
  {
    network,
    limit = 100,
    offset = 0,
    orderBy = [],
    where = [],
    ...params
  }: FetchAccountCollectionsParameters
): Promise<FetchAccountCollectionsResult> {
  const { indexer } = this.getClients({ network });
  if (!indexer) throw new IndexerNotInitializedError();

  return createPaginatedQuery({
    limit,
    offset,
    queryFn: async ({ limit, offset }) => {
      const response = await indexer.getAccountCollections({
        limit,
        offset,
        address: AccountAddress.from(params.address).toStringLong(),
        where,
        order_by: [
          {
            last_transaction_version: Order_By.Desc,
            collection_id: Order_By.Desc,
          },
          ...(Array.isArray(orderBy) ? orderBy : [orderBy]),
        ],
      });

      const collections: CollectionData[] = [];

      response.current_collection_ownership_v2_view.forEach((collection) => {
        if (!collection.current_collection) return;

        collections.push(
          normalizeCollectionData(collection.current_collection)
        );
      });

      return {
        hasNextPage:
          response.current_collection_ownership_v2_view.length === limit,
        collections,
      };
    },
  });
}
