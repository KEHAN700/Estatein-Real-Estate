import { useLocation } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import s from './Legal.module.scss';

const content = {
  terms: {
    title: 'Terms of Use',
    sections: [
      ['Using the website', 'By using Estatein you agree to these terms. The listings, prices and descriptions on this site are provided for information only and may change without notice.'],
      ['Listings and pricing', 'We do our best to keep every listing accurate, but final prices, availability and fees are confirmed only in a signed agreement with the property owner.'],
      ['Your account and messages', 'When you send us a request you confirm that the details you provide are correct and that you are allowed to share them.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['What we collect', 'We only store the information you send through our forms: your name, contact details and message.'],
      ['How we use it', 'Your details are used to answer your request and, if you subscribed, to send you our newsletter. We never sell your data.'],
      ['Your rights', 'You can ask us to update or delete your information at any time by writing to info@estatein.com.'],
    ],
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const page = pathname.includes('privacy') ? content.privacy : content.terms;
  usePageTitle(page.title);

  return (
    <article className={`container ${s.page}`}>
      <h1 className={s.title}>{page.title}</h1>
      <p className={s.updated}>Last updated: January 2026</p>
      {page.sections.map(([heading, text]) => (
        <section key={heading} className={s.section}>
          <h2>{heading}</h2>
          <p>{text}</p>
        </section>
      ))}
    </article>
  );
}
