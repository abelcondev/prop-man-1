# prop-man-1 Design System

> Single source of truth for visual design tokens and primitive components.

## Scope

This Design System covers the **foundations** and **base components** used across every feature in prop-man-1. Feature-specific screens and composite components live in their own Pencil files under `sdd/features/<feature-slug>/design/assets/<feature-slug>.pen`.

## Pencil file

- **File**: `sdd/design-system/design-system.pen`
- **Tool**: Pencil.dev, connected via the `pencil-mcp` MCP server.

## How it is populated

1. The Tech Lead created this empty, valid Pencil file.
2. Open `sdd/design-system/design-system.pen` in the Pencil desktop app or VS Code extension.
3. Populate it using the Pencil MCP server, following the **Design System MCP Guide** in `sdd/conventions.md`.
4. Do not edit the `.pen` file manually or generate raw JSON.

## Required contents

### Foundations

Stored as Pencil `variables` and visualized with valid Pencil nodes:

| Token | Variable | Value |
|---|---|---|
| Primary | `color.primary` | `#F97316` |
| Accent | `color.accent` | `#F59E0B` |
| Background | `color.background` | `#FFFFFF` |
| Surface | `color.surface` | `#F8FAFC` |
| Text | `color.text` | `#111827` |
| Text secondary | `color.text-secondary` | `#6B7280` |
| Success | `color.success` | `#16A34A` |
| Warning | `color.warning` | `#F59E0B` |
| Error | `color.error` | `#DC2626` |
| Font | `font.family` | `Inter` |
| Spacing unit | `space.1` | `8` |
| Radius base | `radius.base` | `8` |

### Primitive components

Each component is a top-level `frame` with `reusable: true`. Include frames for all states: default, hover, active, disabled, focus, error, success.

- Button
- Input
- Card
- Modal
- Sheet
- Avatar
- Badge
- Loading
- Textarea
- Select
- Alert
- Label

## Design tokens in code

Design tokens are mirrored in `src/app.css` and the Tailwind `@theme` block. Keep code and Pencil variables in sync; when a token changes, update both places and record the change in an ADR if it affects multiple features.
