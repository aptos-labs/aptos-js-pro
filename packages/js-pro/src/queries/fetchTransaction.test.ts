// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";

const ARCHIVE_MAINNET_FULLNODE = "https://archive.mainnet.aptoslabs.com/v1";

describe("fetchTransaction", () => {
  test("should fetch transaction by ledger version", async ({ mainnet }) => {
    mainnet.setConfig({
      ...mainnet.state.config,
      aptos: { config: { fullnode: ARCHIVE_MAINNET_FULLNODE } },
    });
    const result = await mainnet.fetchTransaction({
      ledgerVersion: 2617328349,
    });

    expect(result).toBeDefined();
  });

  test("should fetch transaction by hash", async ({ mainnet }) => {
    mainnet.setConfig({
      ...mainnet.state.config,
      aptos: { config: { fullnode: ARCHIVE_MAINNET_FULLNODE } },
    });
    const result = await mainnet.fetchTransaction({
      transactionHash:
        "0xf0f67d76af475864eec20f4243f8284f6d1cd1236c6704788f6a24464264d00c",
    });

    expect(result).toBeDefined();
  });
});
