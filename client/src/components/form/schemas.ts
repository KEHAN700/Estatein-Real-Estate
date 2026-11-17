import { z } from 'zod';

const name = z.string().trim().min(2, 'Too short').max(50, 'Too long');
const email = z.string().trim().min(1, 'Email is required').pipe(z.email('Enter a valid email'));
const phone = z
  .string()
  .trim()
  .min(1, 'Phone is required')
  .regex(/^[+\d][\d\s()-]{6,19}$/, 'Enter a valid phone number');
const message = z.string().trim().min(10, 'Tell us a bit more (10+ characters)').max(2000);
const required = (msg: string) => z.string().min(1, msg);
const agree = z.boolean().refine(Boolean, 'Please accept the terms');

const person = { firstName: name, lastName: name, email, phone };

export const contactSchema = z.object({
  ...person,
  inquiryType: required('Choose an inquiry type'),
  source: required('Let us know how you found us'),
  message,
  agree,
});

export const propertyRequestSchema = z.object({
  ...person,
  location: required('Choose a location'),
  propertyType: required('Choose a property type'),
  bathrooms: required('Required'),
  bedrooms: required('Required'),
  budget: required('Choose a budget'),
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

export type ContactValues = z.infer<typeof contactSchema>;
export type PropertyRequestValues = z.infer<typeof propertyRequestSchema>;
export type PropertyInquiryValues = z.infer<typeof propertyInquirySchema>;
