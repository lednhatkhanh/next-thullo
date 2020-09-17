import { Board } from './board';

export type CreateBoardResponse = {
  board: Board;
};

export type CreateBoardInput = {
  title: string;
  coverUrl?: string;
  isPrivate?: boolean;
};
