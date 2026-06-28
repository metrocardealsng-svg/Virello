# Deploying Virello — get your live URL

## Fastest path: Vercel (5 minutes)

1. Unzip this project somewhere on your machine.
2. Open a terminal in the project folder.
3. Run:
   ```
   npm install
   npx vercel
   ```
4. Follow the prompts (log in / sign up with GitHub or email, accept the defaults).
5. Vercel gives you a live URL immediately, something like `virello-xyz.vercel.app`.
6. To push updates later: `npx vercel --prod`

That's it. The site, auth, compose engine, billing flow, blog, and versus pages all work on that URL exactly as they did in my local test.

## One thing to know about the database

This runs on `node:sqlite`, a file-based database (`data/virello.db`). On Vercel's serverless platform, the filesystem resets between deployments, meaning **user signups and posts won't persist across deploys** on the free Vercel tier. For an actual production launch taking real signups, you have two options:

- **Quick fix**: deploy to a platform with persistent disk instead of serverless, like a $5/mo Railway or Render instance, or a basic VPS (DigitalOcean, Hetzner). `npm run build && npm run start` works as-is there, and the SQLite file just lives on disk permanently.
- **Scale-ready fix**: swap the SQLite layer for a hosted Postgres (Vercel Postgres, Supabase, Neon all have free tiers). The schema in `lib/db/index.ts` is straightforward to port; happy to do this conversion if you want to stay on Vercel long-term.

For testing the product and showing it to people today, Vercel is fine. For taking real signups and payments, move off serverless SQLite first.

## What's mocked, and where to wire up the real thing

Every mock is commented in the source so you know exactly what's fake:

- **Platform publishing** (`lib/posts/engine.ts`, `simulatePublish`) — generates a fake published URL per platform. Replace with real API calls once you've registered developer apps with X, Meta, TikTok, LinkedIn, YouTube.
- **OAuth connect flow** (`components/dashboard/accounts-manager.tsx`) — takes a handle, doesn't do a real OAuth redirect. Needs per-platform developer credentials.
- **Media upload** (`components/dashboard/compose-box.tsx`, `handleMockUpload`) — returns a placeholder image URL. Wire up Vercel Blob, S3, or Cloudflare R2.
- **Google sign-in** — button is disabled with an explanatory tooltip. Needs `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
- **Contact form** — opens the user's email client via `mailto:`. Wire up Resend or similar if you want it to actually send through your backend.
- **Billing** — fully real manual bank transfer flow (Moniepoint/GTBank), with a billing_requests table you'd check manually to activate plans. No card processor is wired up, per your original spec.

## Local testing before you deploy

```
npm install
npm run build
npm run start
```
Then open http://localhost:3000
