# Tech Stack — prop-man-1

> Technology inventory for prop-man-1: versions, MCP servers, documentation URLs, and install commands.

---

## Stack overview

| Layer           | Technology            | Version | Responsibility                               |
| --------------- | --------------------- | ------- | -------------------------------------------- |
| Language        | TypeScript            | 6.0.3   | Type-safe application code                   |
| Framework       | SvelteKit             | 2.66.0  | Full-stack routing, rendering, API endpoints |
| UI library      | Svelte                | 5.56.3  | Reactive components                          |
| Database / sync | InstantDB             | 1.0.49  | Real-time relational data and sync           |
| Auth            | InstantDB Magic Codes | 1.0.49  | Passwordless email authentication            |
| UI primitives   | Bits UI               | 2.18.1  | Headless accessible Svelte components        |
| Styles          | Tailwind CSS          | 4.3.1   | Utility-first CSS                            |
| Visual Design   | Pencil.dev            | —       | UI mockups, design system, feature screens   |
| Package manager | bun                   | —       | Dependency management and scripts            |
| Runtime         | Node.js               | 22.x    | Development and build runtime                |
| Deployment      | Vercel                | —       | Production hosting                           |

## Languages & runtimes

- **Runtime**: Node.js 22
- **Primary language**: TypeScript 6.0.3
- **Other languages**: none

## Frontend

- **Framework / library**: Svelte 5.56.3 + SvelteKit 2.66.0
- **Build tool**: Vite 8.0.16 (via SvelteKit)
- **State management**: Svelte 5 runes + InstantDB reactive queries
- **Routing**: SvelteKit file-based routing
- **Forms / validation**: sveltekit-superforms 2.30.1 + Zod 4.4.3
- **MCP server**: N/A
- **Documentation URL**: https://svelte.dev/docs/kit
- **Version installed**: SvelteKit 2.66.0, Svelte 5.56.3
- **Install command**: `bun add svelte@5.56.3 @sveltejs/kit@2.66.0`

## Backend

- **Framework / runtime**: SvelteKit 2.66.0 (server-side endpoints and form actions)
- **API style**: Server-side SvelteKit form actions + load functions; InstantDB for data
- **MCP server**: N/A
- **Documentation URL**: https://svelte.dev/docs/kit
- **Version installed**: 2.66.0
- **Install command**: included with SvelteKit

## Database & storage

- **Database**: InstantDB
- **ORM / query builder**: InstantDB core SDK + Svelte bindings
- **Migration tool**: InstantDB schema-flexible (manual migrations via code changes; breaking changes require ADR)
- **Cache**: N/A (InstantDB handles local caching)
- **Object storage**: N/A
- **MCP server**: N/A
- **Documentation URL**: https://www.instantdb.com/docs
- **Version installed**: 1.0.49
- **Install command**: `bun add @instantdb/core@1.0.49 @instantdb/svelte@1.0.49`

## Authentication & authorization

- **Strategy**: Magic codes (passwordless email OTP)
- **Provider / library**: InstantDB Auth
- **MCP server**: N/A
- **Documentation URL**: https://www.instantdb.com/docs/auth
- **Version installed**: 1.0.49 (included with InstantDB)
- **Install command**: included with `@instantdb/core` / `@instantdb/svelte`

## External services / APIs

| Service | Purpose | MCP | Docs URL | Version |
| ------- | ------- | --- | -------- | ------- |
| N/A     | —       | —   | —        | —       |

> No external services (email, payments, storage) are required for the initial MVP.

## AI / LLM services

| Provider | Use case | Model | MCP | Docs URL | Version |
| -------- | -------- | ----- | --- | -------- | ------- |
| N/A      | —        | —     | —   | —        | —       |

> The PRD does not mention AI capabilities; no LLM provider is configured.

## Visual design

- **Tool**: Pencil.dev
- **MCP server**: `pencil-mcp`
- **Configuration**: Connected in Spectre; human opens `sdd/design-system/design-system.pen` in Pencil desktop/VS Code and populates it via MCP.
- **Documentation URL**: https://pencil.dev/docs
- **Project file / workspace**: `sdd/design-system/design-system.pen`
- **Design tokens source**: `sdd/conventions.md` → Design Tokens

## MCP servers

| MCP server   | Technology                 | Configuration        | Status     |
| ------------ | -------------------------- | -------------------- | ---------- |
| `pencil-mcp` | Visual design (Pencil.dev) | Connected in Spectre | configured |

> No MCP server exists for InstantDB, SvelteKit, or Tailwind at this time. Documentation URLs are recorded above.

## DevOps / deployment

- **Hosting platform**: Vercel
- **CI/CD**: Vercel Git integration (deploys on push to `main`)
- **Containerization**: N/A
- **Environment management**: Vercel dashboard + `.env` / `.env.local` locally
- **Monitoring / observability**: Vercel Analytics / Logs (optional)

## Documentation URLs

| Technology   | Official docs                  |
| ------------ | ------------------------------ |
| SvelteKit    | https://svelte.dev/docs/kit    |
| Svelte       | https://svelte.dev/docs        |
| InstantDB    | https://www.instantdb.com/docs |
| Bits UI      | https://bits-ui.com            |
| Tailwind CSS | https://tailwindcss.com/docs   |
| Pencil.dev   | https://pencil.dev/docs        |
| Vercel       | https://vercel.com/docs        |

## Versions & lockfile

- **Lockfile**: `bun.lock`
- **Node / runtime version**: 22.x
- **Last updated**: 2025-06-22

## Project Setup Completion

- [x] **Stack overview** table has real technologies and versions. Visual Design is **Pencil.dev**.
- [x] **Languages & runtimes** section has real values.
- [x] **Frontend**, **Backend**, **Database & storage**, and **Authentication & authorization** sections are filled.
- [x] **External services / APIs** and **AI / LLM services** sections are filled (N/A where applicable).
- [x] **Visual design** section records the Pencil.dev MCP and configuration.
- [x] **MCP servers** section records configured MCPs.
- [x] **DevOps / deployment** section has real values.
- [x] **Documentation URLs** table links to official docs for each technology.
- [x] **Versions & lockfile** section has the lockfile name and runtime version.

## Notes

- InstantDB replaces the traditional PostgreSQL + ORM stack for the MVP. If a future requirement needs server-side aggregations or complex SQL, revisit the decision and create an ADR.
- Tailwind CSS v4 uses a CSS-first configuration (`@import "tailwindcss"` and `@theme`). The SvelteKit project will be configured accordingly.
- `bun` is used as the package manager; lockfile is `bun.lock`.
