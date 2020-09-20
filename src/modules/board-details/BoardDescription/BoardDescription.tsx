import React from 'react';
import { QueryStatus, useQueryCache } from 'react-query';
import { Button, DocumentTextSmallIcon, TextArea } from 'src/components';
import { useAppMutation, useDisclosure } from 'src/hooks';
import { UpdateBoardBody, UpdateBoardResponse } from 'src/pages/api/boards/[id]/update';
import { Board, GetBoardResponse } from 'src/server/api';
import { client } from 'src/utils';

type Props = {
  board: Board;
};

function BoardDescription({ board }: Props) {
  const queryCache = useQueryCache();
  const [updateDescriptionMutation, { status: updateBoardDescriptionStatus }] = useAppMutation<
    UpdateBoardResponse,
    Pick<UpdateBoardBody, 'description'>
  >(
    ({ description }) =>
      client(`/api/boards/${board.id}/update`, { method: 'PATCH', body: JSON.stringify({ description }) }),
    {
      onSuccess({ board: updatedBoard }) {
        stopEdit();
        if (updatedBoard) {
          queryCache.setQueryData('get-board', {
            board: updatedBoard,
          } as GetBoardResponse);
        }
      },
    },
  );
  const { onClose: stopEdit, onOpen: startEdit, isOpen: isEditMode } = useDisclosure();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const description = (event.currentTarget.elements.namedItem('description') as HTMLTextAreaElement).value;
    updateDescriptionMutation({ description });
  };

  return (
    <>
      <div className="flex items-center text-xs text-gray-600 gap-x-1">
        <DocumentTextSmallIcon className="w-4 h-4" /> Description
      </div>

      <div className="h-3"></div>

      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <TextArea
            name="description"
            isFullWidth
            rows={8}
            autoFocus
            aria-label="Board description"
            defaultValue={board.description ?? ''}
          />

          <div className="h-3"></div>

          <div className="flex items-center justify-end gap-x-2">
            <Button onClick={stopEdit} type="button">
              Cancel
            </Button>
            <Button color="primary" type="submit" isLoading={updateBoardDescriptionStatus === QueryStatus.Loading}>
              Update
            </Button>
          </div>
        </form>
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          href="#"
          className="block w-full h-32 px-4 py-2 text-sm text-gray-700 transition duration-200 ease-in-out bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:shadow-outline"
          onClick={startEdit}
        >
          {board.description ?? 'Enter something in here'}
        </a>
      )}
    </>
  );
}

export { BoardDescription };
