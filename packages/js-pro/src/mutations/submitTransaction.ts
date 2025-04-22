// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import {
  PendingTransactionResponse,
  SignedTransaction,
  postAptosFullNode,
  MimeType,
  InputSubmitTransactionData,
  generateSignedTransaction,
  AnyRawTransaction,
} from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

type SubmitTransactionWithSignedTransactionParameters = WithNetwork<{
  transaction: SignedTransaction;
}>;

type SubmitTransactionWithRawTransactionParameters =
  WithNetwork<InputSubmitTransactionData>;

export type SubmitTransactionParameters =
  | SubmitTransactionWithSignedTransactionParameters
  | SubmitTransactionWithRawTransactionParameters;

export type SubmitTransactionResult = PendingTransactionResponse;

export async function submitTransaction(
  this: AptosJSProClient,
  { network, transaction, ...params }: SubmitTransactionParameters
): Promise<SubmitTransactionResult> {
  const { aptos } = this.getClients({ network });

  let signedTransaction: Uint8Array;
  if ("senderAuthenticator" in params) {
    signedTransaction = generateSignedTransaction({
      ...params,
      transaction: transaction as AnyRawTransaction,
    });
  } else {
    signedTransaction = (transaction as SignedTransaction).bcsToBytes();
  }

  const { data } = await postAptosFullNode<
    Uint8Array,
    PendingTransactionResponse
  >({
    aptosConfig: aptos.config,
    body: signedTransaction,
    contentType: MimeType.BCS_SIGNED_TRANSACTION,
    originMethod: "submitTransaction",
    path: "transactions",
  });

  return data;
}
