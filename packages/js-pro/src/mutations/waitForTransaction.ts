// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import {
  CommittedTransactionResponse,
  Aptos,
  HexInput,
} from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";

export type WaitForTransactionParameters = WithNetwork<
  Omit<
    Parameters<Aptos["transaction"]["waitForTransaction"]>[0],
    "transactionHash"
  > & {
    hash: HexInput;
  }
>;

export type WaitForTransactionResult = CommittedTransactionResponse;

export async function waitForTransaction(
  this: AptosJSProClient,
  { network, ...params }: WaitForTransactionParameters
): Promise<WaitForTransactionResult> {
  const { aptos } = this.getClients({ network });

  const result = await aptos.waitForTransaction({
    ...params,
    transactionHash: params.hash,
  });

  return result;
}
