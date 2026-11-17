import { useEffect, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

interface Options {
  desktop?: number;
  tablet?: number;
  mobile?: number;
}

// Pages through a list in chunks that depend on the screen size.
export function useCarousel<T>(
  items: T[] = [],
  { desktop = 3, tablet = 2, mobile = 1 }: Options = {},
) {
  const isTablet = useMediaQuery('(max-width: 1023.98px)');
  const isMobile = useMediaQuery('(max-width: 767.98px)');
  const perView = isMobile ? mobile : isTablet ? tablet : desktop;

  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / perView));

  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  return {
    visible: items.slice(page * perView, page * perView + perView),
    page: page + 1,
    pages,
    hasPrev: page > 0,
    hasNext: page < pages - 1,
    prev: () => setPage((p) => Math.max(0, p - 1)),
    next: () => setPage((p) => Math.min(pages - 1, p + 1)),
  };
}
