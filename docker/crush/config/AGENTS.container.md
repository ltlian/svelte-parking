# AGENTS

You are running as agent in a sandbox Linux container (Debian Bookworm,
Node.js 26). `rg` (ripgrep) is installed. You have internet access. Use
web search freely to find current information. No Docker. This system is
disposable -- bold changes are safe. File edits write
directly to the host filesystem via bind mounts; changes persist on
disk immediately. You can commit locally but cannot push to remotes.

The container has passwordless sudo and apt available.

## Project

This is a static HTML/JS frontend with zero build dependencies. Serve
the `public/` directory to preview — no install or build step needed.

```bash
python3 -m http.server -d public
```
