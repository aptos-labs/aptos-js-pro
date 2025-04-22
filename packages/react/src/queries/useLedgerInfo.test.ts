// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useLedgerInfo } from "./useLedgerInfo";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useLedgerInfo", async ({ devnet }) => {
  const { result } = renderHook(devnet, () => useLedgerInfo());

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toBeDefined();
});
