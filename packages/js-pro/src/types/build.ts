// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { Account, AccountAuthenticator } from "@aptos-labs/ts-sdk";

export type FeePayerOrFeePayerAuthenticatorOrNeither =
  | {
      feePayer: Account;
      feePayerAuthenticator?: never;
    }
  | {
      feePayer?: never;
      feePayerAuthenticator: AccountAuthenticator;
    }
  | {
      feePayer?: never;
      feePayerAuthenticator?: never;
    };
