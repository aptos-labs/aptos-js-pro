// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

export interface ResourceMap {
  ["0x1::fungible_asset::FungibleStore"]: { metadata: { inner: string } };
  ["0x1::object::ObjectCore"]: { owner: string };
}

export type ResourceType = keyof ResourceMap;
