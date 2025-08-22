// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react-hooks/exhaustive-deps */

import {
  AptosJSProClient,
  ClientConfigs,
  NetworkInfo,
  AccountInfo,
  SignerClient,
  convertAptosAccountToAccountInfo,
  convertAptosAccountToSigner,
} from "@aptos-labs/js-pro";
import type { WalletContextState } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useMemo } from "react";
import { Account, Network } from "@aptos-labs/ts-sdk";
import {
  convertWalletAdapterAccountToAccountInfo,
  convertWalletAdapterSignerToSigner,
  convertWalletAdapterNetworkToNetworkInfo,
} from "./utils/convert.js";

interface WalletAdapterCoreArgs {
  config?: ClientConfigs;
  defaultNetwork?: NetworkInfo;
  wallet: Pick<
    WalletContextState,
    "network" | "account" | "signAndSubmitTransaction" | "signTransaction"
  >;
}

/**
   * Converts the wallet adapter context to a AptosJSProClient. This is useful for
   * custom wallet implementations rely on external wallets.
   *
   * @param wallet - The wallet adapter context to convert to a AptosJSProClient.
   * @param defaultNetwork - The default network to use if the wallet's network is not set.
   * ```tsx
  import { useWallet } from '@aptos-labs/wallet-adapter-react';
  import { AptosJSCoreProvider } from '@aptos-labs/react';
  import { networks } from '@aptos-labs/js-pro';
  
  function AptosCoreProvider({ children }: PropsWithChildren) {
    const wallet = useWallet();
  
    const core = useWalletAdapterCore({ wallet });
  
    return <AptosJSCoreProvider core={core}>{children}</AptosJSCoreProvider>;
  }
   * ```
   */
export const useWalletAdapterCore = ({
  defaultNetwork = { network: Network.MAINNET },
  wallet,
  config,
}: WalletAdapterCoreArgs): AptosJSProClient => {
  const network = convertWalletAdapterNetworkToNetworkInfo(wallet.network);
  const account = convertWalletAdapterAccountToAccountInfo(wallet.account);
  const signer = convertWalletAdapterSignerToSigner(wallet);

  const client = useMemo(
    () =>
      new AptosJSProClient({
        account,
        config,
        network: network ?? defaultNetwork,
        signer,
      }),
    [],
  );

  // React to the wallet adapter network changing and update the client.
  useEffect(() => {
    if (network) client.setNetwork(network);
  }, [wallet.network]);

  // React to the wallet adapter account changing and update the client.
  useEffect(() => {
    client.setAccount(account);
  }, [wallet.account]);

  useEffect(() => {
    client.setSigner(signer);
  }, [signer]);

  return client;
};

interface WalletSignerCoreArgs {
  account?: Account | AccountInfo;
  config?: ClientConfigs;
  network: NetworkInfo;
  signer?: Account;
}

/**
   * Converts a wallet's account and network to a AptosJSProClient. This is useful for
   * custom wallet implementations that do not rely on external wallet adapters.
   * ```tsx
  import { useWallet } from '@aptos-labs/wallet-adapter-react';
  import { AptosJSCoreProvider } from '@aptos-labs/react';
  
  /// Account and network should be tracked manually by a custom wallet implementation
  function AptosCoreProvider({
    account,
    children,
    network,
  }: PropsWithChildren & { account?: Account; network: Network }) {
    const core = useWalletSignerCore({ account, network });
  
    return <AptosJSCoreProvider core={core}>{children}</AptosJSCoreProvider>;
  }
   * ```
   */
export const useWalletSignerCore = ({
  account,
  config,
  network,
  signer: signerAccount,
}: WalletSignerCoreArgs) => {
  const accountInfo =
    account instanceof Account
      ? convertAptosAccountToAccountInfo(account)
      : account;

  // Derive signer from account if signer is not provided.
  let signer: SignerClient | undefined;
  if (account instanceof Account) {
    signer = convertAptosAccountToSigner(account);
  } else if (signerAccount !== undefined) {
    signer = convertAptosAccountToSigner(signerAccount);
  }

  const client = useMemo(
    () =>
      new AptosJSProClient({ account: accountInfo, config, network, signer }),
    [],
  );

  // React to the wallet adapter network changing and update the client.

  useEffect(() => client.setNetwork(network), [network]);

  useEffect(() => client.setSigner(signer), [signer]);

  useEffect(() => client.setAccount(accountInfo), [accountInfo]);

  return client;
};
