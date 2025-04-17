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
  ["0x1::multisig_account::MultisigAccount"]: {
    owners: string[];
    num_signatures_required: string;
    next_sequence_number: string;
  };
  ["0x1::account::Account"]: {
    authentication_key: string;
    coin_register_events: ResourceEventHandle;
    guid_creation_num: string;
    withdraw_events: ResourceEventHandle;
    sequence_number: string;
    signer_capability_offer: { for: { vec: [] } };
    rotation_capability_offer: { for: { vec: [] } };
  };
}

export type ResourceType = keyof ResourceMap;
