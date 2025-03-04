// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { RoleType } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchLedgerInfoParameters = WithNetwork<object>;

export type FetchLedgerInfoResult = {
  chainId: number;
  epoch: string;
  ledgerVersion: string;
  oldestLedgerVersion: string;
  ledgerTimestamp: string;
  nodeRole: RoleType;
  oldestBlockHeight: string;
  blockHeight: string;
  gitHash?: string;
};

export async function fetchLedgerInfo(
  this: AptosJSProClient,
  { network }: FetchLedgerInfoParameters
): Promise<FetchLedgerInfoResult> {
  const { aptos } = this.getClients({ network });

  const result = await aptos.getLedgerInfo();

  return {
    chainId: result.chain_id,
    epoch: result.epoch,
    ledgerVersion: result.ledger_version,
    oldestLedgerVersion: result.oldest_ledger_version,
    ledgerTimestamp: result.ledger_timestamp,
    nodeRole: result.node_role,
    oldestBlockHeight: result.oldest_block_height,
    blockHeight: result.block_height,
    gitHash: result.git_hash,
  };
}
