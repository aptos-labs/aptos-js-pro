// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  QueryKey,
  DefaultError,
  UseQueryOptions as TanstackUseQueryOptions,
  UseMutationOptions as TanstackUseMutationOptions,
  UseInfiniteQueryOptions as TanstackUseInfiniteQueryOptions,
  InfiniteData,
} from "@tanstack/react-query";

export type PaginationCursors = {
  nextCursor?: number;
  prevCursor?: number;
};

export type UseOffsetLimitPageParam = number | undefined;

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  TanstackUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export type UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = Omit<
  TanstackUseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >,
  | "queryKey"
  | "queryFn"
  | "defaultPageParam"
  | "getNextPageParam"
  | "getPreviousPageParam"
  | "initialPageParam"
>;

export type UseOffsetLimitPaginationOptions<
  TQueryFnData extends PaginationCursors,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> = UseInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  UseOffsetLimitPageParam
> & { limit?: number; offset?: number };

export type UseMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Omit<
  TanstackUseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn"
>;
