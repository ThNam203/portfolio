# Portfolio

Personal site of **Huynh Thanh Nam** (`sen1or` / `ThNam203`).

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion · MDX · Resend.

## Stack

- **Framework:** Next.js 16 with App Router, Turbopack dev
- **UI:** React 19, Tailwind CSS 4, Framer Motion 12, `next-themes`, `lucide-react`
- **Content:** Typed TS modules in `content/`, MDX case studies via `next-mdx-remote`
- **Forms:** `react-hook-form` + Zod validation, Resend for delivery, Sonner toasts
- **OG images:** `@vercel/og` on the edge runtime
- **Live data:** GitHub REST API + `sen1or.blog` RSS feed (ISR, 1h revalidate)

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, snapshot, featured projects, stack, GitHub activity, latest posts, CTA |
| `/about` | Long-form bio, education, certifications, skills |
| `/projects` | Full project list |
| `/projects/[slug]` | MDX case studies (`letslive`, `favolist5-platform`, `letslearn`) |
| `/experience` | Work timeline |
| `/writing` | Posts pulled live from `sen1or.blog` RSS |
| `/resume` | PDF embed + download |
| `/contact` | Resend-backed form, honeypot, Zod validation |

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment

| Key | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | prod | Canonical URL for metadata, OG, sitemap |
| `RESEND_API_KEY` | `/contact` | resend.com API key |
| `CONTACT_FROM_EMAIL` | `/contact` | Verified sender domain |
| `CONTACT_TO_EMAIL` | optional | Inbox for submissions. Default `hthnam203@gmail.com` |
| `GITHUB_TOKEN` | optional | Raises GitHub REST rate limit |

Without `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`, `/contact` returns 503 and prompts visitor to email directly.

## Scripts

```bash
npm run dev      # next dev (turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Content edits

| File | Controls |
|---|---|
| `content/profile.ts` | Name, bio, socials, stats, certifications |
| `content/experience.ts` | Work timeline |
| `content/projects.ts` | Project list, featured flag, links |
| `content/case-studies/*.mdx` | Long-form write-ups |
| `content/skills.ts` | Stack chips |
| `public/resume.pdf` | Downloadable resume |

## Project layout

```
app/          # App Router routes + API handlers
components/   # Reusable UI primitives + section blocks
content/      # Typed source-of-truth for profile, projects, skills, MDX
i18n/         # Locale strings
lib/          # github.ts, rss.ts, resend client, utils
public/       # Static assets, resume.pdf
proxy.ts      # Edge proxy config
```

## Deploy

Push to GitHub, import on Vercel, set env vars. `/api/og` runs on the edge runtime; everything else is standard Node.

## License

Content © Huynh Thanh Nam. Code structure free for reuse.
