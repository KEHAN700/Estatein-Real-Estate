import clsx from 'clsx';
import type { ReactNode } from 'react';
import s from './Chip.module.scss';

interface Props {
  icon?: ReactNode;
  muted?: boolean;
  children: ReactNode;
  className?: string;
}

export function Chip({ icon, muted, children, className }: Props) {
  return (
    <span className={clsx(s.chip, muted && s.muted, className)}>
      {icon}
      {children}
    </span>
  );
}
