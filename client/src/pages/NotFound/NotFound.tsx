import { Button } from '@/components/ui/Button';
import { usePageTitle } from '@/hooks/usePageTitle';
import s from './NotFound.module.scss';

export default function NotFound() {
  usePageTitle('Page not found');

  return (
    <section className={`container ${s.page}`}>
      <p className={s.code}>404</p>
      <h1 className={s.title}>This page took a different route</h1>
      <p className={s.text}>The page you are looking for doesn't exist or was moved. Let's get you back on track.</p>
      <div className={s.actions}>
        <Button to="/" variant="outline">
          Back to Home
        </Button>
        <Button to="/properties" variant="primary">
          Browse Properties
        </Button>
      </div>
    </section>
  );
}
