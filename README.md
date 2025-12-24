# E‑commerce Platform (Next.js + Prisma + Postgres)

A modern, full‑stack e‑commerce web application built with **Next.js App Router**, **Prisma**, and **PostgreSQL**, featuring authentication, product browsing, cart/checkout flows, and an admin‑friendly data model.

---

## Features

- **Storefront**
  - Home page with **featured products** and **category showcase**
  - Full **product listing** with filters, search, and sorting
  - **Product detail pages** with images and pricing
  - **Shop** page for exploring all products
- **Shopping Experience**
  - **Shopping cart** with add/update/remove items
  - **Wishlist** support
  - **Checkout flow** with shipping + order summary pages
  - **Order confirmation** page
- **User Accounts**
  - Email/password **sign up / sign in** with NextAuth (credentials provider)
  - User **profile**: name, email, addresses
  - User **orders** and **wishlist** pages
- **Admin‑oriented Data Model**
  - Category hierarchy (parent/child)
  - Featured & published flags on products
  - Seed scripts for demo data (categories, products, demo users)
- **UI & DX**
  - Next.js **App Router** (app directory)
  - Tailwind CSS + shadcn‑ui‑style components (Radix UI)
  - TypeScript throughout
  - Good defaults for ESLint + TypeScript

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 18)
- **Language**: TypeScript
- **UI**:
  - Tailwind CSS
  - Radix UI primitives (via custom UI components)
- **Auth**: NextAuth (Credentials provider)
- **Database**:
  - PostgreSQL (Neon / Vercel Postgres compatible)
  - Prisma ORM (v6)
- **Deployment**:
  - Vercel (recommended)
  - Neon or Vercel Postgres for the DB

---

## Project Structure (high‑level)

- `app/` – Next.js App Router pages
  - `page.tsx` – Home page
  - `shop/`, `products/`, `cart/`, `checkout/`, `wishlist/`, etc.
  - `auth/` – sign‑in / sign‑up / error pages
  - `api/` – API routes for auth and user operations
- `components/` – UI + domain components
  - `home/` – hero, featured products, category showcase, etc.
  - `product/` – product card, product details, filters, grid
  - `cart/`, `checkout/`, `layout/`, `ui/` (buttons, inputs, dialogs, etc.)
- `lib/`
  - `db.ts` – Prisma client and DB configuration
  - `auth.ts`, `auth-utils.ts` – NextAuth + simple auth helpers/store
  - hooks and shared types/utils
- `prisma/`
  - `schema.prisma` – Prisma schema (User, Product, Category, Order, Wishlist, etc.)
  - `seed.ts` – local dev seed script
  - `dev.db` – local SQLite dev DB (if used)
- `scripts/`
  - `seed.ts` – convenience seed script (via `npm run prisma:seed` or similar)
  - `seed-production.js` – production seeding using Postgres
  - `debug-db.js`, `add-more-products.js` – helper scripts
- `public/` – static assets and placeholders

---

## Getting Started

### 1. Prerequisites

- **Node.js** 18+ (or whatever your Node version is)
- **npm** or **pnpm** (project currently uses `npm` in scripts)
- A **PostgreSQL** database (local, Neon, or Vercel Postgres)

### 2. Clone & Install

git clone <YOUR_REPO_URL>
cd <your-project-folder>

# Install dependencies
npm install---

## Environment Variables

Use `.env.local` for local development. The repo contains an `env.example` file as a reference.

### Required variables

# Database (Postgres)
DATABASE_URL="postgresql://username:password@host:port/database_name"

# For Neon / Vercel Postgres, you can also have:
# POSTGRES_URL, POSTGRES_URL_NON_POOLING, POSTGRES_PRISMA_URL, etc.

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-replace-with-strong-random-string"
NEXTAUTH_URL="http://localhost:3000"**Local dev**:
- Copy `.env.example` → `.env.local`
- Fill in the real values from your Postgres provider (Neon, etc.)

**Production (Vercel)**:
- Set environment variables in the Vercel dashboard (Project → Settings → Environment Variables)
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL` (often auto‑set by Vercel, but can be set manually)

---

## Database & Prisma

### Prisma schema

`prisma/schema.prisma` defines:

- `User` – basic user with email, password, name
- `Product` – products with price, slug, featured, isPublished, category relation
- `Category` – categories with parent/child relations
- `Order`, `OrderItem` – orders and line items
- `Wishlist` – user/product wishlist join

### Migrations

The project was initialized with Prisma Migrate. To create/apply migrations locally:

# After editing prisma/schema.prisma
npx prisma migrate dev --name <migration-name>To apply existing migrations to a fresh database (e.g., production):

npx prisma migrate deploy---

## Seeding the Database

There are scripts to populate demo data (categories, products, demo users).

### Local dev seed

Prisma `seed` is configured in `package.json`:

"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/seed.ts"
}Run:

# Make sure DATABASE_URL points to your local/dev DB
npx prisma migrate dev
npx prisma db seed### Production seed (optional)

There is a `scripts/seed-production.js` that seeds a production Postgres database using `POSTGRES_PRISMA_URL` or `DATABASE_URL`. On a production environment:

node scripts/seed-production.jsMake sure the environment variables point to your production database before running this.

---

## Running the App Locally

### Development

npm run dev
# then open http://localhost:3000### Type checking & linting (if desired)

npm run lint
# TypeScript is run via Next.js build / dev under the hood### Production build

npm run build
npm start
# visit http://localhost:3000---

## Authentication

- Implemented via **NextAuth** with a **Credentials** provider.
- Basic email/password login; passwords are stored in the database for demo purposes (not production‑secure).
- `lib/auth.ts` and related utilities handle:
  - Credential validation
  - User lookup / creation in a simple JSON store or DB (depending on implementation)
  - Session and JWT callbacks

For production, you should:
- Hash passwords (e.g., bcrypt)
- Use a proper user registration flow
- Potentially swap to OAuth providers (Google, GitHub, etc.)

---

## Deployment (Vercel + Postgres/Neon)

1. **Push your repo** to GitHub/GitLab/Bitbucket.
2. **Create a Vercel project** and import the repo.
3. **Set environment variables**:
   - `DATABASE_URL` – full Postgres connection string
   - `NEXTAUTH_SECRET` – secure random string
   - `NEXTAUTH_URL` – `https://your-production-domain`
4. If using Neon or Vercel Postgres:
   - Follow their instructions to get the **pooled** connection URL.
   - Use that URL as `DATABASE_URL`.
5. **Run migrations** against your production database:
   - Use Prisma Migrate from local or a CI step:
    
     npx prisma migrate deploy
     6. (Optional) **Seed** using `scripts/seed-production.js` or your preferred method.

---

## Scripts Summary

In `package.json`:

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "postinstall": "node scripts/setup-env.js && prisma generate"
}- `dev` – start local dev server
- `build` – create production build
- `start` – run production server
- `lint` – run ESLint via Next.js
- `postinstall` – ensures Prisma client is generated (and env is prepared) after install

---

## Common Issues & Troubleshooting

### 1. Prisma `P1000` – Authentication failed

- Check `DATABASE_URL` (`.env.local` or Vercel env).
- Verify username/password are correct and DB is reachable.
- For Neon/Vercel Postgres, ensure you copied the full connection string.

### 2. “Table `public.Product` / `public.Category` does not exist”

- Database migrations not applied.
- Run:
 
  npx prisma migrate dev   # local
  # or
  npx prisma migrate deploy   # production
  - After that, run the seed script if you want demo data.

### 3. NextAuth “Invalid URL” error

- `NEXTAUTH_URL` is missing or invalid.
- For local dev:
 
  NEXTAUTH_URL="http://localhost:3000"
  - For production, set it to your deployed domain.

### 4. Vercel build fails on `prisma generate`

- Make sure `DATABASE_URL` is set in Vercel.
- Ensure it starts with `postgresql://` or `postgres://`.
- Confirm Prisma and `postinstall` are configured correctly in `package.json`.

---

## Roadmap / Ideas

- Add admin dashboard (manage products, categories, orders)
- Add payment integration (Stripe, etc.)
- Add proper user registration and password hashing
- Improve search & filtering (faceted filtering, full‑text search)
- Add reviews, ratings, and more merchandising features

---

## License

This project is intended as a learning/demo e‑commerce platform under  MIT license