// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  FetchTokenDataParameters,
  FetchTokenDataResult,
} from "@aptos-labs/js-pro";

export const getUseTokenDataQueryKey = (params: {
  network: string;
  address: string;
}) => ["token-data", params.network, params.address];

export type UseTokenDataQueryParameters = FetchTokenDataParameters &
  UseQueryOptions<FetchTokenDataResult>;

export function useTokenData({
  network,
  address,
  ...queryOptions
}: UseTokenDataQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseTokenDataQueryKey({
      network: activeNetwork.network,
      address,
    }),
    queryFn: () => core.client.fetchTokenData({ network, address }),
    ...queryOptions,
  });
}
