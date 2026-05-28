# sen1or — portfolio

Personal portfolio for **Huynh Thanh Nam** (`sen1or` / `ThNam203`).

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion. Content is sourced from a typed `content/` folder so updating the CV is one file edit, not a markup hunt.

## Pages

- `/` — hero, snapshot, featured projects, stack, live GitHub activity, latest posts, contact CTA
- `/about` — long-form bio, education, certifications, skills
- `/projects` — full list
- `/projects/[slug]` — MDX case studies (letslive, favolist5-platform, store-management)
- `/experience` — work timeline
- `/writing` — posts pulled live from sen1or.blog RSS
- `/resume` — PDF embed + download
- `/contact` — Resend-backed form with honeypot + zod validation

## Live data

- **GitHub:** `lib/github.ts` calls the REST API with ISR (`revalidate: 3600`). No token required; supply `GITHUB_TOKEN` to raise the rate limit.
- **Blog RSS:** `lib/rss.ts` parses `https://sen1or.blog/rss.xml` hourly.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in real keys
npm run dev
```

## Environment variables

| Key | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (in prod) | Canonical URL for metadata, OG, sitemap. |
| `RESEND_API_KEY` | Yes for `/contact` | API key from resend.com. |
| `CONTACT_FROM_EMAIL` | Yes for `/contact` | Verified sender on your Resend domain. |
| `CONTACT_TO_EMAIL` | Optional | Inbox that receives form submissions. Defaults to `hthnam203@gmail.com`. |
| `GITHUB_TOKEN` | Optional | Fine-grained read-only token to raise GH rate limit. |

Without `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`, the contact form returns 503 and asks the visitor to email directly.

## Scripts

```bash
npm run dev      # next dev (turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Editing content

| Edit this | To change… |
|---|---|
| `content/profile.ts` | Name, bio, socials, stats, certifications |
| `content/experience.ts` | Work history timeline |
| `content/projects.ts` | Project list, featured flag, links |
| `content/case-studies/*.mdx` | Long-form project write-ups |
| `content/skills.ts` | Stack chips |
| `public/resume.pdf` | Downloadable resume |

## Deploy

Push to GitHub, import into Vercel, set env vars. The `/api/og` route uses the edge runtime; the rest is standard Node.

## License

Personal site — content is © Huynh Thanh Nam. The code structure is free for reuse.
