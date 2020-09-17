import { List as PrismaList } from '@prisma/client';
import { Board, boardSelect } from './board';

export type List = Pick<PrismaList, 'createdAt' | 'id' | 'title' | 'updatedAt'> & {
  board: Board;
};

export const listSelect = {
  id: true,
  createdAt: true,
  title: true,
  updatedAt: true,
  board: { select: boardSelect },
};
