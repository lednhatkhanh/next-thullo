import React from 'react';
import { useRecoilValue } from 'recoil';

import { useSignOut, currentUserAtom } from 'src/business/auth';
import { Link } from '../Link';
import { Avatar } from '../Avatar';
import { ChevronDownIcon } from '../icons';
import { Menu, MenuButton, MenuItem, MenuList } from '../Menu';
import { LogoutIcon } from '../icons';

function AppBar() {
  const signOut = useSignOut();
  const currentUser = useRecoilValue(currentUserAtom);

  return (
    <header className="sticky inset-x-0 top-0 flex items-center px-6 py-3 bg-white shadow-md">
      <Link href="/">
        <img src="/images/logo.svg" alt="Logo" />
      </Link>

      <div className="flex-1" />

      {currentUser && (
        <Menu>
          <MenuButton variant="ghost">
            <Avatar src="https://bumbag.style/bean.jpg" alt="User" />

            <span>{currentUser.name}</span>

            <div>
              <ChevronDownIcon className="h-5" />
            </div>
          </MenuButton>

          <MenuList>
            <MenuItem onSelect={signOut}>
              <LogoutIcon className="w-5 h-5" /> Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </header>
  );
}

export { AppBar };
