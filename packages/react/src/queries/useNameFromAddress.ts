// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import {
  FetchNameFromAddressParameters,
  FetchNameFromAddressResult,
} from "@aptos-labs/js-pro";
import { UseQueryOptions } from "../types/queries.js";
import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";

export const getUseNameFromAddressQueryKey = (params: {
  network: string;
  address: AccountAddressInput;
}) => [
  "name-from-address",
  params.network,
  AccountAddress.from(params.address).toString(),
];

export type UseNameFromAddressQueryParameters = FetchNameFromAddressParameters &
  UseQueryOptions<FetchNameFromAddressResult>;

export function useNameFromAddress({
  network,
  address,
  ...queryOptions
}: UseNameFromAddressQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  return useQuery({
    queryKey: getUseNameFromAddressQueryKey({
      network: activeNetwork.network,
      address,
    }),
    queryFn: () => core.client.fetchNameFromAddress({ network, address }),
    ...queryOptions,
  });
}
