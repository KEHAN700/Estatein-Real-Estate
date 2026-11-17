import type { ReactNode } from 'react';
import s from './PageIntro.module.scss';

interface Props {
  title: string;
  text: string;
  children?: ReactNode;
}

// Title block at the top of inner pages
export function PageIntro({ title, text, children }: Props) {
  return (
    <section className={s.intro}>
      <div className="container">
        <h1 className={s.title}>{title}</h1>
        <p className={s.text}>{text}</p>
      </div>
      {children}
    </section>
  );
}
