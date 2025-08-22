// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  Account,
  AccountAuthenticator,
  AnyRawTransaction,
} from "@aptos-labs/ts-sdk";
import { WithNetwork } from "../types/parameters.js";
import { AptosJSProClient } from "../client.js";
import { SignerNotFoundError } from "../errors/index.js";

export type SignTransactionParameters = WithNetwork<{
  transaction: AnyRawTransaction;
  signer?: Account;
}>;

export type SignTransactionResult = {
  authenticator: AccountAuthenticator;
  rawTransaction: Uint8Array;
};

export async function signTransaction(
  this: AptosJSProClient,
  { network, ...params }: SignTransactionParameters,
) {
  const { aptos, signer } = this.getClients({ network });

  if (!signer) throw new SignerNotFoundError();

  return signer.signTransaction({
    aptos,
    transaction: params.transaction,
    signer: params.signer,
  });
}
