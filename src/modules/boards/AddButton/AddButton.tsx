import clsx from 'clsx';
import React from 'react';
import { PlusIcon } from 'src/components';

import { ExtendableProps } from 'src/components/types';

type Props = ExtendableProps<'button'>;

function AddButton({ className, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center justify-between px-4 py-2 text-sm leading-none text-blue-700 transition duration-200 ease-in-out bg-blue-100 rounded-md appearance-none select-none focus:outline-none focus:shadow-outline hover:bg-blue-200 hover:text-blue-800 active:bg-blue-100 active:text-blue-700',
        className,
      )}
    >
      {children}
      <PlusIcon className="w-4 h-4" />
    </button>
  );
}

export { AddButton };
