// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useNameFromAddress } from "./useNameFromAddress";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

test("useNameForAddress", async ({ testnet }) => {
  const { result } = renderHook(testnet, () =>
    useNameFromAddress({
      address:
        "0xfb385da49059a1a0617f085eddeeb67ef2b0f4d0ca0b3e324f36af35650351fa",
    })
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.toString()).toMatchInlineSnapshot(`"rasa.apt"`);
});
