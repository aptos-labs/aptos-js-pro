// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";
import { useEstimatedGasPrice } from "./useEstimatedGasPrice";

test("useEstimatedGasPrice", async ({ devnet }) => {
  const { result } = renderHook(devnet, () => useEstimatedGasPrice());

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toBeDefined();
});
