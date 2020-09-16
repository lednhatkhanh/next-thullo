import React from 'react';
import queryString from 'query-string';

import { useGetCurrentUser } from 'src/business/auth';
import { AppBar, Spinner, Typography, Container } from 'src/components';
import { client } from 'src/utils';
import { GetBoardsInput, GetBoardsResponse } from 'src/server/api';
import { useAppQuery } from 'src/hooks';
import { BoardList, CreateBoard } from 'src/modules/home';

function HomePage() {
  const { isLoading: isCheckingAuth } = useGetCurrentUser();
  const { data: getBoardsResponse, status: getBoardsStatus } = useAppQuery<GetBoardsResponse, [GetBoardsInput]>(
    'get-boards',
    ({ take, skip }) => client(`/api/boards?${queryString.stringify({ take, skip })}`),
  );

  if (isCheckingAuth || getBoardsStatus === 'loading') {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="w-12 h-12 text-blue-500" />
      </div>
    );
  }

  return (
    <>
      <AppBar />

      <Container>
        <div className="flex items-center justify-between">
          <Typography component="h1" size="2xl">
            All Boards
          </Typography>

          <CreateBoard />
        </div>

        <div className="h-6"></div>

        <BoardList boards={getBoardsResponse?.boards ?? []} />
      </Container>
    </>
  );
}

export default HomePage;
