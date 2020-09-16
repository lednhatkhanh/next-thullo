import { Board } from './board';

export type GetBoardInput = { id: string };

export type GetBoardResponse = { board: Board | null };
