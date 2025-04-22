// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { test as vitestTest } from "vitest";
import { Account, Network } from "@aptos-labs/ts-sdk";
import {
  AptosJSProClient,
  AptosJSProClientParameters,
  convertAptosAccountToAccountInfo,
  convertAptosAccountToSigner,
} from "../src";

export function setupClient(args: Partial<AptosJSProClientParameters> = {}) {
  const account = Account.generate();
  return new AptosJSProClient({
    account: convertAptosAccountToAccountInfo(account),
    network: { network: Network.DEVNET },
    signer: convertAptosAccountToSigner(account),
    ...args,
    config: {
      apiKey: {
        devnet:
          process.env.APTOS_DEVNET_API_KEY !== undefined
            ? process.env.APTOS_DEVNET_API_KEY
            : undefined,
        testnet:
          process.env.APTOS_TESTNET_API_KEY !== undefined
            ? process.env.APTOS_TESTNET_API_KEY
            : undefined,
        mainnet:
          process.env.APTOS_MAINNET_API_KEY !== undefined
            ? process.env.APTOS_MAINNET_API_KEY
            : undefined,
      },
      ...args.config,
    },
  });
}

export const test = vitestTest.extend<{
  account: Account;
  devnet: AptosJSProClient;
  testnet: AptosJSProClient;
  mainnet: AptosJSProClient;
}>({
  // eslint-disable-next-line no-empty-pattern
  account: async ({}, use) => {
    const account = Account.generate();
    await use(account);
  },
  devnet: async ({ account }, use) => {
    const client = setupClient({
      account: convertAptosAccountToAccountInfo(account),
    });
    await use(client);
  },
  testnet: async ({ account }, use) => {
    const client = setupClient({
      account: convertAptosAccountToAccountInfo(account),
      network: { network: Network.TESTNET },
    });
    await use(client);
  },
  mainnet: async ({ account }, use) => {
    const client = setupClient({
      account: convertAptosAccountToAccountInfo(account),
      network: { network: Network.MAINNET },
    });
    await use(client);
  },
});
