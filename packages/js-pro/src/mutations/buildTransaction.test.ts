// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";

describe("buildTransaction", async () => {
  test("should build a simple transaction", async ({ devnet }) => {
    const transaction = await devnet.buildTransaction({
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: ["0x1", 100],
      },
    });

    expect(transaction).toBeDefined();
  });

  test("should build a multi-agent transaction", async ({ devnet }) => {
    const transaction = await devnet.buildTransaction({
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: ["0x1", 100],
      },
      secondarySignerAddresses: ["0x2"],
    });

    expect(transaction).toBeDefined();
  });

  test("should throw an error if no sender is provided", async ({ devnet }) => {
    devnet.setAccount(undefined);

    await expect(
      devnet.buildTransaction({
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: ["0x1", 100],
        },
      }),
    ).rejects.toThrowError();
  });
});
