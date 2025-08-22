// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useViewModule } from "./useViewModule";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";
import { AccountAddress } from "@aptos-labs/ts-sdk";

test("useViewModule", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useViewModule({
      payload: {
        function: "0x1::account::exists_at",
        typeArguments: [],
        functionArguments: [AccountAddress.from("0x1").toString()],
      },
    }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toMatchInlineSnapshot(`
    [
      true,
    ]
  `);
});
