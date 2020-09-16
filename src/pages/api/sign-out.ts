import { NextApiRequest, NextApiResponse } from 'next';
import { AuthResponse } from 'src/server/api';
import { removeTokenCookie } from 'src/server/utils';

function signOutApi(_req: NextApiRequest, res: NextApiResponse) {
  removeTokenCookie(res);
  res.status(200).send({ message: 'Success' } as AuthResponse);
}

export default signOutApi;
