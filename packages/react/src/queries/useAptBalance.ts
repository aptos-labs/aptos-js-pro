// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  FetchAptBalanceParameters,
  FetchBalanceResult,
} from "@aptos-labs/js-pro";
import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import { MissingRequiredArgumentError } from "../errors/index.js";

export const getUseAptBalanceQueryKey = (params: {
  address?: AccountAddressInput;
  network: string;
}) => [
  "apt-balance",
  params.address ? AccountAddress.from(params.address).toString() : undefined,
  params.network,
];

export type UseAptBalanceParameters = Partial<FetchAptBalanceParameters> &
  UseQueryOptions<FetchBalanceResult>;

export function useAptBalance({
  address,
  network,
  ...queryOptions
}: UseAptBalanceParameters = {}) {
  const core = useAptosCore();

  const activeAddress = address ?? core.account?.address;

  console.log(activeAddress?.toString());

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(activeAddress && (queryOptions.enabled ?? true));

  return useQuery({
    queryKey: getUseAptBalanceQueryKey({
      address: activeAddress,
      network: activeNetwork.network,
    }),
    queryFn: () => {
      if (!activeAddress) throw new MissingRequiredArgumentError("address");
      return core.client.fetchAptBalance({
        address: activeAddress,
        network,
      });
    },
    ...queryOptions,
    enabled,
  });
}
