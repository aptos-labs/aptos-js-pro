// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo } from "./networks.js";

export type WithNetwork<T> = T & {
  /**
   * The network to use for the request. If not set, the network of the `AptosJSProClient` instance will be used.
   */
  network?: NetworkInfo;
};
