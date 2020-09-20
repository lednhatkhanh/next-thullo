import React from 'react';
import clsx from 'clsx';
import { ExtendableProps } from '../types';

type BaseProps = {
  hasError?: boolean;
  isFullWidth?: boolean;
};
type Props = ExtendableProps<'textarea', BaseProps>;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(function Input(
  { className, hasError, isFullWidth = false, ...restProps },
  ref,
) {
  return (
    <textarea
      {...restProps}
      ref={ref}
      className={clsx(
        'px-4 py-2 text-sm text-gray-700 leading-none transition duration-200 ease-in-out border rounded-md appearance-none hover:bg-gray-100 focus:shadow-outline focus:outline-none',
        hasError && 'border-red-500',
        isFullWidth ? 'w-full' : 'w-64',
        className,
      )}
    />
  );
});

export { TextArea };
