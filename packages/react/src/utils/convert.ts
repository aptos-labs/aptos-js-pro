// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import type {
  NetworkInfo as WalletAdapterNetworkInfo,
  AccountInfo as WalletAdapterAccount,
  WalletContextState,
} from "@aptos-labs/wallet-adapter-react";
import {
  NetworkInfo as JsProNetworkInfo,
  AccountInfo as JsProAccountInfo,
  SignerClient,
} from "@aptos-labs/js-pro";

export const convertWalletAdapterNetworkToNetworkInfo = (
  network: WalletAdapterNetworkInfo | null
): JsProNetworkInfo | undefined => {
  return network ? { network: network.name } : undefined;
};

export const convertWalletAdapterAccountToAccountInfo = (
  account: WalletAdapterAccount | null
): JsProAccountInfo | undefined => {
  return account
    ? { address: account.address, publicKey: account.publicKey }
    : undefined;
};

export const convertWalletAdapterSignerToSigner = (
  signer: Pick<
    WalletContextState,
    "signAndSubmitTransaction" | "signTransaction"
  > | null
): SignerClient | undefined => {
  return signer
    ? {
        type: "custom",
        signAndSubmitTransaction: async ({ aptos, transaction }) => {
          const signedTransaction = await signer.signTransaction({
            transactionOrPayload: transaction,
          });

          return aptos.transaction.submit.simple({
            senderAuthenticator: signedTransaction.authenticator,
            transaction,
          });
        },
        signTransaction: async ({ transaction }) =>
          await signer.signTransaction({
            transactionOrPayload: transaction,
          }),
      }
    : undefined;
};
