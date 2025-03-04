// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import {
  FetchAddressFromNameParameters,
  FetchAddressFromNameResult,
} from "@aptos-labs/js-pro";
import { UseQueryOptions } from "../types/queries.js";

export const getUseAddressFromNameQueryKey = (params: {
  network: string;
  name: string;
}) => ["address-from-name", params.network, params.name];

export type UseAddressFromNameQueryParameters = FetchAddressFromNameParameters &
  UseQueryOptions<FetchAddressFromNameResult>;

export function useAddressFromName({
  network,
  name,
  ...queryOptions
}: UseAddressFromNameQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseAddressFromNameQueryKey({
      network: activeNetwork.network,
      name: name.toString(),
    }),
    queryFn: () => core.client.fetchAddressFromName({ network, name }),
    ...queryOptions,
  });
}
