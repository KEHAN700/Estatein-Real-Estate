import { useState } from 'react';
import clsx from 'clsx';
import LogoMark from '@/assets/icons/logo-mark.svg?react';
import MailIcon from '@/assets/icons/mail.svg?react';
import PhoneIcon from '@/assets/icons/phone.svg?react';
import PinIcon from '@/assets/icons/pin.svg?react';
import handshake from '@/assets/images/gallery-handshake.webp';
import meeting from '@/assets/images/gallery-meeting.webp';
import office from '@/assets/images/gallery-office.webp';
import teamGroup from '@/assets/images/gallery-team-group.webp';
import teamPortrait from '@/assets/images/gallery-team-portrait.webp';
import teamWide from '@/assets/images/gallery-team-wide.webp';
import { useOffices } from '@/api/queries';
import type { OfficeKind } from '@/api/types';
import { OfficeCard } from '@/components/cards/OfficeCard';
import { ContactForm } from '@/components/forms/ContactForm';
import { PageIntro } from '@/components/sections/PageIntro';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Status } from '@/components/ui/Status';
import { usePageTitle } from '@/hooks/usePageTitle';
import s from './Contact.module.scss';

const contactLinks = [
  { icon: <MailIcon />, title: 'info@estatein.com', href: 'mailto:info@estatein.com' },
  { icon: <PhoneIcon />, title: '+1 (123) 456-7890', href: 'tel:+11234567890' },
  { icon: <PinIcon />, title: 'Main Headquarters', to: '#offices' },
  {
    icon: <LogoMark />,
    title: (
      <span className={s.socials}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
      </span>
    ),
  },
];

const tabs: { label: string; value?: OfficeKind }[] = [
  { label: 'All' },
  { label: 'Regional', value: 'regional' },
  { label: 'International', value: 'international' },
];

function Offices() {
  const [kind, setKind] = useState<OfficeKind | undefined>();
  const { data, isPending, isError } = useOffices(kind);

  return (
    <>
      <div className={s.tabs} role="tablist" aria-label="Office type">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={kind === tab.value}
            className={clsx(s.tab, kind === tab.value && s.tabActive)}
            onClick={() => setKind(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isPending && <Status state="loading" />}
      {isError && <Status state="error" />}
      {data && (
        <ul className={s.offices} role="tabpanel">
          {data.map((item) => (
            <li key={item.id}>
              <OfficeCard office={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function Contact() {
  usePageTitle('Contact Us');

  return (
    <>
      <PageIntro
        title="Get in Touch with Estatein"
        text="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation."
      />
      <QuickLinks items={contactLinks} />

      <section className={`container ${s.section}`} id="form">
        <SectionHeader
          title="Let's Connect"
          text="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need."
        />
        <ContactForm />
      </section>

      <section className={`container ${s.section}`} id="offices">
        <SectionHeader
          title="Discover Our Office Locations"
          text="Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you"
        />
        <Offices />
      </section>

      <section className={`container ${s.section}`}>
        <div className={s.gallery}>
          <div className={s.photos}>
            <img src={office} alt="Estatein open-plan office" className={s.office} loading="lazy" />
            <img src={teamWide} alt="Estatein agents" className={s.teamWide} loading="lazy" />
            <img src={meeting} alt="Team meeting around a table" className={s.meeting} loading="lazy" />
            <img src={teamGroup} alt="Estatein sales team" className={s.teamGroup} loading="lazy" />
            <img src={teamPortrait} alt="Estatein management team" className={s.teamPortrait} loading="lazy" />
          </div>
          <div className={s.galleryBottom}>
            <SectionHeader
              className={s.galleryHeader}
              title="Explore Estatein's World"
              text="Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better."
            />
            <img src={handshake} alt="Agent shaking hands with a client" className={s.handshake} loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
