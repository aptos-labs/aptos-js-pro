// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useAccountTransactions } from "./useAccountTransactions";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useAccountTransaction", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useAccountTransactions({ address: "0x1" }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.pages.at(0)?.transactions.length).toBeGreaterThan(
    0,
  );
});
