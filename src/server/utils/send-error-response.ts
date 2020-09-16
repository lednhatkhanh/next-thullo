import { NextApiResponse } from 'next';

function sendErrorResponse({ errors, code = 401 }: { errors: string[]; code?: number }, res: NextApiResponse) {
  res.status(code).send({ errors: errors.map((message: string) => ({ message })) });
}

export { sendErrorResponse };
