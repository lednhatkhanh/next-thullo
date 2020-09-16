import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { hash } from 'bcrypt';

import { sendErrorResponse, encryptSession, setTokenCookie, validateInput } from 'src/server/utils';
import { prisma } from 'src/server/lib';
import { AuthResponse, SignUpInput } from 'src/server/api';

async function signUpApi(req: NextApiRequest, res: NextApiResponse) {
  try {
    const input = (await validateInput({ req, res, validationSchema, type: 'body' })) as SignUpInput | undefined;
    if (!input) {
      return;
    }

    const user = await prisma.user.findOne({ where: { email: input.email } });
    if (user) {
      sendErrorResponse({ errors: [`User with email ${input.email} exists`] }, res);
      return;
    }

    const hashedPassword = await hash(input.password, 12);
    const newUser = await prisma.user.create({
      data: { email: input.email, password: hashedPassword, name: input.name },
    });
    const token = await encryptSession({ id: newUser.id });
    setTokenCookie(token, res);

    res.status(200).send({ message: 'Success' } as AuthResponse);
  } catch (error) {
    console.log(error);
    sendErrorResponse({ errors: ['Something bad happened'] }, res);
  }
}

const validationSchema = yup.object<SignUpInput>({
  email: yup.string().email('Invalid email address').required('Email is required'),
  name: yup.string().required('Name is required'),
  password: yup.string().required('Password is required').min(6, 'Password must contain at least 6 characters'),
});

export default signUpApi;
