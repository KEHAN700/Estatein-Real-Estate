import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import s from './HighlightCard.module.scss';

interface Props {
  title: string;
  text: string;
  to: string;
  layout?: 'row' | 'stack';
  className?: string;
}

export function HighlightCard({ title, text, to, layout = 'row', className }: Props) {
  return (
    <article className={clsx(s.card, s[layout], className)}>
      <h3 className={s.title}>{title}</h3>
      <p className={s.text}>{text}</p>
      <Button to={to} variant="dark" className={s.button}>
        Learn More
      </Button>
    </article>
  );
}
