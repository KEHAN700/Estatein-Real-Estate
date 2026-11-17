import type { Office } from '../types.js';

export const offices: Office[] = [
  {
    id: 1,
    kind: 'regional',
    label: 'Main Headquarters',
    address: '123 Estatein Plaza, City Center, Metropolis',
    description:
      'Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.',
    email: 'info@estatein.com',
    phone: '+1 (123) 456-7890',
    city: 'Metropolis',
    mapUrl: 'https://maps.google.com/?q=Metropolis',
  },
  {
    id: 2,
    kind: 'regional',
    label: 'Regional Offices',
    address: '456 Urban Avenue, Downtown District, Metropolis',
    description:
      "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    email: 'info@restatein.com',
    phone: '+1 (123) 628-7890',
    city: 'Metropolis',
    mapUrl: 'https://maps.google.com/?q=Metropolis',
  },
  {
    id: 3,
    kind: 'international',
    label: 'International Office',
    address: '27 Harbour Street, Marina District, Dubai',
    description:
      'Our international office helps overseas buyers and investors navigate local regulations, financing and relocation, so buying abroad feels as simple as buying at home.',
    email: 'global@estatein.com',
    phone: '+971 4 123 4567',
    city: 'Dubai',
    mapUrl: 'https://maps.google.com/?q=Dubai+Marina',
  },
];
