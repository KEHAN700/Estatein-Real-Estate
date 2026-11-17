import BuildingsIcon from '@/assets/icons/buildings.svg?react';
import CashIcon from '@/assets/icons/cash.svg?react';
import StorefrontIcon from '@/assets/icons/storefront.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';
import heroImage from '@/assets/images/hero-building.webp';
import { FaqSection } from '@/components/sections/FaqSection';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { Testimonials } from '@/components/sections/Testimonials';
import { Button } from '@/components/ui/Button';
import { CircleBadge } from '@/components/ui/CircleBadge';
import { StatCard } from '@/components/ui/StatCard';
import { stats } from '@/data/company';
import { usePageTitle } from '@/hooks/usePageTitle';
import s from './Home.module.scss';

const quickLinks = [
  { icon: <StorefrontIcon />, title: 'Find Your Dream Home', to: '/properties' },
  { icon: <CashIcon />, title: 'Unlock Property Value', to: '/services#selling' },
  { icon: <BuildingsIcon />, title: 'Effortless Property Management', to: '/services#management' },
  {
    icon: <SunIcon />,
    title: 'Smart Investments, Informed Decisions',
    to: '/services#investments',
  },
];

export default function Home() {
  usePageTitle();

  return (
    <>
      <section className={s.hero} id="hero">
        <div className={s.content}>
          <div className={s.intro}>
            <h1 className={s.title}>Discover Your Dream Property with Estatein</h1>
            <p className={s.text}>
              Your journey to finding the perfect property begins here. Explore our listings to find
              the home that matches your dreams.
            </p>
          </div>

          <div className={s.actions}>
            <Button to="/about" variant="outline">
              Learn More
            </Button>
            <Button to="/properties" variant="primary">
              Browse Properties
            </Button>
          </div>

          <dl className={s.stats}>
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </dl>
        </div>

        <div className={s.visual}>
          <img src={heroImage} alt="Modern glass skyscraper" width={920} height={814} />
        </div>

        <CircleBadge to="/properties" text="Discover Your Dream Property ✨ " className={s.badge} />
      </section>

      <div id="features">
        <QuickLinks items={quickLinks} />
      </div>
      <FeaturedProperties />
      <Testimonials />
      <FaqSection />
    </>
  );
}
