import BoltIcon from '@/assets/icons/bolt-outline.svg?react';
import GridIcon from '@/assets/icons/grid.svg?react';
import type { Client } from '@/api/types';
import s from './ClientCard.module.scss';

export function ClientCard({ client }: { client: Client }) {
  return (
    <article className={s.card}>
      <header className={s.header}>
        <div>
          <p className={s.since}>Since {client.since}</p>
          <h3 className={s.name}>{client.name}</h3>
        </div>
        <a href={client.website} target="_blank" rel="noreferrer" className={s.visit}>
          Visit Website
        </a>
      </header>

      <dl className={s.meta}>
        <div>
          <dt>
            <GridIcon aria-hidden /> Domain
          </dt>
          <dd>{client.domain}</dd>
        </div>
        <div>
          <dt>
            <BoltIcon aria-hidden /> Category
          </dt>
          <dd>{client.category}</dd>
        </div>
      </dl>

      <blockquote className={s.quote}>
        <p className={s.quoteLabel}>What They Said 🤗</p>
        <p>{client.quote}</p>
      </blockquote>
    </article>
  );
}
