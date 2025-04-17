import { expect } from "vitest";
import { test } from "../../tests/fixtures";

test("fetchEstimatedGasPrice", async ({ devnet }) => {
  const gasPrice = await devnet.fetchEstimatedGasPrice();

  expect(gasPrice).toBeDefined();
});
