import React from 'react';
import clsx from 'clsx';

import { Typography } from '../Typography';
import { ExtendableProps } from '../types';

type Props = ExtendableProps<'label'>;

function Label({ className, children, ...restProps }: Props) {
  return (
    <Typography {...restProps} component="label" size="sm" className={clsx('font-semibold', className)}>
      {children}
    </Typography>
  );
}

export { Label };
