// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function hashFunctionQueryKey(queryKey: Function): string {
  return queryKey.toString();
}
