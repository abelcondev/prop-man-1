# ADR-1: Use SvelteKit as the full-stack framework

- **Status**: approved
- **Date**: 2025-06-22
- **Deciders**: Tech Lead, Human
- **Type**: architecture

## Context

prop-man-1 needs a full-stack web framework to handle server rendering, client-side interactivity, routing, and API endpoints for a property management app. The initial stack guess was Next.js, but the team prefers Svelte's reactivity model and smaller bundle size for this MVP.

## Decision

Use **SvelteKit 2.66** with **Svelte 5** as the full-stack framework for prop-man-1.

## Consequences

### Positive

- Smaller client bundle compared to React-based frameworks.
- Built-in file-based routing and server endpoints.
- Svelte 5 runes provide a clear, explicit reactivity model.
- Strong TypeScript support out of the box.

### Negative / trade-offs

- Smaller ecosystem than React/Next.js; some third-party libraries may be missing.
- Team needs familiarity with Svelte 5 runes and SvelteKit conventions.

## Discarded alternatives

| Alternative | Why it was not chosen |
| ----------- | --------------------- |
| Next.js | Larger bundle and the team preferred Svelte's model. |
| Nuxt.js | Vue ecosystem; not aligned with team's preference. |
| Remix | React-based; similar bundle concerns as Next.js. |

## Impact on product

- Affects all feature implementations and UI components.
- Authentication and data fetching will use SvelteKit load functions and form actions.

## References

- `sdd/architecture.md`
- `sdd/tech-stack.md`
