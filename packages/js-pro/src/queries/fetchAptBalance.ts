// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchAptBalanceParameters = WithNetwork<{
  address: AccountAddressInput;
}>;

export type FetchAptBalanceResult = bigint;

export async function fetchAptBalance(
  this: AptosJSProClient,
  { address, network }: FetchAptBalanceParameters
): Promise<FetchAptBalanceResult> {
  const { aptos } = this.getClients({ network });

  const amount = await aptos.account.getAccountCoinAmount({
    accountAddress: AccountAddress.from(address).toStringLong(),
    coinType: "0x1::aptos_coin::AptosCoin",
  });

  return BigInt(amount);
}
