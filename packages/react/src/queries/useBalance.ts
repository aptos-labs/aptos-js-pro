// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { FetchBalanceParameters, FetchBalanceResult } from "@aptos-labs/js-pro";
import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import { MissingRequiredArgumentError } from "../errors/index.js";

export const getUseBalanceQueryKey = (params: {
  address?: AccountAddressInput;
  network: string;
}) => [
  "fa-balance",
  params.address ? AccountAddress.from(params.address) : undefined,
  params.network,
];

export type UseBalanceParameters = Partial<FetchBalanceParameters> &
  UseQueryOptions<FetchBalanceResult>;

export function useBalance({
  address,
  network,
  asset = "0x1::aptos_coin::AptosCoin",
  ...queryOptions
}: UseBalanceParameters = {}) {
  const core = useAptosCore();

  const activeAddress = address ?? core.account?.address;

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(activeAddress && (queryOptions.enabled ?? true));

  return useQuery({
    queryKey: getUseBalanceQueryKey({
      address: activeAddress,
      network: activeNetwork.network,
    }),
    queryFn: () => {
      if (!activeAddress) throw new MissingRequiredArgumentError("address");
      return core.client.fetchBalance({
        address: activeAddress,
        asset,
        network,
      });
    },
    ...queryOptions,
    enabled,
  });
}
