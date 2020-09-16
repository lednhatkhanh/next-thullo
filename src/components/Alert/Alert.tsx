import clsx from 'clsx';
import React from 'react';
import { Alert as ReachAlert } from '@reach/alert';
import { ExtendableProps } from '../types';

type Props = ExtendableProps<'div', {}>;

function Alert({ className, children }: Props) {
  return (
    <ReachAlert
      className={clsx(
        'flex items-center w-full px-4 py-2 prose-sm prose border-l-4 gap-x-2 border-red-600 bg-red-100 text-red-700',
        className,
      )}
    >
      {children}
    </ReachAlert>
  );
}

export { Alert };
