// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  SignTransactionParameters,
  SignTransactionResult,
} from "@aptos-labs/js-pro";
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";

export type UseSignTransactionMutationParameters = UseMutationOptions<
  SignTransactionResult,
  DefaultError,
  SignTransactionParameters
>;

export function useSignTransaction({
  ...mutationOptions
}: UseSignTransactionMutationParameters = {}) {
  const core = useAptosCore();

  const mutation = useMutation({
    mutationFn: (params: SignTransactionParameters) =>
      core.client.signTransaction(params),
    ...mutationOptions,
  });

  return {
    ...mutation,
    signTransaction: mutation.mutate,
    signTransactionAsync: mutation.mutateAsync,
  };
}
