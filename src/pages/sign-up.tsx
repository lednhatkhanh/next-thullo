import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { object as yupObject, string as yupString, ref as yupRef } from 'yup';
import { QueryStatus, useMutation } from 'react-query';

import { Button, Link, Typography, InfoIcon, Alert, FormControl, Label, Input, FormHelperText } from 'src/components';
import { client } from 'src/utils';
import { AuthResponse, ErrorResponse, SignUpInput } from 'src/server/api';

function SignUpPage() {
  const router = useRouter();
  const [signUp, { error: signUpError, status: signUpStatus }] = useMutation<AuthResponse, ErrorResponse, SignUpInput>(
    ({ email, password, name }) =>
      client('/api/sign-up', { body: JSON.stringify({ email, password, name }), method: 'POST' }),
    {
      onSuccess() {
        router.replace('/');
      },
    },
  );
  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleSignUp = ({ email, password, name }: FormData) => {
    signUp({ email, password, name });
  };

  return (
    <>
      <Head>
        <title>Thullo - Sign up</title>
      </Head>

      <main className="grid items-center w-screen h-screen bg-gray-100">
        <div className="container grid grid-flow-row mx-auto lg:w-1/3 sm:w-full md:w-1/2 sm:px-4 gap-y-8 justify-items-center">
          <img src="/images/logo.svg" alt="Logo" />

          <form
            className="grid w-full grid-flow-row px-12 py-6 bg-white rounded shadow-md gap-y-4"
            onSubmit={form.handleSubmit(handleSignUp)}
            noValidate
          >
            {signUpError?.errors.length ? (
              <Alert>
                <InfoIcon className="w-8 h-8" />

                {signUpError.errors[0].message}
              </Alert>
            ) : null}

            <Typography size="xl" className="font-semibold text-center">
              Sign up for your account
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
              <Label htmlFor="name">Name</Label>
              <Input
                ref={form.register}
                hasError={!!form.errors.name}
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                isFullWidth
              />
              {form.errors.name ? <FormHelperText isError>{form.errors.name.message}</FormHelperText> : null}
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

            <FormControl>
              <Label htmlFor="passwordConfirm">Confirm password</Label>
              <Input
                ref={form.register}
                hasError={!!form.errors.passwordConfirm}
                name="passwordConfirm"
                id="passwordConfirm"
                type="password"
                placeholder="Confirm password"
                isFullWidth
              />
              {form.errors.passwordConfirm ? (
                <FormHelperText isError>{form.errors.passwordConfirm.message}</FormHelperText>
              ) : null}
            </FormControl>

            <Button type="submit" isFullWidth color="primary" isLoading={signUpStatus === QueryStatus.Loading}>
              Sign up
            </Button>

            <Link href="/sign-in">Sign in to your account</Link>
          </form>
        </div>
      </main>
    </>
  );
}

type FormData = { passwordConfirm: string } & SignUpInput;

const validationSchema = yupObject<FormData>({
  email: yupString().email('Invalid email address').required('Email is required'),
  name: yupString().required('Name is required'),
  password: yupString().required('Password is required').min(6, 'Password must contain at least 6 characters'),
  passwordConfirm: yupString()
    .oneOf([yupRef('password')], 'Passwords do not match')
    .required('Password confirm is required'),
});

export default SignUpPage;
