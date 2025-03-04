// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
import AptosCoreProvider from "./AptosCoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { Network } from "@aptos-labs/ts-sdk";

export default function AppProviders({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <AptosWalletAdapterProvider
      autoConnect
      dappConfig={{ network: Network.DEVNET }}
    >
      <QueryClientProvider client={queryClient}>
        <AptosCoreProvider>
          {children}
          <Toaster richColors />
        </AptosCoreProvider>
      </QueryClientProvider>
    </AptosWalletAdapterProvider>
  );
}
