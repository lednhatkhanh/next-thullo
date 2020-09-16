import { atom } from 'recoil';

import { User } from 'src/server/api';

const currentUserAtom = atom<User | undefined>({
  key: 'current-user',
  default: undefined,
});

export { currentUserAtom };
