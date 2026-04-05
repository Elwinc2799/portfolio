# Elwin Chiong — Portfolio

AI Systems Engineer portfolio built with Next.js 13, TypeScript, Tailwind CSS, and Sanity CMS.

**Live:** https://portfolio-elwinc2799.vercel.app/

---

## Tech Stack

- **Framework:** Next.js 13 (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity (headless CMS)
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Forms:** React Hook Form
- **Email:** Resend
- **Analytics:** Vercel Analytics
- **OG Images:** @vercel/og (dynamic generation)

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Sanity account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/Elwinc2799/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity project ID
```

### Environment Variables

Create `.env.local`:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Resend (for contact form emails)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
```

**Note:** Contact form works without Resend API key (logs to console). For production email delivery, sign up at [resend.com](https://resend.com) and follow [RESEND_SETUP.md](RESEND_SETUP.md).

### Development

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Architecture

### Data Flow

```
Sanity CMS → GROQ queries in getStaticProps → Components
```

All content is fetched at build time using Next.js Static Site Generation (SSG) with Incremental Static Regeneration (ISR, revalidate: 10s).

### Project Structure

```
├── components/          # React components (Hero, Work, Skills, etc.)
├── pages/
│   ├── index.tsx       # Main page with getStaticProps
│   └── api/
│       └── contact.ts  # Contact form API route
├── sanity/
│   └── schemas/        # Sanity schema definitions
├── styles/             # Global CSS
├── typings.d.ts        # TypeScript types
├── sanity.ts           # Sanity client config
└── tailwind.config.js  # Tailwind configuration
```

### Sanity Schemas

Five content types in Sanity Studio:
- `pageInfo` — Personal info, background, education
- `skill` — Technical skills with proficiency levels
- `experience` — Work history with technologies
- `project` — Portfolio projects
- `social` — Social media links

---

## Features

### Single-Page Portfolio
Hash-based navigation (#hero, #work, #skills, #experience, #about, #contact)

### Core Sections
1. **Hero** — Name with signature orange "o", quick stats, Resume download, CTA
2. **Work** — Featured projects (ClickBites, AMD Data Platform, AMD Infrastructure)
3. **Skills** — Technical skills with proficiency levels
4. **Experience** — Work history timeline
5. **About** — Background, education, certifications
6. **Contact** — Working contact form with email delivery + social links

### SEO & Social
- **OpenGraph & Twitter Cards** — Rich social media previews
- **Dynamic OG Image** — Custom 1200x630 image generated via `/api/og` (matches site design with Inter font, orange "o" signature)
- **JSON-LD Structured Data** — Person schema for search engines
- **Sitemap & Robots.txt** — Search engine optimization
- **Custom Favicon** — EC initials in brand colors

### Performance
- **Image Optimization** — All images use `next/image` with automatic WebP conversion
- **Priority Loading** — Above-the-fold images loaded first (improved LCP)
- **ISR (Incremental Static Regeneration)** — Pages revalidate every 10 seconds

### Analytics
- **Vercel Analytics** — Visitor tracking and page views (dashboard access via Vercel)

---

## Scripts

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Production build
npm start        # Run production server
npm run lint     # Run ESLint
```

---

## Deployment

Deployed on Vercel with automatic deployments from `main` branch.

**Production URL:** https://portfolio-elwinc2799.vercel.app/

### Automatic Deployment Flow
Push to `main` triggers:
1. Build on Vercel (Node.js 24.x)
2. Deploy to production
3. ISR revalidates pages every 10 seconds

### Required Environment Variables (Vercel)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=zo3arsq9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=https://portfolio-elwinc2799.vercel.app

# Optional (for contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=elwinczh@gmail.com
```

Add these in: Vercel Dashboard → Settings → Environment Variables → Apply to all environments

---

## Contact Form

Form submissions send emails via **Resend** API.

**Setup (5 minutes):**
1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Create API key in dashboard
3. Add to Vercel environment variables (see [RESEND_SETUP.md](RESEND_SETUP.md))
4. Redeploy

**Without Resend API key:** Form still works but logs to console instead of sending email.

---

## API Endpoints

### `/api/contact` (POST)
Contact form submission handler. Sends email via Resend.

**Request body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

### `/api/og` (GET)
Generates OpenGraph image (1200x630 PNG) with:
- Site branding (orange "o" signature)
- Inter font family (matches site typography)
- Dynamic content from site design

Used by social platforms for rich previews.

---

## Development Tools

This project uses **gstack** for QA, code review, and deployment workflows:

```bash
/qa              # Run comprehensive QA testing
/review          # Pre-merge code review
/ship            # Ship workflow (test + review + commit + push)
```

See `.claude/skills/gstack/` for available skills.

---

## Performance Metrics

**Lighthouse Scores (Production):**
- Performance: 85/100
- Accessibility: 96/100
- Best Practices: 96/100
- SEO: 100/100

**Core Web Vitals:**
- First Contentful Paint: ~1.2s
- Largest Contentful Paint: ~2.8s
- Cumulative Layout Shift: 0.01

See `.gstack/lighthouse-reports/` for detailed audits.

---

## License

MIT

---

## Author

**Elwin Chiong**  
AI Systems Engineer  
[GitHub](https://github.com/Elwinc2799) · [LinkedIn](https://linkedin.com/in/elwin-chiong-3602b5222/)
