import clsx from 'clsx';
import React from 'react';

import { BaseButton, BaseButtonProps } from '../BaseButton';

type BaseProps = {
  isLoading?: boolean;
};

type Props = BaseButtonProps & BaseProps;

const IconButton = React.forwardRef<HTMLButtonElement, Props>(function IconButton(
  { disabled, className, isLoading, children, ...restProps },
  ref,
) {
  return (
    <BaseButton {...restProps} ref={ref} disabled={disabled || isLoading} className={clsx('p-2', className)}>
      {isLoading ? null : children}
    </BaseButton>
  );
});

export { IconButton };
