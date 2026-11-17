import type { ReactNode } from 'react';
import type { Pricing } from '@/api/types';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { formatPrice } from '@/lib/format';
import s from './PricingDetails.module.scss';

interface Item {
  label: string;
  value: ReactNode;
  note?: string;
}

// each inner array is one row of the card, one or two cells wide
function PriceGroup({ title, rows }: { title: string; rows: Item[][] }) {
  return (
    <article className={s.group}>
      <header className={s.groupHeader}>
        <h3>{title}</h3>
        <Button to="/contact#form" variant="secondary">
          Learn More
        </Button>
      </header>
      <dl className={s.rows}>
        {rows.map((row) => (
          <div key={row[0].label} className={s.row}>
            {row.map((item) => (
              <div key={item.label} className={s.cell}>
                <dt>{item.label}</dt>
                <dd>
                  <span className={s.value}>{item.value}</span>
                  {item.note && <Chip muted>{item.note}</Chip>}
                </dd>
              </div>
            ))}
          </div>
        ))}
      </dl>
    </article>
  );
}

export function PricingDetails({ pricing }: { pricing: Pricing }) {
  const { fees, monthly, initial } = pricing;

  return (
    <div className={s.wrapper}>
      <p className={s.note}>
        <strong>Note</strong>
        <span>
          The figures provided above are estimates and may vary depending on the property, location, and individual
          circumstances.
        </span>
      </p>

      <div className={s.layout}>
        <div className={s.listing}>
          <p>Listing Price</p>
          <strong>{formatPrice(pricing.listingPrice)}</strong>
        </div>

        <div className={s.groups}>
          <PriceGroup
            title="Additional Fees"
            rows={[
              [
                { label: 'Property Transfer Tax', value: formatPrice(fees.transferTax), note: 'Based on the sale price and local regulations' },
                { label: 'Legal Fees', value: formatPrice(fees.legal), note: 'Approximate cost for legal services, including title transfer' },
              ],
              [
                { label: 'Home Inspection', value: formatPrice(fees.inspection), note: 'Recommended for due diligence' },
                { label: 'Property Insurance', value: formatPrice(fees.insurance), note: 'Annual cost for comprehensive property insurance' },
              ],
              [{ label: 'Mortgage Fees', value: 'Varies', note: 'If applicable, consult with your lender for specific details' }],
            ]}
          />
          <PriceGroup
            title="Monthly Costs"
            rows={[
              [{ label: 'Property Taxes', value: formatPrice(monthly.propertyTax), note: 'Approximate monthly property tax based on the sale price and local rates' }],
              [{ label: "Homeowners' Association Fee", value: formatPrice(monthly.hoa), note: 'Monthly fee for common area maintenance and security' }],
            ]}
          />
          <PriceGroup
            title="Total Initial Costs"
            rows={[
              [
                { label: 'Listing Price', value: formatPrice(pricing.listingPrice) },
                { label: 'Additional Fees', value: formatPrice(initial.additionalFees), note: 'Property transfer tax, legal fees, inspection, insurance' },
              ],
              [
                { label: 'Down Payment', value: formatPrice(initial.downPayment), note: `${initial.downPaymentRate * 100}%` },
                { label: 'Mortgage Amount', value: formatPrice(initial.mortgage), note: 'If applicable' },
              ],
            ]}
          />
          <PriceGroup
            title="Monthly Expenses"
            rows={[
              [
                { label: 'Property Taxes', value: formatPrice(monthly.propertyTax) },
                { label: "Homeowners' Association Fee", value: formatPrice(monthly.hoa) },
              ],
              [
                { label: 'Mortgage Payment', value: <span className={s.light}>Varies based on terms and interest rate</span>, note: 'If applicable' },
                { label: 'Property Insurance', value: formatPrice(monthly.insurance), note: 'Approximate monthly cost' },
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
