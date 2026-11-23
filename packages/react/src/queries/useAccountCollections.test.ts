// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useAccountCollections } from "./useAccountCollections";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";
import { Order_By } from "@aptos-labs/js-pro";

test("useAccountCollections", async ({ mainnet }) => {
  const { result } = renderHook(mainnet, () =>
    useAccountCollections({
      address: "0x1",
      orderBy: { collection_id: Order_By.Desc },
    }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data?.pages.at(0)?.collections.length).toBeGreaterThan(
    0,
  );
});
