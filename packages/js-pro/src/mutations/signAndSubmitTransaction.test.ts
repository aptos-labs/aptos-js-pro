// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { beforeAll, describe, expect } from "vitest";
import { setupClient, test } from "../../tests/fixtures";
import {
  AnyRawTransaction,
  Account,
  InputGenerateTransactionPayloadData,
} from "@aptos-labs/ts-sdk";
import {
  convertAptosAccountToAccountInfo,
  convertAptosAccountToSigner,
} from "../utils";
import { AdapterSignerClient } from "../types";

describe("signAndSubmitTransaction", async () => {
  const account = Account.generate();

  let transaction: AnyRawTransaction;
  let data: InputGenerateTransactionPayloadData;

  beforeAll(async () => {
    const devnet = setupClient();

    await devnet.aptos.fundAccount({
      accountAddress: account.accountAddress,
      amount: 1000000000,
    });

    data = {
      function: "0x1::aptos_account::transfer",
      functionArguments: [account.accountAddress, 100],
    };

    transaction = await devnet.buildTransaction({
      data,
      sender: account.accountAddress,
    });
  });

  test.sequential(
    "should sign and submit the transaction with transaction",
    async ({ devnet }) => {
      devnet.setSigner(convertAptosAccountToSigner(account));

      const signedTransaction = await devnet.signAndSubmitTransaction({
        transaction,
      });
      await devnet.waitForTransaction({ hash: signedTransaction.hash });

      expect(signedTransaction).toBeDefined();
    }
  );

  test.sequential(
    "should sign and submit the transaction with data for account signer",
    async ({ devnet }) => {
      devnet.setSigner(convertAptosAccountToSigner(account));
      devnet.setAccount(convertAptosAccountToAccountInfo(account));

      const signedTransaction = await devnet.signAndSubmitTransaction({ data });
      await devnet.waitForTransaction({ hash: signedTransaction.hash });

      expect(signedTransaction).toBeDefined();
    }
  );

  test.sequential(
    "should sign and submit the transaction with transaction and data for adapter signer",
    async ({ devnet }) => {
      devnet.setSigner({
        type: "adapter",
        async signAndSubmitTransaction({ aptos, payload }) {
          if (!payload) throw new Error();
          return aptos.signAndSubmitTransaction({
            signer: account,
            transaction: await aptos.transaction.build.simple({
              sender: account.accountAddress,
              data: payload.data,
            }),
          });
        },
      } as AdapterSignerClient);
      devnet.setAccount(convertAptosAccountToAccountInfo(account));

      const signedTransaction = await devnet.signAndSubmitTransaction({ data });
      await devnet.waitForTransaction({ hash: signedTransaction.hash });

      expect(signedTransaction).toBeDefined();
    }
  );

  test("should throw error if signer is not available", async ({ devnet }) => {
    devnet.setSigner(undefined);

    await expect(
      devnet.signAndSubmitTransaction({ transaction })
    ).rejects.toThrowError();
  });
});
