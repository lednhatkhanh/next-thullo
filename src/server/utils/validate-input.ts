import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { sendErrorResponse } from './send-error-response';

async function validateInput({
  req,
  res,
  validationSchema,
  type,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  validationSchema: yup.ObjectSchema;
  type: 'body' | 'query';
}): Promise<unknown | undefined> {
  try {
    const data = (await validationSchema.validate(req[type]))!;
    return data;
  } catch (error) {
    sendErrorResponse({ errors: error.errors }, res);
  }
}

export { validateInput };
