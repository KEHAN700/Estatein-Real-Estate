import clsx from 'clsx';
import type { ReactNode } from 'react';
import SectionMark from '@/assets/icons/section-mark.svg?react';
import s from './SectionHeader.module.scss';

interface Props {
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeader({ title, text, action, as: Heading = 'h2', className }: Props) {
  return (
    <div className={clsx(s.header, className)}>
      <div className={s.text}>
        <SectionMark className={s.mark} aria-hidden />
        <Heading className={s.title}>{title}</Heading>
        {text && <p className={s.description}>{text}</p>}
      </div>
      {action && <div className={s.action}>{action}</div>}
    </div>
  );
}
