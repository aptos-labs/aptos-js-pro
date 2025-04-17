import { expect } from "vitest";
import { test } from "../../tests/fixtures";
import { AccountAddress } from "@aptos-labs/ts-sdk";

test("fetchResources", async ({ devnet }) => {
  const result = await devnet.fetchViewModule({
    payload: {
      function: "0x1::account::exists_at",
      typeArguments: [],
      functionArguments: [AccountAddress.from("0x1").toString()],
    },
  });

  expect(result).toMatchInlineSnapshot(`
    [
      true,
    ]
  `);
});
