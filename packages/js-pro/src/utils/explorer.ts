// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Network } from "@aptos-labs/ts-sdk";

export const getExplorerUrl = ({
  basePath = "https://explorer.aptoslabs.com",
  network = Network.MAINNET,
}: {
  basePath?: string;
  network?: Network;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.set("network", network);
  return `${basePath}/?${queryParams.toString()}`;
};
