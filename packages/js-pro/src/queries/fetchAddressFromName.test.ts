// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AptosName } from "../utils";

const name = new AptosName("rasa.apt");

describe("fetchAddressFromName", () => {
  test("should fetch the address from the name", async ({ testnet }) => {
    const address = await testnet.fetchAddressFromName({ name });

    expect(address?.toString()).toMatchInlineSnapshot(
      `"0xfb385da49059a1a0617f085eddeeb67ef2b0f4d0ca0b3e324f36af35650351fa"`
    );
  });

  test("should return null if the name is not found", async ({ testnet }) => {
    const address = await testnet.fetchAddressFromName({
      name: new AptosName("dkwajldbwajkdwjadnwajdwajnda.apt"),
    });

    expect(address).toBeNull();
  });
});
