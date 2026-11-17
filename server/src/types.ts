export type PropertyType = 'Villa' | 'Apartment' | 'Cottage' | 'House' | 'Townhouse';

export interface Property {
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
  description: string;
  features: string[];
  cover: string;
  gallery: string[];
  featured: boolean;
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
