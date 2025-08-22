// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosJSProClient } from "@aptos-labs/js-pro";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import AptosJSCoreProvider from "../src/AptosJSCoreProvider";
import {
  type RenderHookOptions,
  type RenderHookResult,
  renderHook as baseRenderHook,
  waitFor as baseWaitFor,
  waitForOptions,
} from "@testing-library/react";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, gcTime: Infinity } },
});

export const createWrapper = (core: AptosJSProClient) => {
  // eslint-disable-next-line react/display-name
  return ({ children }: PropsWithChildren) => (
    <AptosJSCoreProvider core={core}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AptosJSCoreProvider>
  );
};

export const renderHook = <Result, Props>(
  core: AptosJSProClient,
  render: (props: Props) => Result,
  options?: RenderHookOptions<Props> | undefined,
): RenderHookResult<Result, Props> => {
  return baseRenderHook(render, { wrapper: createWrapper(core), ...options });
};

export function waitFor<T>(
  callback: () => Promise<T> | T,
  options?: waitForOptions | undefined,
): Promise<T> {
  return baseWaitFor(callback, { timeout: 10_000, ...options });
}
