// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Account } from "@aptos-labs/ts-sdk";
import { beforeAll, describe, expect } from "vitest";
import { setupClient, test } from "../../tests/fixtures";
import { convertAptosAccountToAccountInfo } from "@aptos-labs/js-pro";
import { waitFor } from "../../tests/utils";
import { renderHook } from "../../tests/utils";
import { useSimulateTransaction } from "./useSimulateTransaction";

describe("useSimulateTransaction", async () => {
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

    const { result } = renderHook(devnet, () =>
      useSimulateTransaction({ transaction }),
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toBeDefined();
  });

  test("should simulate a payload transaction", async ({ devnet }) => {
    devnet.setAccount(convertAptosAccountToAccountInfo(account));

    const { result } = renderHook(devnet, () =>
      useSimulateTransaction({
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [account.accountAddress, 100],
        },
      }),
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toBeDefined();
  });

  test("should simulate a multi-agent payload transaction", async ({
    devnet,
  }) => {
    devnet.setAccount(convertAptosAccountToAccountInfo(account));

    const { result } = renderHook(devnet, () =>
      useSimulateTransaction({
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [account.accountAddress, 100],
        },
        sender: account.accountAddress,
        secondarySignersPublicKeys: [account2.publicKey],
      }),
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toBeDefined();
  });
});
