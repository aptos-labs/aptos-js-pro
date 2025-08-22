// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useAptBalance } from "./useAptBalance";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useAptBalance", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useAptBalance({ address: "0x1" }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toBeGreaterThan(0);
});
