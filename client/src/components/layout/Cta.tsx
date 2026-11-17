import { Button } from '@/components/ui/Button';
import s from './Cta.module.scss';

export function Cta() {
  return (
    <section className={s.cta}>
      <div className={`container ${s.inner}`}>
        <div className={s.text}>
          <h2 className={s.title}>Start Your Real Estate Journey Today</h2>
          <p className={s.description}>
            Your dream property is just a click away. Whether you're looking for a new home, a
            strategic investment, or expert real estate advice, Estatein is here to assist you every
            step of the way. Take the first step towards your real estate goals and explore our
            available properties or get in touch with our team for personalized assistance.
          </p>
        </div>
        <Button to="/properties" variant="primary" className={s.button}>
          Explore Properties
        </Button>
      </div>
    </section>
  );
}
