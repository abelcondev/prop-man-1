# ADR-3: Use Bits UI and Tailwind CSS v4 for UI primitives

- **Status**: approved
- **Date**: 2025-06-22
- **Deciders**: Tech Lead, Human
- **Type**: architecture

## Context

prop-man-1 needs accessible, consistent UI components that can be styled to match a custom Pencil.dev Design System. The team wants to avoid heavy pre-built component libraries and own the component code.

## Decision

Use **Bits UI 2.18** as the headless UI primitives library and **Tailwind CSS 4.3** for styling.

## Consequences

### Positive

- Bits UI provides accessible, unstyled primitives for Svelte 5.
- Tailwind CSS v4 offers faster builds and CSS-first configuration.
- Components can be styled to match the Pencil Design System exactly.
- No lock-in to a fully styled component library.

### Negative / trade-offs

- Requires more initial setup than a pre-built library.
- Tailwind v4 is newer; tooling and plugins are still maturing.
- Team must maintain component wrappers and ensure accessibility.

## Discarded alternatives

| Alternative | Why it was not chosen |
| ----------- | --------------------- |
| shadcn/ui for React | Not compatible with SvelteKit. |
| shadcn-svelte | Higher abstraction; Bits UI gives lower-level control. |
| Tailwind UI | Paid templates; does not match custom design tokens. |

## Impact on product

- All UI components are built from Bits UI primitives and styled with Tailwind.
- Design tokens in `src/app.css` must stay in sync with Pencil variables.

## References

- `sdd/architecture.md`
- `sdd/conventions.md` → Design System
- `sdd/design-system/design-system.pen`
