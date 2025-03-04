// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  ExtractResourceData,
  FetchResourceTypeParameters,
  FetchResourceTypeResult,
  GetResourceTypeString,
} from "@aptos-labs/js-pro";
import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";

export const getUseResourceTypeQueryKey = (params: {
  network: string;
  accountAddress: AccountAddressInput;
  resourceType: string;
}) => [
  "resource-type",
  params.network,
  AccountAddress.from(params.accountAddress).toString(),
  params.resourceType,
];

export type UseResourceTypeQueryParameters<T extends string | object> =
  FetchResourceTypeParameters<T extends object ? string : T & string> &
    UseQueryOptions<
      FetchResourceTypeResult<ExtractResourceData<T>, GetResourceTypeString<T>>
    >;

export function useResourceType<T extends string | object>({
  network,
  accountAddress,
  resourceType,
  ...queryOptions
}: UseResourceTypeQueryParameters<T>) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(resourceType && (queryOptions.enabled ?? true));

  return useQuery({
    queryKey: getUseResourceTypeQueryKey({
      network: activeNetwork.network,
      accountAddress,
      resourceType,
    }),
    queryFn: () =>
      core.client.fetchResourceType<T>({
        network: network,
        accountAddress,
        resourceType,
      }),
    ...queryOptions,
    enabled,
  });
}
