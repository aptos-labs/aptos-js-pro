// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Aptos, GetEventsResponse } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchEventsParameters = WithNetwork<
  Parameters<Aptos["getEvents"]>[0]
>;

export type FetchEventsResult = GetEventsResponse;

export async function fetchEvents(
  this: AptosJSProClient,
  { network, ...params }: FetchEventsParameters = {}
): Promise<FetchEventsResult> {
  const { aptos } = this.getClients({ network });

  const result = await aptos.getEvents(params);

  return result;
}
