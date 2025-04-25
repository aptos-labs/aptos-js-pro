// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, Aptos } from "@aptos-labs/ts-sdk";
import { MoveResource } from "@aptos-labs/ts-sdk";
import { AptosJSProClient } from "../client.js";
import { WithNetwork } from "../types/parameters.js";
import { ResourceMap, ResourceType } from "../types/resources.js";

// Helper type to extract the resource data type based on input
export type ExtractResourceData<T> = T extends ResourceType
  ? ResourceMap[T]
  : T extends string
    ? object
    : T;

// Helper type to determine the resource type string
export type GetResourceTypeString<T> = T extends ResourceType
  ? T
  : T extends string
    ? T
    : string;

export type FetchResourceTypeParameters<T extends string> = WithNetwork<
  Omit<
    Parameters<Aptos["account"]["getAccountResource"]>[0],
    "resourceType"
  > & {
    /**
     * The resource type to fetch. If the resource is a common type, the result may automatically be typed.
     *
     * For example, if you pass in `0x1::account::Account`, the result will be typed as:
     *
     * ```ts
     * {
     *   type: "0x1::account::Account",
     *   data: {
     *     authentication_key: string;
     *     coin_register_events: ResourceEventHandle;
     *     guid_creation_num: string;
     *     withdraw_events: ResourceEventHandle;
     *     sequence_number: string;
     *     // ...more fields
     *   };
     * }
     * ```
     */
    resourceType: T extends object ? string : T;
  }
>;

export type FetchResourceTypeResult<
  T extends object,
  RT extends string = string,
> = MoveResource<T> & {
  type: RT;
};

export async function fetchResourceType<T extends string | object>(
  this: AptosJSProClient,
  {
    network,
    accountAddress,
    ...params
  }: FetchResourceTypeParameters<T extends object ? string : T & string>
): Promise<
  FetchResourceTypeResult<ExtractResourceData<T>, GetResourceTypeString<T>>
> {
  const { aptos } = this.getClients({ network });

  const result = await aptos.getAccountResource({
    ...params,
    accountAddress: AccountAddress.from(accountAddress).toString(),
    resourceType: params.resourceType as `${string}::${string}::${string}`,
  });

  return result as FetchResourceTypeResult<
    ExtractResourceData<T>,
    GetResourceTypeString<T>
  >;
}
