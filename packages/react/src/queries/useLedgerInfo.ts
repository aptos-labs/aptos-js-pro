// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  FetchLedgerInfoParameters,
  FetchLedgerInfoResult,
} from "@aptos-labs/js-pro";

export const getUseLedgerInfoQueryKey = (params: { network: string }) => [
  "ledger-info",
  params.network,
];

export type UseLedgerInfoParameters = FetchLedgerInfoParameters &
  UseQueryOptions<FetchLedgerInfoResult>;

export function useLedgerInfo({
  network,
  ...queryOptions
}: UseLedgerInfoParameters = {}) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseLedgerInfoQueryKey({ network: activeNetwork.network }),
    queryFn: () => core.client.fetchLedgerInfo({ network }),
    ...queryOptions,
  });
}
