# Aster Storefront Project Specification

This document is the living project brief, acceptance matrix, decision log, and
progress tracker for the Qubica interview challenge. It is derived from
`Qubica-interview.pdf`. The PDF remains authoritative if the two documents ever
conflict.

Last reviewed: 2026-07-26

## Status Legend

- `DONE`: implemented and verified
- `IN PROGRESS`: currently being implemented or verified
- `TODO`: accepted work that has not been completed
- `NOT PLANNED`: intentionally excluded with a documented reason

## Product Goal

Build a responsive e-commerce application that displays products, categories,
and product details from Fake Store API. Users can authenticate and access
protected shopping cart and wishlist functionality.

## Required Technology

| ID | Requirement | Status | Implementation or evidence |
| --- | --- | --- | --- |
| TECH-1 | TypeScript is mandatory | DONE | Strict TypeScript configuration and typed API contracts |
| TECH-2 | Use a modern component framework | DONE | React 19 with Vite |
| TECH-3 | Use Fake Store API | DONE | Typed Axios functions use `https://fakestoreapi.com` |

Additional libraries are permitted. This project uses Material UI, React
Router, TanStack React Query, Axios, and Vitest.

## Mandatory Acceptance Criteria

| ID | Requirement | Status | Implementation or evidence |
| --- | --- | --- | --- |
| AC-1.1 | Host the project in a public GitHub repository | DONE | `https://github.com/bere11/aster-storefront` |
| AC-1.2 | Use clean commit messages and history | DONE | Conventional, focused commit subjects on `main` |
| AC-1.3 | Include precise local setup instructions in the root README | DONE | `README.md` includes prerequisites, install, run, environment, and checks |
| AC-1.4 | Explain AI usage and validation in the README | DONE | `README.md` contains an AI-assisted development section |
| AC-2.1 | Global layout contains a Header and Main area | DONE | `Header` and semantic `main` in `AppLayout` |
| AC-2.2 | Fully usable on tablets and smartphones | DONE | Responsive MUI layouts and mobile category drawer |
| AC-2.3 | Use semantic HTML, keyboard navigation, and image alt text | DONE | Semantic landmarks, skip link, focus states, buttons/links, and product alt text |
| AC-3.1 | Header displays store name, logo, and category navigation | DONE | Aster brand, textual mark, desktop navigation, and mobile drawer |
| AC-3.2 | Fetch categories dynamically from the API | DONE | `useCategories` queries `/products/categories` |
| AC-4.1 | Home displays API product cards with image, name, and price | DONE | Responsive product grid and `ProductCard` |
| AC-4.2 | Product cards navigate to product details | DONE | Cards link to `/products/:productId` |
| AC-4.3 | Header categories filter Home through the API | DONE | Category links drive category-specific API requests |
| AC-4.4 | Category filter updates the URL and supports deep links | DONE | `?category=` is read from and written to the URL |
| AC-5.1 | Product view shows name, image, price, and full description | DONE | Typed product query and responsive detail view |

## Bonus Criteria

| ID | Requirement | Status | Implementation or decision |
| --- | --- | --- | --- |
| BONUS-1.1 | Merge separate branches through clearly described PRs | DONE | GitHub PRs use feature branches, descriptions, and CI |
| BONUS-1.2 | Develop features outside `main` | DONE | Ongoing work follows the branch and PR workflow in `CONTRIBUTING.md` |
| BONUS-2.1 | Use Vue.js | NOT PLANNED | React is the candidate's stronger framework and was chosen deliberately |
| BONUS-2.2 | Strictly type API responses and data structures | DONE | Strict TypeScript and interfaces under `src/types` |
| BONUS-2.3 | Use SCSS or CSS variables for design-system values | DONE | Emotion-powered MUI styled components plus CSS custom properties centralize reusable structures, spacing, geometry, elevation, and motion |
| BONUS-2.4 | Add one or two unit tests | DONE | Vitest covers critical product and redirect utilities |
| BONUS-2.5 | Implement state-management logic | DONE | Typed Context, reducer, derived state, and local persistence |
| BONUS-3.1 | Provide polished visuals and smooth view transitions | DONE | Distinct branded storefront, reusable styled components, responsive layouts, and reduced-motion-aware transitions |
| BONUS-3.2 | Display loading states | DONE | Product skeleton grids and product-detail skeletons |
| BONUS-3.3 | Display network error states | DONE | Retryable visual error panels and mutation alerts |
| BONUS-3.4 | Support light and dark themes | DONE | Persisted MUI palette-mode switching |
| BONUS-3.5 | Add to cart and show a Header counter | DONE | Protected cart state, quantity management, and Header badge |
| BONUS-3.6 | Integrate API login and logout | DONE | Fake Store API login, persisted session, protected routes, and logout |

## Project Decisions

### DEC-1: React Instead Of Vue

Vue offers a bonus point, but it is not mandatory. React was selected because it
best represents the candidate's existing skills and allows stronger delivery,
testing, and interview discussion.

### DEC-2: URL-Owned Category State

The active category lives in the query string. React Query owns the associated
server data. This makes filtered URLs refresh-safe and shareable.

### DEC-3: Separate Server And Client State

TanStack React Query owns products and categories. A typed Context and reducer
own authentication, cart, wishlist, and theme state.

### DEC-4: Simulated Writes

Fake Store API does not persist write operations. Checkout demonstrates a typed
cart request and response without presenting it as a real payment or order.

### DEC-5: Styled-Component CSS Architecture

Reusable visual structures use Material UI's Emotion-powered `styled` API.
Global geometry, elevation, and animation values use CSS custom properties and
keyframes in `src/styles.css`. Local `sx` props are limited to responsive or
state-dependent exceptions. This demonstrates custom CSS architecture while
remaining compatible with the existing Material UI stack.

## Verification Baseline

The required checks are:

```bash
npm run test
npm run lint
npm run build
```

GitHub Actions runs the same checks for pull requests and pushes to `main`.
Changes to UI behavior also require a desktop and mobile browser check of the
affected flow.

## Active Work

| ID | Task | Status | Notes |
| --- | --- | --- | --- |
| GOV-1 | Add living project specification and agent instructions | DONE | `PROJECT_SPEC.md` and `AGENTS.md` |
| GOV-2 | Add repository contribution and PR templates | DONE | `CONTRIBUTING.md` and `.github/PULL_REQUEST_TEMPLATE.md` |
| GOV-3 | Protect `main` with PR and CI requirements | DONE | Active GitHub ruleset requires PRs and the CI status check |
| DESIGN-1 | Replace the generic visual treatment with a custom product-led storefront system | DONE | API-backed product hero, styled navigation, merchandise-focused cards, and shared typography |
| DESIGN-2 | Verify responsive and dark-theme behavior for the new system | DONE | Desktop, compact, true 390px, and dark-mode browser audits; no horizontal overflow |
| DESIGN-3 | Refine Aster away from an editorial/blog treatment | DONE | Restored sparkle identity, sans-serif hierarchy, direct shopping copy, simplified labels, favicon, and manifest |
| DESIGN-4 | Add character to the hero without returning to an editorial layout | DONE | Branded sage-and-coral backdrop, stable featured-product bar, and shared product hover treatment |
| QA-1 | Review and record user-reported application bugs | DONE | Fixed app bar and scroll-stable Sort menu; retained hero content through smooth category transitions; verified desktop, dark, and 390px states |
| DESIGN-5 | Increase hero depth while preserving the storefront direction | DONE | Layered geometric color blocks, offset product plate, and stronger responsive hero palette |
| QA-2 | Refine mobile header and drawer behavior | DONE | Wishlist/cart stay in the app bar; theme/session actions moved into the drawer; app-bar and in-drawer close controls verified at 390px |

## Progress Log

### 2026-07-25

- Published the repository publicly.
- Added CI for tests, lint, and production builds.
- Demonstrated feature-branch development through merged pull requests.
- Created the living acceptance matrix and repository workflow guidance.

### 2026-07-26

- Introduced reusable Emotion-powered MUI styled components.
- Replaced the decorative hero with a responsive API-backed featured product.
- Added a custom type, color, surface, and motion system.
- Refined the header, product cards, product detail, cart, wishlist, login,
  feedback states, and footer.
- Verified light and dark layouts at desktop and mobile widths.
- Simplified the presentation into a friendly modern storefront, restored the
  Aster sparkle mark, and added favicon and install metadata.
- Added a branded hero backdrop and repaired the app bar, Sort menu, category
  transition, and featured-product hover interactions.
- Verified stable header and menu geometry, retained category-loading content,
  dark mode, and a 390px viewport in Chrome.
- Restored visual depth with non-editorial geometric hero layers and a stronger
  featured-product backdrop.
- Reworked mobile navigation around persistent shopping actions and verified
  app-bar close, drawer close, theme switching, and logout behavior.
