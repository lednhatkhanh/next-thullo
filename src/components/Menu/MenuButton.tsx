import React from 'react';
import { MenuButton as ReachMenuButton, MenuButtonProps } from '@reach/menu-button';
import { Button } from '../Button';
import { ExtendableProps } from '../types';

type Props = ExtendableProps<typeof Button, MenuButtonProps>;

function MenuButton({ children, ...rest }: Props) {
  return (
    <ReachMenuButton {...rest} as={Button}>
      {children}
    </ReachMenuButton>
  );
}

export { MenuButton };
