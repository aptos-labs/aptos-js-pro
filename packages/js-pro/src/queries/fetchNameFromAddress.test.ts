// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AccountAddress } from "@aptos-labs/ts-sdk";

const address =
  "0xf06bc1c13514ae9fee4f57c3cdafadbbdf30d720827c1458beb7a123a0b7b49b";

describe("fetchAddressFromName", () => {
  test("should fetch the address from the name", async ({ mainnet }) => {
    const name = await mainnet.fetchNameFromAddress({
      address: AccountAddress.from(address),
    });

    expect(name?.toString()).toMatchInlineSnapshot(`"altair.apt"`);
  });

  test("should return null if the name is not found", async ({ mainnet }) => {
    const name = await mainnet.fetchNameFromAddress({
      address: AccountAddress.from("0x1"),
    });

    expect(name).toBeNull();
  });
});
