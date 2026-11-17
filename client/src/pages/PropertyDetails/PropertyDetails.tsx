import { useParams } from 'react-router-dom';
import AreaIcon from '@/assets/icons/area.svg?react';
import BathIcon from '@/assets/icons/bath.svg?react';
import BedIcon from '@/assets/icons/bed.svg?react';
import BoltIcon from '@/assets/icons/bolt.svg?react';
import PinIcon from '@/assets/icons/pin.svg?react';
import { ApiError } from '@/api/http';
import { useProperty } from '@/api/queries';
import { PropertyInquiryForm } from '@/components/forms/PropertyInquiryForm';
import { FaqSection } from '@/components/sections/FaqSection';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Status } from '@/components/ui/Status';
import { usePageTitle } from '@/hooks/usePageTitle';
import { formatNumber, formatPrice, pad } from '@/lib/format';
import { Gallery } from './Gallery';
import { PricingDetails } from './PricingDetails';
import s from './PropertyDetails.module.scss';

export default function PropertyDetails() {
  const { slug } = useParams();
  const { data: property, isPending, error } = useProperty(slug);
  usePageTitle(property?.title ?? 'Property');

  if (isPending) {
    return (
      <div className={`container ${s.page}`}>
        <Status state="loading" />
      </div>
    );
  }

  if (error || !property) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div className={`container ${s.page} ${s.missing}`}>
        <Status
          state="error"
          message={notFound ? 'This property is no longer available.' : undefined}
        />
        <Button to="/properties" variant="primary">
          Browse Properties
        </Button>
      </div>
    );
  }

  const location = `${property.city}, ${property.state}`;

  return (
    <>
      <section className={`container ${s.page}`}>
        <header className={s.header}>
          <div className={s.heading}>
            <h1 className={s.title}>{property.title}</h1>
            <p className={s.location}>
              <PinIcon aria-hidden />
              {location}
            </p>
          </div>
          <div className={s.price}>
            <span>Price</span>
            <strong>{formatPrice(property.price)}</strong>
          </div>
        </header>

        <Gallery images={property.gallery} title={property.title} />

        <div className={s.info}>
          <article className={s.card}>
            <h2 className={s.cardTitle}>Description</h2>
            <p className={s.description}>{property.description}</p>
            <dl className={s.specs}>
              <div>
                <dt>
                  <BedIcon aria-hidden /> Bedrooms
                </dt>
                <dd>{pad(property.bedrooms)}</dd>
              </div>
              <div>
                <dt>
                  <BathIcon aria-hidden /> Bathrooms
                </dt>
                <dd>{pad(property.bathrooms)}</dd>
              </div>
              <div>
                <dt>
                  <AreaIcon aria-hidden /> Area
                </dt>
                <dd>{formatNumber(property.area)} Square Feet</dd>
              </div>
            </dl>
          </article>

          <article className={s.card}>
            <h2 className={s.cardTitle}>Key Features and Amenities</h2>
            <ul className={s.features}>
              {property.features.map((feature) => (
                <li key={feature}>
                  <BoltIcon aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={`container ${s.inquiry}`}>
        <SectionHeader
          className={s.inquiryHeader}
          title={`Inquire About ${property.title}`}
          text="Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have."
        />
        <PropertyInquiryForm slug={property.slug} label={`${property.title}, ${location}`} />
      </section>

      <section className={`container ${s.section}`}>
        <SectionHeader
          title="Comprehensive Pricing Details"
          text={`At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for ${property.title} to help you make an informed decision`}
        />
        <PricingDetails pricing={property.pricing} />
      </section>

      <FaqSection />
    </>
  );
}
