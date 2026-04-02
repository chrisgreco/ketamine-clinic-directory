# KetamineClinics.com - Ketamine Clinic Directory

A Next.js directory of ketamine therapy clinics across the United States. Helps patients find verified providers for depression, PTSD, anxiety, chronic pain, and other conditions.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Email:** Resend
- **Deployment:** Vercel

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `RESEND_API_KEY` | Resend API key for email notifications |
| `NEXT_PUBLIC_SITE_DOMAIN` | Your domain (default: ketamineclinics.com) |

### 3. Database setup

Run the SQL schema in your Supabase SQL editor:

```bash
# Copy contents of supabase-schema.sql into Supabase SQL Editor and run
```

This creates three tables with `kc_` prefix: `kc_listings`, `kc_reviews`, `kc_leads`.

### 4. Seed data

```bash
npm run seed
```

Seeds 50 clinic listings across 10 cities with 100 reviews.

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  [slug]/page.tsx          # City + condition pages
  listing/[slug]/page.tsx  # Individual clinic profiles
  blog/page.tsx            # Blog index
  blog/[slug]/page.tsx     # Blog articles
  add-listing/page.tsx     # Clinic submission form
  admin/page.tsx           # Admin dashboard
  disclaimer/page.tsx      # Full medical disclaimer
  api/leads/route.ts       # Lead generation API
  api/listings/route.ts    # Listings API
  sitemap.ts               # Main sitemap
  sitemap-conditions.xml/  # Conditions sitemap
components/                # Shared UI components
content/blog/              # MDX blog articles
data/                      # Static data (cities, conditions, blog metadata)
lib/                       # Supabase client, Resend, utilities
scripts/seed.ts            # Database seed script
supabase-schema.sql        # Database schema
```

## Medical Content Guidelines

All content on this site MUST follow these guidelines:

1. **Never make direct medical claims.** Use hedging language: "studies suggest," "research indicates," "may help."
2. **Always include caveats.** Every page includes "consult your physician" and "individual results vary."
3. **Reference published research** where applicable, without guaranteeing outcomes.
4. **Include crisis resources** on every page (988 Lifeline, Crisis Text Line).
5. **Display medical disclaimer** in footer and on dedicated disclaimer page.
6. **No patient testimonials with medical claims.** Reviews describe experience, not outcomes.

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Post-Launch Checklist

- [ ] Verify all environment variables are set in production
- [ ] Run database schema in production Supabase
- [ ] Run seed script against production (or add real listings)
- [ ] Test lead form submission end-to-end
- [ ] Test email notifications via Resend
- [ ] Verify sitemap.xml is accessible
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags and Open Graph with social card validators
- [ ] Test JSON-LD structured data with Google Rich Results Test
- [ ] Set up Supabase Auth for admin dashboard protection
- [ ] Configure Resend domain authentication
- [ ] Set up monitoring/alerting for API errors
- [ ] Review and update pricing data quarterly
- [ ] Verify crisis resources are correct and links work
