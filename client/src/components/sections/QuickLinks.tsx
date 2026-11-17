import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ArrowUpRight from '@/assets/icons/arrow-up-right.svg?react';
import { IconBadge } from '@/components/ui/IconBadge';
import s from './QuickLinks.module.scss';

export interface QuickLink {
  icon: ReactNode;
  title: ReactNode;
  to?: string;
  href?: string;
}

// The row of four cards under the page intro (Home, Services, Contact)
export function QuickLinks({ items, id }: { items: QuickLink[]; id?: string }) {
  return (
    <section className={s.strip} id={id}>
      <ul className={s.grid}>
        {items.map((item, i) => {
          const content = (
            <>
              <ArrowUpRight className={s.arrow} aria-hidden />
              <IconBadge>{item.icon}</IconBadge>
              <span className={s.title}>{item.title}</span>
            </>
          );

          return (
            <li key={i} className={s.item}>
              {item.to ? (
                <Link to={item.to} className={clsx(s.card, s.link)}>
                  {content}
                </Link>
              ) : item.href ? (
                <a href={item.href} className={clsx(s.card, s.link)}>
                  {content}
                </a>
              ) : (
                <div className={s.card}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
