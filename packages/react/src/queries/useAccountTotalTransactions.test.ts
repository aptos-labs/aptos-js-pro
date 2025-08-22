// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { expect } from "vitest";
import { renderHook, waitFor } from "../../tests/utils";
import { useAccountTotalTransactions } from "./useAccountTotalTransactions";
import { test } from "../../tests/fixtures";

test("useAccountTotalTransactions", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useAccountTotalTransactions({
      address:
        "0x405054a82fd220ad5dad611c8b604528a68abbc0cbf563421a3ed5e87541bd1c",
    })
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toBeGreaterThan(0);
});
