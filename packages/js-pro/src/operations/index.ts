// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/sdk.js";

export function createIndexerClient(
  endpoint: string,
  options?: ConstructorParameters<typeof GraphQLClient>[1]
) {
  const graphqlClient = new GraphQLClient(endpoint, options);
  return getSdk(graphqlClient);
}

export * from "./generated/operations.js";
export * from "./generated/types.js";

export type { Sdk } from "./generated/sdk.js";
