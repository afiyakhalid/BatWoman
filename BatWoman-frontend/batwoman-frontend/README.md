# BatWoman Frontend

BatWoman is a Next.js storefront and admin frontend for a luxury abaya shopping experience. The app is organized into customer, admin, and auth route groups with shared providers, reusable UI primitives, and feature-specific services and hooks.

## Documentation

The full frontend documentation, route map, and project structure are in [docs/frontend-documentation.md](docs/frontend-documentation.md).

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 after the dev server starts.

## Available Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint.

## Required Environment

Set `NEXT_PUBLIC_API_URL` in your local environment so the API client in `lib/axios.ts` can reach the backend.
