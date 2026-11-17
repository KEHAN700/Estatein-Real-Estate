import clsx from 'clsx';
import type { ComponentType, SVGProps } from 'react';
import { IconBadge } from '@/components/ui/IconBadge';
import s from './ServiceCard.module.scss';

interface Props {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, text, className }: Props) {
  return (
    <article className={clsx(s.card, className)}>
      <div className={s.head}>
        <IconBadge>
          <Icon />
        </IconBadge>
        <h3 className={s.title}>{title}</h3>
      </div>
      <p className={s.text}>{text}</p>
    </article>
  );
}
