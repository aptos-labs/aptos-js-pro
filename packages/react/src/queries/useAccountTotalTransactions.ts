// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { UseQueryOptions } from "../types/queries";
import {
  FetchAccountTotalTransactionsParameters,
  FetchAccountTotalTransactionsResult,
} from "@aptos-labs/js-pro";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { useQuery } from "@tanstack/react-query";
import { MissingRequiredArgumentError } from "../errors/common";

export const getUseAccountTotalTransactionsQueryKey = (params: {
  address?: AccountAddressInput;
  network: string;
}) => [
  "account-total-transactions",
  params.address ? AccountAddress.from(params.address).toString() : undefined,
  params.network,
];

export type UseAccountTotalTransactionsParameters =
  Partial<FetchAccountTotalTransactionsParameters> &
    UseQueryOptions<FetchAccountTotalTransactionsResult>;

export function useAccountTotalTransactions({
  address,
  network,
  ...queryOptions
}: UseAccountTotalTransactionsParameters = {}) {
  const core = useAptosCore();

  const activeAddress = address ?? core.account?.address;

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(activeAddress && (queryOptions.enabled ?? true));

  return useQuery({
    queryKey: getUseAccountTotalTransactionsQueryKey({
      address: activeAddress,
      network: activeNetwork.network,
    }),
    queryFn: () => {
      if (!activeAddress) throw new MissingRequiredArgumentError("address");
      return core.client.fetchAccountTotalTransactions({
        address: activeAddress,
        network,
      });
    },
    ...queryOptions,
    enabled,
  });
}
