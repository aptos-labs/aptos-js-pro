// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { PropsWithChildren } from "react";
import { useWalletAdapterCore } from "@aptos-labs/react/connectors";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosJSCoreProvider } from "@aptos-labs/react";

export default function AptosCoreProvider({ children }: PropsWithChildren) {
  const wallet = useWallet();

  const core = useWalletAdapterCore({ wallet });

  return <AptosJSCoreProvider core={core}>{children}</AptosJSCoreProvider>;
}
