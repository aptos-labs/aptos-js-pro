// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  FetchViewModuleParameters,
  FetchViewModuleResult,
} from "@aptos-labs/js-pro";
import {
  MoveValue,
  InputViewFunctionData,
  LedgerVersionArg,
} from "@aptos-labs/ts-sdk";

export const getUseViewModuleQueryKey = (params: {
  network: string;
  payload: InputViewFunctionData;
  options?: LedgerVersionArg;
}) => ["view-module", params.network, params.payload, params.options];

export type UseViewModuleParameters<T extends Array<MoveValue>> =
  FetchViewModuleParameters & UseQueryOptions<FetchViewModuleResult<T>>;

export function useViewModule<T extends Array<MoveValue>>({
  network,
  payload,
  options,

  ...queryOptions
}: UseViewModuleParameters<T>) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseViewModuleQueryKey({
      network: activeNetwork.network,
      payload,
      options,
    }),
    queryFn: () =>
      core.client.fetchViewModule<T>({ network, payload, options }),
    ...queryOptions,
  });
}
