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
import {
  Network,
  NetworkToFaucetAPI,
  NetworkToIndexerAPI,
  NetworkToNodeAPI,
  NetworkToPepperAPI,
  NetworkToProverAPI,
} from "@aptos-labs/ts-sdk";
import { MissingRequiredArgumentError } from "../errors";

export const convertWalletAdapterNetworkToNetworkInfo = (
  network: WalletAdapterNetworkInfo | null,
): JsProNetworkInfo | undefined => {
  if (network === null) return undefined;
  if (network.name === Network.CUSTOM) {
    return {
      pepperUrl: NetworkToPepperAPI[network.name],
      indexerUrl: NetworkToIndexerAPI[network.name],
      proverUrl: NetworkToProverAPI[network.name],
      faucetUrl: NetworkToFaucetAPI[network.name],
      nodeUrl: network.url ?? NetworkToNodeAPI[network.name],
      network: network.name,
    };
  }
  return { network: network.name };
};

export const convertWalletAdapterAccountToAccountInfo = (
  account: WalletAdapterAccount | null,
): JsProAccountInfo | undefined => {
  return account
    ? { address: account.address, publicKey: account.publicKey }
    : undefined;
};

export const convertWalletAdapterSignerToSigner = (
  signer: Pick<
    WalletContextState,
    "signAndSubmitTransaction" | "signTransaction"
  > | null,
): SignerClient | undefined => {
  return signer
    ? {
        type: "adapter",
        signAndSubmitTransaction: async ({ aptos, transaction, payload }) => {
          if (transaction) {
            const signedTransaction = await signer.signTransaction({
              transactionOrPayload: transaction,
            });

            return aptos.transaction.submit.simple({
              senderAuthenticator: signedTransaction.authenticator,
              transaction,
            });
          }

          if (payload) {
            const { hash } = await signer.signAndSubmitTransaction(payload);
            return aptos.getTransactionByHash({ transactionHash: hash });
          }

          throw new MissingRequiredArgumentError("transaction or payload");
        },
        signTransaction: async ({ transaction }) =>
          await signer.signTransaction({
            transactionOrPayload: transaction,
          }),
      }
    : undefined;
};
