import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import FacebookIcon from '@/assets/icons/facebook.svg?react';
import LinkedinIcon from '@/assets/icons/linkedin.svg?react';
import MailIcon from '@/assets/icons/mail-outline.svg?react';
import SendIcon from '@/assets/icons/send.svg?react';
import TwitterIcon from '@/assets/icons/twitter.svg?react';
import YoutubeIcon from '@/assets/icons/youtube.svg?react';
import { useSubmitForm } from '@/api/queries';
import { Logo } from '@/components/ui/Logo';
import s from './Footer.module.scss';

const columns = [
  {
    title: 'Home',
    to: '/',
    links: [
      { label: 'Hero Section', to: '/#hero' },
      { label: 'Features', to: '/#features' },
      { label: 'Properties', to: '/#properties' },
      { label: 'Testimonials', to: '/#testimonials' },
      { label: 'FAQ’s', to: '/#faq' },
    ],
  },
  {
    title: 'About Us',
    to: '/about',
    links: [
      { label: 'Our Story', to: '/about#story' },
      { label: 'Our Works', to: '/about#achievements' },
      { label: 'How It Works', to: '/about#process' },
      { label: 'Our Team', to: '/about#team' },
      { label: 'Our Clients', to: '/about#clients' },
    ],
  },
  {
    title: 'Properties',
    to: '/properties',
    links: [
      { label: 'Portfolio', to: '/properties#portfolio' },
      { label: 'Categories', to: '/properties#search' },
    ],
  },
  {
    title: 'Services',
    to: '/services',
    links: [
      { label: 'Valuation Mastery', to: '/services#selling' },
      { label: 'Strategic Marketing', to: '/services#selling' },
      { label: 'Negotiation Wizardry', to: '/services#selling' },
      { label: 'Closing Success', to: '/services#selling' },
      { label: 'Property Management', to: '/services#management' },
    ],
  },
  {
    title: 'Contact Us',
    to: '/contact',
    links: [
      { label: 'Contact Form', to: '/contact#form' },
      { label: 'Our Offices', to: '/contact#offices' },
    ],
  },
];

const socials = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
  { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
  { label: 'YouTube', href: 'https://youtube.com', Icon: YoutubeIcon },
];

const subscribeSchema = z.object({ email: z.string().trim().email('Enter a valid email') });

function Subscribe() {
  const { register, handleSubmit, reset, formState } = useForm<{ email: string }>({
    resolver: zodResolver(subscribeSchema),
  });
  const { mutateAsync, isPending } = useSubmitForm<{ email: string }>('subscribe');
  const [note, setNote] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await mutateAsync(values);
      reset();
      setNote(res.message);
    } catch {
      setNote('Could not subscribe right now, please try again.');
    }
  });

  return (
    <form className={s.subscribe} onSubmit={onSubmit} noValidate>
      <label className={s.input}>
        <MailIcon aria-hidden />
        <span className="visually-hidden">Email address</span>
        <input type="email" placeholder="Enter Your Email" autoComplete="email" {...register('email')} />
        <button type="submit" className={s.send} disabled={isPending} aria-label="Subscribe">
          <SendIcon aria-hidden />
        </button>
      </label>
      {(formState.errors.email || note) && (
        <p className={s.note} role="status">
          {formState.errors.email?.message ?? note}
        </p>
      )}
    </form>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.top}`}>
        <div className={s.brand}>
          <Logo className={s.logo} />
          <Subscribe />
        </div>

        <nav className={s.columns} aria-label="Footer">
          {columns.map((col) => (
            <div key={col.title} className={s.column}>
              <Link to={col.to} className={s.columnTitle}>
                {col.title}
              </Link>
              <ul className={s.links}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={s.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={s.bottom}>
        <div className={`container ${s.bottomInner}`}>
          <div className={s.legal}>
            <p>@{new Date().getFullYear()} Estatein. All Rights Reserved.</p>
            <Link to="/terms" className={s.link}>
              Terms & Conditions
            </Link>
          </div>
          <ul className={s.socials}>
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className={s.social} aria-label={label}>
                  <Icon aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
