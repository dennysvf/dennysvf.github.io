---
title: GCli
tagline: Clinic management system
summary: A web platform covering the full care cycle in clinics, from multi-provider scheduling to medical records, from billing to closing the cash register.
repo: https://github.com/dennysvf/GCli
stack: [Next.js, TypeScript, PostgreSQL, Prisma, pg-boss, Better Auth, Tailwind, shadcn/ui, Vitest, Playwright]
status: em andamento
startedAt: 2026-09-28
order: 1
featured: true
stats:
  - { value: '14', label: 'features delivered' }
  - { value: '38+', label: 'recorded ADRs' }
  - { value: '0', label: 'hand-written lines' }
---

## The problem

Small and mid-sized clinics usually run on spreadsheets, paper calendars and WhatsApp, scattered across the front desk, the practitioners and finance. **GCli** brings it all into one system, configurable for different specialties (medical, dental, physiotherapy, psychology, aesthetics) without being locked into a single business model.

## What already works

- Authentication with 4 access profiles (Administrator, Manager, Front desk and Practitioner)
- Configurable units, rooms and service catalog
- Multi-resource scheduling (practitioner × room × unit) with conflict checks, walk-ins and recurring series
- Electronic medical records with time-based locking and addenda
- Documents generated from templates (medical certificate, statement, prescription)
- Billing, partial payments and prepaid session packages
- Daily cash register per unit and expense tracking
- Management dashboard and reports exportable to CSV and PDF
- Internationalization with country profiles

## Architecture

A **modular monolith** with module boundaries enforced by lint, per-organization isolation (SaaS-ready), centralized authorization, transactional auditing and database-level constraints against double booking. Background jobs use pg-boss, a queue inside PostgreSQL itself. Every relevant decision is recorded as an ADR.

## How it was built

I did not write a single line. The project started with a **complete PRD**: 15 features, personas, success metrics and a dependency graph organized into execution waves. For each feature, the agent produces a **spec** and a **plan**, then implements it in step-by-step commits. The AI also writes the integration tests (Testcontainers) and the E2E tests (Playwright).

The repository keeps a **build log** in Portuguese and English with the lessons from each step, plus its own design system, "Ink and Paper", with contrast measured against WCAG 2.2 AA.
