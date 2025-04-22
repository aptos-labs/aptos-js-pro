// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useProcessorStatus } from "./useProcessorStatus";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";
import { ProcessorType } from "@aptos-labs/ts-sdk";

test("useProcessorStatus", async ({ devnet }) => {
  const { result } = renderHook(devnet, () =>
    useProcessorStatus({
      processor: ProcessorType.USER_TRANSACTION_PROCESSOR,
    })
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toBeDefined();
});
