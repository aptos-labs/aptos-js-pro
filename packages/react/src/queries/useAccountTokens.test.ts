// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useAccountTokens } from "./useAccountTokens";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useAccountTokens", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useAccountTokens({ address: "0x1" })
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.pages.at(0)?.tokens.length).toBeGreaterThan(0);
});
