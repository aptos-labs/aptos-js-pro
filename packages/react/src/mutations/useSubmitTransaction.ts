// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  SubmitTransactionParameters,
  SubmitTransactionResult,
} from "@aptos-labs/js-pro";
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";

export type UseSubmitTransactionMutationParameters = UseMutationOptions<
  SubmitTransactionResult,
  DefaultError,
  SubmitTransactionParameters
>;

export function useSubmitTransaction({
  ...mutationOptions
}: UseSubmitTransactionMutationParameters = {}) {
  const core = useAptosCore();

  return useMutation({
    mutationFn: (params: SubmitTransactionParameters) =>
      core.client.submitTransaction(params),
    ...mutationOptions,
  });
}
