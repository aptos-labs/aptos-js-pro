import { test as vitestTest } from "vitest";
import {
  Account,
  AnyRawTransaction,
  InputGenerateTransactionPayloadData,
  Network,
} from "@aptos-labs/ts-sdk";
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
  });
}

export const test = vitestTest.extend<{
  account: Account;
  devnet: AptosJSProClient;
  testnet: AptosJSProClient;
  mainnet: AptosJSProClient;
}>({
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
