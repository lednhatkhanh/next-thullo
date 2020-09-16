import clsx from 'clsx';
import React from 'react';
import { BaseButton, BaseButtonProps } from '../BaseButton';

import { Spinner } from '../Spinner';

type BaseProps = {
  isLoading?: boolean;
  isFullWidth?: boolean;
  icon?: React.ReactNode;
};
export type ButtonProps<E extends React.ElementType = 'button'> = BaseButtonProps<E> & BaseProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { disabled, className, isLoading, isFullWidth, children, icon, ...restProps },
  ref,
) {
  return (
    <BaseButton
      {...restProps}
      ref={ref}
      disabled={disabled || isLoading}
      className={clsx('px-4 py-2 gap-x-3', isFullWidth && 'w-full', className)}
    >
      {isLoading ? <Spinner className="w-5 h-5" /> : icon}
      {children}
    </BaseButton>
  );
}) as <E extends React.ElementType = 'button'>(
  props: ButtonProps<E>,
  ref: HTMLButtonElement,
) => React.ReactElement<ButtonProps<E>>;

export { Button };
