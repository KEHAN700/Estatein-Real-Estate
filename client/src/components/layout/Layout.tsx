import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Status } from '@/components/ui/Status';
import { Cta } from './Cta';
import { Footer } from './Footer';
import { Header } from './Header';
import { TopBanner } from './TopBanner';
import s from './Layout.module.scss';

// Scroll to top on page change, or to the #section when the link has a hash
function useScrollManagement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // wait a tick so lazy sections are in the DOM
    const timer = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
}

export function Layout() {
  useScrollManagement();

  return (
    <>
      <TopBanner />
      <Header />
      <main className={s.main}>
        <Suspense fallback={<Status state="loading" className={s.fallback} />}>
          <Outlet />
        </Suspense>
      </main>
      <Cta />
      <Footer />
    </>
  );
}
