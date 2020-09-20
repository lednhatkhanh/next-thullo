import React from 'react';

import {
  Avatar,
  Button,
  CloseIcon,
  DotsHorizontalIcon,
  IconButton,
  Typography,
  UserCircleSmallIcon,
} from 'src/components';
import { Board } from 'src/server/api';
import { BoardDescription } from '../BoardDescription';
import { useDisclosure } from 'src/hooks';

type Props = {
  board: Board;
};

function SideBar({ board }: Props) {
  const navRef = React.useRef<HTMLElement | null>(null);
  const { isOpen: isSideBarOpen, onClose: closeSideBar, onOpen: openSideBar } = useDisclosure();

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        isSideBarOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as HTMLElement) &&
        document.body.contains(event.target as HTMLElement)
      ) {
        closeSideBar();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [closeSideBar, isSideBarOpen]);

  return (
    <>
      <Button icon={<DotsHorizontalIcon className="w-4 h-4" />} onClick={openSideBar}>
        Show menu
      </Button>

      {isSideBarOpen ? (
        <nav ref={navRef} className="fixed inset-y-0 right-0 w-1/4 p-4 bg-white shadow-md">
          <div className="flex items-center justify-between pb-2 border-b">
            <Typography size="lg" component="h2">
              Menu
            </Typography>

            <IconButton variant="ghost" onClick={closeSideBar} aria-label="Close">
              <CloseIcon className="w-5 h-5" />
            </IconButton>
          </div>

          <div className="h-4"></div>

          <div className="flex items-center text-xs text-gray-600 gap-x-1">
            <UserCircleSmallIcon className="w-4 h-4" /> Make by
          </div>

          <div className="h-3"></div>

          <div className="flex text-gray-700 gap-x-4">
            <Avatar src="https://bumbag.style/bean.jpg" />

            <div className="flex flex-col justify-between">
              <span className="text-sm font-semibold leading-none">Nhat Khanh</span>

              <span className="text-sm leading-none text-gray-600">at Aug 7th</span>
            </div>
          </div>

          <div className="h-4"></div>

          <BoardDescription board={board} />
        </nav>
      ) : null}
    </>
  );
}

export { SideBar };
