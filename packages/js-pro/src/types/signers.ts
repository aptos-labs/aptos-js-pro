// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import {
  Account,
  AccountAuthenticator,
  AnyRawTransaction,
  Aptos,
  PendingTransactionResponse,
} from "@aptos-labs/ts-sdk";
import { FeePayerOrFeePayerAuthenticatorOrNeither } from "./build.js";

export type CustomSignerClient = {
  type: "custom";

  signTransaction(params: {
    aptos: Aptos;
    signer?: Account;
    transaction: AnyRawTransaction;
  }): Promise<{
    rawTransaction: Uint8Array;
    authenticator: AccountAuthenticator;
  }>;

  signAndSubmitTransaction(
    params: {
      aptos: Aptos;
      transaction: AnyRawTransaction;
      signer?: Account;
    } & FeePayerOrFeePayerAuthenticatorOrNeither
  ): Promise<PendingTransactionResponse>;
};

export type SignerClient = CustomSignerClient;
