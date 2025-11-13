// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AccountAddress } from "@aptos-labs/ts-sdk";

const address =
  "0xfb385da49059a1a0617f085eddeeb67ef2b0f4d0ca0b3e324f36af35650351fa";

describe("fetchAddressFromName", () => {
  test("should fetch the address from the name", async ({ testnet }) => {
    const name = await testnet.fetchNameFromAddress({
      address: AccountAddress.from(address),
    });

    expect(name?.toString()).toMatchInlineSnapshot(`"rasa.apt"`);
  });

  test("should return null if the name is not found", async ({ testnet }) => {
    const name = await testnet.fetchNameFromAddress({
      address: AccountAddress.from("0x1"),
    });

    expect(name).toBeNull();
  });
});
