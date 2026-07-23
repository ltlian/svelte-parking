# svelte-parking

A simple static page showing available parking spots in Stavanger, fetched
from an API proxied through a Cloudflare Worker.

## Development

Copy `.dev.vars.example` to `.dev.vars` (already gitignored) and adjust if
the API URL differs from the default.

Serve with the Cloudflare dev server:

```bash
npx wrangler dev
```

Or without the Worker (API path won't resolve — CORS permitting, you can
point `API_PATH` directly at the real URL for quick testing):

```bash
python3 -m http.server -d public
```

## Deployment

The project is a Cloudflare Worker serving static assets from `public/`.
The Worker proxies `/api/parkingAvailability` to the upstream API, whose
URL is configured via the `PARKING_API_URL` environment variable.

```bash
npx wrangler deploy
```

Set the variable in the Cloudflare dashboard under **Workers & Pages →
svelte-parking → Settings → Variables**, or via CLI:

```bash
npx wrangler secret put PARKING_API_URL
```

## AI Usage

This project was developed with assistance from Crush (DeepSeek). All
AI-generated code and content was reviewed, tested, and edited by a
human developer before being included.

| AI Tool | Provider | Build-time use | Runtime use |
| :--- | :--- | :--- | :--- |
| Crush | DeepSeek | Yes — code generation, refactoring, testing, and documentation | No |

First AI-assisted commit: `6ce99e1`
