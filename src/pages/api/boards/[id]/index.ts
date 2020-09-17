import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { getSession, validateInput } from 'src/server/utils';
import { prisma } from 'src/server/lib';
import { boardSelect, GetBoardInput, GetBoardResponse } from 'src/server/api';

async function getBoardApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return;
  }

  const input = (await validateInput({ req, res, validationSchema, type: 'query' })) as GetBoardInput | undefined;
  if (!input) {
    return;
  }

  const board = await prisma.board.findOne({ where: { id: input.id }, select: boardSelect });

  if (!board || board.owner.id !== session.id) {
    res.status(404).send({ board: null } as GetBoardResponse);
    return;
  }

  res.status(200).send({ board } as GetBoardResponse);
}

const validationSchema = yup.object<GetBoardInput>({
  id: yup.string().required('Id is required'),
});

export default getBoardApi;
