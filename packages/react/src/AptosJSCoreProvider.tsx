// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosJSProClient, AptosJSProClientState } from "@aptos-labs/js-pro";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { useStore } from "zustand";
import { ClientContextMissingError } from "./errors/index.js";

interface AptosJSCoreProviderProps extends PropsWithChildren {
  core: AptosJSProClient;
}

const AptosCoreContext = createContext<AptosJSProClient | null>(null);

function AptosJSCoreProvider({ children, core }: AptosJSCoreProviderProps) {
  return (
    <AptosCoreContext.Provider value={core}>
      {children}
    </AptosCoreContext.Provider>
  );
}

/**
 * This function is used to access the AptosJSProClient instance. It is recommened to use
 * `useAptosCore` instead.
 *
 * @deprecated This hook is NOT reactive. It will not rerender when the client state changes.
 * @returns The AptosJSProClient instance.
 */
function useAptosClient() {
  const client = useContext(AptosCoreContext);

  if (client === null) throw new ClientContextMissingError();

  return client;
}

/**
 * Returns the AptosJSProClient instance and the client state. This hook is reactive and will
 * rerender when the client state changes.
 *
 * @example
 * ```tsx
 * const { account, client } = useAptosCore();
 *
 * client.setAccount({
 *  address: '0x123...',
 *  publicKey: '0x123...',
 * });
 *
 * return <div>{account?.address}</div>;
 * ```
 *
 * @returns The AptosJSProClient instance and the client state.
 */
export function useAptosCore(): AptosJSProClientState & {
  client: AptosJSProClient;
} {
  const client = useAptosClient();
  const state = useStore(client.store);
  return useMemo(() => ({ ...state, client }), [client, state]);
}

/**
 * Return the selected state from the AptosJSProClient client state. This hook is reactive and
 * will only rerender when the selected state changes.
 *
 * @example
 * ```tsx
 * const account = useAptosStateWithSelector((state) => state.account);
 * return <div>{account?.address}</div>;
 * ```
 *
 * @param selector The selector function to select the state.
 * @returns The selected state.
 */
export function useAptosStateWithSelector<U>(
  selector: (state: AptosJSProClientState) => U,
) {
  const client = useAptosClient();
  return useStore(client.store, selector);
}

export default AptosJSCoreProvider;
