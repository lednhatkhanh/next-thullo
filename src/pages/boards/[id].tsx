import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetCurrentUser } from 'src/business/auth';
import {
  AppBar,
  Avatar,
  Button,
  Container,
  DotsHorizontalIcon,
  IconButton,
  LockClosedIcon,
  PlusIcon,
  Spinner,
} from 'src/components';
import { useAppQuery } from 'src/hooks';
import { GetBoardResponse } from 'src/server/api';
import { client } from 'src/utils';

function BoardDetailsPage() {
  const router = useRouter();
  const { isLoading: isCheckingAuth } = useGetCurrentUser();
  const { data: getBoardResponse, status: getBoardStatus } = useAppQuery<GetBoardResponse>(
    'getBoard',
    () => client(`/api/boards/${router.query.id}`),
    {
      enabled: !!router.query.id,
      onError() {
        router.replace('/');
      },
      refetchOnWindowFocus: false,
    },
  );

  if (isCheckingAuth || getBoardStatus === 'loading') {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="w-12 h-12 text-blue-500" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{getBoardResponse?.board?.title} - Thullo</title>
      </Head>

      <AppBar title={getBoardResponse?.board?.title} />

      <Container className="pt-6">
        <div className="flex items-center gap-x-4">
          <Button icon={<LockClosedIcon className="w-4 h-4" />}>Private</Button>

          <Avatar src="https://bumbag.style/bean.jpg" />

          <IconButton variant="filled" color="primary">
            <PlusIcon className="w-4 h-4" />
          </IconButton>

          <div className="flex-1"></div>

          <Button icon={<DotsHorizontalIcon className="w-4 h-4" />}>Show menu</Button>
        </div>

        <div className="h-6"></div>

        <div className="w-full h-64 p-4 bg-gray-100 rounded-lg">
          <button className="flex items-center justify-between w-64 px-4 py-2 text-sm leading-none text-blue-700 transition duration-200 ease-in-out bg-blue-100 rounded-md appearance-none select-none focus:outline-none focus:shadow-outline hover:bg-blue-200 hover:text-blue-800 active:bg-blue-100 active:text-blue-700">
            Add another list
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </>
  );
}

export default BoardDetailsPage;
