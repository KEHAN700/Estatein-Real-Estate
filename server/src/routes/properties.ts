import { Router } from 'express';
import { properties } from '../data/properties.js';
import { inRange, priceRanges, sizeRanges, toOptions, yearRanges } from '../lib/filters.js';
import { HttpError } from '../lib/http.js';
import { getPricing } from '../lib/pricing.js';

const router = Router();

const toListItem = ({ description, features, gallery, ...item }: (typeof properties)[number]) =>
  item;

const unique = (values: string[]) => [...new Set(values)].sort();

// ?q=a&q=b turns into an array in Express, only plain strings are accepted
const param = (value: unknown) => (typeof value === 'string' ? value : undefined);

router.get('/', (req, res) => {
  const [q, location, type, price, size, year, featured] = (
    ['q', 'location', 'type', 'price', 'size', 'year', 'featured'] as const
  ).map((key) => param(req.query[key]));
  const page = Math.max(1, Number(param(req.query.page)) || 1);
  const limit = Math.min(24, Math.max(1, Number(param(req.query.limit)) || 9));
  const search = q?.trim().toLowerCase();

  const filtered = properties.filter((p) => {
    if (featured === 'true' && !p.featured) return false;
    if (location && p.state !== location) return false;
    if (type && p.type !== type) return false;
    if (!inRange(priceRanges, price, p.price)) return false;
    if (!inRange(sizeRanges, size, p.area)) return false;
    if (!inRange(yearRanges, year, p.builtYear)) return false;
    if (search) {
      const haystack = `${p.title} ${p.city} ${p.state} ${p.type} ${p.tagline}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  const start = (page - 1) * limit;

  res.json({
    items: filtered.slice(start, start + limit).map(toListItem),
    total: filtered.length,
    page,
    pages: Math.max(1, Math.ceil(filtered.length / limit)),
  });
});

router.get('/filters', (_req, res) => {
  res.json({
    locations: unique(properties.map((p) => p.state)).map((s) => ({ value: s, label: s })),
    types: unique(properties.map((p) => p.type)).map((t) => ({ value: t, label: t })),
    prices: toOptions(priceRanges),
    sizes: toOptions(sizeRanges),
    years: toOptions(yearRanges),
  });
});

router.get('/:slug', (req, res) => {
  const property = properties.find((p) => p.slug === req.params.slug);
  if (!property) throw new HttpError(404, 'Property not found');
  res.json({ ...property, pricing: getPricing(property) });
});

export default router;
