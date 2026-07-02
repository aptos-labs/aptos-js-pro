// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Account } from "@aptos-labs/ts-sdk";
import { beforeAll, describe, expect } from "vitest";
import { setupClient, test, fundTestAccount, DEVNET_TEST_FUND_AMOUNT, DEVNET_TEST_TX_OPTIONS } from "../../tests/fixtures";
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

    await fundTestAccount(devnet.aptos, account.accountAddress, DEVNET_TEST_FUND_AMOUNT);
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
        options: DEVNET_TEST_TX_OPTIONS,
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
