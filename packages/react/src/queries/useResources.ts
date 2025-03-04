// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import {
  FetchResourcesParameters,
  FetchResourcesResult,
} from "@aptos-labs/js-pro";
import {
  AccountAddress,
  AccountAddressInput,
  LedgerVersionArg,
} from "@aptos-labs/ts-sdk";
import { UseQueryOptions } from "../types/queries.js";

export const getUseResourcesQueryKey = (params: {
  network: string;
  address: AccountAddressInput;
  options?: LedgerVersionArg;
}) => [
  "resources",
  params.network,
  AccountAddress.from(params.address).toString(),
  params.options,
];

export type UseResourcesQueryParameters = FetchResourcesParameters &
  UseQueryOptions<FetchResourcesResult>;

export function useResources({
  network,
  accountAddress,
  options,
  ...queryOptions
}: UseResourcesQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseResourcesQueryKey({
      network: activeNetwork.network,
      address: accountAddress,
      options,
    }),
    queryFn: () =>
      core.client.fetchResources({ network, accountAddress, options }),
    ...queryOptions,
  });
}
