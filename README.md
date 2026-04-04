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
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

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

## Sections

Single-page portfolio with hash navigation:

1. **Hero** — Name, title, quick stats, CTA
2. **Work** — Featured projects with GitHub/LinkedIn links
3. **Skills** — Technical skills organized by category
4. **Experience** — Work history timeline
5. **About** — Background, education, certifications
6. **Contact** — Contact form + social links

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

Push to `main` triggers:
1. Build on Vercel
2. Deploy to production
3. ISR revalidates pages every 10 seconds

---

## Contact Form

Form submissions handled by Next.js API route (`/api/contact`). Configure your email service in `pages/api/contact.ts`.

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

## License

MIT

---

## Author

**Elwin Chiong**  
AI Systems Engineer  
[GitHub](https://github.com/Elwinc2799) · [LinkedIn](https://linkedin.com/in/elwin-chiong-3602b5222/)
