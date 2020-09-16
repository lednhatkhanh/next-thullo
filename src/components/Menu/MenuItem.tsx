import React from 'react';
import { MenuItem as ReachMenuItem, MenuItemProps } from '@reach/menu-button';

type Props = MenuItemProps;

function MenuItem({ children, ...rest }: Props) {
  return <ReachMenuItem {...rest}>{children}</ReachMenuItem>;
}

export { MenuItem };
