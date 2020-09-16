import React from 'react';

import { Board } from 'src/server/api';
import Link from 'next/link';
import { Avatar, LockClosedIcon, Typography } from 'src/components';

type Props = {
  board: Board;
};

function BoardItem({ board }: Props) {
  return (
    <Link href={`/boards/${board.id}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="h-64 p-4 transition duration-200 ease-in-out border rounded-md shadow-sm hover:shadow-md">
        <img className="w-full h-32" src="https://colorate.azurewebsites.net/SwatchColor/808080" alt="Cover" />

        <div className="h-4"></div>

        <Typography component="h3" size="lg">
          {board.title}
        </Typography>

        {board.isPrivate ? (
          <div className="flex items-center text-xs text-gray-700 gap-x-1">
            <LockClosedIcon className="w-4 h-4" />
            <span>Private</span>
          </div>
        ) : (
          <div className="flex justify-end">
            <Avatar src="https://bumbag.style/bean.jpg" size="sm" />
          </div>
        )}
      </a>
    </Link>
  );
}

export { BoardItem };
