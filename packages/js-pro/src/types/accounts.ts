// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, PublicKey } from "@aptos-labs/ts-sdk";

export interface AccountInfo {
  address: AccountAddress;
  publicKey: PublicKey;
}
