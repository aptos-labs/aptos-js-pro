// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Network } from "@aptos-labs/ts-sdk";

export type NetworkInfo =
  | {
      network: Network.CUSTOM;
      nodeUrl?: string;
      indexerUrl?: string;
      faucetUrl?: string;
      proverUrl?: string;
      pepperUrl?: string;
    }
  | {
      network:
        | Network.MAINNET
        | Network.DEVNET
        | Network.TESTNET
        | Network.LOCAL
        | Network.SHELBYNET
        | Network.NETNA;
    };
