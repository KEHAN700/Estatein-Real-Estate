const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('en-US');

export const formatPrice = (value: number) => currency.format(value);

export const formatNumber = (value: number) => number.format(value);

export const pad = (value: number) => String(value).padStart(2, '0');
