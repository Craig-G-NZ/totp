# TOTP QR Generator

A small static web app that builds `otpauth://` QR codes for authenticator apps (Google Authenticator, Authy, Microsoft Authenticator, etc.).

Everything runs in the browser. Secrets are never sent to a server.

It deploys as a **Cloudflare Worker** with static assets (not Cloudflare Pages).

## What you need

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free plan is enough)
- [Node.js](https://nodejs.org/) 18+ (22 recommended)
- A domain on Cloudflare if you want a custom hostname (optional)

## Quick start (deploy your own copy)

### 1. Clone the repo

```bash
git clone https://github.com/Craig-G-NZ/totp.git
cd totp
```

Or fork it on GitHub first, then clone your fork.

### 2. Install dependencies

```bash
npm install
```

### 3. Log in to Cloudflare

```bash
npx wrangler login
```

This opens a browser window so Wrangler can use your Cloudflare account.

### 4. (Optional) Rename the Worker

In `wrangler.jsonc`, change `"name"` if you do not want the Worker called `totp`:

```jsonc
{
  "name": "my-totp-generator",
  // ...
}
```

### 5. Deploy

```bash
npm run deploy
```

Wrangler uploads the Worker and the files in `public/`.

By default this project has `workers_dev` and `preview_urls` set to `false`, so there is **no** `*.workers.dev` or preview URL after deploy. Attach a custom domain (next section) to open the site in a browser.

If you want a temporary `*.workers.dev` URL while testing, set this in `wrangler.jsonc`, redeploy, then turn it off again when you are done:

```jsonc
"workers_dev": true
```

### 6. Attach a custom domain

Add your hostname under `routes` in `wrangler.jsonc` (recommended — survives redeploys):

```jsonc
"routes": [
  {
    "pattern": "totp.example.com",
    "custom_domain": true
  }
]
```

Then run `npm run deploy`. Cloudflare creates the DNS record and certificate for you.

**Or** use the dashboard:

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → your Worker (e.g. **totp**) → **Settings** → **Domains & Routes**
3. Click **Add** → **Custom domain**
4. Enter a hostname on a zone already in your account
5. Wait for DNS/SSL to finish (usually a few minutes)

Your site is then available only on that hostname.

If you delete the Worker and recreate it, you must re-attach the domain (or keep it in `wrangler.jsonc` and deploy again).

### Migrating from Cloudflare Pages

If this hostname was previously on a Pages project:

1. Remove the custom domain from the Pages project
2. Add it to the Worker as above
3. Optionally delete or pause the old Pages project so `*.pages.dev` is unused

## Local development

```bash
npm install
npm run dev
```

Open the URL Wrangler prints (usually `http://localhost:8787` or `http://localhost:8788`).

Edit files under `public/` and refresh the browser. Restart `npm run dev` if you change `wrangler.jsonc`.

## Project layout

| Path | Purpose |
|------|---------|
| `public/` | Site files (HTML, CSS, JS, favicon) |
| `public/js/app.js` | Form validation and QR generation |
| `public/js/theme.js` | Light/dark mode (saved in `localStorage`) |
| `src/index.ts` | Worker entry — serves static assets |
| `wrangler.jsonc` | Worker name, assets folder, URL settings |
| `package.json` | `npm run dev` and `npm run deploy` scripts |

## Configuration notes

| Setting in `wrangler.jsonc` | Meaning |
|-----------------------------|---------|
| `name` | Worker name in your Cloudflare account |
| `assets.directory` | Folder uploaded as static files (`./public`) |
| `workers_dev` | `false` = no `*.workers.dev` subdomain |
| `preview_urls` | `false` = no preview URLs on deploy |

There is no database, API, or secret store. The Worker only serves the static site.

## How the app works

1. Enter a Base32 TOTP secret (and optional account name / issuer)
2. Click **Generate QR code**
3. Scan with an authenticator app, or click the secret/URI to copy for manual entry

Theme preference (light/dark) is stored in the browser under `totp-theme`.

## Security

- TOTP secrets never leave the browser
- QR codes are generated client-side with [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)
- Treat this like any password tool: use it on a trusted device, and do not share screen contents while a secret is visible

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| `npm clean-install` / peer dependency errors | Run `npm install` locally, commit an updated `package-lock.json`, and push again |
| Deploy succeeds but the site has no URL | Expected with `workers_dev: false` — add a custom domain (step 6 above) |
| `wrangler login` fails | Update Node, retry, or check [Wrangler docs](https://developers.cloudflare.com/workers/wrangler/) |
| Custom domain not resolving | Confirm the domain is in the same Cloudflare account and SSL is active under **Domains & Routes** |

## License

See [LICENSE](LICENSE).
