// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  AccountAddressInput,
  Aptos,
  DEFAULT_TXN_EXP_SEC_FROM_NOW,
  InputGenerateTransactionOptions,
  MultiAgentTransaction,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { SenderNotFoundError } from "../errors/index.js";
import { WithNetwork } from "../types/parameters.js";

export type BuildSimpleTransactionParameters = WithNetwork<
  Omit<Parameters<Aptos["transaction"]["build"]["simple"]>[0], "sender"> & {
    sender?: AccountAddressInput;
  }
>;

export type BuildMultiAgentTransactionParameters = WithNetwork<
  Omit<Parameters<Aptos["transaction"]["build"]["multiAgent"]>[0], "sender"> & {
    sender?: AccountAddressInput;
  }
>;

export async function buildTransaction(
  this: AptosJSProClient,
  args: BuildMultiAgentTransactionParameters
): Promise<MultiAgentTransaction>;

export async function buildTransaction(
  this: AptosJSProClient,
  args: BuildSimpleTransactionParameters
): Promise<SimpleTransaction>;

export async function buildTransaction(
  this: AptosJSProClient,
  args: BuildSimpleTransactionParameters | BuildMultiAgentTransactionParameters
): Promise<SimpleTransaction | MultiAgentTransaction> {
  const {
    network,
    data,
    options: transactionOptions,
    sender,
    withFeePayer,
  } = args;

  const { account, aptos } = this.getClients({ network });

  const activeAddress = sender ?? account?.address;

  if (!activeAddress) throw new SenderNotFoundError();

  const options = {
    ...transactionOptions,
  } satisfies InputGenerateTransactionOptions;

  // If expiration timestamp is not provided, use the default expiration timestamp
  options.expireTimestamp ??=
    Math.floor(this.getServerTime() / 1000) + DEFAULT_TXN_EXP_SEC_FROM_NOW;

  if ("secondarySignerAddresses" in args) {
    return aptos.transaction.build.multiAgent({
      data,
      options,
      secondarySignerAddresses: args.secondarySignerAddresses,
      sender: activeAddress,
      withFeePayer,
    });
  }

  return aptos.transaction.build.simple({
    data,
    options,
    sender: activeAddress,
    withFeePayer,
  });
}
