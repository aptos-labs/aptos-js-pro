// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Aptos, UserTransactionResponse } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type SimulateSimpleTransactionParameters = WithNetwork<
  Parameters<Aptos["transaction"]["simulate"]["simple"]>[0]
>;

export type SimulateMultiAgentTransactionParameters = WithNetwork<
  Parameters<Aptos["transaction"]["simulate"]["multiAgent"]>[0]
>;

export type SimulateTransactionParameters =
  | SimulateSimpleTransactionParameters
  | SimulateMultiAgentTransactionParameters;

export type SimulateTransactionResult = UserTransactionResponse;

export async function simulateTransaction(
  this: AptosJSProClient,
  params: SimulateSimpleTransactionParameters,
): Promise<SimulateTransactionResult>;

export async function simulateTransaction(
  this: AptosJSProClient,
  params: SimulateMultiAgentTransactionParameters,
): Promise<SimulateTransactionResult>;

export async function simulateTransaction(
  this: AptosJSProClient,
  params: SimulateTransactionParameters,
): Promise<SimulateTransactionResult> {
  const { aptos } = this.getClients({ network: params.network });

  if ("secondarySignersPublicKeys" in params) {
    return (await aptos.transaction.simulate.multiAgent(params))[0];
  }

  return (await aptos.transaction.simulate.simple(params))[0];
}
