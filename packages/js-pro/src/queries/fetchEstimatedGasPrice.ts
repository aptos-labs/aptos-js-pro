// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchEstimatedGasPriceParameters = WithNetwork<object>;

export type FetchEstimatedGasPriceResult = {
  deprioritizedGasEstimate?: number;
  gasEstimate: number;
  prioritizedGasEstimate?: number;
};

export async function fetchEstimatedGasPrice(
  this: AptosJSProClient,
  { network }: FetchEstimatedGasPriceParameters
): Promise<FetchEstimatedGasPriceResult> {
  const { aptos } = this.getClients({ network });

  const result = await aptos.getGasPriceEstimation();

  return {
    deprioritizedGasEstimate: result.deprioritized_gas_estimate,
    gasEstimate: result.gas_estimate,
    prioritizedGasEstimate: result.prioritized_gas_estimate,
  };
}
