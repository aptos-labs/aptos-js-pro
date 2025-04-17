import { beforeAll, describe, expect } from "vitest";
import { setupClient, test } from "../../tests/fixtures";
import { AnyRawTransaction, Account } from "@aptos-labs/ts-sdk";
import { convertAptosAccountToSigner } from "../utils";

describe("signTransaction", async () => {
  const account = Account.generate();
  let transaction: AnyRawTransaction;

  beforeAll(async () => {
    const testnet = setupClient();

    await testnet.aptos.fundAccount({
      accountAddress: account.accountAddress,
      amount: 1000000000,
    });

    transaction = await testnet.buildTransaction({
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: [account.accountAddress, 100],
      },
    });
  });

  test("should sign the transaction", async ({ testnet }) => {
    testnet.setSigner(convertAptosAccountToSigner(account));

    const signedTransaction = await testnet.signTransaction({ transaction });

    expect(signedTransaction).toBeDefined();
  });

  test("should throw error if signer is not available", async ({ testnet }) => {
    testnet.setSigner(undefined);

    await expect(
      testnet.signTransaction({ transaction })
    ).rejects.toThrowError();
  });
});
