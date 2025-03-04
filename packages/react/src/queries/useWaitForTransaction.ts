// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  WaitForTransactionParameters,
  WaitForTransactionResult,
} from "@aptos-labs/js-pro";
import { HexInput } from "@aptos-labs/ts-sdk";
import { MissingRequiredArgumentError } from "../errors/index.js";

export const getUseWaitForTransactionQueryKey = (params: {
  network: string;
  hash?: HexInput;
}) => ["wait-for-transaction", params.network, params.hash];

export type UseWaitForTransactionQueryParameters =
  Partial<WaitForTransactionParameters> &
    UseQueryOptions<WaitForTransactionResult>;

export function useWaitForTransaction({
  network,
  hash,
  ...queryOptions
}: UseWaitForTransactionQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(hash && (queryOptions.enabled ?? true));

  return useQuery({
    queryKey: getUseWaitForTransactionQueryKey({
      network: activeNetwork.network,
      hash,
    }),
    queryFn: () => {
      if (!hash) throw new MissingRequiredArgumentError("transactionHash");
      return core.client.waitForTransaction({ network: network, hash });
    },
    ...queryOptions,
    enabled,
  });
}
