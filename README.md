# Multi-Version Next.js Boilerplates (`nextjs-v1`, `nextjs-v2`, `nextjs-v3`)

This repository contains **three production-ready Next.js 14+ boilerplates**, each mapped to a package-style version:

- `nextjs-v1`: Clean startup-ready baseline
- `nextjs-v2`: SaaS-ready with Prisma + NextAuth + RBAC + Docker
- `nextjs-v3`: Founder-grade system with multi-tenancy + Stripe + Redis + email + audit logs

## Version Overview

### V1 (`nextjs-v1`)
Best for teams that want a fast, modern starter with scalable structure but without full backend infra complexity.

Includes:
- Next.js App Router + TypeScript strict + Tailwind
- Zustand, Axios, React Hook Form + Zod
- Login/Register UI and protected dashboard layout
- API health route, toasts, loading skeleton, error boundary
- Theme toggle, SEO metadata, lint/format hooks

### V2 (`nextjs-v2`)
Best for SaaS products that need role-based auth, DB-backed users, and deployable backend foundation.

Includes everything in V1, plus:
- Prisma + PostgreSQL
- NextAuth (Credentials + Google OAuth)
- `ADMIN` / `USER` role-based access
- Protected middleware and admin-only users page
- Docker + Docker Compose
- API formatter + centralized API error handling

### V3 (`nextjs-v3`)
Best for founders launching a production SaaS with billing, tenant isolation, and operational systems.

Includes everything in V2, plus:
- Multi-tenant architecture (`Team`, `TeamMember`)
- Global roles (`SUPER_ADMIN`, `ADMIN`, `USER`) + team roles
- Stripe subscriptions + webhook processing
- Redis cache + rate limiting
- Nodemailer email system (verify/reset/invite)
- Audit logs + feature flags
- Security-oriented middleware and infra-ready setup

## Folder Layout

```text
nextjs-v1/
nextjs-v2/
nextjs-v3/
```

Each folder is a standalone Next.js app with its own `package.json`, scripts, and README.

## How to Use Locally

```bash
cd nextjs-v1   # or nextjs-v2 / nextjs-v3
npm install
cp .env.example .env  # or .env.local if version README specifies
npm run dev
```

## How to Use (For End Users)

Once published, users can scaffold a new project using `npx`:

```bash
npx nextjs-v1 my-new-app
# or
npx nextjs-v2 my-saas-app
# or
npx nextjs-v3 my-enterprise-app
```

This will:
1. Create a directory (e.g., `my-new-app`).
2. Copy the template files.
3. Automatically run `npm install` inside the new project.

## How to Publish

To publish these packages to NPM:

1. Open `publish-all.sh`.
2. Uncomment the `npm publish` line.
3. Run the script:
   ```bash
   sh publish-all.sh
   ```

This script will automatically:
- Build a lightweight CLI wrapper for each version in `dist/`.
- Publish the CLI wrapper to NPM.

