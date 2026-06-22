# Conventions — prop-man-1

> Style, naming, imports, errors, design tokens, and UI/copy conventions for prop-man-1.

---

## Language and Style

- **Primary language**: TypeScript 6.0 with strict mode (`strict: true`).
- **Linter**: ESLint 9 with `@typescript-eslint` and `eslint-plugin-svelte`.
- **Formatter**: Prettier 3 with 100-character line width.
- **Minimum quality**: code with TypeScript errors or lint warnings is not merged without justification.

---

## Naming

| Element                   | Convention                                            | Example                                                           |
| ------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript / Svelte files | kebab-case                                            | `property-form.svelte`, `property.service.ts`                     |
| Svelte components         | PascalCase                                            | `PropertyForm.svelte`, `Button.svelte`                            |
| Classes / types           | PascalCase                                            | `PropertyRepository`, `CreatePropertyInput`                       |
| Functions                 | camelCase, verb first                                 | `createProperty()`, `formatCurrency()`                            |
| Local constants           | UPPER_SNAKE_CASE                                      | `MAX_RETRY_COUNT`                                                 |
| Boolean variables         | `is`/`has`/`can` prefix                               | `isLoading`, `hasPermission`                                      |
| Domain modules            | kebab-case, plural                                    | `modules/properties/`, `modules/spaces/`                          |
| Files inside a module     | `<entity>.<role>.ts`                                  | `property.service.ts`, `property.queries.ts`, `property.types.ts` |
| Tests                     | `<file>.test.ts` next to the file or in `tests/unit/` | `property.service.test.ts`                                        |
| Feature slugs             | kebab-case, no accents, lowercase                     | `property-onboarding`                                             |

---

## Imports

1. External libraries.
2. Project aliases (`$lib/*`, `$app/*`).
3. Local relative imports.

```typescript
// 1. External libraries
import { z } from 'zod';
import type { PageServerLoad } from './$types';

// 2. Project aliases ($lib/*)
import { db } from '$lib/instantdb/client';
import { UnauthorizedError } from '$lib/utils/errors';

// 3. Local relative imports (same module)
import { propertySchema } from './property.schema';
import type { Property } from './property.types';
```

Additional rules:

- Use aliases (`$lib/`) instead of deep relative imports (`../../../../../`).
- Separate type imports (`import type`) from value imports when possible.
- Do not import from `src/` directly; use configured aliases.

---

## Errors

- Use named exceptions for domain errors. Do not return `null` for domain failures.
- In UI, display error messages in neutral English.
- Do not log sensitive data (PII).

### Named domain errors

```typescript
// $lib/utils/errors.ts
export class DomainError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DomainError';
	}
}

export class NotFoundError extends Error {
	constructor(resource: string, id: string) {
		super(`${resource} not found: ${id}`);
		this.name = 'NotFoundError';
	}
}

export class PermissionDeniedError extends Error {
	constructor(action: string) {
		super(`You do not have permission to ${action}.`);
		this.name = 'PermissionDeniedError';
	}
}
```

Usage in services:

```typescript
export async function getPropertyById(user: User, id: string): Promise<Property> {
	const property = await propertyQueries.findById(id);
	if (!property) throw new NotFoundError('Property', id);
	if (!canReadProperty(user, property)) throw new PermissionDeniedError('view this property');
	return property;
}
```

UI:

```svelte
{#if error instanceof PermissionDeniedError}
	<Alert variant="error">{error.message}</Alert>
{:else if error instanceof NotFoundError}
	<Alert variant="error">The requested property does not exist.</Alert>
{:else}
	<Alert variant="error">An unexpected error occurred. Please try again.</Alert>
{/if}
```

---

## Design Tokens

| Token          | Value     | Usage                                        |
| -------------- | --------- | -------------------------------------------- |
| Primary        | `#F97316` | Buttons, links, active states, brand accents |
| Accent         | `#F59E0B` | Highlights, badges, secondary actions        |
| Background     | `#FFFFFF` | Page background                              |
| Surface        | `#F8FAFC` | Cards, panels, input backgrounds             |
| Text primary   | `#111827` | Headings, body text                          |
| Text secondary | `#6B7280` | Captions, placeholders, helper text          |
| Success        | `#16A34A` | Success messages, confirmations              |
| Warning        | `#F59E0B` | Warnings, pending states                     |
| Error          | `#DC2626` | Errors, destructive actions                  |
| Font           | `Inter`   | All UI text (single font family)             |
| Spacing unit   | `8px`     | Margins, paddings, gaps (0.5rem)             |
| Radius base    | `8px`     | Cards, buttons, inputs                       |
| Radius full    | `9999px`  | Pills, avatars                               |

---

## Design System

- **UI primitives library**: Bits UI 2.18 (headless Svelte components).
- **Pencil Design System file**: `sdd/design-system/design-system.pen`.
- **How the Design System is created**:
  - The Tech Lead creates **only an empty, valid Pencil file** at `sdd/design-system/design-system.pen` (content: `{"version": "2.13", "children": []}`).
  - The Tech Lead asks the human to open the file in the Pencil desktop app or VS Code extension and to populate it using the Pencil MCP server.
  - The human builds the Design System by following the [Design System MCP Guide](#design-system-mcp-guide) below.
  - Neither the Tech Lead nor the Designer writes the Design System `.pen` content manually or via raw JSON generation.
- **Design System contents** (must be complete before feature design begins):
  - **Foundations** (stored as Pencil `variables` and visualized with valid Pencil nodes):
    - Colors: primary `#F97316`, accent `#F59E0B`, background `#FFFFFF`, surface `#F8FAFC`, text `#111827`, text-secondary `#6B7280`, success `#16A34A`, warning `#F59E0B`, error `#DC2626`.
    - Typography: one font family only — `Inter`, type scale (Heading XL/LG/MD/SM, Body, Body Small, Caption), weights, line heights.
    - Spacing: base unit `8px` and scale.
    - Radius: corner radius scale.
  - **Primitive/base components** (each is a `frame` with `reusable: true`, with variants/frames for default, hover, active, disabled, focus, error, and success states):
    - Button
    - Input
    - Card
    - Modal
    - Sheet
    - Avatar
    - Badge
    - Loading
    - Textarea, Select, Alert, Label (Bits UI provides these primitives).
- The Design System must exist in Pencil **before** any feature-specific visual design.
- Feature designs reuse the Design System primitives; new primitives are added to the Design System only when a feature genuinely needs them.
- Developers implement UI using Bits UI primitives, styled to match the Pencil Design System exactly.
- **Feature views do NOT live in `design-system.pen`**. Each feature has its own Pencil file at `sdd/features/<feature-slug>/design/assets/<feature-slug>.pen`, built from the Design System primitives.

### Design System MCP Guide

This guide is for the human (or the designer agent assisting via MCP). It replaces manual `.pen` editing. The Pencil MCP server must be installed and connected.

**Prerequisites**

- Pencil desktop app or VS Code extension installed.
- Pencil MCP server configured in Spectre (`sdd/tech-stack.md` records the MCP name: `pencil-mcp`).
- The empty `sdd/design-system/design-system.pen` file is open in Pencil.

**Step 1 — Create the document variables**

Using the MCP `set_variables` tool (or the Pencil variables panel), create these variables:

```json
{
	"color.primary": { "type": "color", "value": "#F97316" },
	"color.accent": { "type": "color", "value": "#F59E0B" },
	"color.background": { "type": "color", "value": "#FFFFFF" },
	"color.surface": { "type": "color", "value": "#F8FAFC" },
	"color.text": { "type": "color", "value": "#111827" },
	"color.text-secondary": { "type": "color", "value": "#6B7280" },
	"color.success": { "type": "color", "value": "#16A34A" },
	"color.warning": { "type": "color", "value": "#F59E0B" },
	"color.error": { "type": "color", "value": "#DC2626" },
	"font.family": { "type": "string", "value": "Inter" },
	"space.1": { "type": "number", "value": 8 },
	"space.2": { "type": "number", "value": 16 },
	"space.3": { "type": "number", "value": 24 },
	"space.4": { "type": "number", "value": 32 },
	"space.5": { "type": "number", "value": 40 },
	"space.6": { "type": "number", "value": 48 },
	"space.8": { "type": "number", "value": 64 },
	"radius.none": { "type": "number", "value": 0 },
	"radius.small": { "type": "number", "value": 4 },
	"radius.base": { "type": "number", "value": 8 },
	"radius.medium": { "type": "number", "value": 12 },
	"radius.large": { "type": "number", "value": 16 },
	"radius.full": { "type": "number", "value": 9999 }
}
```

**Step 2 — Create the Foundations frame**

Create a top-level `frame` named **Foundations** (`id: foundations`). Inside it create three child `frame`s:

1. **Colors** — one row per color token. Each row has:
   - a `rectangle` (`width`: 48, `height`: 48) with `fill: "$color.<name>"`
   - a `text` label with the token name and hex value
2. **Typography** — one `text` node per style (Heading XL, Heading LG, Heading MD, Heading SM, Body, Body Small, Caption) using `"fontFamily": "$font.family"`.
3. **Spacing & Radius** — a `frame` with labeled `rectangle` or `text` samples that reference `$space.*` and `$radius.*`.

**Step 3 — Create primitive components**

For each component (Button, Input, Card, Modal, Sheet, Avatar, Badge, Loading, and Textarea, Select, Alert, Label), create a top-level `frame` with `reusable: true`. Inside each component frame, create one child `frame` per state:

- default
- hover
- active
- disabled
- focus
- error
- success

Each state frame contains the actual Pencil nodes that represent that component state (rectangles, text, icons, etc.).

**Step 4 — Validate before closing**

- Every node has a valid `type` from the list in [Pencil Format Reference](#pencil-format-reference).
- Every node has `id`, `x`, `y`, `width`, `height`.
- All color, spacing, radius, and font values come from the document `variables`.
- Save the file so Git can track it.

### Mapping Pencil → Code

| Pencil artifact              | Code source                                     |
| ---------------------------- | ----------------------------------------------- |
| Design tokens                | CSS variables in `src/app.css` / Tailwind theme |
| Primitive components         | Bits UI primitives                              |
| Composite/feature components | Built from primitives, styled per Pencil frames |
| Layout patterns              | Reused from Design System page frames           |

## Visual Design Files

- **Default tool**: Pencil.dev, connected via MCP (`pencil-mcp`).
- **Pencil file per feature**: `sdd/features/<feature-slug>/design/assets/<feature-slug>.pen`.
- **Pencil Design System file**: `sdd/design-system/design-system.pen`.
- The `.pen` file is JSON-based and must be tracked in Git. It must be a valid Pencil document using the native Pencil schema (`{"version": "2.13", "children": [...]}`). Do not use custom root schemas with fields like `tokens`, `primitives`, `layouts`, or `breakpoints`; document design tokens in this file and in `sdd/design-system/README.md` instead.
- **Only use valid Pencil node types** (see [Pencil Format Reference](#pencil-format-reference) below). Do not invent types such as `page`, `color-swatch`, `text-style`, `spacing-token`, `radius-token`, or `component`.
- Every new screen or component must exist in Pencil.dev before implementation begins.
- The Issue `[Design]` records frame/view identifiers, reusable component names, and design tokens so developers can replicate the design in code.

### Pencil Format Reference

Consult https://docs.pencil.dev/for-developers/the-pen-format for the full specification.

**Valid node `type` values** (use only these):

```text
frame, group, rectangle, ellipse, polygon, path, text,
note, prompt, context, icon, script, ref
```

**Document structure:**

```json
{
	"version": "2.13",
	"variables": {
		"color.primary": { "type": "color", "value": "#F97316" },
		"color.accent": { "type": "color", "value": "#F59E0B" },
		"color.background": { "type": "color", "value": "#FFFFFF" },
		"color.surface": { "type": "color", "value": "#F8FAFC" },
		"color.text": { "type": "color", "value": "#111827" },
		"color.text-secondary": { "type": "color", "value": "#6B7280" },
		"color.success": { "type": "color", "value": "#16A34A" },
		"color.warning": { "type": "color", "value": "#F59E0B" },
		"color.error": { "type": "color", "value": "#DC2626" },
		"font.family": { "type": "string", "value": "Inter" },
		"space.1": { "type": "number", "value": 8 },
		"space.2": { "type": "number", "value": 16 },
		"radius.base": { "type": "number", "value": 8 }
	},
	"children": [
		{
			"id": "foundations",
			"type": "frame",
			"name": "Foundations",
			"x": 0,
			"y": 0,
			"width": 1200,
			"height": 800,
			"children": [
				{
					"id": "colors-frame",
					"type": "frame",
					"name": "Colors",
					"x": 0,
					"y": 0,
					"width": 560,
					"height": 360,
					"children": [
						{
							"id": "primary-swatch",
							"type": "rectangle",
							"name": "Primary",
							"x": 16,
							"y": 16,
							"width": 48,
							"height": 48,
							"fill": "$color.primary",
							"cornerRadius": 8
						},
						{
							"id": "primary-label",
							"type": "text",
							"name": "Primary label",
							"x": 80,
							"y": 16,
							"width": 200,
							"height": 24,
							"content": "Primary",
							"fontFamily": "$font.family",
							"fontSize": 14
						}
					]
				}
			]
		}
	]
}
```

**Rules to avoid "Failed to open" errors:**

1. Every node must have a `type` from the valid list above.
2. Every node must have an `id` (no `/` characters).
3. Every visual node must have `x`, `y`, `width`, and `height`.
4. Use `variables` at the document root for design tokens (colors, numbers, strings).
5. Reference variables with `$name`, e.g. `"fill": "$color.primary"`.
6. Use `frame` for pages/sections; do not use `page`.
7. Use `rectangle` with a `fill` for color swatches.
8. Use `text` nodes for typography samples and labels.
9. Use `frame` with `reusable: true` for base components; do not use `component`.
10. Use `ref` to instantiate reusable components elsewhere.
11. Do not use `color-swatch`, `text-style`, `spacing-token`, `radius-token`, or any other invented type.

## UI and Copy

- **UI language**: neutral English (no slang, no regionalisms). Error messages must be clear and action-oriented.
- **Dates**: `YYYY-MM-DD` in APIs and storage; `15 Jun 2025` for display lists; `dd/MM/yyyy` for forms.
- **Currency**: displayed as `$1,234.56` (USD, comma thousands separator, dot decimal separator) when needed.
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- **Tone**: direct, no excessive exclamations, no blaming the user. Example:
  - ✅ "Enter a valid email address."
  - ❌ "Oops! Looks like you forgot your email."

---

## References

- For testing strategy and TDD: `sdd/testing.md`.
- For security, RBAC, and PII: `sdd/security.md`.
- For quality gates and Definition of Done: `sdd/quality-gates.md`.

---

## Project Setup Completion

- [x] **Language and Style** section has real tools (no `*(complete)*` placeholders).
- [x] **Naming** table has real conventions for the project's stack.
- [x] **Imports** order and aliases are defined.
- [x] **Errors** strategy is chosen and documented with examples.
- [x] **Design Tokens** section has real colors, typography, and spacing values.
- [x] **Design System** section records the UI primitives library and the Pencil Design System file path.
- [x] **Visual Design Files** section records the Pencil file location and MCP configuration.
- [x] **UI and Copy** section has actual language, formats, and breakpoints.
