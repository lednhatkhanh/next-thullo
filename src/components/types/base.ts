import React from 'react';

export type ExtendableProps<Component extends React.ElementType, Props extends object = {}> = Omit<
  React.ComponentPropsWithoutRef<Component>,
  keyof Props
> &
  Props;

export type OverridableComponentProps<Component extends React.ElementType, Props extends object = {}> = ExtendableProps<
  Component,
  Props
> & { component?: Component };

export interface Container {
  children?: React.ReactNode;
}
