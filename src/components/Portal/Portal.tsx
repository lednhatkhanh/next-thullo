import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};

function Portal({ children }: Props) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!container && typeof document !== 'undefined') {
      const newContainer = document.createElement('div');
      document.body.appendChild(newContainer);
      setContainer(newContainer);
    }

    return () => {
      if (container) {
        container.parentElement?.removeChild(container);
        setContainer(null);
      }
    };
  }, [container]);

  return container ? ReactDOM.createPortal(children, container) : null;
}

export { Portal };
