# Contributing

All changes use short-lived branches and pull requests into `main`. This keeps
the repository aligned with the workflow bonus in the interview brief.

## Local Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` only when the Fake Store API base URL needs
to be overridden.

## Workflow

1. Read `PROJECT_SPEC.md` and identify the affected requirement IDs.
2. Start from an up-to-date `main`.
3. Create a focused branch such as `feat/product-search`,
   `fix/mobile-navigation`, `test/cart-state`, or `docs/setup-guide`.
4. Implement and verify one cohesive change.
5. Update `PROJECT_SPEC.md` when scope, status, evidence, or decisions change.
6. Commit with a focused conventional subject.
7. Push the branch and open a pull request into `main`.
8. Merge only after CI passes, then delete the branch.

## Commit Examples

```text
feat: add category deep linking
fix: keep mobile header within viewport
test: cover unsafe login redirects
docs: track acceptance criteria
```

## Required Validation

```bash
npm run test
npm run lint
npm run build
```

For UI changes, also verify the affected route at desktop and mobile widths,
including loading, error, empty, authenticated, and unauthenticated states when
relevant.

## Pull Requests

Use the repository template. Explain the user-facing result, reference the
affected specification IDs, list verification performed, and include screenshots
when the visual result changed.

