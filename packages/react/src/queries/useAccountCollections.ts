// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseOffsetLimitPaginationOptions } from "../types/queries.js";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { AccountAddressInput } from "@aptos-labs/ts-sdk";
import {
  FetchAccountCollectionsParameters,
  FetchAccountCollectionsResult,
} from "@aptos-labs/js-pro";
import useOffsetLimitPagination from "../utils/useOffsetLimitPagination.js";
import { AccountNotFoundError } from "../errors/common.js";

export const getUseAccountCollectionsQueryKey = (params: {
  network: string;
  address?: AccountAddressInput;
  where?: FetchAccountCollectionsParameters["where"];
  orderBy?: FetchAccountCollectionsParameters["orderBy"];
}) => [
  "account-collections",
  params.network,
  params.address ? AccountAddress.from(params.address).toString() : undefined,
  params.where,
  params.orderBy,
];

export type UseAccountCollectionsQueryParameters =
  Partial<FetchAccountCollectionsParameters> &
    UseOffsetLimitPaginationOptions<FetchAccountCollectionsResult>;

export function useAccountCollections({
  network,
  address,
  where,
  orderBy,
  ...queryOptions
}: UseAccountCollectionsQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const activeAddress = address ?? core.account?.address;

  const enabled = Boolean(activeAddress && (queryOptions.enabled ?? true));

  return useOffsetLimitPagination({
    queryKey: getUseAccountCollectionsQueryKey({
      network: activeNetwork.network,
      address: activeAddress,
      where,
      orderBy,
    }),
    queryFn: ({ limit, pageParam }) => {
      if (!activeAddress) throw new AccountNotFoundError();
      return core.client.fetchAccountCollections({
        network,
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
