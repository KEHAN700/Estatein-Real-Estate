import BuildingsIcon from '@/assets/icons/buildings.svg?react';
import CashIcon from '@/assets/icons/cash.svg?react';
import StorefrontIcon from '@/assets/icons/storefront.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';
import { HighlightCard } from '@/components/cards/HighlightCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { PageIntro } from '@/components/sections/PageIntro';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  investmentServices,
  managementServices,
  sellingServices,
  type Service,
} from '@/data/services';
import { usePageTitle } from '@/hooks/usePageTitle';
import s from './Services.module.scss';

const quickLinks = [
  { icon: <StorefrontIcon />, title: 'Find Your Dream Home', to: '/properties' },
  { icon: <CashIcon />, title: 'Unlock Property Value', to: '#selling' },
  { icon: <BuildingsIcon />, title: 'Effortless Property Management', to: '#management' },
  { icon: <SunIcon />, title: 'Smart Investments, Informed Decisions', to: '#investments' },
];

interface GroupProps {
  id: string;
  title: string;
  text: string;
  services: Service[];
  highlight: { title: string; text: string };
}

function ServiceGroup({ id, title, text, services, highlight }: GroupProps) {
  return (
    <section className={`container ${s.section}`} id={id}>
      <SectionHeader title={title} text={text} />
      <div className={s.grid}>
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
        <HighlightCard {...highlight} to="/contact#form" className={s.wide} />
      </div>
    </section>
  );
}

export default function Services() {
  usePageTitle('Services');

  return (
    <>
      <PageIntro
        title="Elevate Your Real Estate Experience"
        text="Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
      />
      <QuickLinks items={quickLinks} />

      <ServiceGroup
        id="selling"
        title="Unlock Property Value"
        text="Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey"
        services={sellingServices}
        highlight={{
          title: 'Unlock the Value of Your Property Today',
          text: 'Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset.',
        }}
      />

      <ServiceGroup
        id="management"
        title="Effortless Property Management"
        text="Owning a property should be a pleasure, not a hassle. Estatein's Property Management Service takes the stress out of property ownership, offering comprehensive solutions tailored to your needs. Explore the categories below to see how we can make property management effortless for you"
        services={managementServices}
        highlight={{
          title: 'Experience Effortless Property Management',
          text: 'Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership.',
        }}
      />

      <section className={`container ${s.section} ${s.investments}`} id="investments">
        <div className={s.investmentsIntro}>
          <SectionHeader
            className={s.flatHeader}
            title="Smart Investments, Informed Decisions"
            text="Building a real estate portfolio requires a strategic approach. Estatein's Investment Advisory Service empowers you to make smart investments and informed decisions."
          />
          <HighlightCard
            layout="stack"
            to="/contact#form"
            title="Unlock Your Investment Potential"
            text="Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
          />
        </div>
        <div className={s.investmentsGrid}>
          {investmentServices.map((service) => (
            <ServiceCard key={service.title} {...service} className={s.filled} />
          ))}
        </div>
      </section>
    </>
  );
}
