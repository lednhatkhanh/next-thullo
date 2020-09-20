import React from 'react';

export function useDisclosure() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onOpen, onClose };
}
