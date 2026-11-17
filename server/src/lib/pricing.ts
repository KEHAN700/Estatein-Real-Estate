import type { Property } from '../types.js';

// Rough estimates used on the property page. Kept in one place so the
// numbers stay consistent between the summary blocks.
const TRANSFER_TAX_RATE = 0.02;
const PROPERTY_TAX_RATE = 0.012;
const DOWN_PAYMENT_RATE = 0.2;
const LEGAL_FEES = 3000;
const INSPECTION = 500;
const INSURANCE_PER_YEAR = 1200;
const HOA_PER_MONTH = 300;

export function getPricing(property: Pick<Property, 'price'>) {
  const { price } = property;
  const transferTax = Math.round(price * TRANSFER_TAX_RATE);
  const additionalFees = transferTax + LEGAL_FEES + INSPECTION + INSURANCE_PER_YEAR;
  const downPayment = Math.round(price * DOWN_PAYMENT_RATE);
  const propertyTaxMonthly = Math.round((price * PROPERTY_TAX_RATE) / 12);

  return {
    listingPrice: price,
    fees: {
      transferTax,
      legal: LEGAL_FEES,
      inspection: INSPECTION,
      insurance: INSURANCE_PER_YEAR,
    },
    monthly: {
      propertyTax: propertyTaxMonthly,
      hoa: HOA_PER_MONTH,
      insurance: Math.round(INSURANCE_PER_YEAR / 12),
    },
    initial: {
      additionalFees,
      downPayment,
      downPaymentRate: DOWN_PAYMENT_RATE,
      mortgage: price - downPayment,
    },
  };
}
