import clsx from 'clsx';
import React from 'react';

import { ExtendableProps } from '../types';
import { Typography } from '../Typography';

type BaseProps = {
  isError?: boolean;
};
type Props = ExtendableProps<'span', BaseProps>;

function FormHelperText({ className, children, isError, ...restProps }: Props) {
  return (
    <Typography {...restProps} component="span" size="sm" className={clsx(isError && 'text-red-700', className)}>
      {children}
    </Typography>
  );
}

export { FormHelperText };
