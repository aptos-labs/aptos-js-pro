// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Account } from "@aptos-labs/ts-sdk";
import { beforeAll, describe, expect } from "vitest";
import { setupClient, test } from "../../tests/fixtures";
import {
  convertAptosAccountToAccountInfo,
  convertAptosAccountToSigner,
} from "@aptos-labs/js-pro";
import { renderHook, waitFor } from "../../tests/utils";
import { useSubmitTransaction } from "./useSubmitTransaction";

describe("useSignAndSubmitTransaction", async () => {
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

      const { result } = renderHook(devnet, () => useSubmitTransaction());

      const transaction = await devnet.buildTransaction({
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [account.accountAddress, 100],
        },
        sender: account.accountAddress,
      });

      const signedTransaction = await devnet.signTransaction({ transaction });

      result.current.submitTransaction({
        senderAuthenticator: signedTransaction.authenticator,
        transaction,
      });

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

      expect(result.current.data).toBeDefined();
    },
  );
});
