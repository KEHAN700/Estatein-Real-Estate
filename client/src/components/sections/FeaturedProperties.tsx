import { useProperties } from '@/api/queries';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardCarousel } from './CardCarousel';
import s from './sections.module.scss';

export function FeaturedProperties() {
  const { data, isPending, isError } = useProperties({ limit: 24 });
  const viewAll = (
    <Button to="/properties" variant="secondary">
      View All Properties
    </Button>
  );

  return (
    <section className={`container ${s.section}`} id="properties">
      <SectionHeader
        title="Featured Properties"
        text={
          <>
            Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional
            homes and investments available through Estatein.{' '}
            <span className={s.desktopOnly}>Click "View Details" for more information.</span>
          </>
        }
        action={viewAll}
      />
      <CardCarousel
        items={data?.items}
        isPending={isPending}
        isError={isError}
        mobileAction={viewAll}
        renderItem={(property) => <PropertyCard property={property} />}
      />
    </section>
  );
}
