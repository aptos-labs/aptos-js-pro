import { describe, expect, it } from "vitest";
import { test } from "../../tests/fixtures";
import { AptosName } from "../utils";
import { AccountAddress } from "@aptos-labs/ts-sdk";

const address =
  "0x7d6d3185db27c43ceb54c61779aa3e5b8ec9e236e3d00c527d4a049c86637a7e";

describe("fetchAddressFromName", () => {
  test("should fetch the address from the name", async ({ testnet }) => {
    const name = await testnet.fetchNameFromAddress({
      address: AccountAddress.from(address),
    });

    expect(name?.toString()).toMatchInlineSnapshot(`"genericlongname.apt"`);
  });

  test("should return null if the name is not found", async ({ testnet }) => {
    const name = await testnet.fetchNameFromAddress({
      address: AccountAddress.from("0x1"),
    });

    expect(name).toBeNull();
  });
});
