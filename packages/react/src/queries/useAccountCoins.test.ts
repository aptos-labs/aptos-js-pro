// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useAccountCoins } from "./useAccountCoins";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useAccountCoins", async ({ devnet }) => {
  const { result } = renderHook(devnet, () =>
    useAccountCoins({ address: "0x1" })
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.pages.at(0)?.balances.length).toBeGreaterThan(0);
});
