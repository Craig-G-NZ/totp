# TOTP QR Generator

Static site that generates `otpauth://` QR codes for authenticator apps. All processing runs in the browser.

Deployed as a **Cloudflare Worker** with static assets (not Pages).

## Structure

| Path | Role |
|------|------|
| `public/` | HTML, CSS, JS, favicon |
| `src/index.ts` | Worker — serves static assets |
| `wrangler.jsonc` | Worker config (`workers_dev` and `preview_urls` off) |

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Wrangler (typically `http://localhost:8788`).

## Deploy

Prerequisites: [Wrangler](https://developers.cloudflare.com/workers/wrangler/) logged in (`wrangler login`).

```bash
npm install
npm run deploy
```

### Custom domain only (no workers.dev / Pages preview)

`wrangler.jsonc` sets `workers_dev` and `preview_urls` to `false` so deploy does not re-enable `*.workers.dev` or preview URLs after you turn them off in the dashboard.

Use **only** your zone hostname (e.g. `totp.gillfamily.co.nz`), not `*.pages.dev` or `*.workers.dev`:

1. **Workers & Pages** → **totp** (Worker) → **Settings** → **Domains & Routes**
2. Add custom domain (e.g. `totp.gillfamily.co.nz`)
3. Remove that hostname from the old **Pages** project if it is still attached
4. Optional: delete or pause the Pages project so `totp.pages.dev` is not used

## Security

Secrets stay in the browser — nothing is sent to a server.
