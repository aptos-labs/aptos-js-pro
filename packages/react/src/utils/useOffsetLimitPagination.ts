// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  type DefaultError,
  InfiniteData,
  type QueryFunctionContext,
  QueryKey,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  PaginationCursors,
  UseOffsetLimitPageParam,
} from "../types/queries.js";

interface UseOffsetLimitPaginationArgs {
  limit?: number;
  offset?: number;
}

/**
 * A hook for paginating data using an offset and limit. Using this hook enforces
 * opionated pagination behavior. Best used with `createPaginatedQuery` function.
 * For more control over pagination, use `useInfiniteQuery` directly.
 *
 * This hook takes care of the following:
 * - Setting the `initialPageParam` to the `offset` value.
 * - Setting the `getNextPageParam` to the `nextCursor` value.
 * - Setting the `getPreviousPageParam` to the `prevCursor` value.
 *
 * Example:
 * ```ts
 * const request = useOffsetLimitPagination({
 *     limit: 3,
 *     offset: 0,
 *     queryFn: ({ limit, pageParam }) => {
 *       return createPaginatedQuery({
 *         limit,
 *         offset: pageParam as number | undefined,
 *         queryFn: () => {
 *           // Example data: [ 1, 2, 3 ]
 *           const { data } = await fetch('https://example.com/api', {
 *             params: { limit, offset: pageParam },
 *           });
 *
 *           return {
 *             data,
 *             // If there are more results, then there is no next page.
 *             hasNextPage: data.length > 0,
 *             // If the offset is greater than 0, then there is a previous page.
 *             hasPrevPage: offset > 0,
 *           };
 *         },
 *       });
 *     },
 * });
 * ```
 * This example above will paginate the data from the API using the `offset` and
 * `limit` parameters.
 *
 * @param options - The options to use when fetching the data.
 * @returns The paginated data.
 */
function useOffsetLimitPagination<
  TQueryFnData extends PaginationCursors,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
>({
  limit,
  offset = 0,
  queryFn,
  ...options
}: UseOffsetLimitPaginationArgs &
  Omit<
    UseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryFnData,
      TQueryKey,
      UseOffsetLimitPageParam
    >,
    "queryFn" | "initialPageParam" | "getNextPageParam" | "getPreviousPageParam"
  > & {
    queryFn: (
      context: QueryFunctionContext<TQueryKey, UseOffsetLimitPageParam> & {
        limit?: number;
      }
    ) => TQueryFnData | Promise<TQueryFnData>;
  }) {
  return useInfiniteQuery<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    UseOffsetLimitPageParam
  >({
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    initialPageParam: offset,
    queryFn: (context) => queryFn({ ...context, limit }),
    ...options,
  });
}

export default useOffsetLimitPagination;
