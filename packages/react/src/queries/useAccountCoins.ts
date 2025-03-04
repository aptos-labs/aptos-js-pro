// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { FetchAccountCoinsParameters } from "@aptos-labs/js-pro";
import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseOffsetLimitPaginationOptions } from "../types/queries.js";
import { FetchAccountCoinsResult } from "@aptos-labs/js-pro";
import useOffsetLimitPagination from "../utils/useOffsetLimitPagination.js";
import { AccountNotFoundError } from "../errors/common.js";

export const getUseAccountCoinsQueryKey = (params: {
  network: string;
  address?: AccountAddressInput;
  where?: FetchAccountCoinsParameters["where"];
  orderBy?: FetchAccountCoinsParameters["orderBy"];
}) => [
  "account-coins",
  params.network,
  params.address ? AccountAddress.from(params.address).toString() : undefined,
  params.where,
  params.orderBy,
];

export type UseAccountCoinsQueryParameters =
  Partial<FetchAccountCoinsParameters> &
    UseOffsetLimitPaginationOptions<FetchAccountCoinsResult>;

export function useAccountCoins({
  network,
  address,
  where,
  orderBy,
  ...queryOptions
}: UseAccountCoinsQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const activeAddress = address ?? core.account?.address;

  const enabled = Boolean(activeAddress && (queryOptions.enabled ?? true));

  return useOffsetLimitPagination({
    queryKey: getUseAccountCoinsQueryKey({
      network: activeNetwork.network,
      address: activeAddress,
      where,
      orderBy,
    }),
    queryFn: ({ limit, pageParam }) => {
      if (!activeAddress) throw new AccountNotFoundError();
      return core.client.fetchAccountCoins({
        network: network,
        address: activeAddress,
        limit,
        offset: pageParam,
        where,
        orderBy,
      });
    },
    ...queryOptions,
    enabled,
  });
}
