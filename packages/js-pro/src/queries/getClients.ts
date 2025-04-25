// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { Aptos } from "@aptos-labs/ts-sdk";
import { Sdk } from "../operations/index.js";
import { AptosJSProClient } from "../client.js";
import { AccountInfo, NetworkInfo, SignerClient } from "../types/index.js";
import { WithNetwork } from "../types/parameters.js";

export type GetClientsParameters = WithNetwork<object>;

export type GetClientsResult = {
  account?: AccountInfo;
  aptos: Aptos;
  indexer?: Sdk;
  network: NetworkInfo;
  signer?: SignerClient;
};

export function getClients(
  this: AptosJSProClient,
  { network: selectedNetwork }: GetClientsParameters = {}
): GetClientsResult {
  let aptos: Aptos = this.aptos;
  let indexer: Sdk | undefined = this.indexer;

  if (selectedNetwork) {
    aptos = this.createAptos(undefined, selectedNetwork);
    indexer = this.createIndexer(undefined, selectedNetwork);
  }

  return {
    account: this.account,
    aptos,
    indexer,
    network: selectedNetwork ?? this.network,
    signer: this.signer,
  };
}
