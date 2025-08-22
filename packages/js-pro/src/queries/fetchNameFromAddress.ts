// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddressInput } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";
import { AptosName } from "../utils/names.js";
import { asyncTryOrDefault } from "../utils/lib.js";

export type FetchNameFromAddressParameters = WithNetwork<{
  /**
   * The address to fetch the ANS name for.
   */
  address: AccountAddressInput;
}>;

export type FetchNameFromAddressResult = AptosName | null;

export async function fetchNameFromAddress(
  this: AptosJSProClient,
  { network, address }: FetchNameFromAddressParameters,
): Promise<FetchNameFromAddressResult> {
  const { aptos } = this.getClients({ network });

  const name = await asyncTryOrDefault(
    () => aptos.getPrimaryName({ address }),
    undefined,
  );

  return name ? new AptosName(name) : null;
}
