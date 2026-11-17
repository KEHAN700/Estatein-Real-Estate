import type { Option } from '@/api/types';

const range = (from: number, to: number, suffix = '') =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const n = String(from + i);
    return { value: n, label: `${n}${suffix}` };
  });

export const roomOptions: Option[] = [...range(1, 5), { value: '6+', label: '6+' }];

export const inquiryTypes: Option[] = [
  { value: 'buying', label: 'Buying a property' },
  { value: 'selling', label: 'Selling a property' },
  { value: 'management', label: 'Property management' },
  { value: 'investment', label: 'Investment advice' },
  { value: 'other', label: 'Something else' },
];

export const referralSources: Option[] = [
  { value: 'search', label: 'Search engine' },
  { value: 'social', label: 'Social media' },
  { value: 'friend', label: 'Friend or family' },
  { value: 'ads', label: 'Online ads' },
  { value: 'other', label: 'Other' },
];
