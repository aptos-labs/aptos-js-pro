// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useResources } from "./useResources";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useResources", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useResources({ accountAddress: "0x1" }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.length).toBeGreaterThan(0);
});
