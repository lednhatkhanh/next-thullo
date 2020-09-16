import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { getSession, sendErrorResponse, validateInput } from 'src/server/utils';
import { prisma } from 'src/server/lib';
import { boardSelect, CreateBoardInput, CreateBoardResponse } from 'src/server/api';

async function createBoardApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return;
  }

  const input = (await validateInput({ req, res, validationSchema, type: 'body' })) as CreateBoardInput | undefined;
  if (!input) {
    return;
  }

  try {
    const board = await prisma.board.create({
      data: {
        owner: { connect: { id: session.id } },
        title: input.title,
        coverUrl: input.coverUrl,
        isPrivate: input.isPrivate,
      },
      select: boardSelect,
    });

    res.status(200).send({ board } as CreateBoardResponse);
  } catch (error) {
    console.log(error);
    sendErrorResponse({ errors: ['Something bad happened'] }, res);
  }
}

const validationSchema = yup.object<CreateBoardInput>({
  title: yup.string().required('Title is required'),
  coverUrl: yup.string(),
  isPrivate: yup.boolean(),
});

export default createBoardApi;
