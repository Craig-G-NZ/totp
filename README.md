# TOTP QR Generator

Static site that generates `otpauth://` QR codes for authenticator apps. All processing runs in the browser.

## Structure

- `index.html` — page markup
- `css/styles.css` — Gill Family design system (matches [sloth.gillfamily.co.nz](https://sloth.gillfamily.co.nz))
- `js/app.js` — form handling and QR generation
- `favicon.svg` — site icon

## Run locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080
