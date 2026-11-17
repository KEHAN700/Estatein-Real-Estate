import { useFaqs } from '@/api/queries';
import { FaqCard } from '@/components/cards/FaqCard';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardCarousel } from './CardCarousel';
import s from './sections.module.scss';

export function FaqSection() {
  const { data, isPending, isError } = useFaqs();
  const viewAll = (
    <Button to="/contact#form" variant="secondary">
      View All FAQ’s
    </Button>
  );

  return (
    <section className={`container ${s.section}`} id="faq">
      <SectionHeader
        title="Frequently Asked Questions"
        text="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
        action={viewAll}
      />
      <CardCarousel
        items={data}
        isPending={isPending}
        isError={isError}
        mobileAction={viewAll}
        renderItem={(faq) => <FaqCard faq={faq} />}
      />
    </section>
  );
}
