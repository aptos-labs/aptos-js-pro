// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AptosName } from "../utils";

const name = new AptosName("altair.apt");

describe("fetchAddressFromName", () => {
  test("should fetch the address from the name", async ({ mainnet }) => {
    const address = await mainnet.fetchAddressFromName({ name });

    expect(address?.toString()).toMatchInlineSnapshot(
      `"0xf06bc1c13514ae9fee4f57c3cdafadbbdf30d720827c1458beb7a123a0b7b49b"`,
    );
  });

  test("should return null if the name is not found", async ({ mainnet }) => {
    const address = await mainnet.fetchAddressFromName({
      name: new AptosName("dkwajldbwajkdwjadnwajdwajnda.apt"),
    });

    expect(address).toBeNull();
  });
});
