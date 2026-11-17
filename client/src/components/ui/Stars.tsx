import StarIcon from '@/assets/icons/rating-star.svg?react';
import s from './Stars.module.scss';

export function Stars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className={s.stars} role="img" aria-label={`Rated ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={s.star} data-active={i < value}>
          <StarIcon aria-hidden />
        </span>
      ))}
    </div>
  );
}
