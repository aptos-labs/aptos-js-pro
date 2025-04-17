import { expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AccountAddress } from "@aptos-labs/ts-sdk";

test("fetchResources", async ({ devnet, account }) => {
  const resources = await devnet.fetchResources({
    accountAddress: AccountAddress.from("0x1"),
  });

  expect(resources.length).toBeGreaterThan(0);
});
