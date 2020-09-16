import clsx from 'clsx';
import React from 'react';
import { ExtendableProps } from '../types';

type BaseProps = {
  size?: 'sm' | 'md';
};
type Props = ExtendableProps<'img', BaseProps>;

function Avatar({ className, alt, size = 'md', ...restProps }: Props) {
  return (
    <img
      {...restProps}
      className={clsx('rounded-full object-cover', { md: 'w-10 h-10', sm: 'w-8 h-8' }[size], className)}
      alt={alt}
    />
  );
}

export { Avatar };
