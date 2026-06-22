# ADR-2: Use InstantDB for data persistence and authentication

- **Status**: approved
- **Date**: 2025-06-22
- **Deciders**: Tech Lead, Human
- **Type**: architecture

## Context

prop-man-1 needs to store users, properties, spaces, and suppliers, and provide authentication. The initial stack guess was PostgreSQL with a separate auth solution, but the team wants to reduce operational overhead and leverage real-time sync for a fast MVP.

## Decision

Use **InstantDB** as the primary data and sync layer, and use **InstantDB Magic Codes** for passwordless email authentication.

## Consequences

### Positive

- Managed service reduces database and auth operational overhead.
- Built-in real-time sync simplifies collaborative features.
- Magic codes remove the need for password management.
- Client-first SDK fits well with SvelteKit's load/action model.

### Negative / trade-offs

- Vendor lock-in to InstantDB.
- Less flexible than raw SQL for complex aggregations or reports.
- Server-side rendering with InstantDB requires careful hydration handling.

## Discarded alternatives

| Alternative | Why it was not chosen |
| ----------- | --------------------- |
| PostgreSQL + Prisma | Higher operational overhead; no built-in real-time sync. |
| Supabase Auth | Requires a separate Supabase project; InstantDB covers both data and auth. |
| Lucia sessions | More setup and maintenance than InstantDB Magic Codes. |

## Impact on product

- User registration and login use Magic Codes.
- Properties, spaces, and suppliers are stored in InstantDB namespaces.
- All features must respect InstantDB's client-first query model.

## References

- `sdd/architecture.md`
- `sdd/tech-stack.md`
- `sdd/security.md`
