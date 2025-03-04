// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  signAndSubmitTransaction,
  SignAndSubmitTransactionParameters,
  SignAndSubmitTransactionResult,
} from "@aptos-labs/js-pro";
import { UseMutationOptions } from "../types/queries.js";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";

export type UseSignAndSubmitTransactionMutationParameters = UseMutationOptions<
  SignAndSubmitTransactionResult,
  DefaultError,
  SignAndSubmitTransactionParameters
>;

export function useSignAndSubmitTransaction({
  ...mutationOptions
}: UseSignAndSubmitTransactionMutationParameters) {
  const core = useAptosCore();

  const mutation = useMutation({
    mutationFn: (params: SignAndSubmitTransactionParameters) =>
      core.client.signAndSubmitTransaction(params),
    ...mutationOptions,
  });

  return {
    ...mutation,
    hash: mutation.data?.hash,
    signAndSubmitTransaction: mutation.mutate,
    signAndSubmitTransactionAsync: mutation.mutateAsync,
  };
}
