import { useId, useState } from 'react';
import type { Faq } from '@/api/types';
import { Button } from '@/components/ui/Button';
import s from './FaqCard.module.scss';

export function FaqCard({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <article className={s.card}>
      <h3 className={s.question}>{faq.question}</h3>
      <p id={answerId} className={s.text} aria-live="polite">
        {open ? faq.answer : faq.teaser}
      </p>
      <Button
        className={s.button}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={answerId}
      >
        {open ? 'Show Less' : 'Read More'}
      </Button>
    </article>
  );
}
