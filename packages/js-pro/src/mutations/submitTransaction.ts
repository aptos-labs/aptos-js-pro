// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import {
  PendingTransactionResponse,
  SignedTransaction,
  postAptosFullNode,
  MimeType,
} from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type SubmitTransactionParameters = WithNetwork<{
  transaction: SignedTransaction;
}>;

export type SubmitTransactionResult = PendingTransactionResponse;

export async function submitTransaction(
  this: AptosJSProClient,
  { network, transaction }: SubmitTransactionParameters
): Promise<SubmitTransactionResult> {
  const { aptos } = this.getClients({ network });

  const { data } = await postAptosFullNode<
    Uint8Array,
    PendingTransactionResponse
  >({
    aptosConfig: aptos.config,
    body: transaction,
    contentType: MimeType.BCS_SIGNED_TRANSACTION,
    originMethod: "submitTransaction",
    path: "transactions",
  });

  return data;
}
