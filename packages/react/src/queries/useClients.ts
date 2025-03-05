// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useAptosCore } from "../AptosJSCoreProvider.js";

export function useClients() {
  const core = useAptosCore();
  return {
    aptos: core.client.aptos,
    indexer: core.client.indexer,
    client: core.client,
    network: core.network,
    signer: core.signer,
  };
}
