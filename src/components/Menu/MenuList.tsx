import React from 'react';
import { MenuList as ReachMenuList } from '@reach/menu-button';

import { ExtendableProps } from '../types';

type Props = ExtendableProps<typeof ReachMenuList>;

function MenuList({ children, ...rest }: Props) {
  return <ReachMenuList {...rest}>{children}</ReachMenuList>;
}

export { MenuList };
