import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { client } from 'src/utils';
import { useAppQuery } from 'src/hooks';
import { CurrentUserResponse } from 'src/server/api';

import { currentUserAtom } from './current-user-atom';

function useGetCurrentUser() {
  const router = useRouter();
  const currentUser = useRecoilValue(currentUserAtom);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const { isLoading } = useAppQuery<CurrentUserResponse>('currentUser', () => client('/api/current-user'), {
    onSuccess({ currentUser }) {
      if (!currentUser) {
        router.replace('/sign-in');
      } else {
        setCurrentUser(currentUser);
      }
    },
    refetchOnWindowFocus: false,
  });

  return { isLoading, currentUser };
}

export { useGetCurrentUser };
