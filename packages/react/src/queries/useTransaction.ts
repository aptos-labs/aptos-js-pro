// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { queryOptions, useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import {
  FetchTransactionParameters,
  FetchTransactionResult,
} from "@aptos-labs/js-pro";
import { UseQueryOptions } from "../types/queries.js";
import { AnyNumber, Hex, HexInput } from "@aptos-labs/ts-sdk";
import { MissingRequiredArgumentError } from "../errors/common.js";

export const getUseTransactionQueryKey = (params: {
  network: string;
  ledgerVersion?: AnyNumber;
  transactionHash?: HexInput;
}) => [
  "transaction",
  params.network,
  params.ledgerVersion?.toString(),
  params.transactionHash
    ? Hex.fromHexInput(params.transactionHash).toString()
    : undefined,
];

export type UseTransactionQueryParameters = FetchTransactionParameters &
  UseQueryOptions<FetchTransactionResult>;

export function useTransaction({
  network,
  ...params
}: UseTransactionQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  let ledgerVersion: AnyNumber | undefined;
  let transactionHash: HexInput | undefined;

  if ("ledgerVersion" in params) {
    ledgerVersion = params.ledgerVersion;
  }

  if ("transactionHash" in params) {
    transactionHash = params.transactionHash;
  }

  return useQuery({
    queryKey: getUseTransactionQueryKey({
      network: activeNetwork.network,
      ledgerVersion,
      transactionHash,
    }),
    queryFn: () => {
      if (ledgerVersion) {
        return core.client.fetchTransaction({ network, ledgerVersion });
      }

      if (transactionHash) {
        return core.client.fetchTransaction({ network, transactionHash });
      }

      throw new MissingRequiredArgumentError(
        "ledgerVersion or transactionHash",
      );
    },
    ...queryOptions,
  });
}
