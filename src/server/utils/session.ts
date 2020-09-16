import Iron from '@hapi/iron';
import { NextApiRequest, NextApiResponse } from 'next';

import { getTokenCookie } from './auth-cookie';
import { sendErrorResponse } from './send-error-response';

type Session = { id: string };

function encryptSession(session: Session) {
  return Iron.seal(session, process.env.TOKEN_SECRET, Iron.defaults);
}

async function getSession(req: NextApiRequest, res: NextApiResponse): Promise<Session | null> {
  const token = getTokenCookie(req);
  if (!token) {
    sendErrorResponse({ errors: ['Unauthorized'], code: 401 }, res);
    return null;
  }

  const session = Iron.unseal(token, process.env.TOKEN_SECRET, Iron.defaults);
  if (!session) {
    sendErrorResponse({ errors: ['Unauthorized'], code: 401 }, res);
    return null;
  }

  return session;
}

export { encryptSession, getSession };
