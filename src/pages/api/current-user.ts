import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'src/server/utils';
import { prisma } from 'src/server/lib';
import { User, userSelect } from 'src/server/api';

async function currentUserApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session) {
    return;
  }

  const user = await prisma.user.findOne({
    where: { id: session.id },
    select: userSelect,
  });

  res.status(200).send({ currentUser: user } as CurrentUserResponse);
}

export type CurrentUserResponse = { currentUser: User | null };

export default currentUserApi;
