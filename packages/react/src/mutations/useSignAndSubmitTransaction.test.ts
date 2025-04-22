// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  Account,
  AnyRawTransaction,
  InputGenerateTransactionPayloadData,
} from "@aptos-labs/ts-sdk";
import { beforeAll, describe, expect } from "vitest";
import { setupClient, test } from "../../tests/fixtures";
import { convertAptosAccountToSigner } from "@aptos-labs/js-pro";
import { useSignAndSubmitTransaction } from "./useSignAndSubmitTransaction";
import { renderHook, waitFor } from "../../tests/utils";

describe("useSignAndSubmitTransaction", async () => {
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

      const { result } = renderHook(devnet, () =>
        useSignAndSubmitTransaction()
      );

      result.current.signAndSubmitTransaction({
        transaction,
      });

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

      expect(result.current.data).toBeDefined();
    }
  );
});
