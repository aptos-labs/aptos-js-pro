// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useEvents } from "./useEvents";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useEvent", async ({ testnet }) => {
  const { result } = renderHook(testnet, () => useEvents());

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.length).toBeGreaterThan(0);
});
