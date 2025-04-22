// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  AccountAddress,
  AccountAddressInput,
  WriteSetChange,
  WriteSetChangeWriteResource,
} from "@aptos-labs/ts-sdk";

export function isWriteResourceChange(
  change: WriteSetChange
): change is WriteSetChangeWriteResource {
  return change.type === "write_resource";
}

/**
 * More of a precaution, but we should normalize all parsed addresses to prevent
 * mismatches related to leading zeros
 * @param address
 */
export function normalizeAddress(address: AccountAddressInput) {
  return AccountAddress.from(address).toStringLong();
}

/**
 * The (creatorAddress, eventStreamCreationNum) pair uniquely identifies an event stream on chain
 * @param creatorAddress
 * @param creationNum
 */
export function serializeEventGuid(
  creatorAddress: AccountAddressInput,
  creationNum: string
) {
  return `${normalizeAddress(creatorAddress)}_${creationNum}`;
}
