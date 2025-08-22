// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useUserTransactions } from "./useUserTransactions";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useUserTransactions", async ({ testnet }) => {
  const { result } = renderHook(testnet, () => useUserTransactions());

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.pages.at(0)?.transactions.length).toBeGreaterThan(
    0,
  );
});
