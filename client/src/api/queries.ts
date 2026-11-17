import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { http } from './http';
import type {
  Client,
  Faq,
  FormResponse,
  Office,
  OfficeKind,
  Paginated,
  Property,
  PropertyFilters,
  PropertyQuery,
  PropertySummary,
  Testimonial,
} from './types';

export function useProperties(query: PropertyQuery) {
  return useQuery({
    queryKey: ['properties', query],
    queryFn: () => http.get<Paginated<PropertySummary>>('/properties', { ...query }),
    placeholderData: keepPreviousData,
  });
}

export function usePropertyFilters() {
  return useQuery({
    queryKey: ['property-filters'],
    queryFn: () => http.get<PropertyFilters>('/properties/filters'),
    staleTime: Infinity,
  });
}

export function useProperty(slug: string | undefined) {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: () => http.get<Property>(`/properties/${slug}`),
    enabled: Boolean(slug),
  });
}

export const useTestimonials = () =>
  useQuery({ queryKey: ['testimonials'], queryFn: () => http.get<Testimonial[]>('/testimonials') });

export const useFaqs = () =>
  useQuery({ queryKey: ['faqs'], queryFn: () => http.get<Faq[]>('/faqs') });

export const useClients = () =>
  useQuery({ queryKey: ['clients'], queryFn: () => http.get<Client[]>('/clients') });

export const useOffices = (kind?: OfficeKind) =>
  useQuery({
    queryKey: ['offices', kind ?? 'all'],
    queryFn: () => http.get<Office[]>('/offices', { kind }),
    placeholderData: keepPreviousData,
  });

export type FormName = 'contact' | 'property-request' | 'property-inquiry' | 'subscribe';

export const useSubmitForm = <T>(form: FormName) =>
  useMutation({ mutationFn: (values: T) => http.post<FormResponse>(`/forms/${form}`, values) });
