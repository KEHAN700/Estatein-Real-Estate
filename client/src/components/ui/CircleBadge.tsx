import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ArrowUpRight from '@/assets/icons/arrow-up-right.svg?react';
import s from './CircleBadge.module.scss';

interface Props {
  to: string;
  text: string;
  className?: string;
}

// Round link with text running along its edge
export function CircleBadge({ to, text, className }: Props) {
  return (
    <Link to={to} className={clsx(s.badge, className)} aria-label={text}>
      <svg className={s.ring} viewBox="0 0 100 100" aria-hidden>
        <defs>
          <path id="circle-badge-path" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text>
          <textPath href="#circle-badge-path" textLength="250">
            {text}
          </textPath>
        </text>
      </svg>
      <span className={s.center}>
        <ArrowUpRight aria-hidden />
      </span>
    </Link>
  );
}
