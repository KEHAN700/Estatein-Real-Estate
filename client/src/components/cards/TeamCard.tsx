import SendIcon from '@/assets/icons/send-filled.svg?react';
import TwitterIcon from '@/assets/icons/twitter.svg?react';
import { Link } from 'react-router-dom';
import s from './TeamCard.module.scss';

interface Props {
  name: string;
  role: string;
  photo: string;
  twitter: string;
}

export function TeamCard({ name, role, photo, twitter }: Props) {
  return (
    <article className={s.card}>
      <div className={s.media}>
        <img src={photo} alt={name} width={316} height={253} loading="lazy" />
        <a
          href={twitter}
          target="_blank"
          rel="noreferrer"
          className={s.social}
          aria-label={`${name} on Twitter`}
        >
          <TwitterIcon aria-hidden />
        </a>
      </div>
      <div className={s.info}>
        <h3 className={s.name}>{name}</h3>
        <p className={s.role}>{role}</p>
      </div>
      <Link to="/contact#form" className={s.hello}>
        <span>Say Hello 👋</span>
        <span className={s.send}>
          <SendIcon aria-hidden />
        </span>
      </Link>
    </article>
  );
}
