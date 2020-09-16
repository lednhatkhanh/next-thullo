import React from 'react';

import { Board } from 'src/server/api';
import Link from 'next/link';
import { Avatar, LockClosedIcon, LockOpenIcon, Typography } from 'src/components';

type Props = {
  board: Board;
};

function BoardItem({ board }: Props) {
  return (
    <Link href={`/boards/${board.id}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="p-4 transition duration-200 ease-in-out border rounded-md shadow-sm hover:shadow-md focus:outline-none focus:shadow-outline">
        <img className="w-full h-32" src="https://colorate.azurewebsites.net/SwatchColor/808080" alt="Cover" />

        <div className="h-4"></div>

        <Typography component="h3" size="lg">
          {board.title}
        </Typography>

        <div className="h-4"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center px-4 py-2 text-xs text-gray-700 border rounded-md gap-x-1">
            {board.isPrivate ? <LockClosedIcon className="w-4 h-4" /> : <LockOpenIcon className="w-4 h-4" />}
            <span>{board.isPrivate ? 'Private' : 'Public'}</span>
          </div>

          <div className="flex justify-end">
            <Avatar src="https://bumbag.style/bean.jpg" size="sm" />
          </div>
        </div>
      </a>
    </Link>
  );
}

export { BoardItem };
