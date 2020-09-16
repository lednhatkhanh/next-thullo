import clsx from 'clsx';
import React from 'react';

import { OverridableProps } from '../types';

type BaseProps = {
  variant?: 'filled' | 'outlined' | 'ghost';
  color?: 'default' | 'primary' | 'danger';
};
export type BaseButtonProps<E extends React.ElementType = 'button'> = OverridableProps<E, BaseProps>;

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(function BaseButton(
  { disabled, component, className, children, variant = 'filled', color = 'default', ...restProps },
  ref,
) {
  const Component = component ?? 'button';

  return (
    <Component
      ref={ref}
      {...restProps}
      disabled={disabled}
      className={clsx(
        'text-sm transition duration-200 ease-in-out rounded-md appearance-none flex justify-center items-center select-none focus:outline-none focus:shadow-outline disabled:opacity-75 disabled:cursor-not-allowed',
        {
          filled: {
            default: 'text-gray-900 bg-gray-400 shadow-md',
            primary: 'text-gray-100 bg-blue-700 shadow-md',
            danger: 'text-gray-100 bg-red-700 shadow-md',
          }[color],
          outlined: {
            default: 'border border-gray-400 text-gray-700',
            primary: 'border border-blue-700 text-blue-700',
            danger: 'border border-red-700 text-red-700',
          }[color],
          ghost: {
            default: 'text-gray-900',
            primary: 'text-blue-700',
            danger: 'text-red-700',
          }[color],
        }[variant],
        !disabled &&
          {
            filled: {
              default: 'hover:bg-gray-300 active:bg-gray-500',
              primary: 'hover:bg-blue-600 active:bg-blue-800',
              danger: 'hover:bg-red-600 active:bg-red-800',
            }[color],
            outlined: {
              default: 'hover:border-gray-300 hover:text-gray-600 active:border-gray-500 active:text-gray-800',
              primary: 'hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
              danger: 'hover:border-red-600 hover:text-red-600 active:border-red-800 active:text-red-800',
            }[color],
            ghost: {
              default: 'hover:bg-gray-200 active:bg-gray-300',
              primary: 'hover:bg-blue-200 active:bg-blue-300',
              danger: 'hover:bg-red-200 active:bg-red-300',
            }[color],
          }[variant],
        className,
      )}
    >
      {children}
    </Component>
  );
}) as <E extends React.ElementType = 'button'>(
  props: BaseButtonProps<E>,
  ref: HTMLButtonElement,
) => React.ReactElement<BaseButtonProps<E>>;

export { BaseButton };
