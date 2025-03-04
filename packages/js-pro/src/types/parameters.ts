// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo } from "./networks.js";

export type WithNetwork<T> = T & {
  network?: NetworkInfo;
};
