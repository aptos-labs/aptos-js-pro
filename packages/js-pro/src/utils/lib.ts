// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

/**
 * Tries to execute a function and returns the result. If the function throws
 * an error, returns a default value.
 */
export const asyncTryOrDefault = async <T, U>(
  fn: () => T,
  defaultValue: U
): Promise<T | U> => {
  try {
    const res = await fn();
    return res;
  } catch {
    return defaultValue;
  }
};

export function shareRequests<TParam extends string | number, TResult>(
  query: (param: TParam) => Promise<TResult>
) {
  const pendingRequests: { [key: string]: Promise<TResult> } = {};
  return async (param: TParam) => {
    if (param in pendingRequests) {
      return pendingRequests[param] as Promise<TResult>;
    }
    const pendingRequest = query(param);
    pendingRequests[param] = pendingRequest;
    const result = await pendingRequest;
    delete pendingRequests[param];
    return result;
  };
}
