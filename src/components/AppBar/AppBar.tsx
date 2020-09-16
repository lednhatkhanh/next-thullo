import React from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { useSignOut, currentUserAtom } from 'src/business/auth';
import { Link } from '../Link';
import { Avatar } from '../Avatar';
import { ChevronDownIcon, ViewGridIcon } from '../icons';
import { Menu, MenuButton, MenuItem, MenuList } from '../Menu';
import { LogoutIcon } from '../icons';
import { Button } from '../Button';
import { Typography } from '../Typography';

type Props = {
  title?: string;
};

function AppBar({ title }: Props) {
  const router = useRouter();
  const signOut = useSignOut();
  const currentUser = useRecoilValue(currentUserAtom);

  return (
    <header className="sticky inset-x-0 top-0 flex items-center px-6 py-3 bg-white shadow-md">
      <Link href="/">
        <img src="/images/logo.svg" alt="Logo" />
      </Link>

      {title || router.pathname !== '/' ? <div className="w-10"></div> : null}

      {title ? (
        <Typography component="h3" size="lg">
          {title}
        </Typography>
      ) : null}

      {title && router.pathname !== '/' ? (
        <>
          <div className="w-4"></div>
          <div className="w-px h-8 bg-gray-500" />
          <div className="w-4"></div>
        </>
      ) : null}

      {router.pathname !== '/' ? (
        <NextLink href="/" passHref>
          <Button component="a" icon={<ViewGridIcon className="w-4 h-4" />}>
            All boards
          </Button>
        </NextLink>
      ) : null}

      <div className="flex-1" />

      {currentUser && (
        <Menu>
          <MenuButton variant="ghost">
            <Avatar size="sm" src="https://bumbag.style/bean.jpg" alt="User" />

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
