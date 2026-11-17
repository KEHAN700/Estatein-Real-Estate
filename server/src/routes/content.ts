import { Router } from 'express';
import { clients } from '../data/clients.js';
import { faqs } from '../data/faqs.js';
import { offices } from '../data/offices.js';
import { testimonials } from '../data/testimonials.js';

const router = Router();

router.get('/testimonials', (_req, res) => res.json(testimonials));
router.get('/faqs', (_req, res) => res.json(faqs));
router.get('/clients', (_req, res) => res.json(clients));

router.get('/offices', (req, res) => {
  const kind = typeof req.query.kind === 'string' ? req.query.kind : undefined;
  res.json(kind ? offices.filter((o) => o.kind === kind) : offices);
});

export default router;
