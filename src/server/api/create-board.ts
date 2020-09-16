import { Board, User } from '@prisma/client';

export type CreateBoardResponse = {
  board: Pick<Board, 'id' | 'coverUrl' | 'createdAt' | 'updatedAt' | 'isPrivate' | 'title'> & {
    owner: Pick<User, 'avatar' | 'email' | 'id' | 'name'>;
  };
};

export type CreateBoardInput = {
  title: string;
  coverUrl?: string;
  isPrivate?: boolean;
};
