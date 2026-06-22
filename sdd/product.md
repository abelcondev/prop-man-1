# Product — prop-man-1

> **Global product definition**. This document describes the product as a whole.
> Individual product features are defined in `sdd/features/` as separate SDD projects.

---

## Vision

A property management app where users can register, create properties, define spaces (rooms), and manage suppliers for each property.

## Product Requirements Document (PRD)

> The PRD captures the product-level requirements that drive technical decisions. The Tech Lead uses this section to reconcile technology choices against product needs.

### Goals

- _Goal 1 — what the product must achieve._
- _Goal 2 — what the product must achieve._

### Functional requirements

- `FR1` — _The system must ..._
- `FR2` — _The system must ..._

### Non-functional requirements

- `NFR1` — _Performance, security, scalability, or compliance need._
- `NFR2` — _Accessibility, localization, or operational requirement._

### User stories

- As a `<role>`, I want `<goal>` so that `<benefit>`.
- As a `<role>`, I want `<goal>` so that `<benefit>`.

### Release criteria

- _Criterion that must be true for the product to be considered ready._

## Problem

Property owners and small managers lack a simple, centralized place to track properties, their rooms, and the suppliers that service them.

## Target Users

Property owners, landlords, and small property managers.

## Core Value Proposition

Keep all property, room, and supplier information organized and accessible in one place.

## Key Capabilities

- _Capability 1 — to be refined as the product evolves._
- _Capability 2 — to be refined as the product evolves._

## Out of Scope

- _Explicitly out of scope for the product as a whole._

## Success Metrics

- _Metric 1 — to be defined._
- _Metric 2 — to be defined._

## Roadmap

- _Future feature or milestone — create a real SDD project under `sdd/features/` when work starts._

## Notes

- _Additional product-level notes, constraints, or references._

## Project Setup Gate

Before creating any feature under `sdd/features/`, the Tech Lead must complete the project setup on `main`:

- Fill `sdd/architecture.md` (set **Pencil.dev** as the visual design tool).
- Fill `sdd/conventions.md` (include the app's **color palette and design tokens**).
- Fill `sdd/tech-stack.md` (include the **Pencil.dev MCP server** and any other MCPs).
- Install dependencies and configure GitHub.
- Configure the Pencil.dev MCP connection.

No feature worktree is created until this gate is complete.
