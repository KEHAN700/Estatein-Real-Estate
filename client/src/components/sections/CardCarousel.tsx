import type { ReactNode } from 'react';
import { SliderControls } from '@/components/ui/SliderControls';
import { Status } from '@/components/ui/Status';
import { useCarousel } from '@/hooks/useCarousel';
import s from './sections.module.scss';

interface Props<T extends { id: number }> {
  items: T[] | undefined;
  isPending: boolean;
  isError: boolean;
  renderItem: (item: T) => ReactNode;
  mobileAction?: ReactNode;
  perView?: { desktop?: number; tablet?: number; mobile?: number };
  className?: string;
}

export function CardCarousel<T extends { id: number }>({
  items,
  isPending,
  isError,
  renderItem,
  mobileAction,
  perView,
  className,
}: Props<T>) {
  const carousel = useCarousel(items, perView);

  if (isPending) return <Status state="loading" />;
  if (isError || !items) return <Status state="error" />;
  if (!items.length) return <Status state="empty" />;

  return (
    <>
      <ul className={className ?? s.grid}>
        {carousel.visible.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
      <SliderControls
        page={carousel.page}
        pages={carousel.pages}
        hasPrev={carousel.hasPrev}
        hasNext={carousel.hasNext}
        onPrev={carousel.prev}
        onNext={carousel.next}
        mobileAction={mobileAction}
      />
    </>
  );
}
