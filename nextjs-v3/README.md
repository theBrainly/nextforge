# NextJS V3 Founder Starter

Founder-grade, enterprise-level SaaS boilerplate for production launch.

## Stack
- Next.js 14+ App Router + strict TypeScript
- Tailwind + ShadCN-style UI
- Prisma + PostgreSQL
- NextAuth (Credentials + Google OAuth)
- Stripe subscriptions + webhooks
- Redis caching + rate limiting
- Nodemailer email workflows
- Zustand + React Hook Form + Zod
- ESLint + Prettier + Husky
- Docker + Docker Compose

## Core Systems Included
- Authentication with email verification and password reset
- Role model: `SUPER_ADMIN`, `ADMIN`, `USER`
- Multi-tenant team model with role-per-team
- Billing APIs for checkout/portal and webhook sync
- Audit logs and feature flags
- API response formatter and global error handling
- Protected dashboard routes and edge middleware rate limits

## Setup (Local)
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Setup (Docker)
```bash
docker compose up --build
```

## Stripe Setup
1. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `STRIPE_PRICE_ID_PRO` to `.env`.
2. Configure webhook endpoint: `http://localhost:3000/api/stripe/webhook`.
3. Subscribe from `/billing` and verify webhook events update DB records.

## Google OAuth Setup
1. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`.
2. Add callback URL: `http://localhost:3000/api/auth/callback/google`.

## Redis Setup
- Local Redis via Docker is included.
- Used for cache layer and API rate limiting.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run format`
- `npm run prisma:generate`
- `npm run prisma:migrate`
