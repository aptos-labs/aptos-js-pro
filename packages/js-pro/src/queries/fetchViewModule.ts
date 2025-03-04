// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Aptos, MoveValue } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchViewModuleParameters = WithNetwork<
  Parameters<Aptos["view"]>[0]
>;

export type FetchViewModuleResult<T extends Array<MoveValue>> = T;

export async function fetchViewModule<T extends Array<MoveValue>>(
  this: AptosJSProClient,
  params: FetchViewModuleParameters
): Promise<FetchViewModuleResult<T>> {
  const { aptos } = this.getClients({ network: params.network });

  const result = await aptos.view<T>(params);

  return result;
}
