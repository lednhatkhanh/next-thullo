import {
  QueryConfig,
  QueryFunction,
  QueryKey,
  QueryResult,
  TypedQueryFunction,
  TypedQueryFunctionArgs,
  useQuery,
} from 'react-query';
import { useSignOut } from 'src/business/auth';

import { ErrorResponse } from 'src/server/api';

function useAppQuery<TResult>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TResult>,
  queryConfig?: QueryConfig<TResult, Partial<ErrorResponse>>,
): QueryResult<TResult, Partial<ErrorResponse>>;

function useAppQuery<TResult, TArgs extends TypedQueryFunctionArgs>(
  queryKey: QueryKey,
  queryFn: TypedQueryFunction<TResult, TArgs>,
  queryConfig?: QueryConfig<TResult, Partial<ErrorResponse>>,
): QueryResult<TResult, Partial<ErrorResponse>>;

function useAppQuery(
  queryKey: QueryKey,
  queryFn: QueryFunction<unknown> | TypedQueryFunction<unknown, [unknown]>,
  queryConfig: QueryConfig<unknown, Partial<ErrorResponse>> = {},
) {
  const signOut = useSignOut();
  const result = useQuery(queryKey, queryFn, {
    ...queryConfig,
    onError(error) {
      console.log(error);
      if (queryConfig?.onError) {
        queryConfig?.onError(error);
      }

      if (error.errors && error?.errors[0]?.message === 'Unauthorized') {
        signOut();
      }
    },
    retry:
      queryConfig.retry ??
      ((failureCount, error) => {
        if (error?.errors && error?.errors[0]?.message === 'Unauthorized') {
          return false;
        }
        return failureCount <= 3;
      }),
  });

  return result;
}

export { useAppQuery };
