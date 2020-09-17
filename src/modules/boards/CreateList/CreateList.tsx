import React from 'react';
import { object as yupObject, string as yupString } from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { useQueryCache } from 'react-query';

import { Button, CloseIcon, FormControl, FormHelperText, IconButton, Input } from 'src/components';
import { CreateListBody, CreateListResponse } from 'src/pages/api/lists/create-list';
import { useAppMutation } from 'src/hooks';
import { client } from 'src/utils';
import { AddButton } from '../AddButton';
import { GetListsResponse } from 'src/pages/api/lists';

type Props = {
  boardId: string;
};

function CreateList({ boardId }: Props) {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const form = useForm<FormData>({
    defaultValues: formInitialData,
    resolver: yupResolver(validationSchema),
  });
  const queryCache = useQueryCache();
  const [createListMutation, { status: createListStatus }] = useAppMutation<CreateListResponse, CreateListBody>(
    ({ title }) =>
      client(`/api/lists/create-list?boardId=${boardId}`, {
        method: 'POST',
        body: JSON.stringify({
          title,
        }),
      }),
    {
      onSuccess({ list: createdList }) {
        queryCache.setQueryData('get-lists', {
          lists: [...(queryCache.getQueryData('get-lists') as GetListsResponse).lists, createdList],
        } as GetListsResponse);
        closeForm();
      },
    },
  );

  const openForm = React.useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const closeForm = React.useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const createList = (data: FormData) => {
    createListMutation({ title: data.title });
  };

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isFormOpen && formRef.current && !formRef.current.contains(event.target as HTMLElement)) {
        closeForm();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [closeForm, isFormOpen]);

  return (
    <>
      {isFormOpen ? (
        <form
          ref={formRef}
          className="w-64 p-2 bg-white border rounded-md shadow-md"
          noValidate
          onSubmit={form.handleSubmit(createList)}
        >
          <FormControl>
            <Input
              ref={form.register}
              hasError={!!form.errors.title}
              name="title"
              id="title"
              aria-label="Title"
              isFullWidth
              placeholder="Enter list title"
              autoFocus
            />

            {!!form.errors.title ? <FormHelperText isError>{form.errors.title.message}</FormHelperText> : null}
          </FormControl>

          <div className="h-2"></div>

          <div className="flex items-center justify-end gap-x-2">
            <IconButton onClick={closeForm} aria-label="Close" type="button">
              <CloseIcon className="w-5 h-5" />
            </IconButton>

            <Button color="primary" className="self-end" isLoading={createListStatus === 'loading'} type="submit">
              Create
            </Button>
          </div>
        </form>
      ) : (
        <AddButton className="w-64" onClick={openForm}>
          Add another list
        </AddButton>
      )}
    </>
  );
}

type FormData = CreateListBody;
const validationSchema = yupObject<FormData>({
  title: yupString().required('Title is required'),
});
const formInitialData = { title: '' } as FormData;

export { CreateList };
