// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";
import { AptosName } from "../utils/names.js";
import { asyncTryOrDefault } from "../utils/lib.js";

export type FetchAddressFromNameParameters = WithNetwork<{
  name: string | AptosName;
}>;

export type FetchAddressFromNameResult = AccountAddress | undefined;

export async function fetchAddressFromName(
  this: AptosJSProClient,
  { network, name }: FetchAddressFromNameParameters
): Promise<FetchAddressFromNameResult> {
  const { aptos } = this.getClients({ network });

  const address = await asyncTryOrDefault(
    () => aptos.getTargetAddress({ name: name.toString() }),
    undefined
  );

  return address ? AccountAddress.from(address) : undefined;
}
