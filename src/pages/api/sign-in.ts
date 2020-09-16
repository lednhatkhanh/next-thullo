import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { compare } from 'bcrypt';

import { sendErrorResponse, encryptSession, setTokenCookie, validateInput } from 'src/server/utils';
import { prisma } from 'src/server/lib';
import { AuthResponse, SignInInput } from 'src/server/api';

async function signInApi(req: NextApiRequest, res: NextApiResponse) {
  try {
    const input = (await validateInput({ req, res, validationSchema, type: 'body' })) as SignInInput | undefined;
    if (!input) {
      return;
    }

    const user = await prisma.user.findOne({ where: { email: input.email } });
    if (!user) {
      sendErrorResponse({ errors: ['Wrong email or password'] }, res);
      return;
    }

    const isPasswordValid = await compare(input.password, user.password);
    if (!isPasswordValid) {
      sendErrorResponse({ errors: ['Wrong email or password'] }, res);
      return;
    }

    const token = await encryptSession({ id: user.id });
    setTokenCookie(token, res);

    res.status(200).send({ message: 'Success' } as AuthResponse);
  } catch (error) {
    console.log(error);
    sendErrorResponse({ errors: ['Something bad happened'] }, res);
  }
}

const validationSchema = yup.object<SignInInput>({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default signInApi;
