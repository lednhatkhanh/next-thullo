import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { client } from 'src/utils';
import { currentUserAtom } from './current-user-atom';

function useSignOut() {
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const [signOut] = useMutation(() => client('/api/sign-out'), {
    onSettled() {
      router.replace('/sign-in');
    },
  });

  const handleSignOut = () => {
    signOut();
    setCurrentUser(undefined);
  };

  return handleSignOut;
}

export { useSignOut };
