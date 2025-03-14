// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

export interface ResourceEventHandle {
  counter: string;
  guid: { id: { addr: string; creation_num: string } };
}

export interface ResourceMap {
  ["0x1::fungible_asset::FungibleStore"]: { metadata: { inner: string } };
  ["0x1::object::ObjectCore"]: { owner: string };
  [key: `0x1::coin::CoinStore<${string}>`]: {
    coin: { value: string };
    deposit_events: ResourceEventHandle;
    frozen: boolean;
    withdraw_events: ResourceEventHandle;
  };
}

export type ResourceType = keyof ResourceMap;
