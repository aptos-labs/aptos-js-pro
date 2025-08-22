// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { ProcessorType } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchProcessorStatusParameters = WithNetwork<{
  processor: ProcessorType;
}>;

export type FetchProcessorStatusResult = {
  lastSuccessVersion: number;
  lastUpdated: number;
};

export async function fetchProcessorStatus(
  this: AptosJSProClient,
  { network, processor }: FetchProcessorStatusParameters,
): Promise<FetchProcessorStatusResult> {
  const { aptos } = this.getClients({ network });

  const result = await aptos.getProcessorStatus(processor);

  return {
    lastSuccessVersion: result.last_success_version,
    lastUpdated: result.last_updated,
  };
}
