// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useNameFromAddress } from "./useNameFromAddress";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useNameForAddress", async ({ mainnet }) => {
  const { result } = renderHook(mainnet, () =>
    useNameFromAddress({
      address:
        "0xf06bc1c13514ae9fee4f57c3cdafadbbdf30d720827c1458beb7a123a0b7b49b",
    }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.toString()).toMatchInlineSnapshot(`"altair.apt"`);
});
