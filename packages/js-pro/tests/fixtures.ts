// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { test as vitestTest } from "vitest";
import { Account, AccountAddress, Aptos, Network } from "@aptos-labs/ts-sdk";
import {
  AptosJSProClient,
  AptosJSProClientParameters,
  convertAptosAccountToAccountInfo,
  convertAptosAccountToSigner,
} from "../src";

const MAX_FUND_ATTEMPTS = 16;
export const DEVNET_TEST_FUND_AMOUNT = 100_000_000;
export const DEVNET_TEST_TX_OPTIONS = { maxGasAmount: 500_000 };

/**
 * Funds a test account, looping faucet calls when the devnet per-request cap
 * is lower than the requested amount.
 */
export async function fundTestAccount(
  aptos: Aptos,
  accountAddress: AccountAddress,
  amount: number,
): Promise<void> {
  const startBalance = await aptos.getAccountAPTAmount({ accountAddress });
  let attempts = 0;

  while (attempts < MAX_FUND_ATTEMPTS) {
    const balance = await aptos.getAccountAPTAmount({ accountAddress });
    if (balance - startBalance >= amount) {
      return;
    }

    const balanceBeforeFund = balance;

    for (let retry = 0; retry < 5; retry++) {
      try {
        await aptos.fundAccount({ accountAddress, amount });
        break;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const isRateLimited =
          message.includes("429") || message.includes("rate limit");

        if (!isRateLimited || retry === 4) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1_000 * (retry + 1)));
      }
    }

    attempts++;

    const balanceAfterFund = await aptos.getAccountAPTAmount({ accountAddress });
    if (balanceAfterFund <= balanceBeforeFund) {
      throw new Error(
        `Failed to fund account ${accountAddress}: faucet returned no additional balance after ${attempts} attempt(s)`,
      );
    }
  }

  const finalBalance = await aptos.getAccountAPTAmount({ accountAddress });
  if (finalBalance - startBalance < amount) {
    throw new Error(
      `Failed to fund account ${accountAddress}: balance ${finalBalance - startBalance} is less than requested ${amount} after ${MAX_FUND_ATTEMPTS} attempts`,
    );
  }
}

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
