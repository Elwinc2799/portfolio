# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available gstack skills:
- `/office-hours` - Office hours / Q&A session
- `/plan-ceo-review` - CEO review of a plan
- `/plan-eng-review` - Engineering review of a plan
- `/plan-design-review` - Design review of a plan
- `/plan-devex-review` - Developer experience plan review
- `/design-consultation` - Design consultation
- `/design-shotgun` - Shotgun design exploration
- `/design-html` - HTML design generation
- `/review` - Code review
- `/ship` - Ship a feature end-to-end
- `/land-and-deploy` - Land and deploy changes
- `/canary` - Canary deployment
- `/benchmark` - Benchmarking
- `/browse` - Web browsing (use this for ALL web browsing)
- `/connect-chrome` - Connect to Chrome browser
- `/qa` - QA testing
- `/qa-only` - QA only (no implementation)
- `/design-review` - Design review
- `/devex-review` - Developer experience review
- `/setup-browser-cookies` - Set up browser cookies
- `/setup-deploy` - Set up deployment
- `/retro` - Retrospective
- `/investigate` - Investigate an issue
- `/document-release` - Document a release
- `/codex` - Codex agent
- `/cso` - CSO security review
- `/autoplan` - Automatic planning
- `/careful` - Careful/conservative mode
- `/freeze` - Freeze codebase
- `/guard` - Guard mode
- `/unfreeze` - Unfreeze codebase
- `/gstack-upgrade` - Upgrade gstack
- `/learn` - Learn mode

**Troubleshooting:** If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

## Commands

```bash
yarn dev      # Start development server on http://localhost:3000
yarn build    # Production build
yarn start    # Run production server
yarn lint     # ESLint with next/core-web-vitals rules
```

No test suite is configured.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Architecture

**Stack:** Next.js 13 + TypeScript + Tailwind CSS + Sanity CMS + Framer Motion

### Data Flow

All portfolio content lives in Sanity CMS. Data flows:

```
Sanity CMS → GROQ queries in /pages/api/* → fetch utilities in /utils/* → getStaticProps in pages/index.tsx → component props
```

- `pages/index.tsx` uses `getStaticProps` with ISR (`revalidate: 10`) to fetch all data at build time
- Each data type has a paired API route and utility: e.g., `/api/getProjects` + `utils/fetchProjects.ts`
- The Sanity client is configured in `sanity.ts` (exports client + image URL builder)

### Sanity Schemas

Five schemas in `sanity/schemas/`: `pageInfo`, `skill`, `experience`, `project`, `social`. TypeScript types for these are in `typings.d.ts`.

### Page Structure

The single-page portfolio (`pages/index.tsx`) renders sections as full-viewport snap-scroll sections in this order: Hero → About → WorkExperience → Skills → Projects → ContactMe. Each section is a component in `/components/`.

### Images

All images are served from `cdn.sanity.io` (allowed in `next.config.js`). Use the `urlFor()` helper from `sanity.ts` to build image URLs from Sanity image references.

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review

## gstack (recommended)

This project uses [gstack](https://github.com/garrytan/gstack) for AI-assisted workflows.
Install it for the best experience:

```bash
git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup --team
```

Skills like /qa, /ship, /review, /investigate, and /browse become available after install.
Use /browse for all web browsing. Use ~/.claude/skills/gstack/... for gstack file paths.
