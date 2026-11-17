import { Link } from 'react-router-dom';
import BathIcon from '@/assets/icons/bath.svg?react';
import BedIcon from '@/assets/icons/bed.svg?react';
import BuildingIcon from '@/assets/icons/building.svg?react';
import { assetUrl } from '@/api/http';
import type { PropertySummary } from '@/api/types';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { formatPrice } from '@/lib/format';
import s from './PropertyCard.module.scss';

interface Props {
  property: PropertySummary;
  variant?: 'featured' | 'listing';
}

export function PropertyCard({ property, variant = 'featured' }: Props) {
  const url = `/properties/${property.slug}`;
  const isFeatured = variant === 'featured';

  return (
    <article className={s.card}>
      <Link to={url} className={s.media} tabIndex={-1} aria-hidden>
        <img src={assetUrl(property.cover)} alt="" loading="lazy" width={432} height={318} />
      </Link>

      <div className={s.body}>
        {!isFeatured && <Chip className={s.tagline}>{property.tagline}</Chip>}

        <div>
          <h3 className={s.title}>
            <Link to={url}>{property.title}</Link>
          </h3>
          <p className={s.text}>
            {isFeatured ? property.summary : property.excerpt}...{' '}
            <Link to={url} className={s.more}>
              Read More
            </Link>
          </p>
        </div>

        {isFeatured && (
          <ul className={s.chips}>
            <li>
              <Chip icon={<BedIcon aria-hidden />}>{property.bedrooms}-Bedroom</Chip>
            </li>
            <li>
              <Chip icon={<BathIcon aria-hidden />}>{property.bathrooms}-Bathroom</Chip>
            </li>
            <li>
              <Chip icon={<BuildingIcon aria-hidden />}>{property.type}</Chip>
            </li>
          </ul>
        )}

        <div className={s.footer}>
          <div className={s.price}>
            <span>Price</span>
            <strong>{formatPrice(property.price)}</strong>
          </div>
          <Button to={url} variant="primary" className={s.button}>
            View Property Details
          </Button>
        </div>
      </div>
    </article>
  );
}
