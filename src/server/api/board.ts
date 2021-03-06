import { Board as PrismaBoard } from '@prisma/client';
import { User, userSelect } from './user';

export type Board = Pick<
  PrismaBoard,
  'id' | 'coverUrl' | 'createdAt' | 'updatedAt' | 'isPrivate' | 'title' | 'description'
> & {
  owner: User;
};

export const boardSelect = {
  coverUrl: true,
  createdAt: true,
  id: true,
  title: true,
  updatedAt: true,
  isPrivate: true,
  description: true,
  owner: { select: userSelect },
};
