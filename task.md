# TASK: Rebuild Good People Mortgage Company Website

## Overview

Recreate **goodpeoplemortgage.com** as a modern Next.js application with higher-converting design, deployed on Vercel from a GitHub repo, using Supabase for data (local JSON fallback for dev). The current site is a template-based LenderHomePage.com site — the rebuild should feel custom, premium, and conversion-optimized.

---

## PHASE 0: Project & Infra Setup

### 0.1 — GitHub Repository

```bash
cd /path/to/GoodPeopleMortgageCo
git init
gh repo create GoodPeopleMortgageCo --public --source=. --remote=origin
```

### 0.2 — Next.js Project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Key dependencies to install:

```bash
npm install @supabase/supabase-js framer-motion lucide-react react-hook-form @hookform/resolvers zod next-themes class-variance-authority clsx tailwind-merge
npm install -D @tailwindcss/typography
```

### 0.3 — Vercel Setup

```bash
npx vercel link          # Link to Vercel project
npx vercel env pull       # Pull env vars if any
```

Configure the Vercel project to deploy from the `main` branch of the GitHub repo. Every push to `main` triggers a production deploy.

### 0.4 — Supabase (via MCP or local JSON)

For development, use local JSON files in `src/data/` as the data source. The code should have a data access layer (`src/lib/data.ts`) that abstracts whether data comes from local JSON or Supabase, so switching is a one-line config change.

For production/Supabase setup, use the Supabase MCP to:
1. Create a project (or use existing)
2. Create tables for: `leads`, `blog_posts`, `loan_officers`, `faqs`, `testimonials`
3. Set environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel

---

## PHASE 1: Brand & Design System

### 1.1 — Brand Identity (preserve from existing site)

| Property | Value |
|---|---|
| Company Name | Good People Mortgage Company |
| NMLS | 2409276 |
| Address | 2749 58th Ave N, St Petersburg, FL 33714 |
| Phone | (727) 543-7398 |
| Email | info@goodpeoplemortgage.com |
| Facebook | https://www.facebook.com/profile.php?id=61576381862126 |
| Instagram | https://www.instagram.com/goodpeoplemortgagecompany/ |
| Apply Now URL | https://www.blink.mortgage/app/signup/p/GPMC/matthewschafer |
| Logo URL | https://di1v4rx98wr59.cloudfront.net/c300f9dfc4799/e63a8b382f6a01b6cbc9320417fa73f2898eaf36.png |
| Favicon URL | https://di1v4rx98wr59.cloudfront.net/c300f9dfc4799/2c60d452f6e608bacf325fc4870ed146aa68c51a.png |
| NMLS Consumer Access | https://www.nmlsconsumeraccess.org/ |

### 1.2 — Color Palette

```
Primary Green:     #41644C  (main)
Primary Light:     #7A9382
Primary Lighter:   #B3C1B7
Primary Dark:      #3B5A44
Primary Darker:    #273C2E

Secondary Gold:    #E1B77E  (main)
Secondary Light:   #EACDA5
Secondary Lighter: #F3E2CB
Secondary Dark:    #CBA571

Nav Text:          #1d234a
```

### 1.3 — Design System (Tailwind Config)

Extend `tailwind.config.ts` with:
- The color palette above as custom colors (`primary`, `secondary`, `accent`)
- Custom fonts: Use `Inter` for body, `Playfair Display` or `DM Serif Display` for headings (import via `next/font/google`)
- Smooth scroll behavior
- Custom animations for scroll-reveal, fade-in, slide-up

### 1.4 — Component Library

Build reusable UI components in `src/components/ui/`:
- `Button` — primary, secondary, outline, ghost variants using CVA
- `Card` — with hover lift effect
- `Badge` — for loan types
- `Input`, `Select`, `Textarea` — styled form elements
- `Section` — consistent section wrapper with padding/max-width
- `Container` — responsive container

---

## PHASE 2: Layout & Global Components

### 2.1 — Root Layout (`src/app/layout.tsx`)

- Download and save the logo + favicon to `public/images/`
- Set metadata: title template `%s | Good People Mortgage Company`, default description
- Google Fonts: Inter + display serif font
- Include global nav + footer

### 2.2 — Header / Navigation (`src/components/layout/Header.tsx`)

**Top Bar** (green `#41644c` background):
- Left: phone icon + `(727) 543-7398` click-to-call
- Right: Facebook icon, Instagram icon, Loan Officer link

**Main Nav** (sticky, white background, blur-on-scroll effect):
- Logo (left)
- Links: Purchase, Refinance, Calculators, Resources (dropdown), About (dropdown)
- CTA button: "Apply Now" (links to Blink Mortgage URL)
- Mobile: hamburger menu with slide-out drawer

**Resources Dropdown:**
- Loan Programs
- Loan Process
- Mortgage Basics
- Online Forms
- FAQ
- Blog

**About Dropdown:**
- About Us
- Contact

### 2.3 — Footer (`src/components/layout/Footer.tsx`)

4-column layout:
1. **About Us**: Company description + NMLS: 2409276 + NMLS Consumer Access link
2. **Contact Us**: Full address, phone, email
3. **Disclaimers**: Legal, Privacy Policy, Accessibility Statement, Site Map
4. **Resources**: Loan Programs, Loan Process, Mortgage Basics, Online Forms, FAQ

Bottom bar (darker green): Equal Housing Lender logo + social icons + copyright

### 2.4 — Floating CTA

A sticky/floating "Get Pre-Approved" button that appears on scroll (mobile especially) — links to Apply Now.

---

## PHASE 3: Pages — Content & Conversion Optimization

### 3.1 — Homepage (`src/app/page.tsx`)

This is the most important page. Build these sections top-to-bottom:

**Hero Section:**
- Full-viewport height, background image (use a royalty-free home/family image or gradient)
- Headline: "Realize Your Dreams of Home Ownership"
- Subheadline: "We are home loan experts dedicated to making sure your home purchase or refinance experience is top-notch."
- Two CTA buttons: "Contact Us" (outline) + "Apply Today" (solid)
- Add subtle parallax or gradient overlay animation

**Trust Bar / Social Proof:**
- "Trusted by hundreds of Florida families" with animated counter
- NMLS badge, Equal Housing Lender, BBB-style trust indicators

**Three CTA Cards (conversion-optimized):**
1. Mortgage Calculators — "Calculate your mortgage payment, affordability & more"
2. Loan Programs — "Find out which loan program is right for you"
3. Apply Now — "Get pre-approved in minutes with our quick & easy app"

**Services Overview:**
- Content about FHA, VA, USDA, Jumbo, Conventional loans in Saint Petersburg, FL
- Purchase programs: FHA | VA | USDA | Jumbo | Conventional
- Refinance programs: FHA Streamline | FHA Cash Out | FHA 203k | VA Streamline | VA Cash Out | USDA Streamline | Conventional | Jumbo
- Niche programs: Home Possible, Home Ready, Homes for Heroes, First Time Homebuyer, HELOC

**Quick Quote Form (CONVERSION-CRITICAL):**
- Headline: "Get a Quick Quote"
- Fields: First Name*, Last Name*, Email*, Phone*, Loan Amount (dropdown), Property Value (dropdown), Loan Type (Purchase/Refinance/Debt Consolidation/Home Equity), Credit Score (Excellent/Good/Fair/Poor)
- Consent checkbox with links to Terms of Service and Privacy Policy
- Submit button
- Form data goes to Supabase `leads` table (or local JSON in dev)
- Add animated success state with confetti or checkmark
- **CONVERSION IMPROVEMENT**: Add a multi-step form wizard (step 1: loan type + amount, step 2: contact info) to reduce form abandonment

**Google Reviews / Testimonials:**
- Either embed the Elfsight widget (script: `https://elfsightcdn.com/platform.js`, app ID: `0327ea91-452e-4d51-8aa0-2d9b2d971c68`) OR build a custom testimonials carousel component that reads from `testimonials` data

**Final CTA Section:**
- "Get Started with your Digital Mortgage"
- "Answer a few quick questions, No Hassle, No Obligation"
- "Get Started" button → /apply-now

### 3.2 — Home Purchase Page (`src/app/home-purchase/page.tsx`)

- Hero with purchase-specific imagery
- Step-by-step home buying process (visual timeline)
- Purchase loan programs grid (FHA, VA, USDA, Jumbo, Conventional) with cards linking to sub-pages
- "Why Choose Us" section with value propositions
- Quick Quote form (sidebar or inline)
- CTA: "Get Pre-Approved Today"

### 3.3 — Home Refinance Page (`src/app/home-refinance/page.tsx`)

- Hero with refinance-specific messaging
- "Reasons to Refinance" section (lower payment, cash out, shorter term, remove PMI)
- Refinance programs grid: FHA Streamline, FHA Cash Out, FHA 203k, VA Streamline, VA Cash Out, USDA Streamline, Conventional, Jumbo
- Quick Quote form
- CTA: "Check Today's Rates"

### 3.4 — Mortgage Calculators Page (`src/app/mortgage-calculators/page.tsx`)

Build a calculator hub with 11 interactive calculators. Each calculator should be a client component with real-time calculation.

**Calculators to build** (each as a card linking to a sub-route or tab):
1. **Mortgage Calculator** (`?calc=purchase`) — Loan amount, rate, term → monthly payment with P&I breakdown pie chart
2. **Refinance Calculator** (`?calc=refi`) — Current vs new loan comparison
3. **Extra Payment Calculator** (`?calc=payoff`) — Show how extra payments reduce total interest
4. **Affordability Calculator** (`?calc=prequal`) — "How much home can I afford?" based on income/debts
5. **Principal Calculator** (`?calc=principal`)
6. **Tax Benefits Calculator** (`?calc=tax-benefits`)
7. **APR Calculator** (`?calc=apr`)
8. **Interest-Only Calculator** (`?calc=interest-only`)
9. **Points Calculator** (`?calc=point-payments`) — "Should I pay points?"
10. **Income Calculator** (`?calc=income`) — "How much income to qualify?"
11. **Buydown Calculator** (`?calc=buydown`)

**CONVERSION IMPROVEMENT:** After each calculation result, show a CTA: "Want a personalized quote? Talk to a loan officer" → link to contact or apply.

Disclaimer at bottom: standard calculator disclaimer about hypothetical results.

### 3.5 — Loan Programs Hub (`src/app/loan-programs/page.tsx`)

Two sections:

**Mortgage Rate Options** (4 cards):
- Fixed Rate — lock icon
- Adjustable ARM — sliders icon
- Interest Only — percent badge icon
- Graduated Payments — chart icon

**Loan Program Options** (4 cards with images):
- Conventional Loans
- FHA Home Loans
- VA Loans
- Jumbo Loans

Each card links to its detail page.

CTA banner: "Get Your Mortgage Questions Answered Today!" → /contact-us

### 3.6 — Loan Program Detail Pages

Create pages for each (`src/app/loan-programs/[slug]/page.tsx`):

| Slug | Title |
|---|---|
| `fixed-rate-mortgage` | Fixed Rate Mortgage |
| `adjustable-rate-mortgage` | Adjustable Rate Mortgage (ARM) |
| `interest-only-mortgage` | Interest Only Mortgage |
| `graduated-payment-mortgage` | Graduated Payment Mortgage |
| `conventional-loans` | Conventional Loans |
| `fha-loans` | FHA Loans |
| `va-loans` | VA Loans |
| `jumbo-loans` | Jumbo Loans |
| `usda-loans` | USDA Loans |

Each page should have:
- Hero with program name
- Overview content (write original, SEO-optimized content for each)
- Key features / benefits list
- "Is this right for you?" eligibility section
- Sidebar Quick Quote form
- CTA to Apply Now

Store content in `src/data/loan-programs.json`.

### 3.7 — Loan Process Page (`src/app/loan-process/page.tsx`)

Visual step-by-step mortgage process with animated timeline:
1. Pre-Qualification
2. Loan Application
3. Processing
4. Underwriting
5. Conditional Approval
6. Clear to Close
7. Closing

Each step: icon + title + description. Use vertical timeline on mobile, horizontal on desktop.

### 3.8 — About Us Page (`src/app/about-us/page.tsx`)

- Mission statement: "Our mission is to serve our customers with honesty, integrity and competence. Our goal is to provide home loans to our clients while providing them with the lowest interest rates and closing costs possible. Furthermore, we pledge to help borrowers overcome roadblocks that can arise while securing a loan."
- Values section (3-4 cards: Integrity, Competence, Service, Community)
- Sidebar Quick Quote form
- Team section (placeholder for loan officer photos/bios)

### 3.9 — Contact Us Page (`src/app/contact-us/page.tsx`)

- Company info: address, phone, email
- Embedded Google Map (use an iframe or static map image)
- Contact form: First Name*, Last Name*, Email*, Phone*, Comments*
- Consent checkbox
- Form submits to Supabase `leads` table

### 3.10 — FAQ Page (`src/app/faq/page.tsx`)

Accordion-style FAQ. Store questions in `src/data/faqs.json`. Include common mortgage questions such as:
- What is a mortgage?
- How do I get pre-approved?
- What credit score do I need?
- How much down payment is required?
- What are closing costs?
- What is PMI?
- Fixed vs adjustable rate?
- How long does the process take?
- What documents do I need?
- Can I buy with bad credit?

**CONVERSION IMPROVEMENT:** Add a "Still have questions?" CTA at the bottom linking to contact.

### 3.11 — Mortgage Basics Hub (`src/app/mortgage-basics/page.tsx`)

Grid of 8 topic cards with images:
1. Application Checklist
2. Credit
3. Closing Costs
4. Appraisals
5. Private Mortgage Insurance (PMI)
6. Refinance
7. Glossary of Terms
8. Foreclosure

Each links to a detail page (`src/app/mortgage-basics/[slug]/page.tsx`). Store content in `src/data/mortgage-basics.json`.

CTA banner: "Get Your Mortgage Questions Answered Today!"

### 3.12 — Online Forms Page (`src/app/online-forms/page.tsx`)

- Description of available forms
- Download links for PDFs (host in `public/forms/` or link to original URLs):
  - Uniform Residential Loan Application
  - Unmarried Addendum
  - Additional Borrower
- Sidebar Quick Quote form

### 3.13 — Blog (`src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx`)

**Blog Index:**
- Paginated list of blog posts (9 per page)
- Each post: thumbnail, title, excerpt, date
- Sidebar with categories or recent posts
- Store in `src/data/blog-posts.json` (for dev) or Supabase `blog_posts` table

**Blog Post Detail:**
- Title, date, author
- Full content (Markdown rendered)
- Social share buttons
- "Related Posts" section
- CTA: "Ready to get started? Apply Now"

**Seed blog data with at least 5-10 posts** using titles from the existing site:
- "Your Equity Is Doing Nothing — Here's How Smart Homeowners Use It"
- "Smart Buyers Can Benefit When Rates Rise"
- "Where an ARM May Be a Smarter Move"
- "Is Refinancing Your Mortgage the Right Move?"
- "Housing Affordability in 2026: Why Rates Are Not the Only Factor"
- "Exploring Your Options: How to Buy a Home Without 20% Down"
- "Loyalty to Your Bank? Even With Your Home Loan?"
- "Refinancing Isn't Just About the Rate — It's About Your Options"

### 3.14 — Loan Officer Page (`src/app/loan-officer/page.tsx`)

- Grid/list of loan officers with photo, name, NMLS, title, phone, email
- Store in `src/data/loan-officers.json`
- Seed with at least one officer (Matthew Schafer based on apply URL)

### 3.15 — Apply Now Page (`src/app/apply-now/page.tsx`)

- Redirect to Blink Mortgage: `https://www.blink.mortgage/app/signup/p/GPMC/matthewschafer`
- Show brief loading/redirect message with company logo
- Use `next/navigation` redirect or meta refresh

### 3.16 — Legal Pages

Create simple content pages:
- `/legal` — Terms of Service placeholder
- `/privacy-policy` — Privacy policy placeholder
- `/accessibility-statement` — Accessibility statement placeholder

---

## PHASE 4: Conversion Optimization Features

These are NEW features not on the current site, designed to increase lead conversion:

### 4.1 — Multi-Step Quote Wizard (`src/components/QuoteWizard.tsx`)

Replace the basic form with a 3-step wizard:
1. Step 1: "I want to..." (Purchase / Refinance) + Loan Amount slider
2. Step 2: Property Value + Credit Score
3. Step 3: Name, Email, Phone + Submit
- Progress bar at top
- Animated transitions between steps
- Success screen with next-steps info

### 4.2 — Exit-Intent Popup

When user moves mouse to leave the page, show a modal:
- "Wait! Get your free rate quote before you go"
- Simplified form: just name + email + phone
- Cookie-based: show only once per session

### 4.3 — Sticky Mobile CTA Bar

Fixed bottom bar on mobile with two buttons:
- "Call Now" (tel: link)
- "Apply Now" (Blink Mortgage link)

### 4.4 — Live Chat Widget Placeholder

Add a floating chat button (bottom-right) that links to a contact form or could be replaced with Tidio/Intercom later.

### 4.5 — Rate Ticker / Banner

Optional top banner: "Today's Rates: 30yr Fixed ~6.5% | 15yr Fixed ~5.8% | Call for your personalized rate"
This can be static or fetched from an API.

### 4.6 — Social Proof Notifications

Small toast notifications that appear periodically:
- "John D. from Tampa just got pre-approved!" (use fake/rotating data)
- Subtle, non-intrusive, auto-dismiss after 4 seconds

### 4.7 — SEO Optimization

- Generate proper `metadata` for every page (title, description, OpenGraph, Twitter cards)
- Add JSON-LD structured data for LocalBusiness
- Create `sitemap.xml` via Next.js built-in `sitemap.ts`
- Create `robots.txt`
- Use semantic HTML throughout

---

## PHASE 5: Data Layer

### 5.1 — Local JSON Files (for dev)

Create these in `src/data/`:

**loan-programs.json** — Array of loan programs with: slug, title, shortDescription, fullContent (markdown), icon, image, features[], eligibility[]

**mortgage-basics.json** — Array of topics with: slug, title, description, image, content (markdown)

**faqs.json** — Array of {question, answer} objects

**blog-posts.json** — Array of posts with: slug, title, excerpt, content (markdown), date, author, image, category

**loan-officers.json** — Array of officers with: name, title, nmls, phone, email, image, bio, applyUrl

**testimonials.json** — Array of reviews with: name, rating, text, date

### 5.2 — Data Access Layer (`src/lib/data.ts`)

```typescript
// Toggle between 'local' and 'supabase'
const DATA_SOURCE = process.env.DATA_SOURCE || 'local';

export async function getLoanPrograms() { ... }
export async function getBlogPosts(page?: number) { ... }
export async function getFAQs() { ... }
// etc.
```

### 5.3 — Supabase Schema (for production)

When ready to move to Supabase, create these tables:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  loan_amount TEXT,
  property_value TEXT,
  loan_type TEXT,
  credit_score TEXT,
  comments TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT DEFAULT 'Good People Mortgage',
  category TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rating INT DEFAULT 5,
  text TEXT NOT NULL,
  date TEXT
);
```

---

## PHASE 6: API Routes

### 6.1 — Lead Submission (`src/app/api/leads/route.ts`)

POST endpoint that:
1. Validates input with Zod
2. Saves to Supabase `leads` table (or appends to local JSON in dev)
3. Optionally sends email notification (future enhancement)
4. Returns success/error response

### 6.2 — Blog API (`src/app/api/blog/route.ts`)

GET endpoint for paginated blog posts (used if client-side pagination is needed).

---

## PHASE 7: Performance & Polish

### 7.1 — Images

- Download the logo and favicon from the current site and save to `public/images/`
- Use `next/image` for all images with proper width/height/alt
- Use placeholder blur for lazy-loaded images
- For hero backgrounds and section images, use high-quality royalty-free images from Unsplash or use gradient/pattern backgrounds

### 7.2 — Animations

- Use `framer-motion` for:
  - Page transitions
  - Scroll-triggered section reveals (fade-in-up)
  - Hover effects on cards
  - Form step transitions
  - Number counting animations for stats

### 7.3 — Accessibility

- All images have alt text
- Proper heading hierarchy
- Keyboard navigation support
- ARIA labels on interactive elements
- Color contrast compliance
- Focus indicators
- Skip-to-content link

### 7.4 — Loading States

- Skeleton loaders for blog list
- Loading spinners for form submission
- Optimistic UI updates where applicable

---

## PHASE 8: Deployment

### 8.1 — Initial Commit & Push

```bash
git add .
git commit -m "Initial commit: Good People Mortgage Company website rebuild"
git push -u origin main
```

### 8.2 — Vercel Deployment

```bash
npx vercel --prod
```

Or rely on the GitHub integration — pushing to `main` auto-deploys.

### 8.3 — Environment Variables on Vercel

Set these in Vercel dashboard or CLI:
- `NEXT_PUBLIC_SUPABASE_URL` (when Supabase is ready)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (when Supabase is ready)
- `DATA_SOURCE=local` (switch to `supabase` later)

### 8.4 — Verify Deployment

- Check all pages render correctly
- Test forms submit properly
- Verify all links work
- Check mobile responsiveness
- Run Lighthouse audit

---

## File Structure Summary

```
GoodPeopleMortgageCo/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── favicon.png
│   │   └── hero-bg.jpg
│   └── forms/
│       ├── urla.pdf
│       ├── urla-unmarried.pdf
│       └── urla-additional.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Homepage
│   │   ├── globals.css
│   │   ├── home-purchase/page.tsx
│   │   ├── home-refinance/page.tsx
│   │   ├── mortgage-calculators/page.tsx
│   │   ├── loan-programs/
│   │   │   ├── page.tsx                # Hub
│   │   │   └── [slug]/page.tsx         # Detail
│   │   ├── loan-process/page.tsx
│   │   ├── mortgage-basics/
│   │   │   ├── page.tsx                # Hub
│   │   │   └── [slug]/page.tsx         # Detail
│   │   ├── about-us/page.tsx
│   │   ├── contact-us/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── online-forms/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                # Index
│   │   │   └── [slug]/page.tsx         # Post
│   │   ├── loan-officer/page.tsx
│   │   ├── apply-now/page.tsx          # Redirect
│   │   ├── legal/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── accessibility-statement/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── api/
│   │       ├── leads/route.ts
│   │       └── blog/route.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── Section.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── FloatingCTA.tsx
│   │   ├── forms/
│   │   │   ├── QuickQuoteForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── QuoteWizard.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── CTACards.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── TestimonialsCarousel.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── calculators/
│   │   │   ├── MortgageCalculator.tsx
│   │   │   ├── RefinanceCalculator.tsx
│   │   │   ├── AffordabilityCalculator.tsx
│   │   │   └── ... (other calculators)
│   │   ├── ExitIntentPopup.tsx
│   │   ├── SocialProofToast.tsx
│   │   └── RateTicker.tsx
│   ├── lib/
│   │   ├── data.ts                     # Data access layer
│   │   ├── supabase.ts                 # Supabase client
│   │   ├── utils.ts                    # cn() helper, formatters
│   │   └── validations.ts             # Zod schemas
│   ├── data/
│   │   ├── loan-programs.json
│   │   ├── mortgage-basics.json
│   │   ├── faqs.json
│   │   ├── blog-posts.json
│   │   ├── loan-officers.json
│   │   └── testimonials.json
│   └── types/
│       └── index.ts                    # TypeScript interfaces
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── .env.local
```

---

## Execution Order

1. **Phase 0** — Set up repo, Next.js, Vercel link, install deps
2. **Phase 1** — Tailwind config, design tokens, UI components
3. **Phase 5** — Create all JSON data files (needed by pages)
4. **Phase 2** — Header, Footer, Layout
5. **Phase 3.1** — Homepage (most critical for conversion)
6. **Phase 3** — All other pages (work through them systematically)
7. **Phase 4** — Conversion features (wizard, exit-intent, toasts)
8. **Phase 6** — API routes for forms
9. **Phase 7** — Polish, images, animations, a11y, SEO
10. **Phase 8** — Commit, push, deploy, verify

**Commit frequently** — after each major page/component is complete, commit and push so Vercel deploys incrementally.

---

## Key Conversion Improvements Over Current Site

1. **Multi-step quote wizard** instead of a long single form (reduces abandonment)
2. **Sticky mobile CTA bar** (always-visible call/apply buttons)
3. **Exit-intent popup** (catches leaving visitors)
4. **Social proof toasts** ("Jane from Tampa just got pre-approved")
5. **Calculator → CTA pipeline** (after every calc, offer personalized quote)
6. **Faster load times** (Next.js SSG/ISR vs. current server-rendered PHP)
7. **Modern, trust-building design** (animations, professional typography, whitespace)
8. **Better SEO** (structured data, semantic HTML, optimized meta tags, sitemap)
9. **Testimonials carousel** (social proof front and center)
10. **Visual loan process timeline** (reduces anxiety about the unknown)
