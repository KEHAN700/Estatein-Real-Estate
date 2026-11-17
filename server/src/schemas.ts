import { z } from 'zod';

// short message for missing fields instead of zod's default type error
z.config({ customError: (issue) => (issue.input === undefined ? 'Required' : undefined) });

const name = z.string().trim().min(2, 'Too short').max(50);
const email = z.string().trim().pipe(z.email('Enter a valid email'));
const phone = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s()-]{6,19}$/, 'Enter a valid phone number');
const message = z.string().trim().min(10, 'Tell us a bit more').max(2000);
const agree = z.literal(true, { error: 'Please accept the terms' });

const person = { firstName: name, lastName: name, email, phone };

export const contactSchema = z.object({
  ...person,
  inquiryType: z.string().min(1, 'Choose an inquiry type'),
  source: z.string().min(1, 'Let us know how you found us'),
  message,
  agree,
});

export const propertyRequestSchema = z.object({
  ...person,
  location: z.string().min(1, 'Choose a location'),
  propertyType: z.string().min(1, 'Choose a property type'),
  bathrooms: z.string().min(1, 'Required'),
  bedrooms: z.string().min(1, 'Required'),
  budget: z.string().min(1, 'Choose a budget'),
  contactMethod: z.enum(['phone', 'email']),
  message,
  agree,
});

export const propertyInquirySchema = z.object({
  ...person,
  property: z.string().min(1),
  message,
  agree,
});

export const subscribeSchema = z.object({ email });
