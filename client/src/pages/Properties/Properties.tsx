import { useSearchParams } from 'react-router-dom';
import { useProperties } from '@/api/queries';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { PropertyRequestForm } from '@/components/forms/PropertyRequestForm';
import { PageIntro } from '@/components/sections/PageIntro';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SliderControls } from '@/components/ui/SliderControls';
import { Status } from '@/components/ui/Status';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePageTitle } from '@/hooks/usePageTitle';
import { SearchPanel, type FilterValues } from './SearchPanel';
import s from './Properties.module.scss';

const FILTER_KEYS = ['q', 'location', 'type', 'price', 'size', 'year'] as const;

export default function Properties() {
  usePageTitle('Properties');
  const [params, setParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 767.98px)');
  const isTablet = useMediaQuery('(max-width: 1023.98px)');

  const filters: FilterValues = Object.fromEntries(
    FILTER_KEYS.map((key) => [key, params.get(key) ?? undefined]).filter(([, v]) => v),
  );
  const page = Number(params.get('page')) || 1;
  const limit = isMobile ? 1 : isTablet ? 2 : 3;

  const { data, isPending, isError, isPlaceholderData } = useProperties({
    ...filters,
    page,
    limit,
  });

  const update = (next: FilterValues, nextPage = 1) => {
    const search = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => value && search.set(key, value));
    if (nextPage > 1) search.set('page', String(nextPage));
    setParams(search, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <PageIntro
        title="Find Your Dream Property"
        text="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey"
      />
      <SearchPanel values={filters} onChange={(next) => update(next)} />

      <section className={`container ${s.section}`} id="portfolio">
        <SectionHeader
          title="Discover a World of Possibilities"
          text="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
        />

        {isPending && <Status state="loading" />}
        {isError && <Status state="error" />}
        {data && data.total === 0 && (
          <Status
            state="empty"
            message="No properties match your search. Try changing the filters."
          />
        )}

        {data && data.total > 0 && (
          <>
            <ul className={s.grid} data-loading={isPlaceholderData}>
              {data.items.map((property) => (
                <li key={property.id}>
                  <PropertyCard property={property} variant="listing" />
                </li>
              ))}
            </ul>
            <SliderControls
              page={data.page}
              pages={data.pages}
              hasPrev={data.page > 1}
              hasNext={data.page < data.pages}
              onPrev={() => update(filters, data.page - 1)}
              onNext={() => update(filters, data.page + 1)}
            />
          </>
        )}
      </section>

      <section className={`container ${s.section}`}>
        <SectionHeader
          title="Let's Make it Happen"
          text="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
        />
        <PropertyRequestForm />
      </section>
    </>
  );
}
