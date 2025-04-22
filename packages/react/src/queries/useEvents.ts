// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { FetchEventsParameters, FetchEventsResult } from "@aptos-labs/js-pro";
import { AnyNumber } from "@aptos-labs/ts-sdk";
import { UseQueryOptions } from "../types/queries.js";

export const getUseEventsQueryKey = (params: {
  network: string;
  minimumLedgerVersion?: AnyNumber;
  options?: object;
}) => ["events", params.network, params.minimumLedgerVersion, params.options];

export type UseEventsQueryParameters = FetchEventsParameters &
  UseQueryOptions<FetchEventsResult>;

export function useEvents({
  network,
  minimumLedgerVersion,
  options,
  ...queryOptions
}: UseEventsQueryParameters = {}) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseEventsQueryKey({
      network: activeNetwork.network,
      minimumLedgerVersion,
      options,
    }),
    queryFn: () =>
      core.client.fetchEvents({ network, minimumLedgerVersion, options }),
    ...queryOptions,
  });
}
