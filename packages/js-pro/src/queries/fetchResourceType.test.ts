// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AccountAddress } from "@aptos-labs/ts-sdk";

test("fetchResourceType", async ({ devnet }) => {
  const resource = await devnet.fetchResourceType({
    accountAddress: AccountAddress.from("0x1"),
    resourceType: "0x1::account::Account",
  });

  expect(resource).toBeDefined();
});
