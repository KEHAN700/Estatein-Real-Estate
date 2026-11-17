import clsx from 'clsx';
import type { ReactNode } from 'react';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import { pad } from '@/lib/format';
import s from './SliderControls.module.scss';

interface Props {
  page: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  // shown instead of the section action button on mobile
  mobileAction?: ReactNode;
  className?: string;
}

export function SliderControls({ page, pages, hasPrev, hasNext, onPrev, onNext, mobileAction, className }: Props) {
  return (
    <div className={clsx(s.controls, className)}>
      <p className={s.counter}>
        <span>{pad(page)}</span> of {pad(pages)}
      </p>
      {mobileAction && <div className={s.action}>{mobileAction}</div>}
      <div className={s.buttons}>
        <button type="button" className={s.arrow} onClick={onPrev} disabled={!hasPrev} aria-label="Previous">
          <ArrowLeft />
        </button>
        <p className={clsx(s.counter, s.counterMobile)}>
          <span>{pad(page)}</span> of {pad(pages)}
        </p>
        <button type="button" className={s.arrow} onClick={onNext} disabled={!hasNext} aria-label="Next">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
