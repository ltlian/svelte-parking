# Crush dev container

A sandboxed dev environment with the [Crush](https://charm.land/crush) coding
agent pre-installed.

## Setup

```bash
cp docker/crush/.env.example docker/crush/.env
# Edit docker/crush/.env and set DEEPSEEK_API_KEY
```

## Build and launch

```bash
docker compose -f docker/crush/compose.yaml up -d --build
```

## Exec into the container

```bash
docker compose -f docker/crush/compose.yaml exec crush bash
```

Inside the container, the workspace is at `/workspace` (bind-mounted from the
project root).
