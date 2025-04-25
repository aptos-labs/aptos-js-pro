// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useAptosCore } from "../AptosJSCoreProvider.js";
import { AccountInfo } from "@aptos-labs/js-pro";
/**
 * Returns the current account from the `AptosJSProClient`. This typically is the account that is connected to the application.
 * If no account is connected, it will return `undefined`.
 *
 * @returns The current account from the `AptosJSProClient`.
 */
export function useAccount(): AccountInfo | undefined {
  const core = useAptosCore();
  return core.account;
}
