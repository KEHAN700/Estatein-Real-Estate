import { useTestimonials } from '@/api/queries';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardCarousel } from './CardCarousel';
import s from './sections.module.scss';

export function Testimonials() {
  const { data, isPending, isError } = useTestimonials();
  const viewAll = (
    <Button to="/about#clients" variant="secondary">
      View All Testimonials
    </Button>
  );

  return (
    <section className={`container ${s.section}`} id="testimonials">
      <SectionHeader
        title="What Our Clients Say"
        text="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
        action={viewAll}
      />
      <CardCarousel
        items={data}
        isPending={isPending}
        isError={isError}
        mobileAction={viewAll}
        renderItem={(item) => <TestimonialCard testimonial={item} />}
      />
    </section>
  );
}
