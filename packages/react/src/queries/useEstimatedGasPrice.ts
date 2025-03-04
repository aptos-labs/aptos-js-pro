// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  FetchEstimatedGasPriceParameters,
  FetchEstimatedGasPriceResult,
} from "@aptos-labs/js-pro";

export const getUseEstimatedGasPriceQueryKey = (params: {
  network: string;
}) => ["estimated-gas-price", params.network];

export type UseEstimatedGasPriceParameters = FetchEstimatedGasPriceParameters &
  UseQueryOptions<FetchEstimatedGasPriceResult>;

export function useEstimatedGasPrice({
  network,
  ...queryOptions
}: UseEstimatedGasPriceParameters = {}) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseEstimatedGasPriceQueryKey({
      network: activeNetwork.network,
    }),
    queryFn: () => core.client.fetchEstimatedGasPrice({ network }),
    ...queryOptions,
  });
}
