// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { expect } from "vitest";
import { test } from "../../tests/fixtures";

test("fetchEvents", async ({ devnet }) => {
  const events = await devnet.fetchEvents();

  expect(events.length).toBeGreaterThan(0);
});
