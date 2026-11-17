import { assetUrl } from '@/api/http';
import type { Testimonial } from '@/api/types';
import { Stars } from '@/components/ui/Stars';
import s from './TestimonialCard.module.scss';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className={s.card}>
      <Stars value={testimonial.rating} />
      <blockquote className={s.quote}>
        <h3 className={s.title}>{testimonial.title}</h3>
        <p>{testimonial.text}</p>
      </blockquote>
      <figcaption className={s.author}>
        <img src={assetUrl(testimonial.avatar)} alt="" width={60} height={60} loading="lazy" />
        <div>
          <p className={s.name}>{testimonial.author}</p>
          <p className={s.location}>{testimonial.location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
