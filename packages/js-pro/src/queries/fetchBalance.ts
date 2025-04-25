// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchBalanceParameters = WithNetwork<{
  /**
   * The address to fetch the asset balance for.
   */
  address: AccountAddressInput;
  /**
   * The asset to fetch the balance for. This can be a coin type or Fungible Asset metadata address.
   */
  asset: string;
}>;

export type FetchBalanceResult = bigint;

export async function fetchBalance(
  this: AptosJSProClient,
  { address, asset, network }: FetchBalanceParameters
): Promise<FetchBalanceResult> {
  const { aptos } = this.getClients({ network });

  const isCoinType = asset.includes("::");

  const amount = await aptos.account.getAccountCoinAmount({
    accountAddress: AccountAddress.from(address).toStringLong(),
    coinType: isCoinType
      ? (asset as `${string}::${string}::${string}`)
      : undefined,
    faMetadataAddress: isCoinType
      ? undefined
      : AccountAddress.from(asset).toStringLong(),
  });

  return BigInt(amount);
}
