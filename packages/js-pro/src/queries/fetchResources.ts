// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Aptos, MoveResource } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";
import { asyncTryOrDefault } from "../utils/lib.js";

export type FetchResourcesParameters = WithNetwork<
  Parameters<Aptos["account"]["getAccountResources"]>[0]
>;

export type FetchResourcesResult = MoveResource[];

export async function fetchResources(
  this: AptosJSProClient,
  { network, ...params }: FetchResourcesParameters
): Promise<FetchResourcesResult> {
  const { aptos } = this.getClients({ network });

  const result = await asyncTryOrDefault(
    () => aptos.getAccountResources(params),
    []
  );

  return result;
}
