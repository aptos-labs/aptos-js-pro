// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { WithNetwork } from "../../../js-pro/dist/types/parameters.js";
import { useAptosCore } from "../AptosJSCoreProvider.js";

export type UseClientsParameters = WithNetwork<object>;

export function useClients({ network }: UseClientsParameters = {}) {
  const core = useAptosCore();

  const clients = core.client.getClients({ network });

  return { ...clients, client: core.client };
}
