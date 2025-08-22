// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  Account,
  AnyRawTransaction,
  TransactionResponse,
} from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";
import { SignerNotFoundError } from "../errors/clients.js";
import {
  BuildMultiAgentTransactionParameters,
  BuildSimpleTransactionParameters,
} from "./buildTransaction.js";
import { FeePayerOrFeePayerAuthenticatorOrNeither } from "../types/build.js";

export type SignAndSubmitTransactionParameters = WithNetwork<
  { signer?: Account } & FeePayerOrFeePayerAuthenticatorOrNeither &
    (
      | { transaction: AnyRawTransaction }
      | BuildSimpleTransactionParameters
      | BuildMultiAgentTransactionParameters
    )
>;

export type SignAndSubmitTransactionResult = TransactionResponse;

export async function signAndSubmitTransaction(
  this: AptosJSProClient,
  params: SignAndSubmitTransactionParameters,
): Promise<SignAndSubmitTransactionResult> {
  const { aptos, signer } = this.getClients({ network: params.network });
  if (!signer) throw new SignerNotFoundError();

  let transaction: AnyRawTransaction;
  if ("data" in params) {
    if (signer.type === "adapter") {
      return await signer.signAndSubmitTransaction({
        aptos,
        payload: params,
        signer: params.signer,
      });
    } else {
      transaction = await this.buildTransaction(params);
    }
  } else {
    transaction = params.transaction;
  }

  return signer.signAndSubmitTransaction({
    aptos,
    transaction,
    signer: params.signer,
  });
}
