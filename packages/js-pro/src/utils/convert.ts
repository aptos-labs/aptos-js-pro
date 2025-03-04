// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Account } from "@aptos-labs/ts-sdk";
import { AccountInfo, SignerClient } from "../types";

export const convertAptosAccountToAccountInfo = (
  account: Account | undefined
): AccountInfo | undefined =>
  account
    ? { address: account.accountAddress, publicKey: account.publicKey }
    : undefined;

export const convertAptosAccountToSigner = (
  account: Account | undefined
): SignerClient | undefined =>
  account
    ? {
        type: "custom",
        signAndSubmitTransaction: async ({ aptos, signer, ...params }) =>
          aptos.signAndSubmitTransaction({
            signer: signer ?? account,
            ...params,
          }),
        signTransaction: async ({ signer, transaction }) => ({
          rawTransaction: transaction.rawTransaction.bcsToBytes(),
          authenticator: (signer ?? account).signTransactionWithAuthenticator(
            transaction
          ),
        }),
      }
    : undefined;
