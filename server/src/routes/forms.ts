import { Router } from 'express';
import { properties } from '../data/properties.js';
import { asyncHandler, HttpError, validateBody } from '../lib/http.js';
import { append, list } from '../lib/store.js';
import {
  contactSchema,
  propertyInquirySchema,
  propertyRequestSchema,
  subscribeSchema,
} from '../schemas.js';

const router = Router();

const created = (message: string) => ({ ok: true, message });

router.post(
  '/contact',
  validateBody(contactSchema),
  asyncHandler(async (req, res) => {
    await append('contact-requests', req.body);
    res.status(201).json(created("Thanks! We'll get back to you within one business day."));
  }),
);

router.post(
  '/property-request',
  validateBody(propertyRequestSchema),
  asyncHandler(async (req, res) => {
    await append('property-requests', req.body);
    res.status(201).json(created('Got it! Our agents will start looking for your perfect match.'));
  }),
);

router.post(
  '/property-inquiry',
  validateBody(propertyInquirySchema),
  asyncHandler(async (req, res) => {
    const exists = properties.some((p) => p.slug === req.body.property);
    if (!exists) throw new HttpError(404, 'Property not found');
    await append('property-inquiries', req.body);
    res.status(201).json(created('Thanks for your interest! An agent will contact you shortly.'));
  }),
);

router.post(
  '/subscribe',
  validateBody(subscribeSchema),
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const subscribers = await list<{ email: string }>('subscribers');
    if (!subscribers.some((s) => s.email === email)) {
      await append('subscribers', { email });
    }
    res.status(201).json(created("You're subscribed. Welcome aboard!"));
  }),
);

export default router;
