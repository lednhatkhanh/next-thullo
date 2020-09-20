import React from 'react';
import { Dialog } from '@reach/dialog';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { object as yupObject, string as yupString, boolean as yupBoolean } from 'yup';
import { QueryStatus, useQueryCache } from 'react-query';

import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  LockClosedIcon,
  LockOpenIcon,
  PhotographIcon,
  PlusIcon,
  Typography,
} from 'src/components';
import { CreateBoardResponse, CreateBoardInput, GetBoardsResponse } from 'src/server/api';
import { client } from 'src/utils';
import { useAppMutation } from 'src/hooks';

function CreateBoard() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const form = useForm<FormData>({
    defaultValues: formInitialData,
    resolver: yupResolver(validationSchema),
  });
  const queryCache = useQueryCache();
  const [createBoardMutation, { status: createBoardStatus }] = useAppMutation<CreateBoardResponse, CreateBoardInput>(
    ({ title, coverUrl, isPrivate }) =>
      client('/api/boards/create-board', {
        body: JSON.stringify({
          title,
          coverUrl,
          isPrivate,
        }),
        method: 'POST',
      }),
    {
      onSuccess({ board: createdBoard }) {
        queryCache.setQueryData('get-boards', {
          boards: [createdBoard, ...(queryCache.getQueryData('get-boards') as GetBoardsResponse).boards],
        } as GetBoardsResponse);
        closeDialog();
      },
    },
  );

  const openDialog = () => {
    setIsOpen(true);
    // controls.start({ opacity: 1 });
  };

  const closeDialog = () => {
    setIsOpen(false);
    // controls.start({ opacity: 0 });
  };

  const toggleIsPrivate = () => {
    form.setValue('isPrivate', !form.getValues('isPrivate'), { shouldDirty: true });
  };

  const createBoard = (data: FormData) => {
    createBoardMutation({ title: data.title, coverUrl: data.coverUrl, isPrivate: data.isPrivate });
  };

  return (
    <>
      <Button onClick={openDialog}>
        <PlusIcon className="w-5 h-5" /> Create board
      </Button>

      <Dialog
        className="w-1/3 rounded-md shadow-md"
        aria-labelledby="create-board-title"
        isOpen={isOpen}
        onDismiss={closeDialog}
      >
        <form noValidate onSubmit={form.handleSubmit(createBoard)}>
          <Typography size="xl" id="create-board-title">
            Create Board
          </Typography>

          <div className="h-6"></div>

          <img
            className="w-full h-32 rounded-md"
            src="https://colorate.azurewebsites.net/SwatchColor/808080"
            alt="Cover"
          />

          <div className="h-5"></div>

          <FormControl>
            <Input
              ref={form.register}
              hasError={!!form.errors.title}
              name="title"
              id="title"
              placeholder="Title"
              aria-label="Title"
              isFullWidth
            />
            {!!form.errors.title ? <FormHelperText isError>{form.errors.title.message}</FormHelperText> : null}
          </FormControl>

          <div className="h-5"></div>

          <div className="flex gap-x-2">
            <Button className="flex-1" type="button" icon={<PhotographIcon className="w-5 h-5" />}>
              Cover photo
            </Button>

            <Controller
              name="isPrivate"
              control={form.control}
              render={({ value: isPrivate }) => (
                <Button
                  color={!isPrivate ? 'primary' : 'default'}
                  type="button"
                  className="flex-1"
                  onClick={toggleIsPrivate}
                  icon={isPrivate ? <LockClosedIcon className="w-5 h-5" /> : <LockOpenIcon className="w-5 h-5" />}
                >
                  {isPrivate ? 'Private' : 'Public'}
                </Button>
              )}
            />
          </div>

          <div className="h-5"></div>

          <div className="flex justify-end gap-x-2">
            <Button type="button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={createBoardStatus === QueryStatus.Loading}
              icon={<PlusIcon className="w-5 h-5" />}
            >
              Create
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

type FormData = { title: string; isPrivate?: boolean; coverUrl?: string };
const validationSchema = yupObject<FormData>({
  title: yupString().required('Title is required'),
  isPrivate: yupBoolean(),
  coverUrl: yupString(),
});
const formInitialData = { title: '', isPrivate: false, coverUrl: undefined };

export { CreateBoard };
