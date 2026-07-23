# svelte-parking

A simple static page showing available parking spots in Stavanger, fetched
from an API proxied through a Cloudflare Pages Function.

## Development

Copy `.dev.vars.example` to `.dev.vars` (already gitignored) and adjust if
the API URL differs from the default.

Serve with Cloudflare's dev server:

```bash
npx wrangler pages dev public
```

Or without the function (API path won't resolve — CORS permitting, you can
point `API_PATH` directly at the real URL for quick testing):

```bash
python3 -m http.server -d public
```

## Deployment

The project is a Cloudflare Pages site with a single Function
(`functions/api/parkingAvailability.js`) that proxies requests to the
upstream API. The upstream URL is injected via a Cloudflare Pages
environment variable — never hardcoded in source.

1. Connect the GitHub repo to Cloudflare Pages
2. Build settings: no build command, output directory `public`
3. Add environment variable in the Cloudflare dashboard:
   - `PARKING_API_URL` = `https://statsmon-api.azurewebsites.net/parkingAvailability`

## AI Usage

This project was developed with assistance from Crush (DeepSeek). All
AI-generated code and content was reviewed, tested, and edited by a
human developer before being included.

| AI Tool | Provider | Build-time use | Runtime use |
| :--- | :--- | :--- | :--- |
| Crush | DeepSeek | Yes — code generation, refactoring, testing, and documentation | No |

First AI-assisted commit: `6ce99e1`
