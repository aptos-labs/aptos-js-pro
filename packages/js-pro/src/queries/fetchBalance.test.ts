import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AccountAddress } from "@aptos-labs/ts-sdk";

describe("fetchBalance", () => {
  test("should fetch the 0x1::aptos_coin::AptosCoin balance of an account", async ({
    testnet,
  }) => {
    const balance = await testnet.fetchBalance({
      address: AccountAddress.from("0x1"),
      asset: "0x1::aptos_coin::AptosCoin",
    });

    expect(balance).toBeGreaterThan(0n);
  });

  test("should fetch the 0xa balance of an account", async ({ testnet }) => {
    const balance = await testnet.fetchBalance({
      address: AccountAddress.from("0x1"),
      asset: AccountAddress.from("0xa").toStringLong(),
    });

    expect(balance).toBeGreaterThan(0n);
  });
});
