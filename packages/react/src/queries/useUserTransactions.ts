// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseOffsetLimitPaginationOptions } from "../types/queries.js";
import useOffsetLimitPagination from "../utils/useOffsetLimitPagination.js";
import { FetchUserTransactionsResult } from "@aptos-labs/js-pro";
import { FetchUserTransactionsParameters } from "@aptos-labs/js-pro";

export const getUserTransactionsQueryKey = (params: {
  network: string;
  where?: FetchUserTransactionsParameters["where"];
  orderBy?: FetchUserTransactionsParameters["orderBy"];
}) => ["user-transactions", params.network, params.where, params.orderBy];

export type UseUserTransactionsQueryParameters =
  Partial<FetchUserTransactionsParameters> &
    UseOffsetLimitPaginationOptions<FetchUserTransactionsResult>;

export function useUserTransactions({
  network,
  where,
  orderBy,
  ...queryOptions
}: UseUserTransactionsQueryParameters = {}) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useOffsetLimitPagination({
    queryKey: getUserTransactionsQueryKey({
      network: activeNetwork.network,
      where,
      orderBy,
    }),
    queryFn: ({ limit, pageParam }) => {
      return core.client.fetchUserTransactions({
        network,
        limit,
        offset: pageParam,
        where,
        orderBy,
      });
    },
    ...queryOptions,
  });
}
