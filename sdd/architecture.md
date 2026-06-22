# Architecture — prop-man-1

> This document defines the stack, layers, data design, code organization, golden rules, and data flow for prop-man-1.

---

## Stack and Layers

| Layer                           | Technology                       | Responsibility                                                        |
| ------------------------------- | -------------------------------- | --------------------------------------------------------------------- |
| Frontend / full-stack framework | SvelteKit 2.66 + Svelte 5.56     | Server and client rendering, routing, API endpoints                   |
| Language                        | TypeScript 6.0                   | Type safety across client and server                                  |
| Styles                          | Tailwind CSS 4.3 + CSS variables | Utility-first styling and design tokens                               |
| UI primitives                   | Bits UI 2.18                     | Headless, accessible Svelte components (Button, Dialog, Select, etc.) |
| Database / sync                 | InstantDB 1.0                    | Real-time relational client-side database, auth, and sync             |
| Auth                            | InstantDB Magic Codes            | Passwordless email login via InstantDB                                |
| Package manager                 | bun                              | Dependency management and scripts                                     |
| Runtime                         | Node.js 22                       | Local development and build runtime                                   |
| Deployment                      | Vercel                           | Production hosting for SvelteKit                                      |
| Visual design                   | Pencil.dev                       | UI mockups, design system, feature screens                            |

> The detailed technology inventory — versions, MCP servers, documentation URLs, and install commands — lives in `sdd/tech-stack.md`.

---

## Project Setup

The `sdd-tech-lead` agent sets up the project on `main` before any feature worktree is created. During setup the Tech Lead:

1. Reads `sdd/product.md`, including the PRD section, to understand product-level requirements.
2. Interviews the human about the technology stack.
3. For each technology, checks whether an MCP server exists; if not, asks for the official documentation URL and the version to install.
4. Reconciles the selected stack against the PRD and asks about omitted technologies.
5. Updates this document (`sdd/architecture.md`) and creates/maintains `sdd/tech-stack.md`.
6. Installs dependencies and configures the repository.
7. Configures GitHub (creates the repo if needed) and pushes the setup commits to `main`.

All setup work happens on `main`. Feature development happens in isolated worktrees.

---

## Data Design

prop-man-1 uses **InstantDB** as its primary data and sync layer. InstantDB is a client-first, real-time relational database. Data modeling conventions:

- **Namespaces / entity names**: use singular, camelCase names (e.g. `property`, `space`, `supplier`, `user`).
- **Primary keys**: InstantDB generates UUIDs automatically; expose them as `id`.
- **Relationships**: model with InstantDB links/references (e.g. `property.spaces`, `property.suppliers`).
- **Audit fields**: include `createdAt` and `updatedAt` timestamps on business entities where InstantDB allows.
- **Logical deletion**: prefer soft deletes using a `status` or `deletedAt` field on business entities.
- **Sensitive data**: do not store PII in plain text beyond what InstantDB manages; respect `sdd/security.md`.
- **Schema evolution**: InstantDB is schema-flexible, but breaking changes to namespaces or relationships require an ADR in `sdd/decisions/`.
- **Integrity validations**: enforce uniqueness and required fields at the application layer using InstantDB transactions and validation rules.

### Example: InstantDB Conventions

| Aspect          | Convention                                               |
| --------------- | -------------------------------------------------------- |
| Namespaces      | camelCase, singular (`property`, `space`, `supplier`)    |
| Link attributes | `<entity>Id` or plural relation name (`property.spaces`) |
| Timestamps      | `createdAt`, `updatedAt` as ISO 8601 strings             |
| Status enums    | `ACTIVE`, `ARCHIVED`, etc.                               |
| Queries         | Colocated in module files (`property.queries.ts`)        |

---

## Code Organization

```text
prop-man-1/
├── src/
│   ├── app.html              # SvelteKit app shell
│   ├── app.d.ts              # Global app types
│   ├── app.css               # Global styles + Tailwind import + design tokens
│   ├── routes/               # SvelteKit routes
│   │   ├── (app)/            # Authenticated layout
│   │   │   ├── dashboard/
│   │   │   ├── properties/
│   │   │   ├── spaces/
│   │   │   └── suppliers/
│   │   ├── (auth)/           # Public auth layout
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── +layout.svelte    # Root layout
│   │   └── +layout.ts        # Root layout load
│   └── lib/
│       ├── components/       # Reusable UI components built from Bits UI
│       │   ├── ui/           # Primitive wrappers (Button, Input, Card, etc.)
│       │   └── layout/       # Layout components
│       ├── instantdb/        # InstantDB client, schema types, auth helpers
│       │   ├── client.ts
│       │   ├── schema.ts
│       │   └── auth.ts
│       ├── modules/          # Domain modules
│       │   ├── properties/
│       │   │   ├── property.types.ts
│       │   │   ├── property.queries.ts
│       │   │   ├── property.service.ts
│       │   │   └── property.schema.ts
│       │   ├── spaces/
│       │   └── suppliers/
│       ├── stores/           # Svelte stores (theme, auth state, etc.)
│       └── utils/            # Pure helpers, formatters, cn()
├── static/                   # Static assets
├── tests/                    # Unit and integration tests
│   ├── unit/
│   └── integration/
├── sdd/                      # SDD specs and decisions
│   ├── design-system/
│   ├── decisions/
│   └── features/
├── bun.lock                  # Bun lockfile
├── package.json
├── svelte.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Project Golden Rules

1. **All public APIs and forms are validated** with Zod before touching business logic or InstantDB transactions.
2. **No hard deletes** on business entities (`Property`, `Space`, `Supplier`); use `status: ARCHIVED` or soft-delete flags.
3. **Auth-guarded routes**: every `(app)` route asserts an active InstantDB session; redirect unauthenticated users to `/login`.
4. **Design System first**: every new UI component must exist in Pencil.dev and be built from the documented primitives before code is written.
5. **Feature worktrees only**: no feature code is written directly on `main`; each feature uses its own worktree per `sdd/workflow.md`.
6. **Sensitive data (PII) is never logged** nor exposed in error responses.
7. **TypeScript strict mode is required**; code with type errors or lint warnings is not merged without justification.
8. **Tests before implementation**: each requirement generates a failing test before the implementation is written.

---

## Typical Data Flow

### Write flow: Create a Property

```text
User (form) ──POST /api/properties──► +page.server.ts
                                              │
                                              ▼
                                       Zod schema validates input
                                              │
                                              ▼
                                       property.service.create()
                                              │
                                              ├──► requireAuth(user)
                                              │
                                              ├──► instantdb.tx(property).insert(data)
                                              │
                                              └──► audit.log('property.created')
                                              │
                                              ▼
                                       Redirect / JSON response { id, ... }
```

### Read flow: View a Property

```text
User ──GET /properties/[id]──► +page.ts
                                  │
                                  ▼
                           property.queries.getById(id)
                                  │
                                  ├──► requireAuth(user)
                                  │
                                  └──► instantdb.query({ properties: { ... } })
                                  │
                                  ▼
                           Rendered in SvelteKit +page.svelte
```

---

## Current Architectural Decisions

| Decision                                    | Status | ADR                                         |
| ------------------------------------------- | ------ | ------------------------------------------- |
| SvelteKit as full-stack framework           | Active | `sdd/decisions/0001-sveltekit-framework.md` |
| InstantDB as database and auth layer        | Active | `sdd/decisions/0002-instantdb-auth.md`      |
| Bits UI + Tailwind CSS v4 for UI primitives | Active | `sdd/decisions/0003-bits-ui-tailwind.md`    |
| Vercel for deployment                       | Active | `sdd/decisions/0004-vercel-deployment.md`   |

---

## Project Setup Completion

- [x] **Stack and Layers** section has real technologies (no `*(e.g. ...)*` placeholders).
- [x] **Code Organization** section describes the actual folder structure.
- [x] At least 5 **Project Golden Rules** are defined.
- [x] **Typical Data Flow** section has a real read and write example.
- [x] **Current Architectural Decisions** table links to real ADR files in `sdd/decisions/`.
