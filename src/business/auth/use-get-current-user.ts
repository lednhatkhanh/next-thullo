import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { client } from 'src/utils';
import { useAppQuery } from 'src/hooks';

import { currentUserAtom } from './current-user-atom';
import { CurrentUserResponse } from 'src/pages/api/current-user';

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
