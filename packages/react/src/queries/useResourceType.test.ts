// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useResourceType } from "./useResourceType";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useResourceType", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useResourceType({
      accountAddress: "0x1",
      resourceType: "0x1::account::Account",
    }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toBeDefined();
});
