// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useBalance } from "./useBalance";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useBalance", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useBalance({ address: "0x1", asset: "0xa" }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toBeGreaterThan(0);
});
