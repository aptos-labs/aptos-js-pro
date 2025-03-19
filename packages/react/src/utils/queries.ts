// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { QueryKey } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function hashFunctionQueryKey(queryKey: Function): string {
  return queryKey.toString();
}

export function queryKeyHashFnCompat(queryKey: QueryKey): string {
  return JSON.stringify(queryKey, (_, value) => {
    if (typeof value === "bigint") {
      return { __type: "bigint", value: value.toString() };
    }
    return value;
  });
}
