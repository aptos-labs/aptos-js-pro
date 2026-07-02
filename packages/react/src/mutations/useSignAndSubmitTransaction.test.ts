// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  Account,
  AnyRawTransaction,
  InputGenerateTransactionPayloadData,
} from "@aptos-labs/ts-sdk";
import { beforeAll, describe, expect } from "vitest";
import { setupClient, test, fundTestAccount, DEVNET_TEST_FUND_AMOUNT, DEVNET_TEST_TX_OPTIONS } from "../../tests/fixtures";
import { convertAptosAccountToSigner } from "@aptos-labs/js-pro";
import { useSignAndSubmitTransaction } from "./useSignAndSubmitTransaction";
import { renderHook, waitFor } from "../../tests/utils";

describe("useSignAndSubmitTransaction", async () => {
  const account = Account.generate();

  let transaction: AnyRawTransaction;
  let data: InputGenerateTransactionPayloadData;

  beforeAll(async () => {
    const devnet = setupClient();

    await fundTestAccount(devnet.aptos, account.accountAddress, DEVNET_TEST_FUND_AMOUNT);

    data = {
      function: "0x1::aptos_account::transfer",
      functionArguments: [account.accountAddress, 100],
    };

    transaction = await devnet.buildTransaction({
      data,
      sender: account.accountAddress,
      options: DEVNET_TEST_TX_OPTIONS,
    });
  });

  test.sequential(
    "should sign and submit the transaction with transaction",
    async ({ devnet }) => {
      devnet.setSigner(convertAptosAccountToSigner(account));

      const { result } = renderHook(devnet, () =>
        useSignAndSubmitTransaction(),
      );

      result.current.signAndSubmitTransaction({
        transaction,
      });

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

      expect(result.current.data).toBeDefined();
    },
  );
});
