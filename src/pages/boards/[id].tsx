import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { QueryStatus } from 'react-query';
import queryString from 'query-string';

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
import { CreateList, List } from 'src/modules/boards';
import { GetBoardResponse } from 'src/server/api';
import { client } from 'src/utils';
import { GetListsQuery, GetListsResponse } from '../api/lists';

function BoardDetailsPage() {
  const router = useRouter();
  const boardId = router.query.id;
  const { isLoading: isCheckingAuth } = useGetCurrentUser();
  const { data: getBoardResponse, status: getBoardStatus } = useAppQuery<GetBoardResponse>(
    'getBoard',
    () => {
      const controller = new AbortController();
      const promise = client(`/api/boards/${boardId}`, { signal: controller.signal });

      (promise as any).cancel = () => controller.abort();

      return promise;
    },
    {
      enabled: !!boardId,
      onError() {
        router.replace('/');
      },
      refetchOnWindowFocus: false,
    },
  );
  const { data: getListsResponse } = useAppQuery<GetListsResponse, [GetListsQuery]>(
    'get-lists',
    ({ take, skip }) => client(`/api/lists?${queryString.stringify({ take, skip, boardId: boardId })}`),
    { enabled: !!boardId, refetchOnWindowFocus: false },
  );

  if (isCheckingAuth || getBoardStatus !== QueryStatus.Success) {
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

        <div className="flex items-start gap-x-3">
          {getListsResponse?.lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
          <CreateList boardId={boardId as string} />
        </div>
      </Container>
    </>
  );
}

export default BoardDetailsPage;
