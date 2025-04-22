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
        "0x7d6d3185db27c43ceb54c61779aa3e5b8ec9e236e3d00c527d4a049c86637a7e",
    })
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.toString()).toMatchInlineSnapshot(`"genericlongname.apt"`);
});
