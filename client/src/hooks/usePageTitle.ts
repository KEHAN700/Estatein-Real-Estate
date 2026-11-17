import { useEffect } from 'react';

const SITE = 'Estatein';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} — Discover Your Dream Property`;
  }, [title]);
}
