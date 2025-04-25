// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useAptosCore } from "../AptosJSCoreProvider.js";

export function useNetwork() {
  const core = useAptosCore();
  return core.network;
}

