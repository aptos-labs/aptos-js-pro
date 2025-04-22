// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AptosName } from "../utils";

const name = new AptosName("genericlongname.apt");

describe("fetchAddressFromName", () => {
  test("should fetch the address from the name", async ({ testnet }) => {
    const address = await testnet.fetchAddressFromName({ name });

    expect(address?.toString()).toMatchInlineSnapshot(
      `"0x7d6d3185db27c43ceb54c61779aa3e5b8ec9e236e3d00c527d4a049c86637a7e"`
    );
  });

  test("should return null if the name is not found", async ({ testnet }) => {
    const address = await testnet.fetchAddressFromName({
      name: new AptosName("dkwajldbwajkdwjadnwajdwajnda.apt"),
    });

    expect(address).toBeNull();
  });
});
