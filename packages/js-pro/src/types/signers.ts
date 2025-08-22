// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import {
  Account,
  AccountAddressInput,
  AccountAuthenticator,
  AnyRawTransaction,
  Aptos,
  InputGenerateTransactionOptions,
  InputGenerateTransactionPayloadData,
  TransactionResponse,
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
    } & FeePayerOrFeePayerAuthenticatorOrNeither,
  ): Promise<TransactionResponse>;
};

export type AdapterSignerClient = {
  type: "adapter";

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
      transaction?: AnyRawTransaction;
      payload?: {
        sender?: AccountAddressInput;
        data: InputGenerateTransactionPayloadData;
        options?: InputGenerateTransactionOptions & {
          expirationSecondsFromNow?: number;
          expirationTimestamp?: number;
        };
      };
      signer?: Account;
    } & FeePayerOrFeePayerAuthenticatorOrNeither,
  ): Promise<TransactionResponse>;
};

export type SignerClient = CustomSignerClient | AdapterSignerClient;
