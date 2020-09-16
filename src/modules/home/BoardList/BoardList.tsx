import clsx from 'clsx';
import React from 'react';

import { Board } from 'src/server/api';
import { BoardItem } from '../BoardItem';
import classes from './board-list.module.scss';

type Props = {
  boards: Board[];
};

function BoardList({ boards }: Props) {
  return (
    <div className={clsx('grid gap-x-4 gap-y-6', classes.boardList)}>
      {boards.map((board) => (
        <BoardItem board={board} key={board.id} />
      ))}
    </div>
  );
}

export { BoardList };
