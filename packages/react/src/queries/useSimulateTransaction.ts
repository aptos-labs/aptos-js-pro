// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  SimulateTransactionResult,
  SimulateTransactionParameters,
} from "@aptos-labs/js-pro";
import {
  MissingRequiredArgumentError,
  SimulationArgumentError,
} from "../errors/index.js";
import {
  AccountAddress,
  AccountPublicKey,
  AnyRawTransaction,
  AuthenticationKey,
  InputGenerateTransactionOptions,
  InputGenerateTransactionPayloadData,
  InputSimulateTransactionOptions,
  PublicKey,
} from "@aptos-labs/ts-sdk";
import { hashFunctionQueryKey } from "../utils/queries.js";

export const getUseSimulateTransactionQueryKey = (params: {
  network: string;
  options?: InputSimulateTransactionOptions;
  feePayerPublicKey?: PublicKey;
  signerPublicKey?: PublicKey;
  secondarySignersPublicKeys?: (PublicKey | undefined)[];
  transactionOptions?: InputGenerateTransactionOptions;
  withFeePayer?: boolean;
  transaction?: AnyRawTransaction;
  data?:
    | InputGenerateTransactionPayloadData
    | ((
        sender: AccountAddress
      ) => Promise<InputGenerateTransactionPayloadData>);
  sender?: AccountAddress;
}) => [
  "simulate-transaction",
  params.network,
  params.options,
  params.feePayerPublicKey,
  params.signerPublicKey,
  params.secondarySignersPublicKeys,
  [
    typeof params.data === "function"
      ? hashFunctionQueryKey(params.data)
      : params.data,
    params.transactionOptions,
    params.withFeePayer,
    params.sender,
  ],
  [params.transaction],
];

export type UseSimulateTransactionQueryParameters = Partial<
  SimulateTransactionParameters & {
    data?:
      | InputGenerateTransactionPayloadData
      | ((
          sender: AccountAddress
        ) => Promise<InputGenerateTransactionPayloadData>);
    sender?: AccountAddress;
    transactionOptions?: InputGenerateTransactionOptions;
    withFeePayer?: boolean;
  }
> &
  UseQueryOptions<SimulateTransactionResult>;

export function useSimulateTransaction({
  network,
  data,
  transaction,
  options,
  feePayerPublicKey,
  signerPublicKey,
  transactionOptions,
  withFeePayer,
  sender,
  ...queryOptions
}: UseSimulateTransactionQueryParameters) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(
    (transaction !== undefined || data !== undefined) &&
      (queryOptions.enabled ?? true)
  );

  let secondarySignersPublicKeys: (PublicKey | undefined)[] | undefined;
  if ("secondarySignersPublicKeys" in queryOptions) {
    secondarySignersPublicKeys = queryOptions.secondarySignersPublicKeys;
  }

  return useQuery({
    queryKey: getUseSimulateTransactionQueryKey({
      network: activeNetwork.network,
      transaction,
      options,
      feePayerPublicKey,
      signerPublicKey,
      secondarySignersPublicKeys,
      data,
      sender,
      transactionOptions,
      withFeePayer,
    }),
    queryFn: async () => {
      if (data === undefined && transaction === undefined) {
        throw new MissingRequiredArgumentError("data or transaction");
      }

      if (transaction && data) {
        throw new SimulationArgumentError(
          "Cannot provide both `data` and `transaction` into the useSimulateTransaction hook."
        );
      }

      let activeTransaction: AnyRawTransaction;
      if (transaction) {
        activeTransaction = transaction;
      } else if (data) {
        const activeAddress =
          sender !== undefined
            ? sender
            : signerPublicKey
              ? AuthenticationKey.fromPublicKey({
                  publicKey: signerPublicKey as AccountPublicKey,
                }).derivedAddress()
              : core.account?.address;

        if (!activeAddress) {
          throw new SimulationArgumentError(
            "`sender` must be available when providing `data` to the useSimulateTransaction hook."
          );
        }

        activeTransaction = await core.client.buildTransaction({
          data:
            typeof data === "function"
              ? await data(AccountAddress.from(activeAddress))
              : data,
          options: transactionOptions,
          sender: AccountAddress.from(activeAddress),
          withFeePayer,
        });
      } else {
        throw new SimulationArgumentError(
          "`data` or `transaction` must be provided to the useSimulateTransaction hook."
        );
      }

      if (secondarySignersPublicKeys) {
        return core.client.simulateTransaction({
          network,
          transaction: activeTransaction,
          options,
          feePayerPublicKey,
          signerPublicKey,
          secondarySignersPublicKeys,
        });
      }

      return core.client.simulateTransaction({
        network,
        transaction: activeTransaction,
        options,
        feePayerPublicKey,
        signerPublicKey,
      });
    },
    ...queryOptions,
    enabled,
  });
}
