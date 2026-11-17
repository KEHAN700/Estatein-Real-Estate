import type { Testimonial } from '../types.js';

const avatar = (name: string) => `/images/avatars/${name}.webp`;

export const testimonials: Testimonial[] = [
  {
    id: 1,
    title: 'Exceptional Service!',
    text: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    rating: 5,
    author: 'Wade Warren',
    location: 'USA, California',
    avatar: avatar('wade-warren'),
  },
  {
    id: 2,
    title: 'Efficient and Reliable',
    text: "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    rating: 5,
    author: 'Emelie Thomson',
    location: 'USA, Florida',
    avatar: avatar('emelie-thomson'),
  },
  {
    id: 3,
    title: 'Trusted Advisors',
    text: 'The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!',
    rating: 5,
    author: 'John Mans',
    location: 'USA, Nevada',
    avatar: avatar('john-mans'),
  },
  {
    id: 4,
    title: 'Smooth From Start to Finish',
    text: 'We were relocating from another state and could only visit twice. Estatein handled the viewings, paperwork and even found us a great inspector.',
    rating: 5,
    author: 'Emelie Thomson',
    location: 'USA, Texas',
    avatar: avatar('emelie-thomson'),
  },
  {
    id: 5,
    title: 'Great Market Insight',
    text: 'Their investment team pointed us to a neighborhood we had never considered. Two years later it is the best decision we made for our portfolio.',
    rating: 5,
    author: 'Wade Warren',
    location: 'USA, Washington',
    avatar: avatar('wade-warren'),
  },
  {
    id: 6,
    title: 'Honest and Responsive',
    text: 'No pressure, no games. They answered every question quickly and were honest about the downsides of each listing we looked at.',
    rating: 4,
    author: 'John Mans',
    location: 'USA, Illinois',
    avatar: avatar('john-mans'),
  },
];
