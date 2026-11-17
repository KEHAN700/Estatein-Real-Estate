import { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@/assets/icons/close.svg?react';
import s from './TopBanner.module.scss';

const STORAGE_KEY = 'estatein:banner-hidden';

const wasHidden = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

export function TopBanner() {
  const [hidden, setHidden] = useState(wasHidden);

  if (hidden) return null;

  const close = () => {
    setHidden(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode, nothing to do */
    }
  };

  return (
    <div className={s.banner}>
      <p className={s.text}>
        <span>✨Discover Your Dream Property with Estatein</span>{' '}
        <Link to="/properties" className={s.link}>
          Learn More
        </Link>
      </p>
      <button type="button" className={s.close} onClick={close} aria-label="Close banner">
        <CloseIcon aria-hidden />
      </button>
    </div>
  );
}
