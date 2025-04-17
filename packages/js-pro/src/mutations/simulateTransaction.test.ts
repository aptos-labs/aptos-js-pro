import { beforeAll, describe, expect } from "vitest";
import { setupClient, test } from "../../tests/fixtures";
import { Account } from "@aptos-labs/ts-sdk";
import { convertAptosAccountToAccountInfo } from "../utils";

describe("simulateTransaction", async () => {
  const account = Account.generate();
  const account2 = Account.generate();

  beforeAll(async () => {
    const devnet = setupClient();

    await devnet.aptos.fundAccount({
      accountAddress: account.accountAddress,
      amount: 1000000000,
    });
  });

  test("should simulate a simple transaction", async ({ devnet }) => {
    devnet.setAccount(convertAptosAccountToAccountInfo(account));

    const transaction = await devnet.buildTransaction({
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: [account.accountAddress, 100],
      },
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
    });

    const result = await devnet.simulateTransaction({
      transaction,
      secondarySignersPublicKeys: [account2.publicKey],
    });

    expect(result).toBeDefined();
  });
});
