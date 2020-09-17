import React from 'react';
import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';

import { ExtendableProps } from '../types';

type BaseProps = Pick<LinkProps, 'href' | 'as' | 'replace' | 'shallow'>;
type Props = ExtendableProps<'a', BaseProps>;

function Link({ children, className, href, as, replace, shallow, ...rest }: Props) {
  return (
    <NextLink href={href} as={as} replace={replace} shallow={shallow}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        {...rest}
        className={clsx(
          'block text-sm text-blue-700 transition duration-200 ease-in-out hover:underline focus:outline-none focus:shadow-outline',
          className,
        )}
      >
        {children}
      </a>
    </NextLink>
  );
}

export { Link };
