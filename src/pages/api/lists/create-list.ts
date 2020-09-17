import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { getSession, sendErrorResponse, validateInput } from 'src/server/utils';
import { List, listSelect } from 'src/server/api';
import { prisma } from 'src/server/lib';

async function createListApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return;
  }

  const [query, body] = await Promise.all([
    validateInput({ req, res, validationSchema: queryValidationSchema, type: 'query' }) as Promise<
      CreateListQuery | undefined
    >,
    validateInput({ req, res, validationSchema: bodyValidationSchema, type: 'body' }) as Promise<
      CreateListBody | undefined
    >,
  ]);

  if (!query || !body) {
    return;
  }

  const board = await prisma.board.findOne({ where: { id: query.boardId } });
  if (board?.ownerId !== session.id) {
    sendErrorResponse({ errors: ['Board not found'], code: 404 }, res);
    return;
  }

  const newList = await prisma.list.create({
    data: { title: body.title, board: { connect: { id: query.boardId } } },
    select: listSelect,
  });
  res.status(200).send({ list: newList } as CreateListResponse);
}

export type CreateListQuery = {
  boardId: string;
};

export type CreateListBody = {
  title: string;
};

export type CreateListResponse = {
  list: List;
};

const queryValidationSchema = yup.object<CreateListQuery>({
  boardId: yup.string().required('boardId is required'),
});

const bodyValidationSchema = yup.object<CreateListBody>({
  title: yup.string().required('title is required'),
});

export default createListApi;
