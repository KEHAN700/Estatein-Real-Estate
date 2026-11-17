import { useEffect } from 'react';

export function useLockBody(locked: boolean) {
  useEffect(() => {
    document.body.classList.toggle('is-locked', locked);
    return () => document.body.classList.remove('is-locked');
  }, [locked]);
}
