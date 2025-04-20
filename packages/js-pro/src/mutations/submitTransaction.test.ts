import { beforeAll, describe, expect } from "vitest";
import { setupClient, test } from "../../tests/fixtures";
import {
  Account,
  Deserializer,
  generateSignedTransaction,
  SignedTransaction,
} from "@aptos-labs/ts-sdk";
import {
  convertAptosAccountToAccountInfo,
  convertAptosAccountToSigner,
} from "../utils";

describe("submitTransaction", async () => {
  const account = Account.generate();

  beforeAll(async () => {
    const devnet = setupClient();

    await devnet.aptos.fundAccount({
      accountAddress: account.accountAddress,
      amount: 1000000000,
    });
  });

  test.sequential(
    "should submit the transaction with SignedTransaction",
    async ({ devnet }) => {
      devnet.setAccount(convertAptosAccountToAccountInfo(account));
      devnet.setSigner(convertAptosAccountToSigner(account));

      const transaction = await devnet.buildTransaction({
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [account.accountAddress, 100],
        },
        sender: account.accountAddress,
      });

      const signedTransaction = await devnet.signTransaction({ transaction });

      const pendingTransaction = await devnet.submitTransaction({
        transaction: SignedTransaction.deserialize(
          new Deserializer(
            generateSignedTransaction({
              senderAuthenticator: signedTransaction.authenticator,
              transaction,
            })
          )
        ),
      });

      await devnet.waitForTransaction(pendingTransaction);

      expect(pendingTransaction).toBeDefined();
    }
  );

  test.sequential(
    "should submit the transaction with senderAuthenticator",
    async ({ devnet }) => {
      devnet.setAccount(convertAptosAccountToAccountInfo(account));
      devnet.setSigner(convertAptosAccountToSigner(account));

      const transaction = await devnet.buildTransaction({
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [account.accountAddress, 100],
        },
        sender: account.accountAddress,
      });

      const signedTransaction = await devnet.signTransaction({ transaction });

      const pendingTransaction = await devnet.submitTransaction({
        senderAuthenticator: signedTransaction.authenticator,
        transaction,
      });

      await devnet.waitForTransaction(pendingTransaction);

      expect(pendingTransaction).toBeDefined();
    }
  );
});
