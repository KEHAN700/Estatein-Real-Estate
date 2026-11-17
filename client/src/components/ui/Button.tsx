import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import s from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'outline' | 'dark';

interface BaseProps {
  variant?: Variant;
  block?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & ComponentPropsWithoutRef<'button'> & { to?: never };
type LinkButtonProps = BaseProps & LinkProps;

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = 'secondary', block, icon, className, children, ...rest } = props;
  const classes = clsx(s.button, s[variant], block && s.block, className);
  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link className={classes} {...(rest as LinkProps)}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {content}
    </button>
  );
}
