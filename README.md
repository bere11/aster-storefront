# Aster Storefront

[![CI](https://github.com/bere11/aster-storefront/actions/workflows/ci.yml/badge.svg)](https://github.com/bere11/aster-storefront/actions/workflows/ci.yml)

A responsive e-commerce interview project built with React and TypeScript. It
uses [Fake Store API](https://fakestoreapi.com/docs) for products, categories,
authentication, and simulated cart submission.

The PDF-derived acceptance matrix, project decisions, and live progress tracker
are maintained in [PROJECT_SPEC.md](PROJECT_SPEC.md). Development workflow and
pull request expectations are documented in
[CONTRIBUTING.md](CONTRIBUTING.md).

## Features

- Product grid with images, names, prices, ratings, search, and sorting
- API-driven category navigation with deep-linkable `?category=` filters
- Product detail pages with full descriptions
- Fake Store API login and logout
- Protected, locally persisted shopping bag and wishlist
- Simulated order submission to the Fake Store cart endpoint
- Responsive desktop, tablet, and mobile navigation
- Light and dark themes
- Loading skeletons, retryable network errors, empty states, and route transitions
- Semantic landmarks, keyboard-friendly controls, visible focus states, skip link,
  image alternative text, and reduced-motion support
- Strict TypeScript and unit-tested product utilities

## Tech stack

- React 19 + Vite
- TypeScript (strict mode)
- Material UI
- React Router
- TanStack React Query
- Axios
- Vitest
- CSS custom properties for shared spacing, radii, and elevation tokens

## Local setup

Requirements:

- Node.js 20.19+ or 22.12+ (Node 24 is also supported)
- npm 10+

Install and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally
`http://localhost:5173`.

The app uses `https://fakestoreapi.com` by default. To override it:

```bash
cp .env.example .env.local
```

Then update `VITE_API_BASE_URL` in `.env.local`.

## Demo login

Fake Store API provides public test users. The sign-in page can fill this demo
account for you:

```text
username: mor_2314
password: 83r5^_
```

Authentication, the shopping bag, and the wishlist are persisted in browser
local storage for the demo. Logging out clears account-specific shopping data.
Fake Store API does not persist write operations; checkout therefore demonstrates
the cart request and response without creating a real order or taking payment.

## Quality checks

```bash
npm run test
npm run lint
npm run build
```

The production build is emitted to `dist/`.

## Project structure

```text
src/
├── api/          Axios client and typed API functions
├── components/   Shared layout, navigation, cards, and feedback UI
├── pages/        Route-level views
├── query/        React Query hooks and keys
├── state/        Typed application state and persistence
├── theme/        Material UI design system
├── types/        API response and request contracts
└── utils/        Product formatting, filtering, token, and redirect helpers
```

## Architecture notes

Server state (products and categories) belongs to React Query; authenticated
client state (session, shopping bag, wishlist, and theme) belongs to a typed
Context + reducer store. Category selection stays in the URL, so filtered pages
survive refreshes and can be shared directly.

Routes under `/cart` and `/wishlist` are protected. Unauthenticated visitors are
sent to `/login` and returned safely to the original local route after a
successful login.

## AI-assisted development

I used an AI coding assistant to help extract the acceptance criteria, scaffold
the initial file structure, review TypeScript types, and identify edge cases for
loading, error, authentication, and responsive states. I validated the output by
reviewing each requirement against the implementation, exercising the live Fake
Store API, and running the TypeScript production build, ESLint, and Vitest suite.
All generated code was reviewed and adjusted before inclusion.
