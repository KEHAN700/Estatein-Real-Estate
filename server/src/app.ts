import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { errorHandler } from './lib/http.js';
import content from './routes/content.js';
import forms from './routes/forms.js';
import properties from './routes/properties.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDist = path.resolve(root, '../client/dist');

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  // needed for correct client IPs (rate limiting) when running behind a proxy like Render or Nginx
  if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'data:'],
          styleSrc: ["'self'", "'unsafe-inline'"],
          fontSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      },
    }),
  );
  app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }));
  app.use(express.json({ limit: '100kb' }));

  app.use('/images', express.static(path.join(root, 'public/images'), { maxAge: '7d' }));

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/properties', properties);
  app.use('/api', content);
  app.use(
    '/api/forms',
    rateLimit({
      windowMs: 60 * 1000,
      limit: 10,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: { message: 'Too many requests. Please wait a minute and try again.' },
    }),
    forms,
  );
  app.use('/api', (_req, res) => res.status(404).json({ message: 'Not found' }));

  // In production the API also serves the built client
  if (existsSync(clientDist)) {
    app.use(express.static(clientDist, { maxAge: '1h' }));
    app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
  }

  app.use(errorHandler);
  return app;
}
