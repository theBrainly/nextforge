# NextJS V2 SaaS Starter

Ultra-production-grade Next.js 14+ SaaS boilerplate with Prisma, NextAuth, and RBAC.

## Included Stack
- Next.js 14+ App Router + TypeScript strict mode
- Tailwind CSS + ShadCN-style component system
- Prisma + PostgreSQL
- NextAuth (Credentials + Google OAuth)
- Zustand + React Hook Form + Zod
- Axios interceptors
- ESLint + Prettier + Husky + lint-staged
- Docker + Docker Compose

## Key Features
- Auth flow: Login/Register
- Protected dashboard routes via middleware + server checks
- Role-based access (`ADMIN` / `USER`)
- Admin-only Users page
- Settings page with profile form
- Health check and users API routes
- SEO-ready metadata and dark/light theme

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

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run format`
- `npm run prisma:generate`
- `npm run prisma:migrate`

## Auth Setup
1. Configure `.env` values for `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
2. Add OAuth callback URL in Google console: `http://localhost:3000/api/auth/callback/google`.
3. Run migrations and start app.
