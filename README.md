# Best Dive Guide — bestdiveguide.com

> Dive. Eat. Sleep. Repeat.

Premium ranking platform for divers covering the world's best dive operations, restaurants, and stays.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router, React) |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Email | Resend |
| Auth (admin) | Supabase Auth |

## Setup

### 1. Supabase Database

1. Create a new Supabase project at https://supabase.com
2. In the SQL editor, run the full migration:  
   `supabase/migrations/001_initial_schema.sql`
3. Copy your Project URL and anon key

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=re_your_key
EMAIL_FROM=noreply@bestdiveguide.com
NEXT_PUBLIC_SITE_URL=https://bestdiveguide.com
ADMIN_SECRET=your_secure_secret
```

### 3. Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

### 4. Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the GitHub repo to Vercel dashboard and set env vars there.

## Key Features Built

- ✅ Full database schema — listings, votes (3 layers), voters, sustainability, rankings
- ✅ Three-layer voting system with weighted scoring
- ✅ Automatic trust multiplier calculation per voter profile
- ✅ Sustainability scoring + Green Diver Approved badge logic  
- ✅ Admin approval workflow — no vote counts until verified
- ✅ Multi-step voting form with conditional category questions
- ✅ Auto thank-you email on vote submission (Resend)
- ✅ Rankings API with filtering (country, category, green badge)
- ✅ Most Travelled Voter annual tracker
- ✅ Database triggers for automatic score recalculation on vote approval
- ✅ Row Level Security policies

## Pages (to build next)

| Page | Status |
|------|--------|
| / — Homepage | Design complete (widget preview) |
| /vote — Voting form | ✅ Built |
| /top100 — Full ranking | Next |
| /listing/[slug] — Individual listing | Next |
| /admin — Dashboard | Next |
| /about — How it works | Next |

## Database Tables

| Table | Purpose |
|-------|---------|
| `listings` | All dive centers, resorts, liveaboards, restaurants |
| `voters` | All registered voters with trust multipliers |
| `panel_members` | Layer 1 — Professional Panel |
| `votes` | All vote submissions with scores |
| `ranking_scores` | Computed scores per listing |
| `committee_reviews` | Layer 3 — Annual Review Committee |
| `committee_decisions` | Individual committee adjustments |
| `most_travelled_voter` | Annual MTV award tracking |
| `annual_awards` | Award archive |

## Scoring Logic

- Each question: 1–10 scale
- 7 questions × active category = 70 max raw points per category
- Professional Panel votes: **3× multiplier**
- Public votes: **1.0× – 1.4×** based on voter role and dive experience
- Sustainability: calculated separately, does not affect ranking position
- Green Diver Approved: sustainability average ≥ 8.0 across relevant questions
- Minimum 6 verified votes for any badge eligibility
