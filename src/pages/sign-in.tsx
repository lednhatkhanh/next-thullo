import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { object as yupObject, string as yupString } from 'yup';
import { QueryStatus, useMutation } from 'react-query';

import { client } from 'src/utils';
import { AuthResponse, ErrorResponse, SignInInput } from 'src/server/api';
import { Button, Link, Typography, InfoIcon, Alert, FormControl, Label, Input, FormHelperText } from 'src/components';

function SignInPage() {
  const router = useRouter();
  const [signIn, { error: signInError, status: signInStatus }] = useMutation<AuthResponse, ErrorResponse, SignInInput>(
    ({ email, password }) => client('/api/sign-in', { body: JSON.stringify({ email, password }), method: 'POST' }),
    {
      onSuccess() {
        router.replace('/');
      },
    },
  );
  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleSignIn = ({ email, password }: FormData) => {
    signIn({ email, password });
  };

  return (
    <>
      <Head>
        <title>Thullo - Sign in</title>
      </Head>

      <main className="grid items-center w-screen h-screen bg-gray-100">
        <div className="container grid grid-flow-row mx-auto lg:w-1/3 sm:w-full md:w-1/2 sm:px-4 gap-y-8 justify-items-center">
          <img src="/images/logo.svg" alt="Logo" />

          <form
            className="grid w-full grid-flow-row px-12 py-6 bg-white rounded shadow-md gap-y-4"
            onSubmit={form.handleSubmit(handleSignIn)}
            noValidate
          >
            {signInError?.errors.length ? (
              <Alert>
                <InfoIcon className="w-8 h-8" />

                {signInError.errors[0].message}
              </Alert>
            ) : null}

            <Typography size="xl" className="font-semibold text-center">
              Sign in to Thullo
            </Typography>

            <FormControl>
              <Label htmlFor="email">Email</Label>
              <Input
                ref={form.register}
                hasError={!!form.errors.email}
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                isFullWidth
              />
              {form.errors.email ? <FormHelperText isError>{form.errors.email.message}</FormHelperText> : null}
            </FormControl>

            <FormControl>
              <Label htmlFor="password">Password</Label>
              <Input
                ref={form.register}
                hasError={!!form.errors.password}
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                isFullWidth
              />
              {form.errors.password ? <FormHelperText isError>{form.errors.password.message}</FormHelperText> : null}
            </FormControl>

            <Button type="submit" isFullWidth color="primary" isLoading={signInStatus === QueryStatus.Loading}>
              Sign in
            </Button>

            <Link href="/sign-up">Sign up for an account</Link>
          </form>
        </div>
      </main>
    </>
  );
}

type FormData = SignInInput;

const validationSchema = yupObject<FormData>({
  email: yupString().email('Invalid email address').required('Email is required'),
  password: yupString().required('Password is required'),
});

export default SignInPage;
