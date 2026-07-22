# AGENTS

You are running as agent in a sandbox Linux container (Debian Bookworm,
Node.js 26). `rg` (ripgrep) is installed. You have internet access. Use
web search freely to find current information. No Docker. This system is
disposable -- bold changes are safe. File edits write
directly to the host filesystem via bind mounts; changes persist on
disk immediately. You can commit locally but cannot push to remotes.

The container has passwordless sudo and apt available.

## Project

This is a Svelte frontend app built with Rollup and TypeScript. The
Rollup dev server (sirv) runs on port 8081 and is exposed to the host.

Run `npm install` after first starting the container, then:
- Dev server: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run check`
- Format: `npm run format`
