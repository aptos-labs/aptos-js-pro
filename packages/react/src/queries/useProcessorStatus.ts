// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  FetchProcessorStatusParameters,
  FetchProcessorStatusResult,
} from "@aptos-labs/js-pro";

export const getUseProcessorStatusQueryKey = (params: { network: string }) => [
  "processor-status",
  params.network,
];

export type UseProcessorStatusParameters = FetchProcessorStatusParameters &
  UseQueryOptions<FetchProcessorStatusResult>;

export function useProcessorStatus({
  network,
  processor,
  ...queryOptions
}: UseProcessorStatusParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseProcessorStatusQueryKey({ network: activeNetwork.network }),
    queryFn: () => core.client.fetchProcessorStatus({ network, processor }),
    ...queryOptions,
  });
}
