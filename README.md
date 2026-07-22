# svelte-parking

See the running version here. Maybe.

https://icy-river-00c658503.1.azurestaticapps.net/

## Get started

Install dependencies

```bash
cd svelte-parking
yarn install
```

...then start [Vite](https://vitejs.dev):

```bash
yarn run dev
```

Navigate to [localhost:8080](http://localhost:8080).

## Dockerized development (Crush agent)

A sandboxed dev environment with the [Crush](https://charm.land/crush) coding
agent pre-installed.

### Setup

```bash
cp docker/crush/.env.example docker/crush/.env
# Edit docker/crush/.env and set DEEPSEEK_API_KEY
```

### Build and launch

```bash
docker compose -f docker/crush/compose.yaml up -d --build
```

### Exec into the container

```bash
docker compose -f docker/crush/compose.yaml exec crush bash
```

Inside the container, the workspace is at `/workspace` (bind-mounted from the
project root). Run `npm install` on first use, then `npm run dev`.

## AI Usage

This project was developed with assistance from Crush (DeepSeek). All
AI-generated code and content was reviewed, tested, and edited by a
human developer before being included.

| AI Tool | Provider | Build-time use | Runtime use |
| :--- | :--- | :--- | :--- |
| Crush | DeepSeek | Yes — code generation, refactoring, testing, and documentation | No |

First AI-assisted commit: *TBD*

## Svelte

https://svelte.dev/
