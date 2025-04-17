import { expect } from "vitest";
import { test } from "../../tests/fixtures";

test("fetchEvents", async ({ devnet }) => {
  const events = await devnet.fetchEvents();

  expect(events.length).toBeGreaterThan(0);
});
