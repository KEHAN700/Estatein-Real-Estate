export type PropertyType = 'Villa' | 'Apartment' | 'Cottage' | 'House' | 'Townhouse';

export interface PropertySummary {
  id: number;
  slug: string;
  title: string;
  city: string;
  state: string;
  price: number;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  builtYear: number;
  tagline: string;
  summary: string;
  excerpt: string;
  cover: string;
  featured: boolean;
}

export interface Pricing {
  listingPrice: number;
  fees: { transferTax: number; legal: number; inspection: number; insurance: number };
  monthly: { propertyTax: number; hoa: number; insurance: number };
  initial: {
    additionalFees: number;
    downPayment: number;
    downPaymentRate: number;
    mortgage: number;
  };
}

export interface Property extends PropertySummary {
  description: string;
  features: string[];
  gallery: string[];
  pricing: Pricing;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface Option {
  value: string;
  label: string;
}

export interface PropertyFilters {
  locations: Option[];
  types: Option[];
  prices: Option[];
  sizes: Option[];
  years: Option[];
}

export interface PropertyQuery {
  q?: string;
  location?: string;
  type?: string;
  price?: string;
  size?: string;
  year?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface Testimonial {
  id: number;
  title: string;
  text: string;
  rating: number;
  author: string;
  location: string;
  avatar: string;
}

export interface Faq {
  id: number;
  question: string;
  teaser: string;
  answer: string;
}

export interface Client {
  id: number;
  name: string;
  since: number;
  domain: string;
  category: string;
  quote: string;
  website: string;
}

export type OfficeKind = 'regional' | 'international';

export interface Office {
  id: number;
  kind: OfficeKind;
  label: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  mapUrl: string;
}

export interface FormResponse {
  ok: boolean;
  message: string;
}
