// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from "@tanstack/react-query";
import { useAptosCore } from "../AptosJSCoreProvider.js";
import { UseQueryOptions } from "../types/queries.js";
import {
  FetchFungibleAssetMetadataParameters,
  FetchFungibleAssetMetadataResult,
} from "@aptos-labs/js-pro";
import { MissingRequiredArgumentError } from "../errors/common.js";

export const getUseFungibleAssetMetadataQueryKey = (params: {
  network: string;
  asset?: string;
}) => ["fungible-asset-metadata", params.network, params.asset];

export type UseFungibleAssetMetadataQueryParameters =
  Partial<FetchFungibleAssetMetadataParameters> &
    UseQueryOptions<FetchFungibleAssetMetadataResult>;

export function useFungibleAssetMetadata({
  network,
  asset,
  ...queryOptions
}: UseFungibleAssetMetadataQueryParameters = {}) {
  const core = useAptosCore();

  const activeNetwork = network ?? core.network;

  const enabled = Boolean(asset && (queryOptions.enabled ?? true));

  return useQuery({
    queryKey: getUseFungibleAssetMetadataQueryKey({
      network: activeNetwork.network,
      asset,
    }),
    queryFn: () => {
      if (!asset) throw new MissingRequiredArgumentError("asset");
      return core.client.fetchFungibleAssetMetadata({
        network: network,
        asset,
      });
    },
    ...queryOptions,
    enabled,
  });
}
