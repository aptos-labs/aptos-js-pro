// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { beforeAll, describe, expect } from "vitest";
import { setupClient, test, fundTestAccount, DEVNET_TEST_FUND_AMOUNT, DEVNET_TEST_TX_OPTIONS } from "../../tests/fixtures";
import { Account } from "@aptos-labs/ts-sdk";
import { convertAptosAccountToAccountInfo } from "../utils";

describe("simulateTransaction", async () => {
  const account = Account.generate();
  const account2 = Account.generate();

  beforeAll(async () => {
    const devnet = setupClient();

    await fundTestAccount(devnet.aptos, account.accountAddress, DEVNET_TEST_FUND_AMOUNT);
  });

  test("should simulate a simple transaction", async ({ devnet }) => {
    devnet.setAccount(convertAptosAccountToAccountInfo(account));

    const transaction = await devnet.buildTransaction({
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: [account.accountAddress, 100],
      },
      options: DEVNET_TEST_TX_OPTIONS,
    });

    const result = await devnet.simulateTransaction({ transaction });

    expect(result).toBeDefined();
  });

  test("should simulate a multi-agent transaction", async ({ devnet }) => {
    devnet.setAccount(convertAptosAccountToAccountInfo(account));

    const transaction = await devnet.buildTransaction({
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: [account.accountAddress, 100],
      },
      sender: account.accountAddress,
      secondarySignerAddresses: [account2.accountAddress],
      options: DEVNET_TEST_TX_OPTIONS,
    });

    const result = await devnet.simulateTransaction({
      transaction,
      secondarySignersPublicKeys: [account2.publicKey],
    });

    expect(result).toBeDefined();
  });
});
