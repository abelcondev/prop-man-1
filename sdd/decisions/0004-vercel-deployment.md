# ADR-4: Deploy on Vercel

- **Status**: approved
- **Date**: 2025-06-22
- **Deciders**: Tech Lead, Human
- **Type**: architecture

## Context

prop-man-1 needs a production hosting platform that integrates well with the chosen full-stack framework and supports continuous deployment from GitHub.

## Decision

Deploy prop-man-1 on **Vercel** using the `@sveltejs/adapter-vercel` adapter.

## Consequences

### Positive

- First-class support for SvelteKit and server-side rendering.
- Automatic preview deployments from Git branches.
- Built-in analytics, logs, and edge network.
- Generous free tier suitable for an MVP.

### Negative / trade-offs

- Tied to Vercel's platform and pricing.
- Serverless function cold starts may affect first requests.

## Discarded alternatives

| Alternative | Why it was not chosen |
| ----------- | --------------------- |
| Netlify | Good alternative, but Vercel has deeper SvelteKit integration. |
| Cloudflare Pages | Edge deployment; InstantDB client-first model is less optimized for Workers. |
| Self-hosted Docker | More operational overhead than needed for the MVP. |

## Impact on product

- Production URL and preview deployments are managed through Vercel.
- Environment variables for InstantDB are configured in the Vercel dashboard.

## References

- `sdd/architecture.md`
- `sdd/tech-stack.md`
