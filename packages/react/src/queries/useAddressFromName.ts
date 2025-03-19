// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import {
  FetchAddressFromNameParameters,
  FetchAddressFromNameResult,
} from "@aptos-labs/js-pro";
import { UseQueryOptions } from "../types/queries.js";
import { MissingRequiredArgumentError } from "../errors/common.js";

export const getUseAddressFromNameQueryKey = (params: {
  network: string;
  name?: string;
}) => ["address-from-name", params.network, params.name];

export type UseAddressFromNameQueryParameters =
  Partial<FetchAddressFromNameParameters> &
    UseQueryOptions<FetchAddressFromNameResult>;

export function useAddressFromName({
  network,
  name,
  ...queryOptions
}: UseAddressFromNameQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(name && (queryOptions.enabled ?? true));

  return useQuery({
    queryKey: getUseAddressFromNameQueryKey({
      network: activeNetwork.network,
      name: name?.toString(),
    }),
    queryFn: () => {
      if (!name) throw new MissingRequiredArgumentError("name");
      return core.client.fetchAddressFromName({ network, name }) ?? null;
    },
    ...queryOptions,
    enabled,
  });
}
