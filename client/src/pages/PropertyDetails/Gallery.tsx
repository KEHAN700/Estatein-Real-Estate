import clsx from 'clsx';
import { useState } from 'react';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import { assetUrl } from '@/api/http';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import s from './Gallery.module.scss';

interface Props {
  images: string[];
  title: string;
}

export function Gallery({ images, title }: Props) {
  const isMobile = useMediaQuery('(max-width: 767.98px)');
  const perView = isMobile ? 1 : 2;
  const pages = Math.ceil(images.length / perView);
  const [page, setPage] = useState(0);
  const current = Math.min(page, pages - 1);
  const visible = images.slice(current * perView, current * perView + perView);

  const go = (next: number) => setPage(Math.max(0, Math.min(pages - 1, next)));

  return (
    <div className={s.gallery}>
      <ul className={s.thumbs}>
        {images.map((src, i) => {
          const active = Math.floor(i / perView) === current;
          return (
            <li key={src + i}>
              <button
                type="button"
                className={clsx(s.thumb, active && s.thumbActive)}
                onClick={() => go(Math.floor(i / perView))}
                aria-label={`Show photo ${i + 1}`}
                aria-current={active || undefined}
              >
                <img src={assetUrl(src)} alt="" loading="lazy" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className={s.stage}>
        {visible.map((src, i) => (
          <img
            key={src + current}
            src={assetUrl(src)}
            alt={`${title} — photo ${current * perView + i + 1}`}
            className={s.image}
          />
        ))}
      </div>

      <div className={s.controls}>
        <button type="button" className={s.arrow} onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous photos">
          <ArrowLeft />
        </button>
        <div className={s.dots}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={clsx(s.dot, i === current && s.dotActive)}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button type="button" className={s.arrow} onClick={() => go(current + 1)} disabled={current === pages - 1} aria-label="Next photos">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
