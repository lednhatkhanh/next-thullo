import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { getSession, validateInput } from 'src/server/utils';
import { prisma } from 'src/server/lib';
import { Board, boardSelect } from 'src/server/api';

async function updateBoardApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return;
  }

  const query = (await validateInput({ req, res, validationSchema: queryValidationSchema, type: 'query' })) as
    | UpdateBoardQuery
    | undefined;
  if (!query) {
    return;
  }

  const body = (await validateInput({ req, res, validationSchema: bodyValidationSchema, type: 'body' })) as
    | UpdateBoardBody
    | undefined;
  if (!body) {
    return;
  }

  const board = await prisma.board.findOne({ where: { id: query.id }, select: boardSelect });

  if (!board || board.owner.id !== session.id) {
    res.status(404).send({ board: null } as UpdateBoardResponse);
    return;
  }

  const updatedBoard = await prisma.board.update({
    where: { id: query.id },
    data: { title: body.title, description: body.description, isPrivate: body.isPrivate },
    select: boardSelect,
  });

  res.status(200).send({ board: updatedBoard } as UpdateBoardResponse);
}

export type UpdateBoardQuery = {
  id: string;
};

export type UpdateBoardBody = {
  title?: string;
  description?: string;
  isPrivate?: boolean;
};

export type UpdateBoardResponse = {
  board: Board | null;
};

const queryValidationSchema = yup.object<UpdateBoardQuery>({
  id: yup.string().required('Id is required'),
});

const bodyValidationSchema = yup.object<UpdateBoardBody>({
  title: yup.string().optional(),
  description: yup.string().optional(),
  isPrivate: yup.boolean().optional(),
});

export default updateBoardApi;
