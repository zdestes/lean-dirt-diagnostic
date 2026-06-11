# Deploying leandirt.com

This repo is the entire Lean Dirt website: a single-page Next.js app deployed on Vercel.

## How deploys work

Any push to `main` on GitHub triggers an automatic production deploy on Vercel.

```bash
git add .
git commit -m "your change"
git push
```

## Environment variables

None required. (The old diagnostic's Notion/Resend integrations were removed in June 2026 — any `NOTION_*` or `RESEND_API_KEY` vars left in Vercel can be deleted.)

## Domains

- Production: `leandirt.com` (Vercel → Settings → Domains)
- Legacy: `diagnostic.leandirt.com` can be removed or redirected; the in-app `/diagnostic` route 301s to `/`.

## Where things live

- `src/app/page.tsx` — the landing page (all sections)
- `src/app/home.css` — page styles; brand tokens in `src/app/globals.css`
- `src/lib/site.ts` — booking URL + image paths (edit links in one place)
- `src/components/` — nav, footer, scroll-reveal
