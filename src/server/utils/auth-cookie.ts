import { NextApiResponse, NextApiRequest } from 'next';
import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 24; // 1 day

function setTokenCookie(token: string, res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}

function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

function parseCookies(req: NextApiRequest) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie ?? '');
}

function getTokenCookie(req: NextApiRequest) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}

export { setTokenCookie, removeTokenCookie, getTokenCookie };
