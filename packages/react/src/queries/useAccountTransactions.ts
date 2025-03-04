// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseOffsetLimitPaginationOptions } from "../types/queries.js";
import { AccountAddressInput } from "@aptos-labs/ts-sdk";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import useOffsetLimitPagination from "../utils/useOffsetLimitPagination.js";
import { AccountNotFoundError } from "../errors/common.js";
import {
  FetchAccountTransactionsParameters,
  FetchAccountTransactionsResult,
} from "@aptos-labs/js-pro";

export const getUseAccountTransactionsQueryKey = (params: {
  network: string;
  address?: AccountAddressInput;
  where?: FetchAccountTransactionsParameters["where"];
  orderBy?: FetchAccountTransactionsParameters["orderBy"];
  fungibleAssetActivitiesOrderBy?: FetchAccountTransactionsParameters["fungibleAssetActivitiesOrderBy"];
  fungibleAssetActivitiesWhere?: FetchAccountTransactionsParameters["fungibleAssetActivitiesWhere"];
  tokenActivitiesWhere?: FetchAccountTransactionsParameters["tokenActivitiesWhere"];
  tokenActivitiesOrderBy?: FetchAccountTransactionsParameters["tokenActivitiesOrderBy"];
}) => [
  "account-transactions",
  params.network,
  params.address ? AccountAddress.from(params.address).toString() : undefined,
  params.where,
  params.orderBy,
  params.fungibleAssetActivitiesOrderBy,
  params.fungibleAssetActivitiesWhere,
  params.tokenActivitiesWhere,
  params.tokenActivitiesOrderBy,
];

export type UseAccountTransactionsQueryParameters =
  Partial<FetchAccountTransactionsParameters> &
    UseOffsetLimitPaginationOptions<FetchAccountTransactionsResult>;

export function useAccountTransactions({
  network,
  address,
  where,
  orderBy,
  fungibleAssetActivitiesOrderBy,
  fungibleAssetActivitiesWhere,
  tokenActivitiesWhere,
  tokenActivitiesOrderBy,
  ...queryOptions
}: UseAccountTransactionsQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const activeAddress = address ?? core.account?.address;

  const enabled = Boolean(activeAddress && (queryOptions.enabled ?? true));

  return useOffsetLimitPagination({
    queryKey: getUseAccountTransactionsQueryKey({
      network: activeNetwork.network,
      address: activeAddress,
    }),
    queryFn: ({ limit, pageParam }) => {
      if (!activeAddress) throw new AccountNotFoundError();
      return core.client.fetchAccountTransactions({
        network,
        address: activeAddress,
        limit,
        offset: pageParam,
        where,
        orderBy,
        fungibleAssetActivitiesOrderBy,
        fungibleAssetActivitiesWhere,
        tokenActivitiesWhere,
        tokenActivitiesOrderBy,
      });
    },
    ...queryOptions,
    enabled,
  });
}
