# Estatein — Real Estate Website

A responsive real estate website built from the Estatein Figma design: six pages, a REST API and working forms.

**Live demo:** [estatein-real-estate-weld.vercel.app](https://estatein-real-estate-weld.vercel.app) · API: [estatein-api.onrender.com](https://estatein-api.onrender.com/api/health)

> The API runs on Render's free plan and sleeps when idle, so the first load can take up to a minute.

**Stack:** React 18, TypeScript, Vite, React Router, TanStack Query, React Hook Form + Zod, SCSS Modules · Node.js, Express, Zod

## Features

- Pixel-close implementation of the design for desktop (1920), laptop (1440), tablet and mobile (390)
- Fluid typography and spacing between breakpoints (`clamp()`-based Sass helper)
- Property catalog with search, filters (location, type, price, size, build year) and pagination synced with the URL
- Property page with photo gallery, features list and a pricing breakdown calculated on the server
- Contact, property request and property inquiry forms with client + server validation
- Newsletter subscription in the footer
- Carousels for featured properties, testimonials, FAQ and clients
- Office locations with tabs, expandable FAQ cards, mobile navigation
- Lazy-loaded routes, optimized WebP images and inline SVG icons
- Accessible markup: semantic landmarks, labels, focus states, `prefers-reduced-motion` support

## Pages

| Route               | Page                              |
| ------------------- | --------------------------------- |
| `/`                 | Home                              |
| `/about`            | About Us                          |
| `/properties`       | Property catalog with search      |
| `/properties/:slug` | Property details                  |
| `/services`         | Services                          |
| `/contact`          | Contact form, offices and gallery |

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:4000

Vite proxies `/api` and `/images` to the API in development.

### Deployment

- **API** — Render, configured in `render.yaml`. Set `CLIENT_ORIGIN` to the frontend URL.
- **Frontend** — Vercel with `client` as the root directory (`client/vercel.json`). Set `VITE_API_URL` to the API URL.

### Production build

```bash
npm run build
npm start
```

The Express server serves both the API and the built client on port `4000` (or `PORT`).

## Project structure

```
client/
  src/
    api/          fetch wrapper, React Query hooks, shared types
    app/          app shell and routes
    assets/       icons (SVG), patterns and images
    components/
      cards/      property, testimonial, FAQ, team, client, office cards
      form/       form fields, form shell, validation schemas
      forms/      ready-made site forms
      layout/     header, footer, banner, CTA
      sections/   reusable page sections and carousels
      ui/         buttons, badges, chips, slider controls
    data/         static content (team, services, values)
    hooks/        media queries, carousel, page title
    pages/        one folder per page
    styles/       tokens, mixins, reset
server/
  src/
    data/         properties, testimonials, FAQ, clients, offices
    lib/          pricing, filters, JSON storage, error handling
    routes/       REST endpoints
  public/images/  property photos and avatars
  storage/        saved form submissions (JSON)
```

## API

| Method | Endpoint                      | Description                                                   |
| ------ | ----------------------------- | ------------------------------------------------------------- |
| GET    | `/api/properties`             | List with `q, location, type, price, size, year, page, limit` |
| GET    | `/api/properties/filters`     | Options for the filter selects                                |
| GET    | `/api/properties/:slug`       | Property with gallery and pricing breakdown                   |
| GET    | `/api/testimonials`           | Client testimonials                                           |
| GET    | `/api/faqs`                   | FAQ                                                           |
| GET    | `/api/clients`                | Company clients                                               |
| GET    | `/api/offices?kind=`          | Offices, optionally `regional` / `international`              |
| POST   | `/api/forms/contact`          | Contact form                                                  |
| POST   | `/api/forms/property-request` | "Let's Make it Happen" request                                |
| POST   | `/api/forms/property-inquiry` | Inquiry about a specific property                             |
| POST   | `/api/forms/subscribe`        | Newsletter subscription                                       |

Validation errors return `400` with a `fields` object, which the forms map back to the matching inputs.

## Credits

Design: [Estatein Real Estate Website Template](https://www.figma.com/community) by Produce UI.
