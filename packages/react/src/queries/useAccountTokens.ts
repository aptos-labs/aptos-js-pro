// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { UseOffsetLimitPaginationOptions } from "../types/queries.js";
import { AccountAddressInput } from "@aptos-labs/ts-sdk";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import {
  FetchAccountTokensParameters,
  FetchAccountTokensResult,
} from "@aptos-labs/js-pro";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import useOffsetLimitPagination from "../utils/useOffsetLimitPagination.js";
import { AccountNotFoundError } from "../errors/common.js";

export const getUseAccountTokensQueryKey = (params: {
  network: string;
  address?: AccountAddressInput;
  orderBy?: FetchAccountTokensParameters["orderBy"];
  where?: FetchAccountTokensParameters["where"];
}) => [
  "account-tokens",
  params.network,
  params.address ? AccountAddress.from(params.address).toString() : undefined,
  params.orderBy,
  params.where,
];

export type UseAccountTokensQueryParameters =
  Partial<FetchAccountTokensParameters> &
    UseOffsetLimitPaginationOptions<FetchAccountTokensResult>;

export function useAccountTokens({
  network,
  address,
  orderBy,
  where,
  ...queryOptions
}: UseAccountTokensQueryParameters = {}) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const activeAddress = address ?? core.account?.address;

  const enabled = Boolean(activeAddress && (queryOptions.enabled ?? true));

  return useOffsetLimitPagination({
    queryKey: getUseAccountTokensQueryKey({
      network: activeNetwork.network,
      address: activeAddress,
      orderBy,
      where,
    }),
    queryFn: ({ limit, pageParam }) => {
      if (!activeAddress) throw new AccountNotFoundError();
      return core.client.fetchAccountTokens({
        network: network,
        address: activeAddress,
        limit,
        offset: pageParam,
        orderBy,
        where,
      });
    },
    ...queryOptions,
    enabled,
  });
}
