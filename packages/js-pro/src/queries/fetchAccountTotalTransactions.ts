// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, AccountAddressInput } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";
import { IndexerNotInitializedError } from "../errors/index.js";

export type FetchAccountTotalTransactionsParameters = WithNetwork<{
  address: AccountAddressInput;
}>;

export type FetchAccountTotalTransactionsResult = number;

export async function fetchAccountTotalTransactions(
  this: AptosJSProClient,
  { address, network }: FetchAccountTotalTransactionsParameters
): Promise<FetchAccountTotalTransactionsResult> {
  const { indexer } = this.getClients({ network });
  if (!indexer) throw new IndexerNotInitializedError();

  const result = await indexer.getAccountTotalTransactions({
    address: AccountAddress.from(address).toStringLong(),
  });

  return result.move_resources_aggregate?.aggregate?.count ?? 0;
}
