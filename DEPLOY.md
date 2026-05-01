# Deploy to diagnostic.leandirt.com

## One-time setup (~20 minutes)

### 1. Create GitHub repo

1. Go to github.com → New repository
2. Name it: `lean-dirt-diagnostic`
3. Set to **Private**
4. Click **Create repository**
5. On your computer (or this server), run:

```bash
cd /data/.openclaw/workspace/lean-dirt-diagnostic
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/lean-dirt-diagnostic.git
git push -u origin main
```

---

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import `lean-dirt-diagnostic` from your GitHub
4. Click **Deploy** (defaults are fine)
5. Vercel gives you a URL like `lean-dirt-diagnostic.vercel.app` — that's your app

---

### 3. Add environment variables in Vercel

1. In Vercel → your project → **Settings → Environment Variables**
2. Add these three:

| Variable | Value |
|----------|-------|
| `NOTION_API_KEY` | `NOTION_KEY_REDACTED` |
| `NOTION_CONTACTS_DB_ID` | `REDACTED` |
| `NOTION_OPPORTUNITIES_DB_ID` | `REDACTED` |

3. Click **Save** then **Redeploy**

---

### 4. Add custom subdomain

1. In Vercel → your project → **Settings → Domains**
2. Add: `diagnostic.leandirt.com`
3. Vercel shows you a DNS record to add (it'll be a CNAME)
4. Log into wherever leandirt.com DNS lives (GoDaddy, Cloudflare, Namecheap, etc.)
5. Add the CNAME record Vercel shows you
6. DNS propagates in ~5 minutes on Cloudflare, up to 24h elsewhere

---

### 5. Future updates

Any time you push to GitHub, Vercel auto-deploys. That's it.

```bash
git add .
git commit -m "your change"
git push
```

---

## What leads land in Notion

When someone completes through Phase 3 and submits their email:
- A new **External Contact** is created with their name + email
- A new **Opportunity** is created linked to that contact, with their full diagnostic data (all numbers, targets, metrics) embedded in the page body
- They show up in your sales pipeline ready for follow-up

## Customization notes

- `src/components/DiagnosticWizard.tsx` — all the UI and logic lives here
- `src/app/api/save-lead/route.ts` — the Notion API call
- `src/lib/calculations.ts` — all the financial math
- The CTA link at the end (`https://leandirt.com/contact`) — update to your actual booking/contact URL
