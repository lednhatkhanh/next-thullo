import clsx from 'clsx';
import React from 'react';

import { ExtendableProps } from '../types';

type Props = ExtendableProps<'div'>;

function FormControl({ className, children, ...restProps }: Props) {
  return (
    <div {...restProps} className={clsx('flex flex-col gap-y-2', className)}>
      {children}
    </div>
  );
}

export { FormControl };
