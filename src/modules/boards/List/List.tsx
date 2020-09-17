import React from 'react';
import { DotsHorizontalIcon, IconButton, Typography } from 'src/components';
import { List as ListModel } from 'src/server/api';
import { AddButton } from '../AddButton';

type Props = {
  list: ListModel;
};

function List({ list }: Props) {
  return (
    <div className="flex flex-col w-64 p-2 bg-gray-200 rounded-lg gap-y-2">
      <div className="flex items-center justify-between">
        <Typography size="lg" component="h3">
          {list.title}
        </Typography>

        <IconButton>
          <DotsHorizontalIcon className="w-5 h-5" />
        </IconButton>
      </div>

      <AddButton className="w-full">Add new card</AddButton>
    </div>
  );
}

export { List };
