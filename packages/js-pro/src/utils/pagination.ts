// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

export type WithPagination<T> = T & {
  /**
   * The number of results to return per page.
   */
  limit?: number;
  /**
   * The offset to start the query from.
   */
  offset?: number;
};

type PaginationQueryFnResult<T> = T & {
  /**
   * Whether there are more results in the next page.
   */
  hasNextPage: boolean;
  /**
   * Whether there are more results in the previous page.
   * @default () => offset > 0
   */
  hasPrevPage?: boolean;
};

interface PaginationOptions<TQueryFnResult> {
  /**
   * The number of results to return per page.
   */
  limit: number;
  /**
   * The offset to start the query from.
   */
  offset: number;
  /**
   * The query function to paginate. Must return a result with a `hasNextPage`
   * boolean and optionally a `hasPrevPage` boolean to indicate whether there
   * are more results in either direction.
   */
  queryFn: (args: {
    limit: number;
    offset: number;
  }) => Promise<PaginationQueryFnResult<TQueryFnResult>>;
}

export interface PaginationCursors {
  /**
   * The next cursor for pagination. If there is no next page, this will be
   * undefined.
   */
  nextCursor?: number;
  /**
   * The previous cursor for pagination. If there is no previous page, this
   * will be undefined.
   */
  prevCursor?: number;
}

/**
 * Paginate a query function with a limit and offset. Strictly types the result
 * to include pagination cursors. The query function must return a result with
 * a `hasNextPage` boolean and optionally a `hasPrevPage` boolean to indicate
 * whether there are more results in either direction.
 *
 * @param queryFn - The query function to paginate.
 * @param limit - The number of results to return per page.
 * @param offset - The offset to start the query from.
 * @returns The paginated results with pagination cursors.
 */
export const createPaginatedQuery = async <TQueryFnResult>({
  limit,
  offset,
  queryFn,
}: PaginationOptions<TQueryFnResult>): Promise<
  PaginationCursors & TQueryFnResult
> => {
  const result = await queryFn({ limit, offset });

  // Remove the hasNextPage and hasPrevPage properties from the result.
  const { hasNextPage, hasPrevPage, ...data } = result;

  // Find the next and previous cursors.
  const nextCursor = hasNextPage ? offset + limit : undefined;
  const prevCursor =
    hasPrevPage ?? offset > 0 ? Math.max(offset - limit, 0) : undefined;

  return { nextCursor, prevCursor, ...(data as TQueryFnResult) };
};
