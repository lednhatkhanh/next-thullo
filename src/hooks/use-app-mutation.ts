import { MutationConfig, MutationFunction, useMutation } from 'react-query';
import { useSignOut } from 'src/business/auth';
import { ErrorResponse } from 'src/server/api';

function useAppMutation<TResult, TVariables = undefined, TSnapshot = unknown>(
  mutationFn: MutationFunction<TResult, TVariables>,
  config: MutationConfig<TResult, Partial<ErrorResponse>, TVariables, TSnapshot> = {},
) {
  const signOut = useSignOut();
  const result = useMutation(mutationFn, {
    ...config,
    onError(error, variables, snapshot) {
      console.log(error);
      if (config?.onError) {
        config?.onError(error, variables, snapshot);
      }

      if (error.errors && error?.errors[0]?.message === 'Unauthorized') {
        signOut();
      }
    },
  });

  return result;
}

export { useAppMutation };
