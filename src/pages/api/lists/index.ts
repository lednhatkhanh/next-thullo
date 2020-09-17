import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { getSession, validateInput } from 'src/server/utils';
import { prisma } from 'src/server/lib';
import { List, listSelect } from 'src/server/api';

async function getListsApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return;
  }

  const query = (await validateInput({ req, res, validationSchema, type: 'query' })) as GetListsQuery | undefined;
  if (!query) {
    return;
  }

  const lists = await prisma.list.findMany({
    where: { board: { id: query.boardId, ownerId: session.id } },
    take: query.take ?? 15,
    skip: query.skip ?? 0,
    select: listSelect,
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).send({ lists } as GetListsResponse);
}

export type GetListsQuery = { take?: number; skip?: number; boardId: string };

export type GetListsResponse = { lists: List[] };

const validationSchema = yup.object<GetListsQuery>({
  take: yup.number().optional().default(15),
  skip: yup.number().optional().default(0),
  boardId: yup.string().required('boardId is required'),
});

export default getListsApi;
