import clsx from 'clsx';
import type { ReactNode } from 'react';
import s from './IconBadge.module.scss';

interface Props {
  children: ReactNode;
  size?: 'md' | 'sm';
  className?: string;
}

// Icon inside two thin rings that fade out towards the bottom right
export function IconBadge({ children, size = 'md', className }: Props) {
  return (
    <span className={clsx(s.badge, s[size], className)} aria-hidden>
      <span className={s.inner}>{children}</span>
    </span>
  );
}
