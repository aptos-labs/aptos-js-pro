import { expect } from "vitest";
import { test } from "../../tests/fixtures";
import { ProcessorType } from "@aptos-labs/ts-sdk";

test("fetchProcessorStatus", async ({ devnet }) => {
  const processorStatus = await devnet.fetchProcessorStatus({
    processor: ProcessorType.ACCOUNT_TRANSACTION_PROCESSOR,
  });

  expect(processorStatus).toBeDefined();
});
