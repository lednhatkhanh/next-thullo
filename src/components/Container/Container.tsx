import clsx from 'clsx';
import React from 'react';
import { ExtendableProps } from '../types';

type Props = ExtendableProps<'main'>;

function Container({ children, className, ...rest }: Props) {
  return (
    <main {...rest} className={clsx('container mx-auto', className)}>
      {children}
    </main>
  );
}

export { Container };
