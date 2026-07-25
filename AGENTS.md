# Repository Instructions

This file defines how coding agents should work in this repository.

## Source Of Truth

1. Read `PROJECT_SPEC.md` before planning or implementing a change.
2. Treat the acceptance criteria in `Qubica-interview.pdf` as authoritative.
3. Use `PROJECT_SPEC.md` as the living requirement matrix and progress tracker.
4. Update the specification in the same pull request when a requirement,
   decision, known issue, or verification status changes.

## Technical Constraints

- Keep the application on React, Vite, and strict TypeScript.
- Use Material UI for the component system.
- Use React Router for routing.
- Use TanStack React Query for server state.
- Use Axios for Fake Store API requests.
- Use the existing typed Context and reducer for client state.
- Use Fake Store API as the backend required by the assignment.
- Do not migrate to Vue. The framework choice is an explicit project decision.

## Delivery Workflow

- Never develop directly on `main`.
- Create a focused branch using `feat/`, `fix/`, `test/`, `docs/`, or `chore/`.
- Keep commits focused and use conventional commit messages.
- Open a pull request into `main` with a clear description.
- Reference affected requirement IDs from `PROJECT_SPEC.md` in the pull request.
- Merge only after the required CI job passes.
- Delete merged feature branches.

## Definition Of Done

Before marking work complete:

1. Confirm the relevant PDF acceptance criteria still pass.
2. Run `npm run test`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Check affected desktop and mobile user flows when UI behavior changes.
6. Update `PROJECT_SPEC.md` statuses and evidence where applicable.

