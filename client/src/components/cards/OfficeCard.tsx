import MailIcon from '@/assets/icons/mail.svg?react';
import PhoneIcon from '@/assets/icons/phone.svg?react';
import PinIcon from '@/assets/icons/pin.svg?react';
import type { Office } from '@/api/types';
import s from './OfficeCard.module.scss';

export function OfficeCard({ office }: { office: Office }) {
  return (
    <article className={s.card}>
      <div>
        <p className={s.label}>{office.label}</p>
        <h3 className={s.address}>{office.address}</h3>
        <p className={s.text}>{office.description}</p>
      </div>
      <ul className={s.contacts}>
        <li>
          <a href={`mailto:${office.email}`}>
            <MailIcon aria-hidden /> {office.email}
          </a>
        </li>
        <li>
          <a href={`tel:${office.phone.replace(/[^\d+]/g, '')}`}>
            <PhoneIcon aria-hidden /> {office.phone}
          </a>
        </li>
        <li>
          <span>
            <PinIcon aria-hidden /> {office.city}
          </span>
        </li>
      </ul>
      <a href={office.mapUrl} target="_blank" rel="noreferrer" className={s.direction}>
        Get Direction
      </a>
    </article>
  );
}
