import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { prisma } from 'src/server/lib';
import { getSession, validateInput } from 'src/server/utils';
import { Board, boardSelect, GetBoardsInput, GetBoardsResponse } from 'src/server/api';

async function getBoardsApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return;
  }

  const input = (await validateInput({ req, res, validationSchema, type: 'query' })) as GetBoardsInput | undefined;
  if (!input) {
    return;
  }

  const boards = (await prisma.board.findMany({
    where: {
      ownerId: session.id,
    },
    take: input.take,
    skip: input.skip,
    select: boardSelect,
    orderBy: { createdAt: 'desc' },
  })) as Board[];

  res.status(200).send({ boards } as GetBoardsResponse);
}

const validationSchema = yup.object<GetBoardsInput>({
  take: yup.number().optional().default(15),
  skip: yup.number().optional().default(0),
});

export default getBoardsApi;
