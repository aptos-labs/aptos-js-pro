import { expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AccountAddress } from "@aptos-labs/ts-sdk";

test("fetchAptBalance", async ({ testnet }) => {
  const balance = await testnet.fetchAptBalance({
    address: AccountAddress.from("0x1"),
  });

  expect(balance).toBeGreaterThan(0n);
});
