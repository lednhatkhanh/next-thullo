import clsx from 'clsx';
import React from 'react';

import { Spinner } from '../Spinner';
import { ExtendableProps } from '../types';

type BaseProps = {
  variant?: 'default' | 'primary' | 'ghost';
  isLoading?: boolean;
  isFullWidth?: boolean;
  icon?: React.ReactNode;
};
type Props = ExtendableProps<'button', BaseProps>;

const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'default', disabled, className, isLoading, isFullWidth, children, icon, ...restProps },
  ref,
) {
  return (
    <button
      {...restProps}
      ref={ref}
      disabled={disabled || isLoading}
      className={clsx(
        'px-4 py-2 text-sm transition duration-200 ease-in-out rounded-md appearance-none flex justify-center gap-x-3 items-center select-none focus:outline-none focus:shadow-outline disabled:opacity-75 disabled:cursor-not-allowed',
        {
          default: 'text-gray-900 bg-gray-400 shadow-md',
          primary: 'text-gray-100 bg-blue-700 shadow-md',
          ghost: 'text-blue-700',
        }[variant],
        !disabled &&
          !isLoading &&
          {
            default: 'hover:bg-gray-300 active:bg-gray-500',
            primary: 'hover:bg-blue-600 active:bg-blue-800',
            ghost: 'hover:text-blue-600 active:text-blue-800 hover:bg-blue-100 active:bg-blue-200',
          }[variant],
        isFullWidth && 'w-full',
        className,
      )}
    >
      {isLoading ? <Spinner className="w-5 h-5" /> : icon}
      {children}
    </button>
  );
});

export { Button };
