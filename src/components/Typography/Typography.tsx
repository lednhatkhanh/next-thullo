import clsx from 'clsx';
import React from 'react';
import { OverridableComponentProps } from '../types';

type BaseProps = { size: 'sm' | 'lg' | 'xl' | '2xl' };
type Props<C extends React.ElementType> = OverridableComponentProps<C, BaseProps>;

function Typography<C extends React.ElementType = 'p'>({
  component,
  children,
  className,
  size,
  ...restProps
}: Props<C>) {
  const Component = component ?? 'h1';
  return (
    <Component
      {...restProps}
      className={clsx('prose', { sm: 'prose-sm', lg: 'prose-lg', xl: 'prose-xl', '2xl': 'prose-2xl' }[size], className)}
    >
      {children}
    </Component>
  );
}

export { Typography };
