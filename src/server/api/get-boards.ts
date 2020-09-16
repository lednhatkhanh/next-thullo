import { Board } from './board';

export type GetBoardsInput = {
  skip?: number;
  take?: number;
};

export type GetBoardsResponse = {
  boards: Board[];
};
