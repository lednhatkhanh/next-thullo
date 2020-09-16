import React from 'react';
import { MenuButton as ReachMenuButton, MenuButtonProps } from '@reach/menu-button';
import { Button, ButtonProps } from '../Button';

type Props = ButtonProps & MenuButtonProps;

function MenuButton({ children, ...rest }: Props) {
  return (
    <ReachMenuButton {...rest} as={Button}>
      {children}
    </ReachMenuButton>
  );
}

export { MenuButton };
