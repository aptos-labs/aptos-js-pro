// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AnyNumber, HexInput, TransactionResponse } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type FetchTransactionParameters = WithNetwork<
  | {
      transactionHash: HexInput;
    }
  | {
      ledgerVersion: AnyNumber;
    }
>;

export type FetchTransactionResult = TransactionResponse;

export async function fetchTransaction(
  this: AptosJSProClient,
  { network, ...params }: FetchTransactionParameters,
): Promise<FetchTransactionResult> {
  const { aptos } = this.getClients({ network });

  if ("ledgerVersion" in params) {
    return aptos.getTransactionByVersion({
      ledgerVersion: params.ledgerVersion,
    });
  }

  return aptos.getTransactionByHash({
    transactionHash: params.transactionHash,
  });
}
